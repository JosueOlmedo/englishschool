import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { Task } from 'src/app/model/task';
import { Unit } from 'src/app/model/unit';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.scss']
})
export class TasksListComponent implements OnChanges {
  @Input() unit!: Unit | null;
  @Input() tasks: Task[] = [];
  @Output() addTask = new EventEmitter<void>();
  @Output() editTask = new EventEmitter<number>();
  @Output() viewQuiz = new EventEmitter<Task>();
  @Output() back = new EventEmitter<void>();

  filteredTasks: Task[] = [...this.tasks];
  searchTerm = '';
  minRows = 6;
  get dummyRows() {
    return Array(this.minRows - this.filteredTasks.length > 0 ? this.minRows - this.filteredTasks.length : 0);
  }

  selectedQuizTask: Task | null = null;
  selectedUnitTasks: Task[] = [];
  newTask: Task = {
    taskId: 0,
    unitId: 0,
    name: '',
    description: '',
    active: true,
    createdDate: new Date(),
    quizContentJson: '',
    isQuiz: false
  };
  showTasksModal = false;
  showAddTaskModal = false;
  isQuiz = false;
  showQuizBuilderModal = false;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['unit'] || changes['tasks']) {
      this.filterTasks();
    }
  }

  filterTasks() {
    const term = this.searchTerm.trim().toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.unitId === this.unit?.unitId &&
      (task.name.toLowerCase().includes(term) ||
      task.description.toLowerCase().includes(term))
    );
  }

  onViewQuiz(task: Task) {
    if (task.isQuiz) {
      this.selectedQuizTask = task;
    }
  }

  getQuizHtml(task: Task): string {
    try {
      const json = JSON.parse(task.quizContentJson || '{}');
      return json.html || '';
    } catch {
      return '<div class="text-danger">Error al cargar el contenido del quiz.</div>';
    }
  }

  onViewTasks(unitId: number) {
    // Filtra las tareas de la unidad seleccionada
    this.selectedUnitTasks = this.tasks.filter(task => task.unitId === unitId);
    this.showTasksModal = true;
  }

  closeTasksModal() {
    this.showTasksModal = false;
  }

  openAddTaskModal() {
    this.isQuiz = false;
    this.showAddTaskModal = true;
  }

  closeAddTaskModal() {
    this.showAddTaskModal = false;
  }

  closeQuizBuilderModal() {
    this.showQuizBuilderModal = false;
  }

  onSaveTask() {
    if (this.isQuiz) {
      // Abrir el modal del builder de quiz
      this.showQuizBuilderModal = true;
      // Opcional: puedes cerrar el modal de agregar tarea si lo deseas
      // this.showAddTaskModal = false;
    } else {
      // Lógica para guardar tarea normal (puedes emitir un evento o agregar a un array)
      // Ejemplo: this.tasks.push({...this.newTask, isQuiz: false, unitId: this.unit?.unitId || 0});
      this.closeAddTaskModal();
    }
  }
}
