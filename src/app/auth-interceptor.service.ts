import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('***Waiting for the Response***');  // NOTE: This will before every request is send from our application

        console.log(req.url);
        //modifying the request
        const modifiedRequest = req.clone({
            headers: req.headers.append('AuthHeader', 'xyz')
        });

        return next.handle(modifiedRequest);
    }

}