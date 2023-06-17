import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app/app.component';
import { AvatarUploadDialogComponent } from './components/avatar-upload-dialog/avatar-upload-dialog.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import { HomeworkDashboardComponent } from './components/homework-dashboard/homework-dashboard.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {FlexLayoutModule} from "@angular/flex-layout";
import {MatSidenavModule} from "@angular/material/sidenav";
import { StudentsListComponent } from './components/students-list/students-list.component';
import { TasksListComponent } from './components/tasks-list/tasks-list.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import {MatInputModule} from "@angular/material/input";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatTabsModule} from "@angular/material/tabs";
import { HomeworkUploadDialogComponent } from './components/homework-upload-dialog/homework-upload-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import { StudentComponent } from './components/student/student.component';
import { UpdateMetaDialogComponent } from './components/update-meta-dialog/update-meta-dialog.component';
import { MarkupHtmlPipe } from './pipes/markup-html.pipe';
import { StudentCardComponent } from './components/student-card/student-card.component';

@NgModule({
  declarations: [
    AppComponent,
    AvatarUploadDialogComponent,
    NavBarComponent,
    HomeworkDashboardComponent,
    StudentsListComponent,
    TasksListComponent,
    LoginComponent,
    RegisterComponent,
    HomeworkUploadDialogComponent,
    StudentComponent,
    UpdateMetaDialogComponent,
    MarkupHtmlPipe,
    StudentCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatTooltipModule,
    MatToolbarModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    FlexLayoutModule,
    MatSidenavModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
