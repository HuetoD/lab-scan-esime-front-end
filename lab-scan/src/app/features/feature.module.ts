import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { QrButtonComponent } from "./qr-button/qr-button.component";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { CommonModule } from "@angular/common";
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from "@angular/common/http";

const declarations_exports = [
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
        ZXingScannerModule,
        MatIconModule
    ]
})
export class FeatureModule {

}