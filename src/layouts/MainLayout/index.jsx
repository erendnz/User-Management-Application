import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../components/Header/index.js";
import Sidebar from "../../components/Sidebar/index.jsx";
import { closeSidebar } from "../../store/sidebarSlice.ts";
import { hideLoading, showLoading } from "../../store/globalLoadingSlice.ts";
import { Spin } from "antd";
import "./index.scss";

const MainLayout = ({ children }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    dispatch(showLoading());

    const timeout = setTimeout(() => {
      dispatch(hideLoading());
      dispatch(closeSidebar());
    }, 200);

    return () => clearTimeout(timeout);
  }, [location.pathname]);

  
  if (isLoading) {
    return (
      <div className="main-layout">
        <div className="global-loader">
          <Spin size="large" />
        </div>
      </div>
    );
  }

  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-body">
        <Header />
        <main className="main-content">{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
