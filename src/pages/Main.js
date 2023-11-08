import List from "../components/List";

export const Main = ({ storage, setStorage }) => {
  return (
    <div>
      <h1>Main</h1>
      <List storage={storage} setStorage={setStorage}></List>
    </div>
  );
};
