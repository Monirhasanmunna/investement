<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    use Uuid;

    protected $fillable = ['question', 'answer', 'status'];
}
