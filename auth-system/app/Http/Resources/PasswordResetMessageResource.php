<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class PasswordResetMessageResource extends JsonResource
{
    public function toArray($request): array
    {
        return [
            'success' => $this->success,
            'message' => $this->message,
        ];
    }
}
