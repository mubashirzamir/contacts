<?php

namespace App\Models;

use Database\Factories\ContactFactory;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 *
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $first_name
 * @property string $surname
 * @property string|null $email
 * @property string $phone
 * @property string|null $address_line_01
 * @property string|null $address_line_02
 * @property string|null $address_line_03
 * @property string|null $city
 * @property string|null $postcode
 * @property-read \App\Models\TFactory|null $use_factory
 * @method static ContactFactory factory($count = null, $state = [])
 * @method static Builder<static>|Contact newModelQuery()
 * @method static Builder<static>|Contact newQuery()
 * @method static Builder<static>|Contact query()
 * @method static Builder<static>|Contact whereAddressLine01($value)
 * @method static Builder<static>|Contact whereAddressLine02($value)
 * @method static Builder<static>|Contact whereAddressLine03($value)
 * @method static Builder<static>|Contact whereCity($value)
 * @method static Builder<static>|Contact whereCreatedAt($value)
 * @method static Builder<static>|Contact whereEmail($value)
 * @method static Builder<static>|Contact whereFirstName($value)
 * @method static Builder<static>|Contact whereId($value)
 * @method static Builder<static>|Contact wherePhone($value)
 * @method static Builder<static>|Contact wherePostcode($value)
 * @method static Builder<static>|Contact whereSurname($value)
 * @method static Builder<static>|Contact whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Contact extends Model
{
    /** @use HasFactory<ContactFactory> */
    use HasFactory;

    protected $casts = [
        'phone' => 'array'
    ];

    protected $fillable = [
        'first_name',
        'surname',
        'email',
        'phone',
        'address_line_01',
        'address_line_02',
        'address_line_03',
        'city',
        'postcode'
    ];

    public static function applySearch(Builder $query, string $search): void
    {
        $query->where(function ($query) use ($search) {
            $query->whereRaw('LOWER(first_name) LIKE ?', ['%' . strtolower($search) . '%'])
                ->orWhereRaw('LOWER(surname) LIKE ?', ['%' . strtolower($search) . '%'])
                ->orWhereRaw('LOWER(email) LIKE ?', ['%' . strtolower($search) . '%'])
                ->orWhereRaw("LOWER(" .
                    "json_extract(phone, '$.countryCode') || " .
                    "json_extract(phone, '$.areaCode') || " .
                    "json_extract(phone, '$.phoneNumber')" .
                    ") LIKE ?", ['%' . strtolower($search) . '%']);
        });
    }
}
