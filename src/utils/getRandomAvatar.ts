import { fetchAvatar } from '../services/api.ts';

//fetch an image url creating random id 
export const getRandomAvatar = async (): Promise<string> => {
  const randomId = Math.floor(Math.random() * 10) + 10;
  const res = await fetchAvatar(randomId);
  return res.download_url;
};
