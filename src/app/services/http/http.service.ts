import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  static getToken() {
    return localStorage.getItem('token');
  }
  headers:any;

  constructor(private http:HttpClient ) {
    //   this.headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Authorization': `Bearer ${localStorage.getItem('token')}`
    // });
  }

  // get(url:string, queryParams?:any){
  //   return this.http.get(environment.baseUrl + url + '?' +queryParams);
  // }

  get(url:string, queryParams?:any){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(environment.baseUrl + url, {headers});
  }

  secureGet(url:string, token:any){
    let headers =this.setHeaders(token);
    // console.log(headers);
    return this.http.get(environment.baseUrl + url, {headers});
  }

  post(url:string, data?:any){
    return this.http.post(environment.baseUrl + url, data);
  }

  securePost(url:string, token:any, data?:any){
    let headers =this.setHeaders(token);
    // console.log("before",headers, "after");
    return this.http.post(environment.baseUrl + url, data , {headers} );
  }

  patch(url:string, data:any, token:any){
    let headers =this.setHeaders(token);
    return this.http.patch(environment.baseUrl + url, data, {headers})
  }

  del(url:string, token:any){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    // console.log(environment.baseUrl + url);
    // console.log(headers);
    return this.http.delete(environment.baseUrl + url, {headers} );
  }

  // register(data:any){
  //   return this.http.post(this.registerUrl, data).pipe(catchError(this.handleError));
  //   // return this.http.get('registerurl')
  // }

  // login(data:any){
  //   return this.http.post(this.loginUrl, data).pipe(catchError(this.handleError));
  //   // return this.http.get('registerurl')
  // }
  setHeaders(token){
    // console.log(token);
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
    // const requestOptions = {headers:headers};
    // console.log('');

  }

  // getToken(){
  //   return localStorage.getItem('token');
  // }

  // verified(token){
  //   let finalUrl=this.verifiedUrl + token;
  //   let data="";
  //   return this.http.post(finalUrl, data).pipe(catchError(this.handleError));
  // }

  // getProfileData(token){
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  //   // const requestOptions = {headers:headers};
  //   return this.http.get(this.profileUrl, {headers});
  // }




  handleError(error : HttpErrorResponse){
    let errorText:any;
    if(error.status === 0){
      console.error('an error',error.error);
    }
    else{
      // console.log(error.error.message);
      // console.log(error.error)
      errorText= error.error.message;
    }
    // console.log(errorText);
    return throwError(()=> new Error(errorText));
  }

  loggedIn(){
    return !!(localStorage.getItem('token'));
  }

}
