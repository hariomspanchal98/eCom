import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { HttpService } from '../http/http.service';



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private injector:Injector) { }

  intercept(req:any, next:any) {
    let http = this.injector.get(HttpService)
    // let tokenizedReq = req.clone({
    //   setHeaders: {
    //     Authorization : `Bearer ${HttpService.getToken()}`
    //   },
    // });

    return next.handle(req);

  }
}
