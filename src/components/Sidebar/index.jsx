import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../store/reducers/sidebarSlice.ts';
import { MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Sidebar = () => {
  const dispatch = useDispatch();
  const isSidebarOpen = useSelector(state => state.sidebar.isSidebarOpen);
  const navigate = useNavigate();

  return (
    <aside className={`sidebar ${isSidebarOpen ? 'open' : 'collapsed'}`}>
      <div className="toggle-btn" onClick={() => dispatch(toggleSidebar())}>
        {isSidebarOpen ? <MenuFoldOutlined /> : <MenuUnfoldOutlined />}
      </div>
      <ul className="menu">
        <li onClick={() => navigate('/')}>
          <UserOutlined />
          {isSidebarOpen && <span>Dashboard</span>}
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
