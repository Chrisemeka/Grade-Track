<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivityInstanceModel extends Model
{
    protected $table = 'activity_instance';
    protected $primaryKey = 'activity_instance_id';
    protected $allowedFields = [
      'activity_id', 
      'instance_number',
    ];
    // protected $useTimestamps = true;
}
