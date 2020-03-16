import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ICars } from '../interface/ICars';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private restangular: Restangular) { }

  getCarsWithHttp(): Observable<ICars[]> {
    // https://api.myjson.com/bins/ly7d1
    // https://api.myjson.com/bins/15psn9
    return this.http.get<ICars[]>('http://localhost:3000/cars').pipe(tap((data: any) => {
      return data;
    }),
    // "catchError" instead of "catch"
    catchError(error => {
      console.log(error.message);
      return throwError(this.handleError(error.message || 'Server Error!', []));
    }));
  }

  getCarsWithRest() {
    return this.restangular.all('cars/').doGET().pipe(map((data: any) => {
      return data;
    }),
    // "catchError" instead of "catch"
    catchError(error => {
      console.log(error.message);
      return throwError(this.handleError(error.message || 'Server Error!', []));
    }));
  }

  //#region HttpClient Error Handling

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //#endregion HttpClient Error Handling

}
