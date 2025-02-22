package task_service.backend.task_service_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import task_service.backend.task_service_backend.dto.TaskDTO;
import task_service.backend.task_service_backend.service.TaskServiceInterface;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskServiceInterface taskService;

    @Autowired
    public TaskController(TaskServiceInterface taskService) {
        this.taskService = taskService;
    }

    @GetMapping
    public ResponseEntity<List<TaskDTO>> getAllTasks() {
        return ResponseEntity.ok(taskService.getAllTasks());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> getTaskById(@PathVariable Long id) {
        return ResponseEntity.ok(taskService.getTaskById(id));
    }

    @PostMapping
    public ResponseEntity<TaskDTO> createTask(@RequestBody TaskDTO taskDTO) {
        return ResponseEntity.status(HttpStatus.CREATED).body(taskService.createTask(taskDTO));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.ok("Task deleted successfully");
    }

    @GetMapping("/recent")
    public ResponseEntity<List<TaskDTO>> getLastFiveTasks() {
        return ResponseEntity.ok(taskService.getLastFiveTasks());
    }
}


