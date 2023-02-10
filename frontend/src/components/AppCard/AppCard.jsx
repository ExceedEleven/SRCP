import { Card, CardContent } from '@mui/material';
import React from 'react';
import AppButton from '../AppButton/AppButton';
import PopupConfirm from '../../containers/PopupConfirm';

function Status_style(status) {
  if (status == 'empty') {
    return 'grey';
  } else {
    if (status != 'reserved') {
      return 'red';
    } else {
      return 'yellow';
    }
  }
}

function Available(login, setPopReserve) {
  if (!login) {
    return <h1>Available</h1>;
  } else {
    return (
      <div>
        <h1>Available</h1>
        <AppButton
          btnText="Reserved"
          onClick={() => {
            setPopReserve(true);
          }}
        />
      </div>
    );
  }
}

function Reserved(login, all, setPopEnter, setPopExit) {
  if (!login) {
    return <h1>Reserved</h1>;
  } else {
    if (all.user_id == true && all.time_start != NULL) {
      return (
        <div>
          <p>Reserved Time: {all.time_reserved}</p>
          <p>Fee: {all.fee}</p>
          <AppButton
            btnText="Exit"
            onClick={() => {
              setPopExit(true);
            }}
          />
        </div>
      );
    } else {
      return (
        <div>
          <p>Reserved Time: {all.time_reserved}</p>
          <p>Fee: {all.fee}</p>
          <AppButton
            btnText="Enter"
            onClick={() => {
              setPopEnter(true);
            }}
          />
        </div>
      );
    }
  }
}

function Status({
  all,
  login,
  popEnter,
  popExit,
  popReserve,
  setPopEnter,
  setPopExit,
  setPopReserve,
  setParkId
}) {
  console.log(all);
  if (all.state == 'empty') {
    return Available(login, setPopReserve);
  } else {
    if (all.state != 'reserved') {
      return <h1>Unavailble</h1>;
    } else {
      Reserved(login, all, setPopEnter, setPopExit);
    }
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
  setPopReserve,
  setParkId
}) => {
  console.log(park);
  return (
    <div>
      <h2>Parking {park.park_id + 1}</h2>
      <Card sx={{ height: 400, width: 500 }} style={{ backgroundColor: Status_style(park.state) }}>
        <CardContent>
          <Status
            all={park}
            login={login}
            popEnter={popEnter}
            setPopEnter={setPopEnter}
            popExit={popExit}
            setPopExit={setPopExit}
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
