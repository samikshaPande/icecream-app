import { Component, OnInit, ViewChild } from '@angular/core';
import { TableDataComponent } from '../table-data/table-data.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild(TableDataComponent) dataTable: TableDataComponent;
  constructor() {
  }

  ngOnInit(): void {    
  }

  reloadIcecreamData(){
    this.dataTable.getAllFlavours();
  }
}

