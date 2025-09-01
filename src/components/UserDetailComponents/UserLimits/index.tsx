import { Table, Button } from 'antd';
import { useMemo, useState } from 'react';
import { Limit } from '../../../types/Limit.ts';
import './index.scss';
import AddLimitModal from '../../../modals/AddLimitModal/index.tsx';
import { limitColumns } from './columns.tsx';

const UserLimits = ({
  limits,
  onLimitAdded,
  onLimitDeleted,
  currency,
}: {
  limits: Limit[];
  onLimitAdded: (newLimit: Limit) => void;
  onLimitDeleted: (id: string) => void;
  currency: string;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  const columns = useMemo(() => limitColumns(onLimitDeleted, currency), [onLimitDeleted, currency]);

  return (
    <div className="user-limits-table">
      <div className="table-header">
        <h4 className="table-title">User Limits</h4>
        <Button type="primary" onClick={() => setModalOpen(true)}>
          + Add New Limit
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={limits}
        rowKey="id"
        pagination={{
          current: currentPage,
          pageSize,
          showSizeChanger: true,
          pageSizeOptions: ['5', '10', '20'],
          onChange: (page, size) => {
            setCurrentPage(page);
            setPageSize(size);
          },
          locale: { items_per_page: '' },
        }}
        bordered
      />

      <AddLimitModal
        visible={modalOpen}
        onClose={() => setModalOpen(false)}
        onAdd={newLimit => {
          onLimitAdded(newLimit);
          setModalOpen(false);
        }}
      />
    </div>
  );
};

export default UserLimits;
