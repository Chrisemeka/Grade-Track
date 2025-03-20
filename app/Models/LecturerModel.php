<?php

namespace App\Models;

use CodeIgniter\Model;

class LecturerModel extends Model
{
    protected $table = 'lecturer';
    protected $primaryKey = 'lecturer_id';
    protected $allowedFields = [
      'lecturer_first_name', 
      'lecturer_last_name', 
      'lecturer_email', 
      'lecturer_password'
    ];
}
