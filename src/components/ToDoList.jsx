import ToDoItem from "./ToDoItem";

function ToDoList({
  tasks,
  deleteTask,
  toggleComplete,
  editTask,
}) {
  return (
    <div className="space-y-3">
      {tasks.map((task, index) => (
        <div
          key={task.id}
          style={{ animationDelay: `${index * 50}ms` }}
          className="animate-slideInUp"
        >
          <ToDoItem
            task={task}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            editTask={editTask}
          />
        </div>
      ))}
    </div>
  );
}

export default ToDoList;