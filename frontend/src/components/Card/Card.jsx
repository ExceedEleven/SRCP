import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getDatabyid } from '../../services/fetchdata';

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

function Available(login) {
  console.log(login);
  if (!login) {
    return <h1>Available</h1>;
  } else if (true) {
    return (
      <h1>
        Available
        <p>Button</p>
      </h1>
    );
  }
}

function Reserved(login, info) {
  if (!login) {
    return <h1>Reserved</h1>;
  } else if (true) {
    return (
      <div>
        <p>Reserved Time: {info.time_reserved}</p>
        <p>Enter Time: {info.time_start}</p>
        <p>cost: {info.fee}</p>
      </div>
    );
  }
}

function Status({ status, login, alldata }) {
  if (status == 'empty') {
    return Available(login);
  } else {
    if (status != 'reserved') {
      return <h1>Unavailble</h1>;
    } else {
      Reserved(login, alldata);
    }
  }
}

export const ParkingCard = ({ park_id, login }) => {
  const [state, setState] = useState('empty');
  const [info, setInfo] = useState({});
  useEffect(() => {
    const interval = setInterval(async () => {
      getDatabyid(park_id).then((data) => {
        setState(() => data.result.state);
        setInfo(() => data.result);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div>
      <h2>Parking {park_id + 1}</h2>
      <Card sx={{ height: 400, width: 500 }} style={{ backgroundColor: Status_style(state) }}>
        <CardContent>
          <Status status={state} login={false} alldata={info} />
        </CardContent>
      </Card>
    </div>
  );
};
export default ParkingCard;
