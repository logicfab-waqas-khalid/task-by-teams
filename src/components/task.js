import GenericServices from "../Services/GenericServices";
import UserServices from "../Services/UserServices";
import { useState, useEffect } from "react";

export default function Task() {
  const genericServices = new GenericServices();
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    handleGetTaskList();
  }, []);

  const handleGetTaskList = () => {
    const id = UserServices.getLoggedinfo().userId;
    genericServices
      .get("task/" + id)
      .then((data) => {
        console.log(data);
        setTaskList(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {taskList.map((item) => {
          return (
            <h1>
              {item.description}
              <br />
            </h1>
          );
        })}
      </div>
    </div>
  );
}
