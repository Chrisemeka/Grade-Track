<?php

namespace App\Models;

use CodeIgniter\Model;

class ActivityModel extends Model
{
    protected $table = 'activity';
    protected $primaryKey = 'activity_id';
    protected $allowedFields = [
      'acttivity_type',
      'activity_title',
    ];
    // protected $useTimestamps = true;
}
