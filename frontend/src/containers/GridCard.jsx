import React, { useEffect, useState } from 'react';
import AppCard from '../components/AppCard/AppCard';
import { getData } from '../services/fetchdata';
const GridCard = (login) => {
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
      {parks.map((park) => (
        <AppCard park={park} login={login} />
      ))}
    </div>
  );
};
export default GridCard;
