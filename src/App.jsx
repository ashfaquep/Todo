import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Button from "react-bootstrap/Button";

import Container from "react-bootstrap/Container";
import { useState, useRef, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editid, setEditid] = useState(0);
  const addTodo = () => {
    if (todo !== "") {
      setTodos([...todos, { list: todo, id: Date.now(), status: false }]);
      console.log(todos);
      setTodo("");
    }
    if (editid) {
      const editTodo = todos.find((item) => item.id === editid);
      console.log(editTodo);
      const updateTodo = todos.map((to) =>
        editTodo.id === to.id
          ? (to = { id: to.id, list: todo })
          : (to = { id: to.id, list: to.list })
      );
      console.log(updateTodo);
      setTodos(updateTodo);
      setEditid(0);
      setTodo("");
    }
  };
  const inputRef = useRef("");
  useEffect(() => {
    inputRef.current.focus();
  });

  const onDelete = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };
  const onComplete = (id) => {
    let complete = todos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setTodos(complete);
    console.log(complete);
  };
  const onEdit = (id) => {
    const editTodo = todos.find((list) => list.id === id);
    setTodo(editTodo.list);

    setEditid(editTodo.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <div className="pagewrapper">
        <div className="Container">
          <div className="grand">
            Get your things done!..
            <br />
            Jul 5 2023
          </div>
          <form className="form-group" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              value={todo}
              ref={inputRef}
              placeholder="Enter your todo..."
              className="form-control"
              onChange={(event) => setTodo(event.target.value)}
            ></input>
            <button className="btn-1" onClick={addTodo}>
              {editid ? "EDIT" : "ADD"}
            </button>
          </form>
          <div className="list">
            <ul className="screen">
              {todos.map((item, index) => {
                return (
                  <li className="display" key={index}>
                    <div className="show" id={item.status ? "text" : ""}>
                      {item.list}
                    </div>
                    <span className="test">
                      <IoMdDoneAll
                        className="list-item-icons"
                        id="complete"
                        title="Complete"
                        onClick={() => onComplete(item.id)}
                      />
                      <FiEdit
                        className="list-item-icons"
                        id="edit"
                        title="Edit"
                        onClick={() => onEdit(item.id)}
                      />
                      <MdDelete
                        className="list-item-icons"
                        id="delete"
                        title="Delete"
                        onClick={() => onDelete(item.id)}
                      />
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
