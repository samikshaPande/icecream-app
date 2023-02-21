import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent implements OnInit {

  categoryList: any[] = [];
  appData: any[] = [];
  constructor(private dataService: DataService, private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.initData();
    this.categoryList = this.dataService.categoryList;
  }

  initData() {
    this.getAllFlavours();
  }

  getAllFlavours() {
    this.httpService.getAllFlavours().subscribe((res: any) => {
      if (res) {
        console.log(res)
        this.appData = res;
      }
    }, err => {
      console.log(err);
    })
  }
}
