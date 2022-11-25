import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // { path: 'supplier',
  //   loadChildren: () =>
  //   import('src/app/features/supplier/supplier.module')
  //     .then(module => module.SupplierModule)
  // },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'supplier',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('src/app/features/supplier/supplier.module')
            .then(module => module.SupplierModule)
      }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
