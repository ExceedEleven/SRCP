import axios from 'axios';

export function getToken() {
  const cookie = document.cookie;
  const token = cookie.split('=')[1];

  return token;
}

export async function getUserReseveId() {
  const token = await getToken();
  const res = await axios.post('http://group11.exceed19.online/user', {
    token: token
  });
  // console.log(res.data)
  return res;
}
