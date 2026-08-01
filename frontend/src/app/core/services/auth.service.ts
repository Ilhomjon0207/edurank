import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILoginRequest, ILoginResponse} from "@/app/core/interfaces";
import {environment} from "@/environments/environment";
import {Observable, tap} from "rxjs";

@Injectable({
    providedIn: 'root',
})
export class AuthService {

    private http = inject(HttpClient);


    login(data: ILoginRequest): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`${environment.apiUrl}/auth/login`, data).pipe(
            tap(res => {
                console.log(res)
                localStorage.setItem('accessToken', res.access_token);
                localStorage.setItem('user', JSON.stringify(res.user));
                localStorage.setItem('expiredAt', String(res.expiresAt));
                localStorage.setItem('refreshToken', String(res.refresh_token));
            })
        )
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }

    getAccessToken() {
        return localStorage.getItem('accessToken');
    }
   getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    isLoggedIn() {
        return !!this.getAccessToken();
    }
    isAccessTokenExpired(): boolean {
        const expiresAt = Number(localStorage.getItem('expiredAt'));

        if (!expiresAt) {
            return true;
        }

        return Date.now() >= expiresAt;
    }
    refreshToken(): Observable<ILoginResponse> {
        const refreshToken = localStorage.getItem('refresh_token');

        return this.http.post<ILoginResponse>(
            `${environment.apiUrl}/auth/refresh`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            },
        );
    }

    saveTokens(res: ILoginResponse) {
        console.log(res)
        localStorage.setItem('accessToken', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('refresh_token',res.refresh_token)
    }
}
