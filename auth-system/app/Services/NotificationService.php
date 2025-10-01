<?php

namespace App\Services;

use App\Mail\ContactMessageReceived;
use Illuminate\Support\Facades\Mail;
use App\Traits\RetryableAction;

class NotificationService
{
    use RetryableAction;

    public function sendContactMessageEmail($contactMessage): void
    {
        // dd('here');
        $this->retry(function () use ($contactMessage) {
            // dd($contactMessage);
            Mail::to(config('mail.admin_email'))
                ->send(new ContactMessageReceived($contactMessage));
        });
    }
}
