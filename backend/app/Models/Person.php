<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Person extends Model
{
    protected $fillable = ['name', 'parent_id'];

    // Parent-child relationship
    public function subordinates()
    {
        return $this->hasMany(Person::class, 'parent_id');
    }

    // Relationship for the superior
    public function manager()
    {
        return $this->belongsTo(Person::class, 'parent_id');
    }
}
