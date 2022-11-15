import { HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs";

export class LogginInterceptorService implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('Outgoing request');
        console.log(req.url);

        // here we are returning the request as a response and now we are just tapping and check the data sent by the request as a response
        return next.handle(req).pipe(
            tap(event => {
                if (event.type === HttpEventType.Response) {
                    console.log('Incoming response');
                    console.log(event.body);
                }
            })
        );
    }
}