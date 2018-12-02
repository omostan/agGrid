import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../../services/data.service';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridNg2;

title = 'AgGrid with Angular 7';
rowData: any;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    // this.getCarsWithHttp();
    this.getCarsWithRest();
  }

    columnDefs = [
        {headerName: 'Make', field: 'make', rowGroupIndex: 0 },
        // {headerName: 'Model', field: 'model' },
        {headerName: 'Price', field: 'price'}
    ];

    autoGroupColumnDef = {
      headerName: 'Model',
      field: 'model',
      cellRenderer: 'agGroupCellRenderer',
      cellRendererParams: {
        checkbox: true
      }
    };

    // rowData = [
    //     { make: 'Toyota', model: 'Celica', price: 35000 },
    //     { make: 'Ford', model: 'Mondeo', price: 32000 },
    //     { make: 'Porsche', model: 'Boxter', price: 72000 }
    // ];

    getCarsWithHttp() {
      this.dataService.getCarsWithHttp().subscribe(
        (data: any) => {
          this.rowData = data;
          console.log(this.rowData);
        },
        err => console.log(err),
        () => console.log('fetched data successfully')
      )
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

    getSelectedRows() {
      const selectedNodes = this.agGrid.api.getSelectedNodes();
      const selectedData = selectedNodes.map( node => node.data );
      const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
      !selectedDataStringPresentation ? null : alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }
}
