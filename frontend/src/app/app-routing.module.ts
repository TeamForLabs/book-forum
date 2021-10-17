import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookmarksComponent } from './components/bookmarks/bookmarks.component';
import { BooksDetailsComponent } from './components/books-details/books-details.component';
import { BooksComponent } from './components/books/books.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'books/:page', component: BooksComponent },
  { path: 'books-details/:id', component: BooksDetailsComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'bookmarks', component: BookmarksComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
