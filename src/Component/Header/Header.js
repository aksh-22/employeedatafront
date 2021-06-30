import React, { Fragment } from "react";
import classes from "./Header.module.css";
import Modal from "../../UI/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../Store";

const Header = () => {
  const modalActive = useSelector((state) => state.modalActive);
  const dispath = useDispatch();

  const modelHandler = () => {
    dispath(dataActions.setEditState(false));
    dispath(dataActions.setModalActive());
    dispath(
      dataActions.setModalData({
        name: "",
        id: Math.floor(Math.random() * 1000),
        age: 0,
        edit: true,
      })
    );
  };

  const getModalstate = () => {
    dispath(dataActions.setModalActive());
  };

  return (
    <Fragment>
      <Modal onClick={getModalstate} classNme={modalActive} />
      <div className={classes.header}>
        <h1>Employee</h1>
        <button onClick={modelHandler}>Add Data</button>
      </div>
    </Fragment>
  );
};

export default Header;
