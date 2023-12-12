import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';

@Component({
  selector: 'feature-qr-button',
  templateUrl: './qr-button.component.html',
  styleUrls: ['./qr-button.component.scss']
})
export class QrButtonComponent implements OnInit {

  constructor(private dialog : MatDialog) { }

  ngOnInit() {
  }

  handleClick(){
    this.dialog.open(QrScannerComponent, {width: '100vw', height: '100vh'}).afterClosed(

    ).subscribe()
  }

}
