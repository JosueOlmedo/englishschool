export interface Task {
  taskId: number;
  unitId: number;
  name: string;
  description: string;
  isQuiz: boolean;
  quizContentJson?: string; // JSON con contenido HTML para quiz
  createdDate: Date;
  active: boolean;
}