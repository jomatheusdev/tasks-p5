import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";
import "./style.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchTasks() {
      const response = await api.get("/api/tasks");
      setTasks(response.data);
    }
    fetchTasks();
  }, []);

  return (
    <div className="task-list-container">
      <h1>Lista de Tarefas</h1>
      <button type="button" onClick={() => navigate("/")}>
        Voltar para Cadastro
      </button>
      {tasks.map((task) => (
        <div className="task-card" key={task._id}>
          <p><strong>Título:</strong> {task.title}</p>
          <p><strong>Situação:</strong> {task.finished ? "Finalizada" : "Pendente"}</p>
          <p><strong>Data de Criação:</strong> {new Date(task.createdAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
