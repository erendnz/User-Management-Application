import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearError } from "../../store/globalErrorSlice.ts";
import { CloseCircleOutlined } from "@ant-design/icons";
import "./index.scss";

const ErrorPage = () => {
  const errorMessage = useSelector((state) => state.error.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = () => {
    dispatch(clearError());
    navigate("/");
  };
  

  return (
    <div className="error-page">
      <div className="error-card">
        <CloseCircleOutlined className="error-icon" />
        <h1>Oops! Something went wrong</h1>
        <p>{errorMessage || "An unexpected error occurred."}</p>
        <button onClick={handleBack}>Go Back Home</button>
      </div>
    </div>
  );
};

export default ErrorPage;
