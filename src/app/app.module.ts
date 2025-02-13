import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MatIconModule} from "@angular/material/icon";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {GoogleMapsModule} from "@angular/google-maps";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFireStorageModule} from "@angular/fire/compat/storage";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";
import {AngularFireModule} from "@angular/fire/compat";
import {SharedPipesModule} from "./shared/modules/shared-pipes.module";
import {HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {LocationStrategy, NgOptimizedImage, PathLocationStrategy} from "@angular/common";
import {OAuthModule} from "angular-oauth2-oidc";
import {SkipXsrfInterceptor} from "./Config/SkipXsrfInterceptor";
import {SharedComponentModule} from "./shared/modules/shared-component.module";
import {FooterModule} from "./components/shared/footer/footer.module";
import {HeaderModule} from "./components/shared/header/header.module";
import {AngularFirePerformanceModule} from "@angular/fire/compat/performance";
import {NgxStripeModule} from "ngx-stripe";
import {DemoModeInterceptor} from "./Config/DemoModeInterceptor";

@NgModule({ declarations: [
        AppComponent
    ],
    bootstrap: [AppComponent], imports: [BrowserModule.withServerTransition({ appId: 'serverApp' }),
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        GoogleMapsModule,
        MatMenuModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatSidenavModule,
        MatExpansionModule,
        MatTooltipModule,
        MatProgressSpinnerModule,
        FormsModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireAuthModule,
        AngularFirePerformanceModule,
        SharedPipesModule,
        ToastrModule.forRoot({
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            maxOpened: 3,
            timeOut: 5000,
        }),
        OAuthModule.forRoot(),
        SharedComponentModule,
        NgOptimizedImage,
        FooterModule,
        HeaderModule,
        NgxStripeModule.forRoot(environment.stripe_key)], providers: [
        { provide: HTTP_INTERCEPTORS, useClass: SkipXsrfInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: DemoModeInterceptor, multi: true },
        { provide: LocationStrategy, useClass: PathLocationStrategy },
        provideHttpClient(withInterceptorsFromDi(),withFetch())
    ] })
export class AppModule {
}
