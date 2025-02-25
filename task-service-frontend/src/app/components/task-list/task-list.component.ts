import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';

import { GlobalPopupComponent } from '../global-popup/global-popup.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-list',
  standalone: false,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  tasks: Task[] = [];

  constructor(private taskService: TaskService, private dialog: MatDialog) {}

  ngOnInit() {
    this.taskService.tasks$.subscribe(tasks => (this.tasks = tasks));
  }

  markAsDone(task: Task) {
    this.taskService.markTaskAsDone(task);
  }

  Update(task: Task) {
    const dialogRef =this.dialog.open(GlobalPopupComponent, {
      width: '400px',
      disableClose: true,
    });
    dialogRef.componentInstance.title = task.taskTitle;
    dialogRef.componentInstance.description = task.taskDescription;
    dialogRef.afterClosed().subscribe(() => {
      if(dialogRef.componentInstance.needUpdate){
        task.taskTitle = dialogRef.componentInstance.title;
      task.taskDescription = dialogRef.componentInstance.description;
      this.taskService.addTask(task, 'A task has been updated successfully');
      console.log('Popup closed');
      }
    });
  }

}
