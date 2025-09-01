import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table } from 'antd';
import { User } from '../../types/User';
import { fetchUsers } from '../../services/api.ts';
import './index.scss';
import { userListColumns } from './columns.tsx';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../store/reducers/globalErrorSlice.ts';
import { Error } from '../../types/Error.ts';
import { hideLoading, showLoading } from '../../store/reducers/globalLoadingSlice.ts';

export default function UserList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [pageSize, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const cachedUsers = localStorage.getItem('user-list');
  const [rows, setRows] = useState<User[]>(cachedUsers ? JSON.parse(cachedUsers) : []);

  const loadUsers = async () => {
    try {
      dispatch(showLoading());
      const users = await fetchUsers();
      setRows(users);
      localStorage.setItem('user-list', JSON.stringify(users));
    } catch (err: any) {
      const errorPayload: Error = {
        code: err?.response?.status || 500,
        message: err?.message || 'Users could not be fetched',
      };
      dispatch(setError(errorPayload));
      navigate('/error');
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (!cachedUsers) {
      loadUsers();
    }
  }, []);

  return (
    <div className="userListContainer">
      <div className="tableWrapper">
        <Table<User>
          rowKey="id"
          columns={userListColumns(id => navigate(`/users/${id}`))}
          dataSource={rows}
          loading={useSelector((state: any) => state.loading.isLoading)}
          pagination={{
            current: currentPage,
            pageSize,
            showSizeChanger: true,
            pageSizeOptions: ['5', '10', '20'],
            position: ['bottomCenter'],
            onChange: (page, size) => {
              setCurrentPage(page);
              setPageSize(size);
            },
            locale: { items_per_page: '' },
          }}
          title={() => <h4 className="title">User List</h4>}
        />
      </div>
    </div>
  );
}
