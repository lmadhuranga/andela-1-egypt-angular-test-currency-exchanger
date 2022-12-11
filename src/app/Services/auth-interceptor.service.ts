import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs'; 
import { environment } from 'src/environments/environment';
// import { NgxUiLoaderService } from "ngx-ui-loader"; 

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
  	token: any
	constructor( ) {

	}
	
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//  implement the interface HttpInterceptor
		this.token  = environment.FixerApiKey;
		//console.log(this.token);

		// Todo:: need to set in evnironment variable
		if (this.token) {
			request = request.clone({ headers: request.headers.set('apikey', this.token) });
		}
  
		// handle the API response
		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					// console.log('event--->>>', event);
				} 
				return event;
			}),
			// error response
			catchError((error: HttpErrorResponse) => {
				return throwError(() => new Error('Something went wrong'))
			})
		);
	}
}
