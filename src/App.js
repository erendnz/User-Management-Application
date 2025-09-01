import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserList from "./pages/UserListPage/index.tsx";
import ErrorPage from "./pages/ErrorPage";
import UserDetailsPage from "./pages/UserDetailPage/index.tsx";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MainLayout>
          <div className="App">
            <Routes>
              <Route path="/" element={<UserList />} />
              <Route path="/users/:userId" element={<UserDetailsPage />} />
              <Route path="/error" element={<ErrorPage /> }
              />
            </Routes>
          </div>
        </MainLayout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
