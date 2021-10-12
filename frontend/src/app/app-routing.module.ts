import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksDetailsComponent } from './components/books-details/books-details.component';
import { BooksComponent } from './components/books/books.component';

const routes: Routes = [
  { path: 'books', component: BooksComponent },
  { path: 'books/:id', component: BooksDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
