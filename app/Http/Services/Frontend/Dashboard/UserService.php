<?php
namespace App\Http\Services\Frontend\Dashboard;

use App\Models\User;
use App\Traits\FileSaver;
use App\Traits\Request;
use App\Traits\Response;
use Bitsmind\GraphSql\Facades\QueryAssist;
use Bitsmind\GraphSql\QueryAssist as QueryAssistTrait;
use Illuminate\Support\Facades\Auth;

class UserService
{
    use Request,Response, QueryAssistTrait, FileSaver;

    /**
     * @param array $query
     * @return array
     */
    public function getProfileData (array $query): array
    {
        try {
            $validationErrorMsg = $this->queryParams($query)->required([]);
            if ($validationErrorMsg) {
                return $this->response()->error($validationErrorMsg);
            }

            $user = Auth::user();

            return $this->response([
                'user' => $user,
            ])->success();
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }


    public function updateProfileData (array $payload): array
    {
        try {
            $user = Auth::user();
            if(!$user){
                return $this->response()->error('user not found');
            }

            $user->update([
                'name' => $payload['name'],
                'phone' => $payload['phone'],
                'withdraw_info' => json_encode(['account_number' => $payload['account_number'], 'method' => $payload['method']]),
            ]);

            if(array_key_exists('password', $payload) && !empty($payload['password'])){
                $user->update([
                    'password' => bcrypt($payload['password'])
                ]);
            }

            return $this->response([])->success('Profile updated successfully');
        }
        catch (\Exception $exception) {
            return $this->response()->error($exception->getMessage());
        }
    }

}
