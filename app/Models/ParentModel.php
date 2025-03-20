<?php

namespace App\Models;

use CodeIgniter\Model;

class ParentModel extends Model
{
    protected $table = 'parent';
    protected $primaryKey = 'parent_id';
    protected $allowedFields = [
      'parent_first_name', 
      'parent_last_name', 
      'parent_email', 
      'parent_password'
    ];
}
