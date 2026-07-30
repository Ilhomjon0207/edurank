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
        return this.http.post<ILoginResponse>(`${environment.apiUrl}/login`, data).pipe(
            tap(res => {
                localStorage.setItem('accessToken', res.accessToken);
                localStorage.setItem('user', JSON.stringify(res.user));
            })
        )
    }

    logout() {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
    }

    get token() {
        return localStorage.getItem('accessToken');
    }

    isLoggedIn() {
        return !!this.token;
    }
}
