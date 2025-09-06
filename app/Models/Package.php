<?php

namespace App\Models;

use App\Traits\Uuid;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Package extends Model
{
    use Uuid;

    protected $fillable = ['name', 'price', 'interest_type', 'interest', 'duration', 'status'];


    /**
     * @return HasMany
     */
    public function purchases(): HasMany
    {
        return $this->hasMany(Purchase::class, 'package_id', 'id');
    }
}
