import { ColumnsType } from "antd/es/table";
import { User } from "../../types/User";
import { EditOutlined, EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";

export const userListColumns = (
  onView: (id: number) => void
): ColumnsType<User> => [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "View",
      key: "view",
      render: (_, record) => (
        <Button
          type="link"
          icon={<EyeOutlined />}
          onClick={(e) => {
            e.stopPropagation();
            onView(record.id);
          }}
        />
      ),
    }
  ];