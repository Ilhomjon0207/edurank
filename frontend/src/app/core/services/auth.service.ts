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
                localStorage.setItem('accessToken', res.access_token);
                localStorage.setItem('user', JSON.stringify(res.user));
                localStorage.setItem('expiredAt', String(res.expiresAt));
                localStorage.setItem('refreshToken', String(res.refresh_token));
            })
        )
    }

    logout(): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}/auth/logout`,
            {}
        ).pipe(
            tap(() => {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('user');
                localStorage.removeItem('expiredAt');
            })
        );

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
        const refreshToken = localStorage.getItem('refreshToken');

        return this.http.post<ILoginResponse>(
            `${environment.apiUrl}/auth/refresh`,
            {
                refreshToken: refreshToken,
            },

        );
    }

    saveTokens(res: ILoginResponse) {
        localStorage.setItem('accessToken', res.access_token);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('refresh_token',res.refresh_token)
    }
}
