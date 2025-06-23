import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/model/book';
import { Unit } from 'src/app/model/unit';
import { Task } from 'src/app/model/task';
import { MatSnackBar } from '@angular/material/snack-bar'; // Si usas Angular Material

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  tabs = [
    { label: 'Libros' },
    { label: 'Unidades' },
    { label: 'Tareas/Quiz' }
  ];

  books: Book[] = []; // Libros
  units: Unit[] = []; // Unidades
  tasks: Task[] = []; // Tareas

  selectedBook: Book | null = null;
  selectedUnit: Unit | null = null;
  selectedUnitId: number | null = null;
  selectedTabIndex = 0;
  isTransitioning = false;

  // Nueva propiedad para el término de búsqueda
  filteredBooks: Book[] = []; // Libros filtrados
  filteredUnits: Unit[] = []; // Unidades filtradas
  filteredTasks: Task[] = []; // Tareas filtradas
  searchTerm = ''; // Nuevo: guarda el filtro de libros
  unitSearchTerm = ''; // Nuevo: guarda el filtro de unidades
  taskSearchTerm = ''; // Nuevo: guarda el filtro de tareas
  isVerticalTabs = true; // Nuevo: controla la orientación de las tabs

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.selectTab(0); // Iniciar en la pestaña de Libros
    this.initDummy(); // Inicializar datos de ejemplo
  }

  initDummy(){
    this.books = [
    { bookId: 1, name: 'Matemáticas Básicas', description: 'Libro de matemáticas para principiantes.', active: true, insertedDate: new Date(), bookImage: '' },
    { bookId: 2, name: 'Historia Universal', description: 'Libro sobre historia mundial.', active: true, insertedDate: new Date(), bookImage: '' },
    { bookId: 3, name: 'Ciencias Naturales', description: 'Libro de ciencias para secundaria.', active: true, insertedDate: new Date(), bookImage: '' }
  ];

  this.units = [
    // Unidades para libro 1
    {
      unitId: 1, bookId: 1, name: 'Números', description: 'Unidad sobre números.',
      active: false,
      insertedDate: new Date()
    },
    {
      unitId: 2, bookId: 1, name: 'Operaciones', description: 'Unidad sobre operaciones básicas.',
      active: false,
      insertedDate: new Date()
    },
    {
      unitId: 3, bookId: 1, name: 'Fracciones', description: 'Unidad sobre fracciones.',
      active: false,
      insertedDate: new Date()
    },
    // Unidades para libro 2
    {
      unitId: 4, bookId: 2, name: 'Antigüedad', description: 'Unidad sobre la antigüedad.',
      active: false,
      insertedDate: new Date()
    },
    {
      unitId: 5, bookId: 2, name: 'Edad Media', description: 'Unidad sobre la Edad Media.',
      active: false,
      insertedDate: new Date()
    },
    {
      unitId: 6, bookId: 2, name: 'Edad Moderna', description: 'Unidad sobre la Edad Moderna.',
      active: false,
      insertedDate: new Date()
    },
    // Unidades para libro 3
    {
      unitId: 7, bookId: 3, name: 'Biología', description: 'Unidad de biología.',
      active: false,
      insertedDate: new Date()
    },
    {
      unitId: 8, bookId: 3, name: 'Física', description: 'Unidad de física.',
      active: false,
      insertedDate: new Date()
    },
    {
      unitId: 9, bookId: 3, name: 'Química', description: 'Unidad de química.',
      active: false,
      insertedDate: new Date()
    }
  ];

  this.tasks = [
    // Tareas y quiz para cada unidad (ejemplo para unidad 1)
    { taskId: 1, unitId: 1, name: 'Sumas', description: 'Resuelve sumas.', isQuiz: false, createdDate: new Date(), active: true },
    { taskId: 2, unitId: 2, name: 'Restas', description: 'Resuelve restas.', isQuiz: false, createdDate: new Date(), active: true },
    { taskId: 3, unitId: 3, name: 'Multiplicaciones', description: 'Resuelve multiplicaciones.', isQuiz: false, createdDate: new Date(), active: true },
    { taskId: 4, unitId: 1, name: 'Quiz de Números', description: 'Quiz de la unidad.', isQuiz: true, quizContentJson: '{"html":"<h4>¿Cuánto es 2+2?</h4><ul><li>3</li><li>4</li></ul>"}', createdDate: new Date(), active: true },
    // Repite para cada unidad cambiando unitId y nombres
    { taskId: 5, unitId: 4, name: 'Suma y resta', description: 'Ejercicios combinados.', isQuiz: false, createdDate: new Date(), active: true },
    { taskId: 6, unitId: 5, name: 'Problemas', description: 'Resuelve problemas.', isQuiz: false, createdDate: new Date(), active: true },
    { taskId: 7, unitId: 6, name: 'Operaciones mixtas', description: 'Ejercicios mixtos.', isQuiz: false, createdDate: new Date(), active: true },
    { taskId: 8, unitId: 4, name: 'Quiz de Operaciones', description: 'Quiz de la unidad.', isQuiz: true, quizContentJson: '{"html":"<h4>¿Cuánto es 5-3?</h4><ul><li>1</li><li>2</li></ul>"}', createdDate: new Date(), active: true },
    // ...continúa igual para las demás unidades...
    // Ejemplo para unidad 4 (libro 2)
    { taskId: 13, unitId: 7, name: 'Civilizaciones', description: 'Investiga civilizaciones.', isQuiz: false, createdDate: new Date(), active: true },
    { taskId: 14, unitId: 8, name: 'Cronología', description: 'Ordena eventos.', isQuiz: false, createdDate: new Date(), active: true },
    { taskId: 15, unitId: 9, name: 'Mapas', description: 'Ubica en el mapa.', isQuiz: false, createdDate: new Date(), active: true },
    { taskId: 16, unitId: 9, name: 'Quiz de Antigüedad', description: 'Quiz de la unidad.', isQuiz: true, quizContentJson: '{"html":"<h4>¿En qué año empezó la Edad Antigua?</h4><ul><li>3000 a.C.</li><li>476 d.C.</li></ul>"}', createdDate: new Date(), active: true },
    // ...continúa para todas las unidades...
  ];
  }

  selectTab(index: number) {
    if (this.selectedTabIndex !== index) {
      this.isTransitioning = true;
      setTimeout(() => {
        this.selectedTabIndex = index;
        this.isTransitioning = false;
      }, 400); // Duración de la transición en ms
    }
  }

  // Cuando seleccionas un libro
  onGoToUnits(bookId: number) {
    this.selectedBook = this.books.find(b => b.bookId === bookId) || null;
    this.selectedUnit = null;
    this.selectedUnitId = null;
    this.selectTab(1);
  }

  // Cuando seleccionas una unidad
  onViewTasks(unitId: number) {
    this.selectedUnit = this.units.find(u => u.unitId === unitId) || null;
    this.selectedUnitId = unitId;
    this.pageFlipToTab(2);
  }

  pageFlipToTab(tabIndex: number) {
    this.isTransitioning = true;
    // Aquí puedes agregar una clase CSS para el efecto de "dar vuelta a la página"
    setTimeout(() => {
      this.selectedTabIndex = tabIndex;
      this.isTransitioning = false;
    }, 600); // Un poco más largo para el efecto
  }

  // Volver a libros
  onBackToBooks() {
    this.selectedBook = null;
    this.selectedUnit = null;
    this.selectedUnitId = null;
    this.pageFlipToTab(0);
  }

  // Volver a unidades
  onBackToUnits() {
    // No limpies selectedBook ni unitSearchTerm
    this.selectedUnit = null;
    this.selectedUnitId = null;
    this.pageFlipToTab(1);
  }

  onEditBook(bookId: number) {
    // Lógica para editar libro
    console.log('Editar libro', bookId);
  }

  onAddBook() {
    // Lógica para agregar libro
    console.log('Agregar libro');
  }

  onEditUnit(unitId: number) {
    // Lógica para editar unidad
    console.log('Editar unidad', unitId);
  }

  onAddUnit() {
    // Lógica para agregar unidad
    console.log('Agregar unidad');
  }

  onEditTask(unitId: number) {
    // Lógica para editar unidad
    console.log('Editar unidad', unitId);
  }

  onAddTask() {
    // Lógica para agregar unidad
    console.log('Agregar unidad');
  }

  get unitsOfSelectedBook(): Unit[] {
    return this.selectedBook
      ? this.units.filter(u => u.bookId === this.selectedBook?.bookId)
      : [];
  }

  get tasksOfSelectedUnit(): Task[] {
    return this.selectedUnitId
      ? this.tasks.filter(t => t.unitId === this.selectedUnitId)
      : [];
  }

  isTabDisabled(index: number): boolean {
    if (index === 1) {
      // Unidades solo si hay libro seleccionado
      return !this.selectedBook;
    }
    if (index === 2) {
      // Tareas solo si hay unidad seleccionada
      return !this.selectedUnit;
    }
    return false;
  }

  onTabClick(index: number) {
    if (this.isTabDisabled(index)) {
      if (index === 1) {
        this.showMessage('Selecciona un libro desde la tabla para ver sus unidades.');
      }
      if (index === 2) {
        this.showMessage('Selecciona una unidad desde la tabla para ver sus tareas/quiz.');
      }
      return;
    }
    this.selectTab(index);
  }

  showMessage(msg: string) {
    this.snackBar.open(msg, 'Cerrar', { duration: 3000 });
  }

  filterBooks() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredBooks = this.books.filter(book =>
      book.name.toLowerCase().includes(term) ||
      book.description.toLowerCase().includes(term)
    );
  }

  filterUnits() {
    const term = this.unitSearchTerm.trim().toLowerCase();
    this.filteredUnits = this.units.filter(unit =>
      unit.bookId === this.selectedBook?.bookId && (
        unit.name.toLowerCase().includes(term) ||
        unit.description.toLowerCase().includes(term)
      )
    );
  }

  filterTasks() {
    const term = this.taskSearchTerm?.trim().toLowerCase() || '';
    this.filteredTasks = this.tasks.filter(task =>
      task.unitId === this.selectedUnitId && (
        task.name.toLowerCase().includes(term) ||
        task.description.toLowerCase().includes(term)
      )
    );
  }
}
