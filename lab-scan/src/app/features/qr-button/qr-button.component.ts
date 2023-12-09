import { Component, OnInit, ViewChild } from "@angular/core";
import { BarcodeFormat } from "@zxing/library";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { BehaviorSubject, catchError, tap } from "rxjs";
import { StudentService } from "src/app/services/student.service";

@Component({
    selector: 'feature-qr-button',
    templateUrl: './qr-button.component.html',
    styleUrls: ['./qr-button.component.scss']
})
export class QrButtonComponent implements OnInit {

    hasDevices: boolean = false
    torchEnabled = false
    tryHarder = false
    hasPermission = false
    currentDevice?: MediaDeviceInfo
    qrResultString: string | null = null
    torchAvailable$ = new BehaviorSubject<boolean>(false);

    console: any[] = []

    @ViewChild(ZXingScannerComponent) private scanner: ZXingScannerComponent | null = null

    error: any

    constructor(private readonly studentService: StudentService) { }

    ngOnInit(): void {
        this.console.push('Iniciando')
    }

    handleClick() {
        this.scanner?.askForPermission().then(value => {
            this.console.push(`[Response]: ${value}`)
        }).catch(reason => this.console.push(reason))
    }

    onCamerasFound(devices: MediaDeviceInfo[]): void {
        this.console.push(`[Cameras found]: ${devices}`)
        //this.availableDevices = devices;
        this.hasDevices = Boolean(devices && devices.length);
    }

    onCamerasNotFound($event: any) {
        this.console.push(`Error: ${$event}`)
        this.error = $event
    }

    onCodeResult(resultString: string) {
        this.qrResultString = resultString;
        this.callApi()
    }

    onHasPermission(has: boolean) {
        this.console.push(`[Permiso]: ${has}`)
        this.hasPermission = has;
    }

    onTorchCompatible(isCompatible: boolean): void {
        this.torchAvailable$.next(isCompatible || false);
    }

    clearResult() {
        this.qrResultString = null
    }

    get _console() { return this.console }

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
        this.studentService.findStudent(this.qrResultString!).pipe(
            tap(response => this.console.push(`[Estudiante]: ${JSON.stringify(response)}`)),
            catchError(err => {
                this.console.push(`[Error]: ${JSON.stringify(err)}`)
                return err
            })
        ).subscribe()
    }

}