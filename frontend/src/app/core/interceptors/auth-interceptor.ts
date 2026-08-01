import {switchMap} from "rxjs";
import {HttpInterceptorFn} from "@angular/common/http";
import {AuthService} from "@/app/core/services/auth.service";
import {inject} from "@angular/core";

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    const auth = inject(AuthService);


    if (
        req.url.includes('/auth/login') ||
        req.url.includes('/auth/refresh')
    ) {
        return next(req);
    }
    const accessToken = auth.getAccessToken();
    const refreshToken = auth.getRefreshToken();
    if (!accessToken && !refreshToken) {
        return next(req);
    }

    if (accessToken && !auth.isAccessTokenExpired()) {
        return next(
            req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
        );
    }
    if (refreshToken) {
        return auth.refreshToken().pipe(
            switchMap((res) => {
                auth.saveTokens(res);

                return next(
                    req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${res.access_token}`,
                        },
                    })
                );
            })
        );
    }

    return next(req);
};
