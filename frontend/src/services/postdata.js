import axios from 'axios';

export async function SetBarrier(id) {
  const res = await axios.put(`http://group11.exceed19.online/park/barrier/${id}`);
  console.log(res.message);
  return res.fee;
}
export async function SetReserve(pid, uid) {
  const res = await axios.post(`http://group11.exceed19.online/park/reserved/${pid}/${uid}`);
  console.log(res);
}
export async function Delete(pid) {
  const res = await axios.post(`http://group11.exceed19.online/park/reserved/${pid}`);
  console.log(res);
}
export async function PutData(json){
  const res =await axios.put("http://group11.exceed19.online/park",json)
  console.log(res)
}