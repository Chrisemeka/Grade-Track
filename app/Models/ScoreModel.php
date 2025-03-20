<?php

namespace App\Models;

use CodeIgniter\Model;

class ScoreModel extends Model
{
    protected $table = 'score';
    protected $primaryKey = 'score_id';
    protected $allowedFields = [
      'enrollment_id',
      'activity_instance_id',
      'score', 
    ];
    // protected $useTimestamps = true;
}
