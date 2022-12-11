import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './Pages/home/home-page/home-page.component';
import { MoreDetailsPageComponent } from './Pages/more-details/more-details-page/more-details-page.component';
 
const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'more-detials',
    component: MoreDetailsPageComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
