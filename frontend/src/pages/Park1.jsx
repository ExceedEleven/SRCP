import React, { useEffect, useState } from 'react';
import DialogConfirm from '../components/DialogConfirm/DialogConfirm';
import { getDatabyid } from '../services/fetchdata';
import { SetBarrier } from '../services/postdata';
function Park1() {
  const [pop, setPop] = useState(true);
  const [isConfirm, setIsConfirm] = useState(false);
  const [park, setPark] = useState({});
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getDatabyid(0);
        setPark(data.result);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h1>Park1</h1>
      {isConfirm && <h1>Please exit now</h1>}
      {!isConfirm && <h1>Please rescan QRCode</h1>}
      <DialogConfirm
        parkId={0}
        handleFunc={() => {
          SetBarrier(0);
          setIsConfirm(true);
        }}
        headMessage={`Park time: ${park.parked_time}`}
        message={`Fee: ${park.fee} Baht`}
        open={pop}
        setOpen={setPop}
      />
    </div>
  );
}
export default Park1;
