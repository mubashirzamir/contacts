<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource
     */
    public function index(Request $request)
    {
        return Contact::query()
            ->when($request->has('search'), fn(Builder $query) => Contact::applySearch($query, $request->query('search', '')))
            ->paginate(
                perPage: $request->query('per_page', 10),
                page: $request->query('page', 1)
            );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
