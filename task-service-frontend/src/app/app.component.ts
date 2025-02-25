import { Component } from '@angular/core';
import { TaskService } from './services/task.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task-service-frontend';
  loading$: Observable<boolean>;

  constructor(private taskService: TaskService) {
    this.loading$ = this.taskService.loading$; // Subscribe to loader state
  }
}
