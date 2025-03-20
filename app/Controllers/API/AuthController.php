<?php

namespace App\Controllers\API;

use App\Models\StudentModel;
use App\Models\ParentModel;
use App\Models\LecturerModel;
use App\Models\AdminModel;

use CodeIgniter\RESTful\ResourceController;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use CodeIgniter\API\ResponseTrait;

class AuthController extends ResourceController {

  use ResponseTrait;

  public function register() {
    // Set headers
    $this->response->setHeader('Access-Control-Allow-Origin', '*')
                   ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
                   ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Get JSON data
    $json = $this->request->getJSON(true);

    // Validate required fields
    if (!isset($json['first_name'], $json['last_name'], $json['email'], $json['password'], $json['role'])) {
      return $this->failValidationErrors("All fields are required.");
    }

    // Validate email format
    if (!filter_var($json['email'], FILTER_VALIDATE_EMAIL)) {
      return $this->failValidationErrors("Invalid email format.");
    }

    // Check if email already exists in any of the tables
    if ($this->emailExists($json['email'])) {
      return $this->failResourceExists("Email already registered.");
    }

    // Hash password before storing
    $json['password'] = password_hash($json['password'], PASSWORD_BCRYPT);

    // Determine model based on role
    switch ($json['role']) {
      case 'student':
          $model = new StudentModel();
          $userData = [
              'student_first_name' => $json['first_name'],
              'student_last_name'  => $json['last_name'],
              'student_email'      => $json['email'],
              'student_password'   => $json['password']
          ];
          break;
      case 'parent':
          $model = new ParentModel();
          $userData = [
              'parent_first_name' => $json['first_name'],
              'parent_last_name'  => $json['last_name'],
              'parent_email'      => $json['email'],
              'parent_password'   => $json['password']
          ];
          break;
      case 'lecturer':
          $model = new LecturerModel();
          $userData = [
              'lecturer_first_name' => $json['first_name'],
              'lecturer_last_name'  => $json['last_name'],
              'lecturer_email'      => $json['email'],
              'lecturer_password'   => $json['password']
          ];
          break;
      case 'admin':
          $model = new AdminModel();
          $userData = [
              'admin_first_name' => $json['first_name'],
              'admin_last_name'  => $json['last_name'],
              'admin_email'      => $json['email'],
              'admin_password'   => $json['password']
          ];
          break;
      default:
          return $this->fail("Invalid role provided.");
    }

    // Insert user data
    if (!$model->insert($userData)) {
        return $this->failServerError("Registration failed.");
    }

    return $this->respondCreated([
        'message' => ucfirst($json['role']) . ' registered successfully.'
    ]);
  }

  private function emailExists($email) {
    $studentModel = new StudentModel();
    $parentModel = new ParentModel();
    $lecturerModel = new LecturerModel();
    $adminModel = new AdminModel();

    $exists = $studentModel->where('student_email', $email)->first() ||
              $parentModel->where('parent_email', $email)->first() ||
              $adminModel->where('admin_email', $email)->first() ||
              $lecturerModel->where('lecturer_email', $email)->first();

    return $exists;
  }

