import axios from 'axios';

export async function getData() {
  const res = await axios.get('http://group11.exceed19.online/park');
  console.log(res.data);
  return res.data;
}
export async function getDatabyid(id) {
  const res = await axios.get(`http://group11.exceed19.online/park/${id}`);
  console.log(res.data);
  return res.data;
}
export async function getSuccess() {
  const res = await axios.get('http://group11.exceed19.online/');
  console.log(res);
  // console.log(res.data)
  return res.data;
}
