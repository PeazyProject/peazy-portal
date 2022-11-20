import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './features/login/login.component';
import { RegisterComponent } from './features/register/register.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  // { path: 'supplier',
  //   loadChildren: () =>
  //   import('src/app/features/supplier/supplier.module')
  //     .then(module => module.SupplierModule)
  // },
  { path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'supplier',
        loadChildren: () =>
        import('src/app/features/supplier/supplier.module')
          .then(module => module.SupplierModule)
      }
    ]
  },
  // { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
