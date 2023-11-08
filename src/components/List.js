import React from "react";
import "../styles/list.css";

function List({ storage, setStorage }) {
  const statusObj = {
    todo: "done",
    done: "todo",
  };

  const _token = `Bearer ${process.env.REACT_APP_AccessToken}`;

  const switchStatus = async (id) => {
    const toDoTask = storage.find((task, index) => task.id === id);
    // toDoTask.fields.status = statusObj[toDoTask.fields.status];
    fetch(process.env.REACT_APP_UPDATE_ENDPOINT, {
      method: "PATCH",
      headers: {
        Authorization: _token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        records: [
          {
            id: toDoTask.id,
            fields: {
              status: statusObj[toDoTask.fields.status],
            },
          },
        ],
      }),
    })
      .then(console.log)
      .catch(console.error);

    // if (storage.length === 0) {
    //   return;
    // }
    // let searchIndex;
    // const toDoTask = storage.find((task, index) => {
    //   searchIndex = index;
    //   return task.id === id;
    // });
    // const newStatus = statusObj[toDoTask.fields.status];
    // toDoTask.fields.status = newStatus;
    // console.log("Setting new status: " + newStatus);
    // storage[searchIndex].fields.status = newStatus;
    // console.log(storage);
    // setStorage({ ...storage });
  };

  if (storage?.length === 0 || storage === undefined) {
    return (
      <div className="todo-list">
        <h1>To-Do List</h1>
      </div>
    );
  }

  return (
    <div className="todo-list">
      <h1>To-Do List</h1>
      <ul>
        {storage.map((task, index) => (
          <li className="task" key={index}>
            <p className="task-header">Task: {task.fields.text}</p>
            <p>
              <strong>Date:</strong> {task.fields.due_date}
            </p>
            <p>
              <strong>Status:</strong>
              {task.fields.status}
            </p>
            <div>
              <button
                onClick={() => {
                  switchStatus(task.id);
                }}
              >
                Toggle {statusObj[task.fields.status]}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
