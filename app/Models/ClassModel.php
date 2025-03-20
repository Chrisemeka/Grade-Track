<?php

namespace App\Models;

use CodeIgniter\Model;

class ClassModel extends Model
{
    protected $table = 'class';
    protected $primaryKey = 'class_id';
    protected $allowedFields = [
      'class_name', 
      'lecturer_id', 
      'start_date',
      'end_date',
      'invite_code',
      'class_description',
    ];
    protected $useTimestamps = true;
}
