import { Tag, Button, Popconfirm } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Limit } from "../../../types/Limit";
import { DeleteOutlined } from "@ant-design/icons";

export const limitColumns = (
  onLimitDeleted: (id: string) => void
): ColumnsType<Limit> => [
    { title: "Limit Period", dataIndex: "limitPeriod", key: "limitPeriod" },
    { title: "Limit Type", dataIndex: "limitType", key: "limitType" },
    { title: "Value Type", dataIndex: "limitValueType", key: "limitValueType" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: boolean) =>
        status ? <Tag color="green">Active</Tag> : <Tag color="gold">Inactive</Tag>,
    },
    {
      title: "Created Date",
      dataIndex: "created",
      key: "created",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Popconfirm
          title="Are you sure you want to delete?"
          onConfirm={() => onLimitDeleted(record.id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" danger icon={<DeleteOutlined />} />
        </Popconfirm>
      ),
    },
  ];
