<?php

namespace App\Controllers\API;

use App\Models\StudentModel;
use App\Models\ParentModel;
use App\Models\LecturerModel;
use App\Models\AdminModel;
use App\Models\ClassModel;
use App\Models\EnrollmentModel;

use CodeIgniter\RESTful\ResourceController;

use CodeIgniter\API\ResponseTrait;

class LecturerController extends ResourceController {

  use ResponseTrait;

  public function createClass() {
    // Set headers
    $this->response->setHeader('Access-Control-Allow-Origin', '*')
                   ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
                   ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    $request = $this->request->getJSON();

    // Validate required fields
    if (!isset($request->className, $request->lecturerId)) {
        return $this->fail("Class name and lecturer ID are required", 400);
    }

    $classModel = new ClassModel();

    // Generate unique invite code
    $inviteCode = $this->generateUniqueInviteCode($classModel); // Example: 'A1B2C3'

    // Prepare class data
    $data = [
        'class_name' => $request->className,
        'class_description' => $request->description ?? null,
        'start_date' => $request->startDate ?? null,
        'end_date' => $request->endDate ?? null,
        'lecturer_id' => $request->lecturerId,
        'invite_code' => $inviteCode
    ];

    // Insert into the database
    $classId = $classModel->insert($data);

    if (!$classId) {
        return $this->fail("Failed to create class", 500);
    }

    // Fetch all classes created by the lecturer
    $allClasses = $classModel->where('lecturer_id', $request->lecturerId)->findAll();

    // Return the created class
    return $this->respond([
        'message' => 'Class created successfully',
        'class' => array_merge($data, ['id' => $classId]),
        'invite_code' => $inviteCode
        // 'all_classes' => $allClasses // Send all classes created by the lecturer
    ], 201);
  }

  private function generateUniqueInviteCode($classModel) {
    do {
        $inviteCode = strtoupper(bin2hex(random_bytes(3))); // Example: 'A1B2C3'
        $existingCode = $classModel->where('invite_code', $inviteCode)->first();
    } while ($existingCode); // Regenerate if already exists

    return $inviteCode;
  }

  public function getLecturerClasses() {
    $this->response->setHeader('Access-Control-Allow-Origin', '*')
                   ->setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
                   ->setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    // Get logged-in lecturer ID from session
    // $lecturerId = session()->get('lecturer_id');

    // $lecturerId = $this->request->getJSON()->lecturerId ?? null;
    $lecturerId = $this->request->getHeaderLine('X-Lecturer-ID');

    if (!$lecturerId) {
        return $this->fail("Bad Request: Lecturer ID is required", 401);
    }

    // Load Class Model
    $classModel = new ClassModel();

    // Fetch all classes for the lecturer
    $classes = $classModel->where('lecturer_id', $lecturerId)->findAll();

    if (empty($classes)) {
      return $this->respond([
          'message' => 'No classes created yet',
          'classes' => []
      ], 200);
    }

    log_message('error', print_r($classes, true));
    return $this->respond([
        'message' => 'Lecturer classes retrieved successfully',
        'classes' => $classes
    ], 200);
  }

}
