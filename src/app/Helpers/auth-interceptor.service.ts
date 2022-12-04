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
	constructor(
		// private uiLoader: NgxUiLoaderService,
	) {

	}
		intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		//  implement the interface HttpInterceptor
		this.token  = environment.FixerApiKey;
		//console.log(this.token);

		if (this.token) {
			request = request.clone({ headers: request.headers.set('apikey', this.token) });
		}

		if (!request.headers.has('Content-Type')) {
			request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
		}
		request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
		// handle the API response
		return next.handle(request)
		.pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					// console.log('event--->>>', event);
				}
				setTimeout(() => {
					// this.uiLoader.stop(); // stop foreground spinner of the master loader with 'default' taskId
				}, 1000);
				return event;
			}),
			// error response
			catchError((error: HttpErrorResponse) => {
				let data = {};
				data = {
					reason: error && error.error && error.error.reason ? error.error.reason : '',
					status: error.status
				};
				// console.log('error', JSON.stringify(data))
				return throwError(error);
			})
		);
	}
}
