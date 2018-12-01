import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ICars } from '../interface/ICars';
import { Restangular } from 'ngx-restangular';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient, private restangular: Restangular) { }

  // getCars(): Observable<ICars[]>{
  //   // https://api.myjson.com/bins/ly7d1
  //   // https://api.myjson.com/bins/15psn9
  //   return this.http.get<ICars[]>('http://localhost:3000/cars').pipe(tap(data => {
  //     return data;
  //   }));
  // }

  getCarsWithRest() {
    return this.restangular.all('cars/').doGET().pipe(map(data => {
      return data;
    }));    
  }
}
