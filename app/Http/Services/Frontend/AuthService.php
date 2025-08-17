<?php
namespace App\Http\Services\Frontend;
use App\Models\User;
use App\Traits\Request;
use App\Traits\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    use Request,Response;

    public function login (array $payload)
    {
        dd($payload);
    }


    /**
     * @param array $payload
     * @return array
     */
    public function register (array $payload): array
    {
        try {
            $user = User::where('phone', $payload['phone'])->first();
            if ($user) {
                return $this->response()->error('User already exists.');
            }

            User::create([
                'name' => $payload['name'],
                'phone' => $payload['phone'],
                'password' => Hash::make($payload['password']),
                'user_type' => 'investor',
            ]);

            return $this->response()->success('User created successfully.');
        }
        catch (\Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }
}
