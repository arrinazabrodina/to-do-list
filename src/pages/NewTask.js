import { useState } from "react";
import "../styles/taskForm.css";
const _token = `Bearer ${process.env.REACT_APP_AccessToken}`;

const _isFormFilled = (data) => {
  return Object.entries(data).every(([key, value]) => value.length !== 0);
};

const sendForm = ({ text, due_date, status }) => {
  fetch(process.env.REACT_APP_POST_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: _token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: [
        {
          fields: {
            text,
            due_date,
            status,
          },
        },
      ],
    }),
  })
    .then(console.log)
    .catch(console.error);
};

export const NewTask = () => {
  const [data, setFormData] = useState({
    text: "",
    due_date: "",
    status: "todo",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (_isFormFilled(data));
    sendForm(data);
  };

  return (
    <div>
      <form method="post" className="my-form">
        <div>
          <label className="label">Task text:</label>
          <input
            type="text"
            name="text"
            value={data.text}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <div>
          <label className="label">Date:</label>
          <input
            type="date"
            name="due_date"
            value={data.due_date}
            onChange={handleInputChange}
            className="input"
          />
        </div>

        <button type="submit" onClick={handleSubmit} className="button">
          Submit
        </button>
      </form>
    </div>
  );
};
