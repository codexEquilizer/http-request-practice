import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class AuthInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('***Waiting for the Response***');  // NOTE: This will before every request is send from our application

        console.log(req.url);
        //modifying the request
        const modifiedRequest = req.clone({
            headers: req.headers.append('AuthHeader', 'xyz')    // Now this will be the custom header for all the type of http request.
        });

        // here we are returning the request as a response and now we are just tapping and check the data sent by the request as a response
        return next.handle(modifiedRequest).pipe(
            tap(event => {
                console.log(event);
                if (event.type === HttpEventType.Response)
                    console.log(event.body);
            })
        )
    }

}
/* Interceptor can intercept the request and response and modify it */