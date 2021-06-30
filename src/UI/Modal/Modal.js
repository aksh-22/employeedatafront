import React, { useState, useEffect } from "react";
import classes from "./Modal.module.css";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import { useSelector, useDispatch } from "react-redux";
import { dataActions } from "../../Store/index";

const Modal = (props) => {
  const dispath = useDispatch();

  const [initName, setInitName] = useState(true);
  const [initAge, setInitAge] = useState(true);

  const [name, setName] = useState("Enter Your Name");
  const [age, setAge] = useState(0);
  const [id, setId] = useState(0);
  const modalData = useSelector((state) => state.modalData);
  const editState = useSelector((state) => state.editState);
  const EnterName = (e) => {
    if (initName) {
      setName("");
      setInitName(false);
    }
    setName(e.target.value);
  };
  const EnterAge = (e) => {
    if (initAge) {
      setAge("");
      setInitAge(false);
    }
    setAge(e.target.value);
  };

  useEffect(() => {
    setName(modalData?.name ?? "Enter Your Name");
    setAge(modalData?.age ?? 0);
    setId(modalData?.id ?? Math.floor(Math.random() * 1000));
  }, [modalData]);

  const submitData = async (e) => {
    e.preventDefault();
    if (name.trim("").length === 0 || age <= 0 || age >= 31) {
      if (name.trim("").length === 0) {
        alert("please provide your name");
      } else {
        alert("Age should be in between 1 to 30");
      }

      return;
    }
    const data = { name, age, id };
    dispath(dataActions.setListData(data));

    if (editState) {
      const confirm = window.confirm("Are you sure");
      if (confirm) {
        await fetch(`http://127.0.0.1:5000/api/v1/data/updatData/${id}`, {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        // dispath(dataActions.setListData(data));
        props.onClick();
      }
      return;
    }

    await fetch("http://127.0.0.1:5000/api/v1/data/postData", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    props.onClick();
  };

  const closeModal = () => {
    props.onClick();
  };

  return (
    <div className={`${classes.modal} ${props.classNme ? classes.active : ""}`}>
      <CancelOutlinedIcon onClick={closeModal} className={classes.close} />
      <form className={classes.form} onSubmit={submitData}>
        <label>
          Employee Id:<span>{id}</span>
        </label>
        <label>
          Name:
          <input type="text" name="name" value={name} onChange={EnterName} />
        </label>
        <label>
          Age:
          <input type="number" name="name" value={age} onChange={EnterAge} />
        </label>

        <input type="submit" value="Submit" className={classes.formbtn} />
      </form>
    </div>
  );
};

export default Modal;
