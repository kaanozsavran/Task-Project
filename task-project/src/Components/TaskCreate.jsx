import { useState } from "react";

function TaskCreate({ onCreate }) {
  const [title, setTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  const handleChange = (event) => {
    setTitle(event.target.value);
  };
  const handleTaskChange = (event) => {
    setTaskDesc(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(title, taskDesc);
    setTaskDesc("");
    setTitle("");
  };
  return (
    <div className="task-create">
      <h3>Lütfen Task Ekleyiniz!</h3>
      <form className="task-form">
        <label className="task-label">Başlık</label>
        <input value={title} className="task-input" onChange={handleChange} />
        <label className="task-label">Task Giriniz!</label>
        <textarea
          value={taskDesc}
          className="task-input"
          rows={5}
          onChange={handleTaskChange}
        ></textarea>
        <button className="task-button" onClick={handleSubmit}>
          Oluştur
        </button>
      </form>
    </div>
  );
}

export default TaskCreate;
