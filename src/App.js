import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Menu from "./components/Menu";

import { Main, NewTask } from "./pages/index";
import { useEffect, useState } from "react";

const _token = `Bearer ${process.env.REACT_APP_AccessToken}`;

const _areArraysSame = (first, second) => {
  console.log("run");
  const isSame = first.map((object, index) => {
    return Object.entries(object.fields).every(([key, value]) => {
      return value === second[index].fields[key];
    });
  });

  // console.log(isSame);

  const result = isSame.filter((item) => item === false);
  console.log(result);

  return !result.length;
};

const parseTasks = async (storage, setStorage) => {
  try {
    const response = await fetch(process.env.REACT_APP_GET_ENDPOINT, {
      method: "GET",
      headers: {
        Authorization: _token,
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    // console.log(data.records);
    console.log("did receive data");
    // console.log(data.records.length);
    // console.log(storage?.length);
    console.log(data.records.map((item) => item.fields.status));
    console.log(storage.map((item) => item.fields.status));
    if (data.records.length !== storage?.length) {
      setStorage(() => {
        return data.records;
      });
    } else if (!_areArraysSame(data.records, storage)) {
      setStorage(() => {
        return data.records;
      });
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

const App = () => {
  const [storage, setStorage] = useState([]);
  const timer = setInterval(() => {
    parseTasks(storage, setStorage);
  }, 500);

  useEffect(() => {
    parseTasks(storage, setStorage);
    return () => {
      clearInterval(timer);
    };
  }, [storage]);
  return (
    <>
      <Router>
        <Menu></Menu>
        <Routes>
          <Route
            path="/"
            element={
              <Main
                storage={storage}
                setStorage={() => {
                  setStorage();
                }}
              ></Main>
            }
          ></Route>
          <Route path="/newTask" element={<NewTask></NewTask>}></Route>
          <Route
            path="*"
            element={<h2 style={{ color: "#000" }}>Something went wrong</h2>}
          ></Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
