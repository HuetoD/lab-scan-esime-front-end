import { Component, EventEmitter, Inject, Input, OnInit, ViewChild } from "@angular/core";
import { StudentRequest } from "../../types";
import { BarcodeFormat } from "@zxing/library";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { BehaviorSubject, Subject, catchError, tap } from "rxjs";
import { GuestService } from "src/app/services/guest.service";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'feature-qr-scanner',
    templateUrl: './qr-scanner.component.html',
    styleUrls: ['./qr-scanner.component.scss'],
})
export class QrScannerComponent implements OnInit {

    hasDevices: boolean = false
    torchEnabled = false
    tryHarder = false
    hasPermission = false
    currentDevice?: MediaDeviceInfo
    qrResultString: string | null = null
    torchAvailable$ = new BehaviorSubject<boolean>(false);

    @ViewChild(ZXingScannerComponent) private scanner: ZXingScannerComponent | null = null

    error: any

    constructor(
        private readonly guestService: GuestService,
        @Inject(MAT_DIALOG_DATA) private readonly emitter$: EventEmitter<StudentRequest>
    ) { }

    ngOnInit(): void {
    }

    // handleClick() {
    //     this.scanner?.askForPermission().then(value => {
    //         this.console.push(`[Response]: ${value}`)
    //     }).catch(reason => this.console.push(reason))
    // }

    onCamerasFound(devices: MediaDeviceInfo[]): void {
        this.hasDevices = Boolean(devices && devices.length);
    }

    onCamerasNotFound($event: any) {
        this.error = $event
    }

    onCodeResult(resultString: string) {
        this.qrResultString = resultString;
        this.callApi()
    }

    onHasPermission(has: boolean) {
        this.hasPermission = has;
    }

    onTorchCompatible(isCompatible: boolean): void {
        this.torchAvailable$.next(isCompatible || false);
    }

    clearResult() {
        this.qrResultString = null
    }

    get formatsEnabled(): BarcodeFormat[] {
        return [
            BarcodeFormat.CODE_128,
            BarcodeFormat.DATA_MATRIX,
            BarcodeFormat.EAN_13,
            BarcodeFormat.QR_CODE,
        ];
    }

    parseQrCode() {
        if (this.qrResultString)
            this.qrResultString = this.qrResultString.substring(this.qrResultString.indexOf('h=') + 2, this.qrResultString.length)
    }

    callApi() {
        this.parseQrCode()
        this.guestService.findStudentByQrCode(this.qrResultString!).pipe(
            tap(response => this.emitter$.emit(response))
        ).subscribe()
    }

}