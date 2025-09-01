import { Card, Avatar, Divider } from "antd";
import "./index.scss";
import { User } from "../../../types/User";

const UserDetailCard = ({ user, avatarUrl }: { user: User | null; avatarUrl: string | null; }) => {

  return (
    <Card className="user-detail-card-container">
      <div className="user-detail-section">
        <Avatar src={avatarUrl} size={100}/>
        <h2 className="username">
          {user?.firstName} {user?.lastName}
        </h2>
        <Divider className="line" />
        <div className="user-info">
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Username:</strong> {user?.username}
          </p>
          <p>
            <strong>Age:</strong> {user?.age}
          </p>
          <p>
            <strong>ID:</strong> {user?.id}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default UserDetailCard;
