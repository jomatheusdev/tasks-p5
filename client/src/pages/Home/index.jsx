import { useState, useEffect, useRef } from "react";
import reactLogo from "../../assets/react.svg";
import viteLogo from "/vite.svg";
import "./style.css";
import Trash from "../../assets/trash.svg";
import api from "../../services/api"

function Home() {
  const [tasks, setTasks] = useState([]);
  const [editTitle, setEditTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [taskDetails, setTaskDetails] = useState(null);
  const [editPopupTask, setEditPopupTask] = useState(null);
  const [editStatus, setEditStatus] = useState(false);
  const inputTitle = useRef();

  async function getTasks() {
    const responseTasks = await api.get("/api/tasks");
    console.log(tasks);
    setTasks(responseTasks.data);
  }

  async function createTask() {
    console.log(inputTitle);
    await api.post("/api/tasks", {
      title: inputTitle.current.value,
    });
    getTasks();
  }

  async function deleteTask(id) {
    await api.delete(`/api/tasks/${id}`);
    setShowPopup(false);
    setTaskToDelete(null);
    getTasks();
  }

  function confirmDeleteTask(id) {
    setTaskToDelete(id);
    setShowPopup(true);
  }

  async function editTask(id) {
    if (!editTitle) return;
    await api.put(`/api/tasks/${id}`, { title: editTitle });
    setEditingTaskId(null);
    setEditTitle("");
    getTasks();
  }

  async function toggleTaskStatus(id, currentStatus) {
    await api.put(`/api/tasks/${id}`, { finished: !currentStatus });
    getTasks();
  }

  function showTaskDetails(task) {
    setTaskDetails(task);
  }

  function closeTaskDetails() {
    setTaskDetails(null);
  }

  function openEditPopup(task) {
    setEditTitle(task.title);
    setEditStatus(task.finished);
    setEditPopupTask(task);
  }

  function closeEditPopup() {
    setEditPopupTask(null);
    setEditTitle("");
    setEditStatus(false);
  }

  async function saveTaskChanges() {
    if (!editPopupTask) return;
    await api.put(`/api/tasks/${editPopupTask._id}`, {
      title: editTitle,
      finished: editStatus,
    });
    closeEditPopup();
    getTasks();
  }

  return (
    <div className="container">
      <form>
        <h1>Cadastro de atividades</h1>
        <input placeholder="Título" name="Título" ref={inputTitle} />
        <button type="button" onClick={createTask}>Cadastrar</button>
      </form>

      {tasks.map((task) => (
        <div className="card" key={task._id}>
          <div>
            <p> Título: {task.title}</p>
            <p> Situação: {task.finished ? "Finalizada" : "Pendente"}</p>
            <div className="btn-container">
              <button type="button" onClick={() => openEditPopup(task)}>
                Editar
              </button>
              <button type="button" onClick={() => showTaskDetails(task)}>
                Detalhes
              </button>
            </div>
          </div>
          <button onClick={() => confirmDeleteTask(task._id)}>
            <img src={Trash} />
          </button>
        </div>
      ))}

      <>
        {editPopupTask && (
          <div className="popup">
            <div className="popup-content">
              <h2>Editar Tarefa</h2>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Novo título"
              />
              <div className="btn-container">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="pendente"
                    checked={!editStatus}
                    onChange={() => setEditStatus(false)}
                  />
                  Pendente
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="finalizada"
                    checked={editStatus}
                    onChange={() => setEditStatus(true)}
                  />
                  Finalizada
                </label>
              </div>
              <div className="btn-container">
                <button onClick={saveTaskChanges}>Salvar</button>
                <button onClick={closeEditPopup}>Cancelar</button>
              </div>
            </div>
          </div>
        )}

        {taskDetails && (
          <div className="popup">
            <div className="popup-content">
              <h2>Detalhes da Tarefa</h2>
              <p><strong>Título:</strong> {taskDetails.title}</p>
              <p><strong>Situação:</strong> {taskDetails.finished ? "Finalizada" : "Pendente"}</p>
              <button onClick={closeTaskDetails}>Fechar</button>
            </div>
          </div>
        )}

        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <p>Tem certeza que deseja excluir esta tarefa?</p>
              <button onClick={() => deleteTask(taskToDelete)}>Sim</button>
              <button onClick={() => setShowPopup(false)}>Não</button>
            </div>
          </div>
        )}
      </>
    </div>
  );
}

export default Home;