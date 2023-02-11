import { Card, CardContent } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getUserReseveId } from '../../services/auth';
import Status from './Status';

function Status_style(park, login, data) {
  if (park.state == 'empty') {
    return '#6B728E';
  } else if (
    park.state == 'reserved' ||
    (login && park.state == 'parked' && data.park_id == park.park_id)
  ) {
    return '#F2CD5C';
  } else if (park.state == 'parked') {
    return '#F55050';
  }
}

export const AppCard = ({
  park,
  login,
  popEnter,
  popExit,
  popReserve,
  setPopEnter,
  setPopExit,
  setPopExitMessage,
  setPopReserve,
  setParkId
}) => {
  const [data, setData] = useState({});
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await getUserReseveId();

        setData(data.data.result);
      } catch (err) {
        console.log(err);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Parking {park.park_id + 1}</h2>

      <Card
        sx={{ height: 400, width: 500 }}
        style={{
          backgroundColor: Status_style(park, login, data),
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <CardContent>
          <Status
            park={park}
            login={login}
            data={data}
            popEnter={popEnter}
            setPopEnter={setPopEnter}
            popExit={popExit}
            setPopExit={setPopExit}
            setPopExitMessage={setPopExitMessage}
            popReserve={popReserve}
            setPopReserve={setPopReserve}
            setParkId={setParkId}
          />
        </CardContent>
      </Card>
    </div>
  );
};
export default AppCard;
