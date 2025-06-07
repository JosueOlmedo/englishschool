import { FileAttached } from "./fileAttached"

export interface Task {
    description: string
    percentCompleted: number
    assignedPersonId: number
    assignedPersonName: string
    groupTaskId: number
    taskName: string
    startDate: Date
    endDate: Date
    price: number
    taskId: number
    agreements: string
    taskTypeId: number
    viewInTimeline: boolean
    taskTypeName: string
    iconClass: string
    file: FileAttached
    isUp: boolean
    isTheLast: boolean
    edt: string
  }