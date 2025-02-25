import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Task, Task2 } from '../models/task.model';
import { API_ENDPOINTS } from '../config/api-endpoints';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  private loading = new BehaviorSubject<boolean>(false); // Global loader
  loading$ = this.loading.asObservable(); // Observable to track loader state

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.fetchRecentTasks();
  }

  fetchRecentTasks() {
    this.loading.next(true);
    this.http.get<Task[]>(API_ENDPOINTS.GET_RECENT_TASKS).subscribe(
      (tasks) => {
        this.tasks.next(tasks);
        this.loading.next(false);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
        this.loading.next(false);
      }
    );
  }

  addTask(task: Task2) {
    const apiUrl = API_ENDPOINTS.ADD_TASK;
    this.loading.next(true);

    setTimeout(() => {
      this.http.post<Task>(apiUrl, task).subscribe(
        (newTask) => {
          this.fetchRecentTasks();
          this.showSuccessPopup('A task has been added successfully');
          this.loading.next(false);
        },
        (error) => {
          console.error('Error adding task:', error);
          this.loading.next(false);
        }
      );
    }, 500); // Add delay before the request
  }

  markTaskAsDone(task: Task) {
    const deleteUrl = API_ENDPOINTS.DELETE_TASK + `${task.taskId}`;
    this.loading.next(true);

    setTimeout(() => {
      this.http.delete(deleteUrl, { responseType: 'text' }).subscribe(
        (response) => {
          this.fetchRecentTasks();
          this.showSuccessPopup('A task has been completed successfully');
          this.loading.next(false);
        },
        (error) => {
          console.error('Error deleting task:', error);
          this.loading.next(false);
        }
      );
    }, 500);
  }

  showSuccessPopup(message: string) {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'end',
      verticalPosition: 'top'
    });
  }
}
