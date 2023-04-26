import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

export default function useTokenDecode() {
  const token = useSelector((state) => state.auth.token);
  if (!token) return null;

  const currentUser = jwt_decode(token);

  // check if token is expired
  const currentTime = Date.now() / 1000;
  if (currentUser.exp < currentTime) {
    localStorage.removeItem('jwt-token');
    return null;
  }

  return currentUser;
}
