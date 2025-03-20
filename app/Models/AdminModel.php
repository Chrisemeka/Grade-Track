<?php

namespace App\Models;

use CodeIgniter\Model;

class AdminModel extends Model
{
    protected $table = 'admin';
    protected $primaryKey = 'admin_id';
    protected $allowedFields = [
      'admin_first_name', 
      'admin_last_name', 
      'admin_email', 
      'admin_password'
    ];
}
