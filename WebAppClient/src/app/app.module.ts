import { NgModule, LOCALE_ID } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http'

import { ChartModule } from 'primeng/chart';
import { TimelineModule } from 'primeng/timeline';
import { TableModule } from 'primeng/table';
import { TreeTableModule } from 'primeng/treetable';

import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';

import { ToastModule } from 'primeng/toast';
import { PanelModule } from 'primeng/panel';
import { CheckboxModule } from 'primeng/checkbox';
import { CalendarModule } from 'primeng/calendar';
import { AccordionModule } from 'primeng/accordion';
import { DialogModule } from 'primeng/dialog';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { MultiSelectModule } from 'primeng/multiselect';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { NgxSpinnerModule } from "ngx-spinner";
import { PasswordModule } from 'primeng/password';
import { MatTabsModule } from '@angular/material/tabs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/');
}

import localEs from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { UseradminComponent } from './views/useradmin/useradmin.component';
import { MylearningComponent } from './views/mylearning/mylearning.component';
import { StudentsComponent } from './views/students/students.component';
import { BooksComponent } from './views/books/books.component';
import { catalogDetService } from './shared/catalogDet.service';
import { BooksListComponent } from './views/books/books-list/books-list.component';
import { UnitsListComponent } from './views/books/units-list/units-list.component';
import { TasksListComponent } from './views/books/tasks-list/tasks-list.component';
registerLocaleData(localEs,'es')

@NgModule({ declarations: [
        AppComponent
        , LoginComponent
        , UseradminComponent
        , MylearningComponent
        , StudentsComponent
        , BooksComponent
        , BooksListComponent
        , UnitsListComponent
        , TasksListComponent
    ],
    bootstrap: [AppComponent, BooksComponent
        , BooksListComponent
        , UnitsListComponent
        , TasksListComponent]
    , imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        AppLayoutModule,
        ChartModule,
        TimelineModule,
        TableModule,
        TreeTableModule,
        ButtonModule,
        TagModule,
        DropdownModule,
        InputTextModule,
        KeyFilterModule,
        ToastModule,
        PanelModule,
        CheckboxModule,
        CalendarModule,
        AccordionModule,
        DialogModule,
        AutoCompleteModule,
        FileUploadModule,
        InputSwitchModule,
        ConfirmPopupModule,
        MultiSelectModule,
        MessageModule,
        MessagesModule,
        NgxSpinnerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatTabsModule,
        NgbModule,
    ], providers: [
        { provide: LOCALE_ID, useValue: 'es' },
        {
            provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
        },
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        catalogDetService,
        provideHttpClient(withInterceptorsFromDi())
    ] })
export class AppModule { }
