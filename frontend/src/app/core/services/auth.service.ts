import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ILoginRequest, ILoginResponse } from '@/app/core/interfaces';

import { environment } from '@/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);

    login(data: ILoginRequest): Observable<ILoginResponse> {
        return this.http.post<ILoginResponse>(`${environment.apiUrl}/auth/login`, data).pipe(
            tap((res) => {
                this.saveTokens(res);
            })
        );
    }

    logout(): Observable<void> {
        return this.http.post<void>(`${environment.apiUrl}/auth/logout`, {}).pipe(
            tap(() => {
                this.clearTokens();
            })
        );
    }

    getAccessToken(): string | null {
        return localStorage.getItem('accessToken');
    }

    getRefreshToken(): string | null {
        return localStorage.getItem('refreshToken');
    }

    isLoggedIn(): boolean {
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
        const refreshToken = this.getRefreshToken();

        if (!refreshToken) {
            throw new Error('Refresh token not found');
        }

        return this.http.post<ILoginResponse>(`${environment.apiUrl}/auth/refresh`, {
            refreshToken
        });
    }

    saveTokens(res: ILoginResponse): void {
        localStorage.setItem('accessToken', res.accessToken);
        if (res.refreshToken){
            localStorage.setItem('refreshToken', res.refreshToken);
        }
        localStorage.setItem('expiredAt', String(res.expiresAt));

        localStorage.setItem('user', JSON.stringify(res.user));
    }

    clearTokens(): void {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('expiredAt');
    }
}
