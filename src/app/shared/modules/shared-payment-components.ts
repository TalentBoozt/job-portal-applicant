import {NgModule} from "@angular/core";
import { provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import {MatCardModule} from "@angular/material/card";
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@NgModule({ declarations: [],
    exports: [], imports: [MatCardModule,
        MatTabsModule,
        MatButtonModule,
        FormsModule,
        NgIf], providers: [provideHttpClient(withInterceptorsFromDi())] })
export class SharedPaymentComponentsModule {}
