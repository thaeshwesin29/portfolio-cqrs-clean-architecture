<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Application\Buses\QueryBus;
use App\Http\Requests\LoginRequest;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Application\Buses\CommandBus;
use App\Http\Requests\RegisterRequest;
use Laravel\Sanctum\PersonalAccessToken;
use App\Http\Requests\UpdateProfileRequest;
use App\Application\Commands\LoginUserCommand;
use App\Application\Commands\LogoutUserCommand;
use App\Application\Queries\GetUserProfileQuery;
use App\Application\Commands\RegisterUserCommand;
use App\Application\Commands\UpdateProfileCommand;
use Illuminate\Support\Facades\Log;


class AuthController extends Controller
{
    protected CommandBus $commandBus;
    protected QueryBus $queryBus;

    public function __construct(CommandBus $commandBus, QueryBus $queryBus)
    {
        $this->commandBus = $commandBus;
        $this->queryBus = $queryBus;
    }

    // -------------------------
    // Register a new user
    // -------------------------
    public function register(RegisterRequest $request): JsonResponse
    {
        $result = $this->commandBus->dispatch(new RegisterUserCommand($request->validated()));
        $user = $result['user']->load(['township', 'ward']);

        // Create refresh token
        $refreshToken = $user->createToken('refresh', ['refresh'])->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'data' => [
                'user' => new UserResource($user),
                'access_token' => $result['token'],
                'token_type' => 'Bearer',
            ],
        ])->cookie(
            'refresh_token',
            $refreshToken,
            60 * 24 * 7, // 7 days
            '/',
            null,
            config('app.env') === 'production', // Secure only in prod
            true, // HttpOnly
            false, // Not raw
            'Strict' // SameSite
        );
    }

    // -------------------------
    // Login
    // -------------------------
    public function login(LoginRequest $request): JsonResponse
    {
        $data = $request->validated();
        $result = $this->commandBus->dispatch(new LoginUserCommand($data['email'], $data['password']));
        $user = $result['user']->load(['township', 'ward']);

        // Create refresh token
        $refreshToken = $user->createToken('refresh', ['refresh'])->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => new UserResource($user),
                'access_token' => $result['token'],
                'token_type' => 'Bearer',
            ],
        ])->cookie(
            'refresh_token',
            $refreshToken,
            60 * 24 * 7,
            '/',
            null,
            config('app.env') === 'production',
            true,
            false,
            'Strict'
        );
    }

    // -------------------------
    // Refresh access token
    // -------------------------
    public function refreshToken(Request $request): JsonResponse
    {
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json([
                'success' => false,
                'message' => 'No refresh token provided',
            ], 401);
        }

        $token = PersonalAccessToken::findToken($refreshToken);

        if (!$token || !$token->tokenable) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid refresh token',
            ], 401);
        }

        $user = $token->tokenable;

        // Create new access token
        $newAccessToken = $user->createToken('access')->plainTextToken;

        return response()->json([
            'success' => true,
            'message' => 'Access token refreshed successfully',
            'data' => [
                'access_token' => $newAccessToken,
                'token_type' => 'Bearer',
                'user' => new UserResource($user->load(['township', 'ward'])),
            ],
        ]);
    }

    // -------------------------
    // User profile
    // -------------------------
    public function profile(Request $request): JsonResponse
    {
        $user = $this->queryBus->dispatch(new GetUserProfileQuery($request->user()));

        return response()->json([
            'success' => true,
            'message' => 'User profile retrieved successfully',
            'data' => [
                'user' => new UserResource($user->load(['township', 'ward'])),
            ],
        ]);
    }

    // -------------------------
    // Update profile
    // -------------------------
    // public function updateProfile(UpdateProfileRequest $request): JsonResponse
    // {
    //     $user = $this->commandBus->dispatch(
    //         new UpdateProfileCommand($request->user(), $request->validated())
    //     );

    //     return response()->json([
    //         'success' => true,
    //         'message' => 'Profile updated successfully!',
    //         'data' => new UserResource($user->load(['township', 'ward'])),
    //     ]);
    // }

//     public function updateProfile(UpdateProfileRequest $request): JsonResponse
// {
//     try {
//         $user = $this->commandBus->dispatch(
//             new UpdateProfileCommand($request->user(), $request->validated())
//         );

//         return response()->json([
//             'success' => true,
//             'message' => 'Profile updated successfully!',
//             'data' => new UserResource($user->load(['township', 'ward'])),
//         ]);
//     } catch (\Exception $e) {
//         Log::error('UpdateProfile error: '.$e->getMessage());
//         return response()->json([
//             'success' => false,
//             'message' => 'Profile update failed',
//             'error' => $e->getMessage(),
//         ], 500);
//     }
// }

public function updateProfile(UpdateProfileRequest $request): JsonResponse
{
    try {
        $user = $this->commandBus->dispatch(
            new UpdateProfileCommand($request->user(), $request->validated())
        );

        return response()->json([
            'success' => true,
            'message' => 'Profile updated successfully!',
            'data' => new UserResource($user->load(['township', 'ward'])),
        ]);
    } catch (\Exception $e) {
        Log::error('UpdateProfile error: '.$e->getMessage()); // ✅ now Intelephense is happy
        return response()->json([
            'success' => false,
            'message' => 'Profile update failed',
            'error' => $e->getMessage(),
        ], 500);
    }
}



    // -------------------------
    // Logout
    // -------------------------
    public function logout(Request $request): JsonResponse
    {
        $user = $request->user();

        $this->commandBus->dispatch(new LogoutUserCommand($user));

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ])->withoutCookie('refresh_token'); // Clear cookie
    }
}
