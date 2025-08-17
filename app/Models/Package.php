<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Package extends Model
{
    use Uuid;

    protected $fillable = ['name', 'price', 'interest_type', 'interest', 'status'];
}
