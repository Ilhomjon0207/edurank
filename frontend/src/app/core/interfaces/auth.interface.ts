export interface ILoginRequest {
    email: string;
    password: string;
}


export interface ILoginResponse {
    accessToken: string;
    refreshToken: string;
    user: {
        id: number;
        email: string;
        role: string;
    };
    expiresAt: number;
}
