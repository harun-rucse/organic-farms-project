import { useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';

export default function useTokenDecode() {
  const token = useSelector((state) => state.auth.token);
  if (!token) return null;

  const currentUser = jwt_decode(token);

  return currentUser;
}
