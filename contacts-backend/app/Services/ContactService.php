<?php

namespace App\Services;

use App\Models\Contact;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ContactService
{
    public function __construct()
    {
    }

    public function all(Request $request): LengthAwarePaginator
    {
        return Contact::query()
            ->when($request->has('search'), fn(Builder $query) => $this->applySearch($query, $request->query('search', '')))
            ->orderBy('first_name')
            ->orderBy('surname')
            ->orderBy('email')
            ->paginate(
                perPage: $request->query('per_page', 10),
                page: $request->query('page', 1)
            );
    }

    public function create(array $data): Contact
    {
        return Contact::create($data);
    }

    public function update(array $data, Contact $contact): Contact
    {
        $contact->update($data);

        return $contact;
    }

    public function delete(Contact $contact): bool
    {
        return $contact->delete();
    }

    private function applySearch(Builder $query, string $search): void
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
