import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('***Waiting for the Response***');  // NOTE: This will before every request is send from our application

        //modifying the request
        const modifiedRequest = req.clone({
            headers: req.headers.append('AuthHeader', 'xyz')    // Now this will be the custom header for all the type of http request.
        });

        return next.handle(modifiedRequest);
    }

}
/* Interceptor can intercept the request and response and modify it */