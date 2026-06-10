import { useState, useEffect } from "react";
import Header from "./components/Header";
import ToDoList from "./components/ToDoList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    const newTask = {
      id: Date.now(),
      text: input,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setInput("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const editTask = (id, updatedText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: updatedText } : task
      )
    );
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto animate-fadeIn">
        {/* Header */}
        <Header />

        {/* Input Section */}
        <div className="mt-8 mb-8 animate-slideInUp">
          <div className="glass rounded-2xl p-6 md:p-8 shadow-premium hover:shadow-premiumHover">
            <label className="block text-sm font-semibold text-purple-200 mb-3">
              Add a new task
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="What do you want to accomplish today?"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-purple-500/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300"
              />

              <button
                onClick={addTask}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 whitespace-nowrap"
              >
                ✓ Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Tasks Section */}
        <div className="animate-slideInUp">
          <div className="glass rounded-2xl p-6 md:p-8 shadow-premium">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl md:text-2xl font-bold text-white">
                📋 My Tasks
              </h2>
              <span className="px-3 py-1 bg-purple-500/30 rounded-full text-sm font-semibold text-purple-200">
                {tasks.length}
              </span>
            </div>

            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg mb-2">No tasks yet</p>
                <p className="text-gray-500 text-sm">
                  Add your first task to get started! 🚀
                </p>
              </div>
            ) : (
              <ToDoList
                tasks={tasks}
                deleteTask={deleteTask}
                toggleComplete={toggleComplete}
                editTask={editTask}
              />
            )}
          </div>
        </div>

        {/* Stats Footer */}
        {tasks.length > 0 && (
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="glass rounded-lg p-4 text-center">
              <p className="text-purple-300 text-sm font-semibold">Total</p>
              <p className="text-white text-2xl font-bold mt-1">{tasks.length}</p>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <p className="text-purple-300 text-sm font-semibold">Completed</p>
              <p className="text-green-400 text-2xl font-bold mt-1">
                {tasks.filter((t) => t.completed).length}
              </p>
            </div>
            <div className="glass rounded-lg p-4 text-center">
              <p className="text-purple-300 text-sm font-semibold">Remaining</p>
              <p className="text-orange-400 text-2xl font-bold mt-1">
                {tasks.filter((t) => !t.completed).length}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;