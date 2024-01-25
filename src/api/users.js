import { axi } from "./useAxios";
import { jwtDecode} from "jwt-decode";

export const registerRequest = async (data) => {
    await axi.post('/users/register/', data);
}
export const loginRequest = async (data) => {
  const res = await axi.post('/users/login/', data);
  const { access, refresh } = res.data;

  localStorage.setItem('access', access);
  localStorage.setItem('refresh', refresh);

  const user = jwtDecode(localStorage.getItem('access')); // Uso correcto de jwtDecode

  localStorage.setItem('username', user.username);
  localStorage.setItem('user_id', user.user_id);
  localStorage.setItem('avatar', user.avatar);
};
