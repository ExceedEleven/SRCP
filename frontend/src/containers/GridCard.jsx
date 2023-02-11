import React, { useEffect, useState } from 'react';
import AppCard from '../components/AppCard/AppCard';
import { getData } from '../services/fetchdata';
const GridCard = ({
  login,
  popEnter,
  setPopEnter,
  popExit,
  setPopExit,
  setPopExitMessage,
  popReserve,
  setPopReserve,
  parkId,
  setParkId,
  setPopCancel
}) => {
  const [parks, setParks] = useState([]);
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getData();
        setParks(data.result);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="GridCard" style={{ display: 'flex', gap: '4rem', justifyContent: 'center' }}>
      {parks.map((park) => (
        <AppCard
          key={park.park_id}
          park={park}
          login={login}
          popEnter={popEnter}
          setPopEnter={setPopEnter}
          popExit={popExit}
          setPopExit={setPopExit}
          setPopExitMessage={setPopExitMessage}
          popReserve={popReserve}
          setPopReserve={setPopReserve}
          setParkId={setParkId}
          setPopCancel={setPopCancel}
        />
      ))}
    </div>
  );
};
export default GridCard;
