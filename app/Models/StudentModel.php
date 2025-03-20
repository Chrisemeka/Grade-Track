<?php

namespace App\Models;

use CodeIgniter\Model;

class StudentModel extends Model
{
    protected $table = 'student';
    protected $primaryKey = 'student_id';
    protected $allowedFields = [
      'student_first_name', 
      'student_last_name', 
      'student_email', 
      'student_password'
    ];
}
