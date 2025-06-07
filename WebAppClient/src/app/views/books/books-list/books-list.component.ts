import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent {
  @Input() books: Book[] = [];
  @Output() goToUnits = new EventEmitter<number>();
  @Output() editBook = new EventEmitter<number>();
  @Output() addBook = new EventEmitter<void>();

  searchTerm: string = '';
  filteredBooks: Book[] = [];

  ngOnChanges() {
    this.filterBooks();
  }

  filterBooks() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredBooks = [...this.books];
    } else {
      this.filteredBooks = this.books.filter(book =>
        book.name.toLowerCase().includes(term) ||
        book.description.toLowerCase().includes(term)
      );
    }
  }
}
