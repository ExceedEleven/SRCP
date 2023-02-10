import React, { useEffect, useState } from 'react';
import AppCard from '../components/AppCard/AppCard';
import { getData } from '../services/fetchdata';
import Button from '@mui/material/Button';
const GridCard = ({
  login,
  popEnter,
  popExit,
  popReserve,
  setPopEnter,
  setPopExit,
  setPopReserve,
  setParkId
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
    <div>
      {/* <Button
        onClick={() => {
          setPopReserve(true);
        }}>
        asdsd
      </Button> */}
      {parks.map((park) => (
        <AppCard
          park={park}
          login={login}
          popEnter={popEnter}
          setPopEnter={setPopEnter}
          popExit={popExit}
          setPopExit={setPopExit}
          popReserve={popReserve}
          setPopReserve={setPopReserve}
          setParkId={setParkId}
        />
      ))}
    </div>
  );
};
export default GridCard;
