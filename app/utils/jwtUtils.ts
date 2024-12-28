import {jwtDecode} from 'jwt-decode';

interface JwtPayload {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"?: string;
}

export const getRoleFromJwt = (token: string): string | null => {
  try {
    const decoded: JwtPayload = jwtDecode(token);
    return decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"] || null;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};
