<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Slider extends Model
{
    use Uuid;

    protected $guarded = ['id'];
}
