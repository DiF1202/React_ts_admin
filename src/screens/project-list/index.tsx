import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useMount, useDebounce } from "utils";
// import * as qs from "qs";
import { useHttp } from "utils/http";

// const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debounceParam) }).then(setList);
    // eslint-disable-next-line
  }, [debounceParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam}></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};
