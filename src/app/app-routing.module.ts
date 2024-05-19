import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from "./guard/auth.guard";
import {UnsavedChangesGuard} from "@app/guard/unsaved-changes-guard";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'main',
    pathMatch: "full"
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((module) => module.AuthModule),
  },
  {
    path: 'main',
    loadChildren: () => import('./main/main.module').then((module) => module.MainModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, UnsavedChangesGuard]
})
export class AppRoutingModule {
}
