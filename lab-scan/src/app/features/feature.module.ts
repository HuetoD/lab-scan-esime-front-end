import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { QrButtonComponent } from "./qr-button/qr-button.component";
import { ZXingScannerModule } from "@zxing/ngx-scanner";
import { CommonModule } from "@angular/common";

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
        MatButtonModule,
        ZXingScannerModule
    ]
})
export class FeatureModule {

}