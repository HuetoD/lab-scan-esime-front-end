import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-new-reg',
  templateUrl: './new-reg.component.html',
  styleUrls: ['./new-reg.component.scss']
})
export class NewRegComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  dataSource : MatTableDataSource<any>


  get columns(){
    return ['computer', 'id', 'name','observations','attendance']
  }

}
