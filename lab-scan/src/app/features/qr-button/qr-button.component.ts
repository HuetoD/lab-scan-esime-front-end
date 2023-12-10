import { Component, OnInit, ViewChild } from "@angular/core";
import { BarcodeFormat } from "@zxing/library";
import { ZXingScannerComponent } from "@zxing/ngx-scanner";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: 'feature-qr-button',
    templateUrl: './qr-button.component.html',
    styleUrls: ['./qr-button.component.scss'],
})
export class QrButtonComponent implements OnInit {

    hasDevices: boolean = false
    torchEnabled = false
    tryHarder = false
    hasPermission = false
    currentDevice?: MediaDeviceInfo
    qrResultString: string | null = null
    torchAvailable$ = new BehaviorSubject<boolean>(false);

    @ViewChild(ZXingScannerComponent) private scanner: ZXingScannerComponent | null = null

    error: any

    constructor() {}

    ngOnInit(): void {
        
    }

    handleClick() {
        alert('HOLA')
        this.scanner?.askForPermission().then(value => {
            alert('RESPONSE: ' + value)
        }).catch(reason => console.error(reason))
    }
    
    onCamerasFound(devices: MediaDeviceInfo[]): void {
        console.log(devices)
        //this.availableDevices = devices;
        this.hasDevices = Boolean(devices && devices.length);
    }

    onCamerasNotFound($event: any) {
        alert('ERROR: ' + $event)
        this.error = $event
    }

    onCodeResult(resultString: string) {
        this.qrResultString = resultString;
    }

    onHasPermission(has: boolean) {
        this.hasPermission = has;
    }

    onTorchCompatible(isCompatible: boolean): void {
        this.torchAvailable$.next(isCompatible || false);
    }

    get formatsEnabled() : BarcodeFormat[] {
        return [
            BarcodeFormat.CODE_128,
            BarcodeFormat.DATA_MATRIX,
            BarcodeFormat.EAN_13,
            BarcodeFormat.QR_CODE,
          ];
    } 

}