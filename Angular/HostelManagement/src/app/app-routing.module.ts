import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexMainComponent } from './index-main/index-main.component';
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';

const routes: Routes = [
  { path: "IndexMain", component: IndexMainComponent},
  { path: "NavigationBar", component: NavigationBarComponent},
  { path: '', redirectTo: "/IndexMain", pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
