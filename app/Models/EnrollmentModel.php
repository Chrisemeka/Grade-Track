<?php

namespace App\Models;

use CodeIgniter\Model;

class EnrollmentModel extends Model
{
    protected $table = 'enrollment';
    protected $primaryKey = 'enrollment_id';
    protected $allowedFields = [
      'enrollment_id',
      'student_id',
      'class_id', 
    ];
    // protected $useTimestamps = true;
}
