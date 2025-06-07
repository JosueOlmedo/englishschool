import { Task } from "./taskMingo"

export interface GroupTask {
  description: string
  percentCompleted: number
  assignedPersonId: number
  assignedPersonName: string
  groupTaskId: number
  startDate: Date
  endDate: Date
  groupTaskName: string
  price: number
  projectId: number
  viewInTimeLine: boolean
  iconClass: string,
  edt: string,
  detail: Task[]
}