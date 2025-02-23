import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';

import { API_ENDPOINTS } from '../config/api-endpoints'; 

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks = new BehaviorSubject<Task[]>([]);
  tasks$ = this.tasks.asObservable();

  constructor(private http: HttpClient) {
    this.fetchRecentTasks();
  }

  // Fetch recent tasks from the backend
  fetchRecentTasks() {
    this.http.get<Task[]>(API_ENDPOINTS.GET_RECENT_TASKS).subscribe(
      (tasks) => this.tasks.next(tasks),
      (error) => console.error('Error fetching tasks:', error)
    );
  }

  // Add a new task (optional: can be extended to send to backend)
  addTask(task: Task) {
    const updatedTasks = [...this.tasks.value, task];
    this.tasks.next(updatedTasks);
  }

  // Mark a task as done (Delete task from backend)
  markTaskAsDone(task: Task) {
    const deleteUrl = API_ENDPOINTS.DELETE_TASK+`${task.taskId}`;

    this.http.delete(deleteUrl, { responseType: 'text' }).subscribe(
      (response) => {
        const updatedTasks = this.tasks.value.filter(t => t.taskId !== task.taskId);
        this.tasks.next(updatedTasks);
      },
      (error) => console.error('Error deleting task:', error)
    );
  }

}
