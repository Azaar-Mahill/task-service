package task_service.backend.task_service_backend.dto;

public class TaskDTO {
    private Long taskId;
    private String taskTitle;
    private String taskDescription;
    private String createOn;

    public TaskDTO() {
    }

    public TaskDTO(Long taskId, String taskTitle, String taskDescription, String createOn) {
        this.taskId = taskId;
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.createOn = createOn;
    }

    public Long getTaskId() {
        return taskId;
    }

    public void setTaskId(Long taskId) {
        this.taskId = taskId;
    }

    public String getTaskTitle() {
        return taskTitle;
    }

    public void setTaskTitle(String taskTitle) {
        this.taskTitle = taskTitle;
    }

    public String getTaskDescription() {
        return taskDescription;
    }

    public void setTaskDescription(String taskDescription) {
        this.taskDescription = taskDescription;
    }

    public String getCreateOn() {
        return createOn;
    }

    public void setCreateOn(String createOn) {
        this.createOn = createOn;
    }
}


