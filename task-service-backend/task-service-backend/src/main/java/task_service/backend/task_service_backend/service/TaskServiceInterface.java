package task_service.backend.task_service_backend.service;

import task_service.backend.task_service_backend.dto.TaskDTO;

import java.util.List;

public interface TaskServiceInterface {
    List<TaskDTO> getAllTasks();
    TaskDTO getTaskById(Long id);
    TaskDTO createTask(TaskDTO taskDTO);
    void deleteTask(Long id);
    List<TaskDTO> getLastFiveTasks();
}
