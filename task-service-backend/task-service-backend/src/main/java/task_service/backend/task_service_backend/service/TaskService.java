package task_service.backend.task_service_backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import task_service.backend.task_service_backend.dto.TaskDTO;
import task_service.backend.task_service_backend.entity.Task;
import task_service.backend.task_service_backend.repository.TaskRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskService implements TaskServiceInterface {

    private final TaskRepository taskRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    private TaskDTO convertToDTO(Task task) {
        TaskDTO dto = new TaskDTO();
        dto.setTaskId(task.getTaskId());
        dto.setTaskTitle(task.getTaskTitle());
        dto.setTaskDescription(task.getTaskDescription());
        dto.setCreateOn(task.getCreateOn());
        return dto;
    }

    private Task convertToEntity(TaskDTO dto) {
        Task task = new Task();
        task.setTaskId(dto.getTaskId());
        task.setTaskTitle(dto.getTaskTitle());
        task.setTaskDescription(dto.getTaskDescription());
        task.setCreateOn(dto.getCreateOn() != null ? dto.getCreateOn() : LocalDateTime.now().toString());
        return task;
    }

    @Override
    public List<TaskDTO> getAllTasks() {
        return taskRepository.findAll()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public TaskDTO getTaskById(Long id) {
        return taskRepository.findById(id)
                .map(this::convertToDTO)
                .orElseThrow(() -> new RuntimeException("Task not found with ID: " + id));
    }

    @Override
    public TaskDTO createTask(TaskDTO taskDTO) {
        Task task = convertToEntity(taskDTO);
        Task savedTask = taskRepository.save(task);
        return convertToDTO(savedTask);
    }

    @Override
    public void deleteTask(Long id) {
        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found with ID: " + id);
        }
        taskRepository.deleteById(id);
    }

    @Override
    public List<TaskDTO> getLastFiveTasks() {
        return taskRepository.findLastFiveTasks()
                .stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }
}


