<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class ResetPassword extends Mailable
{
    use Queueable, SerializesModels;

    public $resetCode;
    public $username;

    /**
     * Create a new message instance.
     *
     * @param string $resetCode
     * @param string $username
     */
    public function __construct($resetCode, $username)
    {
        $this->resetCode = $resetCode;
        $this->username = $username;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('emails.reset_code')
            ->with([
                'resetCode' => $this->resetCode,
                'username' => $this->username,
            ]);
    }
}
