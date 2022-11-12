import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

const List = ({ list, users }: ListProps) => {
  return (
    <Table
      rowKey={"id"}
      pagination={false}
      dataSource={list}
      columns={[
        {
          key: "name",
          title: "名称",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
          key: "zhichen",
          title: "负责人",
          render(value, project) {
            return <span key={project.personId}>{users.find((user) => user.id === project.personId)?.name || "未知"}</span>;
          },
        },
      ]}
    />
  );
};

export default List;
