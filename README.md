# AgGrid with Angular 7

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Using Ngx-Restangular and HttpClient to fetch remote data

1.) Run `npm install ngx-restangular` to install the latest version of ngx-restangular

2.) Import the module into the module.ts

*`import { RestangularModule } from 'ngx-restangular'`*

3a.) Create the bas URL in a separate sampleRestApi.ts file in the root folder

<pre>
    /** This method sets the url to get fake data for testing.
     *  Ref: https://reqres.in/api/
     *  A hosted REST-API ready to respond to AJAX requests.
     *  It is used to test front-end against a real API.
     *  GET, POST, PUT & DELETE are supported.
     */
    export function fakeData(): any {
      return 'http://localhost:3000/';
    }
</pre>

3b.)  In module.ts, use RestangularProvider to configure the base URL for the REST-API service

<pre>
    import { fakeData } from './sampleRestApi';

    /**
     *
     * @param RestangularProvider is used to configure the base URL for the REST-API service
     */
    export function RestangularConfigFactory(RestangularProvider) {
      RestangularProvider.setBaseUrl(fakeData());
      RestangularProvider.setDefaultHeaders({'Authorization': 'Bearer V6vzEfEimH2PoiretEB7o0jBhp5ICk#d'});
    }
</pre>

4.) Add *`RestangularModule`* to the imports in module.ts

<pre>
    @NgModule({
        bootstrap: [ AppComponent ],
        declarations: [
            AppComponent,
        ],
        imports: [
            // import RestangularModule and use the exported RestangularConfigFactory
            RestangularModule.forRoot(RestangularConfigFactory),
        ]
    })
</pre>

5a.) In Service (e.g. data.service.ts), import *`Restangular, HttpClient, HttpErrorResponse, catchError, and map`*

<pre>
    import { HttpClient, HttpErrorResponse } from '@angular/common/http';
    import { Restangular } from 'ngx-restangular';
    import { catchError, map } from 'rxjs/operators';
</pre>


5b.) Create an instance of *`HttpClient`* and *`Restangular`* in the constructor

<pre>constructor(private http: HttpClient, private restangular: Restangular) {}</pre>

5c.) Create a method (e.g. getCarsWithRest()) and getCars() to fetch data from RESTful service or other Web API service

<pre>
    @Injectable({
      providedIn: 'root'
    })
    export class DataService {

      constructor(private http: HttpClient, private restangular: Restangular) {  }
    /**
     * GET method for Restangular API service call
     */
      getCarsWithRest() {
        return this.restangular.all('cars/').doGET().pipe(map(data => {
          return data;
        }),
        // "catchError" instead of "catch"
        catchError(error => {
          console.log(error.message);
          return throwError(error.message || 'Server Error!');
        }));
      }
    /**
     * GET method for HttpClient API service call
     */
      getCars() {
        return this.http.get('http://localhost:3000/cars').pipe(map(data => {
            return data;
          }),
          // "catchError" instead of "catch"
          catchError(error => {
            console.log(error.message);
            return throwError(error.message || 'Server Error!');
          })
        );
       }
    }
</pre>

6.) Finally, call the methods from the home.component.ts

<pre>
    import { Component, OnInit } from '@angular/core';
    import { DataService } from '../data.service';
    import { throwError } from 'rxjs';

    @Component({
      selector: 'app-home',
      templateUrl: './home.component.html',
      styleUrls: ['./home.component.scss']
    })
    export class HomeComponent implements OnInit {

      rowData: any = [];

      constructor(private dataService: DataService) { }

      ngOnInit() {
        // this.getCars();
        this.getCarsWithRest();
      }

      getCarsWithRest() {
        this.dataService.getCarsWithRest().subscribe(
            (data: any []) => {
              this.rowData = data;
              console.log(this.rowData);
            },
            err => console.log(err),
            () => console.log('fetched data successfully')
        )
      }

      getCars() {
        this.dataService.getCars().subscribe(
            (data: any) => {
              this.rowData = data;
              console.log(this.rowData);
            },
            err => console.log(err),
            () => console.log('fetched data successfully')
        )
      }
    }
</pre>
