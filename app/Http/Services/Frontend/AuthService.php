<?php
namespace App\Http\Services\Frontend;
use App\Models\Package;
use App\Models\User;
use App\Traits\Request;
use App\Traits\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthService
{
    use Request,Response;

    /**
     * @param array $query
     * @return array
     */
    public function loginPage(array $query): array
    {
        try {
            return $this->response([
                'packageId' => $query['package_id'] ?? null,
            ])->success();
        }
        catch (\Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }

    /**
     * @param array $payload
     * @return array
     */
    public function login (array $payload): array
    {
        try {
            if(Auth::check()){
                Auth::logout();
            }

            if(Auth::attempt(['phone' => $payload['phone'], 'password' => $payload['password']])) {
                session()->regenerate();

                if(array_key_exists('package_id', $payload) && !empty($payload['package_id'])) {
                    return $this->response(['packageId' => $payload['package_id']])->success('Login Successfully');
                }

                return $this->response()->success('Login Successfully');
            }

            return $this->response()->error('Credentials not matched');
        }
        catch (\Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }


    /**
     * @param array $query
     * @return array
     */
    public function registerPage(array $query): array
    {
        try {
            return $this->response([
                'packageId' => $query['package_id'] ?? null,
            ])->success();
        }
        catch (\Exception $e) {
            return $this->response()->error($e->getMessage());
        }
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

            if(array_key_exists('package_id', $payload) && !empty($payload['package_id'])) {
                return $this->response(['packageId' => $payload['package_id']])->success('Registration successfully.');
            }

            return $this->response()->success('Registration successfully.');
        }
        catch (\Exception $e) {
            return $this->response()->error($e->getMessage());
        }
    }
}
