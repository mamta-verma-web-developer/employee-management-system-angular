import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Something went wrong';

      if(error.status === 0){

        errorMessage = 'Network Error';

      } else if(error.status === 404){

        errorMessage = 'API Not Found';

      } else if(error.status === 500){

        errorMessage = 'Internal Server Error';
      }

      alert(errorMessage);

      return throwError(() => error);
    })
  );
};