import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { User } from '../../types/User';
import { fetchLimits, fetchUserDetailById } from '../../services/api.ts';
import { getRandomAvatar } from '../../utils/getRandomAvatar.ts';
import { Limit } from '../../types/Limit.ts';
import UserLimits from '../../components/UserDetailComponents/UserLimits/index.tsx';
import UserDetailCard from '../../components/UserDetailComponents/UserDetailCard/index.tsx';
import './index.scss';
import { Error } from '../../types/Error.ts';
import { setError } from '../../store/reducers/globalErrorSlice.ts';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../store/reducers/globalLoadingSlice.ts';
import { useGetLimitsQuery } from '../../services/limitsApi.ts';

const UserDetailsPage = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  type CachedUserData = {
    user: User;
    avatarUrl: string;
    limits: Limit[];
  };

  const cachedData = localStorage.getItem(`user-detail-${userId}`);
  const parsedCache: CachedUserData | null = cachedData ? JSON.parse(cachedData) : null;

  const [user, setUser] = useState<User | null>(parsedCache?.user ?? null);
  const [avatarUrl, setAvatarUrl] = useState<string>(parsedCache?.avatarUrl ?? '');
  const [limits, setLimits] = useState<Limit[]>(parsedCache?.limits ?? []);

  const { data: apiLimits } = useGetLimitsQuery();

  const fetchUserDetail = async () => {
    try {
      dispatch(showLoading());
      const [userData, avatar] = await Promise.all([
        fetchUserDetailById(userId),
        getRandomAvatar(),
      ]);
      setUser(userData);
      setAvatarUrl(avatar);
      setLimits(apiLimits);
      saveToCache({ user: userData, avatarUrl: avatar, limits: apiLimits });
    } catch (err: any) {
      const errorPayload: Error = {
        code: err?.response?.status || 500,
        message: err?.message || 'User informations cannot be shown',
      };
      dispatch(setError(errorPayload));
      navigate('/error');
    } finally {
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (!parsedCache) {
      fetchUserDetail();
    }
  }, [userId]);

  const saveToCache = (data: CachedUserData) => {
    localStorage.setItem(`user-detail-${userId}`, JSON.stringify(data));
  };

  const handleLimitDelete = (id: string) => {
    setLimits(prevLimits => {
      const updated = prevLimits.filter(limit => limit.id !== id);
      saveToCache({ user: user!, avatarUrl, limits: updated });
      return updated;
    });
  };

  const handleLimitAdd = (newLimit: Limit) => {
    setLimits(prev => {
      const updated = [...prev, newLimit];
      saveToCache({ user: user!, avatarUrl, limits: updated });
      return updated;
    });
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
          currency={user?.bank?.currency || ''}
        />
      </div>
    </div>
  );
};

export default UserDetailsPage;
