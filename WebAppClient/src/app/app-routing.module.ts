import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './views/login/login.component';
import { MylearningComponent } from './views/mylearning/mylearning.component';
import { AuthGuard } from './helpers/auth.guard';
import { StudentsComponent } from './views/students/students.component';
import { UseradminComponent } from './views/useradmin/useradmin.component';
import { BooksComponent } from './views/books/books.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                canActivate: [AuthGuard],
                children: [
                    { path: '', component: MylearningComponent },
                    { path: 'mylearning', component: MylearningComponent},
                    { path: 'students', component: StudentsComponent },
                    { path: 'users', component: UseradminComponent },
                    { path: 'books', component: BooksComponent }
                ]   
            },
            {
                path: 'login', component: LoginComponent,
            }
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
