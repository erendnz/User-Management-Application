import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../types/User";
import { fetchLimits, fetchUserDetailById } from "../../services/api.ts";
import { getRandomAvatar } from "../../utils/getRandomAvatar.ts";
import { Limit } from "../../types/Limit.ts";
import UserLimits from "../../components/UserDetailComponents/UserLimits/index.tsx";
import UserDetailCard from "../../components/UserDetailComponents/UserDetailCard/index.tsx";
import "./index.scss";
import { Error } from "../../types/Error.ts";
import { setError } from "../../store/reducers/globalErrorSlice.ts";
import { useDispatch } from "react-redux";

const UserDetailsPage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [limits, setLimits] = useState<Limit[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cachedUser = localStorage.getItem(`user-${userId}`);
  const cachedAvatar = localStorage.getItem(`avatar-${userId}`);
  const cachedLimits = localStorage.getItem(`limits-${userId}`);

  const fetchUserDetail = async () => {
    try {
      const [userData, avatar, userLimits] = await Promise.all([
        fetchUserDetailById(userId),
        getRandomAvatar(),
        fetchLimits(),
      ]);
      setUser(userData);
      setAvatarUrl(avatar);
      setLimits(userLimits);
      localStorage.setItem(`user-${userId}`, JSON.stringify(userData));
      localStorage.setItem(`avatar-${userId}`, JSON.stringify(avatar));
      localStorage.setItem(`limits-${userId}`, JSON.stringify(userLimits));
    } catch (err: any) {
      const errorPayload: Error = {
        code: err?.response?.status || 500,
        message: err?.message || "User informations cannot be shown",
      };
      dispatch(setError(errorPayload));
      navigate("/error");
    }
  };

  useEffect(() => {
    if (cachedUser && cachedAvatar && cachedLimits) {
      setUser(JSON.parse(cachedUser));
      setAvatarUrl(JSON.parse(cachedAvatar));
      setLimits(JSON.parse(cachedLimits));
      return;
    }

    fetchUserDetail();
  }, [userId]);

  const handleLimitDelete = (id: string) => {
    setLimits((prevLimits) => prevLimits.filter((limit) => limit.id !== id));
  };

  const handleLimitAdd = (newLimit: Limit) => {
    setLimits((prev) => [...prev, newLimit]);
  };

  if (!user) return null;

  return (
    <div className="user-details-page-container">
      <div className="user-detail-card">
        <UserDetailCard user={user} avatarUrl={avatarUrl} />
      </div>
      <div className="user-limit-section">
        <UserLimits
          onLimitDeleted={handleLimitDelete}
          onLimitAdded={handleLimitAdd}
          limits={limits}
          currency={user?.bank?.currency || ""}
        />
      </div>
    </div>
  );
};


export default UserDetailsPage;
