import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ShoppingComponent } from "./shopping/shopping.component";
import { SellerComponent } from "./seller/seller.component";
const appRoute: Routes = [
    {path:'',redirectTo:'shop',pathMatch:'full'},
    {path:'shop',component:ShoppingComponent,loadChildren:()=>import("./shopping/shopping.module").then(module=>module.ShoppingModule)},
    {path:'',component:SellerComponent,loadChildren:()=>import("./seller/seller.module").then(module=>module.SellerModule)},
    {path:'**',redirectTo:'shop',pathMatch:"full"},
];
@NgModule({
    imports: [
        RouterModule.forRoot(appRoute)
    ],
    exports: [
        RouterModule,
    ]
})
export class AppRoutingModule { }