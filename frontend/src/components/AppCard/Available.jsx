import React from 'react';

import AppButton from '../AppButton/AppButton';

function Available({ login, park, data, setPopReserve, setParkId }) {
  return (
    <div>
      <h1>Available</h1>
      {login && (data.park_id == -1 || data.park_id == '-1') && (
        <AppButton
          btnText="Reserved"
          onClick={() => {
            setParkId(park.park_id);
            setPopReserve(true);
          }}
        />
      )}
    </div>
  );
}

export default Available;
