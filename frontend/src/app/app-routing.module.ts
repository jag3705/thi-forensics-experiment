import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeworkDashboardComponent} from "./components/homework-dashboard/homework-dashboard.component";
import {StudentsListComponent} from "./components/students-list/students-list.component";
import {TasksListComponent} from "./components/tasks-list/tasks-list.component";
import {LoginComponent} from "./components/login/login.component";
import {RegisterComponent} from "./components/register/register.component";
import {AuthGuardService} from "./services/auth-guard.service";
import {StudentComponent} from "./components/student/student.component";

const routes: Routes = [
  {path: '', redirectTo: '/uploads', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'me', component: StudentComponent, canActivate: [AuthGuardService]},
  {path: 'uploads', component: HomeworkDashboardComponent, canActivate: [AuthGuardService]},
  {path: 'tasks', component: TasksListComponent, canActivate: [AuthGuardService]},
  {path: 'students', component: StudentsListComponent, canActivate: [AuthGuardService]},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
