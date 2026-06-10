import { useState } from "react";

function ToDoItem({
  task,
  deleteTask,
  toggleComplete,
  editTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const saveEdit = () => {
    if (newText.trim()) {
      editTask(task.id, newText);
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      saveEdit();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setNewText(task.text);
    }
  };

  return (
    <div className="glass rounded-lg p-4 hover:bg-white/15 group transition-all duration-300">
      {isEditing ? (
        <div className="flex flex-col sm:flex-row gap-3 items-stretch">
          <input
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyPress={handleKeyPress}
            autoFocus
            className="flex-1 px-3 py-2 bg-slate-800/50 border border-purple-500/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <div className="flex gap-2 sm:justify-end">
            <button
              onClick={saveEdit}
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              ✓ Save
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setNewText(task.text);
              }}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95"
            >
              ✕ Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
            <button
              onClick={() => toggleComplete(task.id)}
              className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                task.completed
                  ? "bg-green-500 border-green-400 text-white"
                  : "border-purple-400 hover:border-purple-300 hover:bg-purple-500/10"
              }`}
            >
              {task.completed && "✓"}
            </button>

            <span
              className={`break-words text-sm sm:text-base transition-all duration-300 ${
                task.completed
                  ? "line-through text-gray-400 opacity-60"
                  : "text-gray-100"
              }`}
            >
              {task.text}
            </span>
          </div>

          <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 sm:opacity-100">
            <button
              onClick={() => setIsEditing(true)}
              className="px-3 py-2 bg-blue-500/20 hover:bg-blue-500/40 text-blue-300 font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-blue-500/30 hover:border-blue-500/50 text-xs sm:text-sm"
            >
              ✎ Edit
            </button>

            <button
              onClick={() => deleteTask(task.id)}
              className="px-3 py-2 bg-red-500/20 hover:bg-red-500/40 text-red-300 font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-red-500/30 hover:border-red-500/50 text-xs sm:text-sm"
            >
              🗑 Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ToDoItem;