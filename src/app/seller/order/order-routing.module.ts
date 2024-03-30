import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderListComponent } from './order-list/order-list.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { AuthGuardGuard } from '../guard/auth-guard.guard';

const routes: Routes = [
{path:'',canActivate:[AuthGuardGuard],children:[
    {path:'',component:OrderListComponent},
    {path:'order-list',component:OrderListComponent},
    {path:'order-details',component:OrderDetailsComponent},
    {path:'**',component:OrderListComponent},
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
