<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MensajesVonage extends Model
{
    use HasFactory;

    public $fillable = [
        'msisdn',
        'to',
        'messageId',
        'text',
        'type',
        'keyword',
        'message-timestamp',
        'timestamp',
        'nonce',
        'concat',
        'concat-ref',
        'concat-total',
        'concat-part',
        'data',
        'udh'
    ];

}
