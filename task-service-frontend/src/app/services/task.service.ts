import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }

  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  addTask(task: Task) {
    const updatedTasks = [...this.tasks.value, task];
    this.tasks.next(updatedTasks);
  }

  markTaskAsDone(index: number) {
    const updatedTasks = this.tasks.value.map((task, i) =>
      i === index ? { ...task, completed: true } : task
    );
    this.tasks.next(updatedTasks);
  }
}
