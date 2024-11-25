import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'attempt', pathMatch: 'full' },

  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'attempt',
    loadChildren: () => import('./pages/attempt/attempt.module').then( m => m.AttemptPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule),
  },
  {
    path: 'professor',
    loadChildren: () => import('./pages/professor/professor.module').then( m => m.ProfessorPageModule)
  },
  {
    path: 'student',
    loadChildren: () => import('./pages/student/student.module').then( m => m.StudentPageModule)
  },
  {
    path: 'discipline',
    loadChildren: () => import('./pages/disciplines/discipline.module').then( m => m.DisciplinePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
