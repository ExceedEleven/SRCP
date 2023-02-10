import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { getDatabyid } from '../../services/fetchdata';

function Status_style(status) {
  console.log(status);
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
  if (!login) {
    <h1>Available</h1>;
  } else {
  }
}

function Reserved(login) {}

function Status({ status, login }) {
  if (status == 'empty') {
    return Available(login);
  } else {
    if (status != 'reserved') {
      return <h1>Unavailble</h1>;
    } else {
      if (!login) {
        return <h1>Reserved</h1>;
      } else if (user) {
      }
    }
  }
}

export const ParkingCard = ({ park_id, login }) => {
  const [state, setState] = useState('empty');
  useEffect(() => {
    const interval = setInterval(async () => {
      getDatabyid(park_id).then((data) => {
        setState(() => data.result.state);
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Parking {park_id + 1}</h2>
      <Card sx={{ height: 400, width: 500 }} style={{ backgroundColor: Status_style(state) }}>
        <CardContent>
          <Status status={state} login={false} />
        </CardContent>
      </Card>
    </div>
  );
};
export default ParkingCard;
