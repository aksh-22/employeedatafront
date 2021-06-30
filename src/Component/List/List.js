import React, { useEffect } from "react";
import classes from "./List.module.css";
import { useDispatch, useSelector } from "react-redux";
import { dataActions } from "../../Store/index";
import useApiFetch from "../../Hooks/useApi";

const List = () => {
  const dispath = useDispatch();
  const listData = useSelector((state) => state.listData);

  const { fetchData } = useApiFetch(
    "http://127.0.0.1:5000/api/v1/data/getData"
  );

  useEffect(() => {
    dispath(dataActions.initListData(fetchData));
  }, [fetchData]);

  const editDataHandler = async (el) => {
    dispath(dataActions.setModalActive());
    dispath(dataActions.setEditState(true));
    dispath(
      dataActions.setModalData({
        name: el.name,
        id: el.id,
        age: el.age,
        _id: el._id,
        edit: true,
      })
    );
  };

  const deleteHandler = async (id2) => {
    const confirm = window.confirm("Are you sure");
    if (confirm) {
      dispath(dataActions.deleteData(id2));
      await fetch(`http://127.0.0.1:5000/api/v1/data/deleteData/${id2}`, {
        method: "DELETE",
      });
    }
  };

  const showData = () => {
    return listData.length === 0 ? (
      <h1>No Data Found</h1>
    ) : (
      listData.map((el) => {
        return (
          <li key={Math.random()?.toString()}>
            <ul className={classes.row}>
              <li>{el.id}</li>
              <li>{el.name}</li>
              <li>{el.age}</li>
              <li className={classes.btn}>
                <button
                  onClick={() => {
                    editDataHandler(el);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    deleteHandler(el.id);
                  }}
                >
                  Delete
                </button>
              </li>
            </ul>
          </li>
        );
      })
    );
  };

  return (
    <div>
      <ul className={classes.table}>
        <li>
          <ul className={classes.row}>
            <li>Employee Id</li>
            <li>Name</li>
            <li>Age</li>
            <li></li>
          </ul>
        </li>
        {showData()}
      </ul>
    </div>
  );
};

export default List;
