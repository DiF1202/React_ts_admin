import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import { cleanObject, useMount } from "utils";
import * as qs from "qs";

const apiUrl = process.env.REACT_APP_API_URL;

const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(param);
    console.log(cleanObject(param));
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
      async (response) => {
        if (response.ok) {
          // console.log(response);
          // console.log(apiUrl);
          setList(await response.json());
        }
      }
    );
  }, [param]);

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  });

  return (
    <div>
      <SearchPanel
        users={users}
        params={param}
        setParam={setParam}></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  );
};

export default ProjectListScreen;
