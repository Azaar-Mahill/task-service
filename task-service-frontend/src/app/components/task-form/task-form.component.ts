import { Component } from '@angular/core';

import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: false,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  title = '';
  description = '';

  constructor(private taskService: TaskService) {}

  addTask() {
    if (this.title && this.description) {
      this.taskService.addTask({ taskTitle: this.title, taskDescription: this.description});
      this.title = '';
      this.description = '';
    }
  }

}
