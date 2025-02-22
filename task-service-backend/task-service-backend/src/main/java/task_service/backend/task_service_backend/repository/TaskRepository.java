package task_service.backend.task_service_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import task_service.backend.task_service_backend.entity.Task;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    @Query(value = "SELECT * FROM tasks ORDER BY STR_TO_DATE(create_on, '%Y-%m-%d %H:%i:%s') DESC LIMIT 5", nativeQuery = true)
    List<Task> findLastFiveTasks();
}