  public function login()
  {
      // Set headers
      // $this->response->setHeader('Access-Control-Allow-Origin', '*')
      // ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
      // ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

      // Allow only JSON requests
      if (!$this->request->is('post')) {
        return $this->fail('Invalid request method', 405);
      }

      // Get JSON data
      $json = $this->request->getJSON(true);

      // $session = session(); // Start session
      // $request = service('request');
      // $email = $request->getPost('email');
      // $password = $request->getPost('password');

      $email = $json['email'];
      $password = $json['password'];

      if (!$email || !$password) {
          return $this->fail("Email and password are required.", 400);
      }

      // Check all three tables
      $session = session(); // Start session
      $firstName = null;
      $lastName = null;
      $user = null;
      $role = null;
      $matricNumber = null;

      // $models = [
      //   'student' => new StudentModel(),
      //   'parent' => new ParentModel(),
      //   'lecturer' => new LecturerModel(),
      //   'admin' => new AdminModel(),
      // ];

      // foreach ($models as $roleType => $model) {
      //   $emailField = "{$roleType}_email";
      //   $passwordField = "{$roleType}_password";

      //   $userData = $model->where($emailField, $email)->first();
      //   if ($userData && password_verify($password, $userData[$passwordField])) {
      //       $user = $userData;
      //       $role = $roleType;
      //       $firstName = $userData["{$roleType}_first_name"];
      //       $lastName = $userData["{$roleType}_last_name"];
      //       $matricNumber = $userData["matric_number"] ?? null;
      //       break;
      //   }
      // }

      // Check Students Table
      $studentModel = new StudentModel();
      $student = $studentModel->where('student_email', $email)->first();
      if ($student && password_verify($password, $student['student_password'])) {
          $user = $student;
          $role = 'student';
          $matricNumber = $student['matric_number']; // Matric number for students
          $firstName = $student['student_first_name'];  
          $lastName = $student['student_last_name'];
      }

      // Check Parents Table
      if (!$user) {
          $parentModel = new ParentModel();
          $parent = $parentModel->where('parent_email', $email)->first();
          if ($parent && password_verify($password, $parent['parent_password'])) {
              $user = $parent;
              $role = 'parent';
              $firstName = $parent['parent_first_name'];  
              $lastName = $parent['parent_last_name'];
          }
      }

      // Check Lecturers Table
      if (!$user) {
          $lecturerModel = new LecturerModel();
          $lecturer = $lecturerModel->where('lecturer_email', $email)->first();
          if ($lecturer && password_verify($password, $lecturer['lecturer_password'])) {
              $user = $lecturer;
              $role = 'lecturer';
              $firstName = $lecturer['lecturer_first_name'];  
              $lastName = $lecturer['lecturer_last_name'];
          }
      }

      // Check Admins Table
      if (!$user) {
          $adminModel = new AdminModel();
          $admin = $adminModel->where('admin_email', $email)->first();
          if ($admin && password_verify($password, $admin['admin_password'])) {
              $user = $admin;
              $role = 'admin';
              $firstName = $admin['admin_first_name'];  
              $lastName = $admin['admin_last_name'];
          }
      }

      // If user not found
      if (!$user) {
          return $this->failUnauthorized("Invalid email or password.");
      }

      // Store user data in session
      // $sessionData = [
      //     'id' => $user['id'],
      //     'first_name' => $user['first_name'],
      //     'last_name' => $user['last_name'],
      //     'role' => $role,
      //     'matric_number' => $matricNumber, // Will be null for non-students
      //     'isLoggedIn' => true
      // ];
      // $session->set($sessionData);

      // Generate JWT Token
      // $key = getenv('JWT_SECRET');
      // $payload = [
      //     'sub' => $user[$role .'_id'],
      //     'first_name' => $firstName,
      //     'last_name' => $lastName,
      //     // 'email' => $user[$role .'_email'],
      //     'matric_number' => $matricNumber,
      //     'role' => $role,
      //     'iat' => time(),
      //     'exp' => time() + 3600 // 1 hour expiration
      // ];
      // $token = JWT::encode($payload, $key, 'HS256');

      $sessionData = [
        'id' => $user[$role . '_id'],
        'first_name' => $firstName,
        'last_name' => $lastName,
        'role' => $role,
        'matric_number' => $matricNumber, // Will be null for non-students
        'isLoggedIn' => true
      ];
      $session->set($sessionData);

      return $this->respond([
          'message' => 'Login successful',
          'user' => $sessionData,
      ], 200);
  }

  public function logout()
  {
    $session = session();
    
    if (!$session->get('isLoggedIn')) {
        return $this->failUnauthorized("No active session found.");
    }

    $session->destroy(); // Destroy the session

    return $this->respond([
        'message' => 'Logout successful'
    ], 200);
  }

}
