import axios from 'axios';
import { getToken } from './auth';

export async function SetBarrier(id) {
  const res = await axios.put(`http://group11.exceed19.online/park/barrier/${id}`);
  // console.log(res.message);
  return res.fee;
}
export async function SetReserve(pid) {
  const token = await getToken();
  // console.log('Reserve token', token);
  const res = await axios.post(`http://group11.exceed19.online/park/reserved/${pid}`, {
    token: token
  });
  // console.log(res);
}
export async function Delete(pid) {
  const token = await getToken();
  const res = await axios.post(`http://group11.exceed19.online/park/reserved/delete/${pid}`, {
    token: token
  });
  // console.log(res);
}
export async function PutData(json) {
  const res = await axios.put('http://group11.exceed19.online/park', json);
  // console.log(res);
}
export async function SendRegister(username, password, credit) {
  const res = await axios.post('http://group11.exceed19.online/user/signup', {
    username: username,
    password: password,
    credits_card: credit
  });
  return res;
}

export async function SendLogin(username, password) {
  const res = await axios.post('http://group11.exceed19.online/user/signin', {
    username: username,
    password: password
  });
  const jwt = res.data.jwt;

  document.cookie = `token=${jwt}`;
  // console.log(jwt);
  return jwt;
}
