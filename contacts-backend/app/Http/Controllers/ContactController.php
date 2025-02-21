<?php

namespace App\Http\Controllers;

use App\Http\Requests\ContactRequest;
use App\Models\Contact;
use App\Responses\GenericResponse;
use App\Services\ContactService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    private ContactService $contactService;

    public function __construct(ContactService $contactService)
    {
        $this->contactService = $contactService;
    }

    public function index(Request $request): JsonResponse
    {
        return GenericResponse::success(__('responses_contacts.index'), $this->contactService->all($request))
            ->setStatus(200)
            ->toResponse();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactRequest $request): JsonResponse
    {
        return GenericResponse::success(__('responses_contacts.index'), $this->contactService->create($request->all()))
            ->setStatus(201)
            ->toResponse();
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContactRequest $request, Contact $contact): JsonResponse
    {
        return GenericResponse::success(__('responses_contacts.index'), $this->contactService->update($request->all(), $contact))
            ->setStatus(200)
            ->toResponse();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact): JsonResponse
    {
        return GenericResponse::success(__('responses_contacts.index'), $this->contactService->delete($contact))
            ->setStatus(200)
            ->toResponse();
    }
}
