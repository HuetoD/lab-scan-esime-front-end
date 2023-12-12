import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { QrScannerComponent } from "./qr-scanner/qr-scanner.component";

import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";
import { QrButtonComponent } from "./qr-button/qr-button.component";
import { MatDialogModule } from "@angular/material/dialog";

const declarations_exports = [
    QrScannerComponent,
    QrButtonComponent
]

@NgModule({
    declarations: [
        ...declarations_exports
    ],
    exports: [
        ...declarations_exports
    ],
    imports: [
        CommonModule,
        HttpClientModule,
        MatButtonModule,
        MatDialogModule,
        ZXingScannerModule,
        MatIconModule
    ]
})
export class FeatureModule {

}