import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { QrScannerComponent } from '../qr-scanner/qr-scanner.component';
import { StudentRequest } from '../../types/student.types';
import { Subject } from 'rxjs';

@Component({
    selector: 'feature-qr-button',
    templateUrl: './qr-button.component.html',
    styleUrls: ['./qr-button.component.scss']
})
export class QrButtonComponent implements OnInit, AfterViewInit {

    @Input()
    multi: boolean = false

    @Output()
    onResult: EventEmitter<StudentRequest> = new EventEmitter<StudentRequest>()

    private dialogRef?: MatDialogRef<QrScannerComponent, any>

    constructor(private dialog: MatDialog) { }

    ngOnInit() {

    }

    ngAfterViewInit(): void {
        if (!this.multi)
            this.onResult.subscribe(_ => {
                this.dialogRef?.close()
            })
    }

    handleClick() {
        this.dialogRef = this.dialog.open(QrScannerComponent, { width: '100vw', height: '100vh', data: this.onResult })
    }

}
