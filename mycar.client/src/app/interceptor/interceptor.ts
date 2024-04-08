import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

export class Interceptor implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const serverUrl: string = 'https://localhost:7252/';
    const newUrl = `${serverUrl}${req.url}`;
    const newReq = req.clone({
      url: newUrl,
    });

    return next.handle(newReq);
  }
}
