import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Unit } from 'src/app/model/unit';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-units-list',
  templateUrl: './units-list.component.html',
  styleUrls: ['./units-list.component.scss']
})
export class UnitsListComponent {
  @Input() units: Unit[] = [];
  @Input() book!: Book | null;
  @Output() back = new EventEmitter<void>();
  @Output() editUnit = new EventEmitter<number>();
  @Output() addUnit = new EventEmitter<void>();
  @Output() viewTasks = new EventEmitter<number>();

  searchTerm: string = '';
  filteredUnits: Unit[] = [];

  ngOnChanges() {
    this.filterUnits();
  }

  filterUnits() {
    const term = this.searchTerm.trim().toLowerCase();
    if (!term) {
      this.filteredUnits = [...this.units];
    } else {
      this.filteredUnits = this.units.filter(unit =>
        unit.name.toLowerCase().includes(term) ||
        unit.description.toLowerCase().includes(term)
      );
    }
  }
}
