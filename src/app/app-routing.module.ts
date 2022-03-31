import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBranchComponent } from './Components/add-branch/add-branch.component';
import { BranchComponent } from './Components/branch/branch.component';
import { EditBranchComponent } from './Components/edit-branch/edit-branch.component';
import { LoginComponent } from './Components/login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'/Login',pathMatch:'full'},
  {path:'Login',component:LoginComponent},
  {path:'Branch',component:BranchComponent},
  {path:'EditBranch/:id',component:EditBranchComponent},
  {path:'AddBranch',component:AddBranchComponent},
  {path: '**', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
