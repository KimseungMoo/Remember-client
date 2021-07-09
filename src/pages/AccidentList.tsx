import React, { useEffect } from "react";
import "./AccidentList.css";
import AccidentListItem from "./AccidentListItem";
import Spinner from "./Spinner";
import { useTypedSelector } from "../hook/useTypedSelector";
import { useActionDispatch } from "../hook/useActionDispatch";
import { useHistory } from "react-router-dom";

const AccidentList: React.FC = () => {
  const accidentState = useTypedSelector((state) => state.accident);
  const { fetchAccident } = useActionDispatch();
  const history = useHistory();

  useEffect(() => {
    fetchAccident();
  }, []);

  return accidentState.loading ? (
    <Spinner></Spinner>
  ) : (
    <div className="accident__row">
      {accidentState.accident?.data.map((accident) => (
        <AccidentListItem
          onClick={(accident) => history.push(`/postdetail/${accident.id}`)}
          payClick={(accident) => history.push(`/service/${accident.id}`)}
          data={accident}
          key={accident.id}
        ></AccidentListItem>
      ))}
    </div>
  );
};

export default AccidentList;
