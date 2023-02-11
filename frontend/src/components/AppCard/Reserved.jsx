import React, { useEffect, useState } from 'react';
import { getDatabyid } from '../../services/fetchdata';
import AppButton from '../AppButton/AppButton';

function Reserved({ login, park, data, setPopEnter, setPopExit, setPopExitMessage, setParkId }) {
  const [parkData, setParkData] = useState({});
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getDatabyid(park.park_id);

        setParkData(data.result);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const reserveParkId = data.park_id;
  if (login && reserveParkId == park.park_id) {
    if (park.time_start != null) {
      return (
        <div>
          <h2>Parked Time: {parkData.parked_time}</h2>
          <h2>Fee: {parkData.fee}</h2>
          <AppButton
            btnText="Exit"
            onClick={() => {
              setPopExit(true);
              setParkId(park.park_id);
              setPopExitMessage(`Fee: ${parkData.fee} Baht`);
            }}
          />
        </div>
      );
    } else {
      console.log(parkData);
      return (
        <div>
          <h2>
            Remain time reserved:{' '}
            {parseInt(park.remain_time_reserved) < 0 ? 0 : parseInt(park.remain_time_reserved)}
          </h2>
          <AppButton
            btnText="Enter"
            onClick={() => {
              setPopEnter(true);
              setParkId(park.park_id);
            }}
          />
        </div>
      );
    }
  } else {
    return <h1>Reserved</h1>;
  }
}
export default Reserved;
