<?php

namespace App\Responses;

use Illuminate\Http\JsonResponse;

class GenericResponse
{
    protected string $message;
    protected mixed $data;
    protected int $status;

    /**
     * Set the success response.
     */
    public static function success(string $message, mixed $data = null): self
    {
        return (new self())->setMessage($message)->setData($data)->setStatus(200);
    }

    /**
     * Set the error response.
     */
    public static function error(string $message, mixed $data = null, int $status = 400): self
    {
        return (new self())->setMessage($message)->setData($data)->setStatus($status);
    }

    /**
     * Set the response message.
     */
    public function setMessage(string $message): self
    {
        $this->message = $message;
        return $this;
    }

    /**
     * Set the response data.
     */
    public function setData(mixed $data): self
    {
        $this->data = $data;
        return $this;
    }

    /**
     * Set the response status code.
     */
    public function setStatus(int $status): self
    {
        $this->status = $status;
        return $this;
    }

    /**
     * Return the JSON response.
     */
    public function toResponse(): JsonResponse
    {
        return response()->json([
            'message' => $this->message,
            'data' => $this->data,
        ], $this->status);
    }
}
