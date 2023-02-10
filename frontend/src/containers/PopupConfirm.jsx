import React from 'react';
import DialogConfirm from '../components/DialogConfirm/DialogConfirm';
import { SetBarrier, SetReserve } from '../services/postdata';

const PopupConfirm = ({
  parkId,
  popEnter,
  setPopEnter,
  popExit,
  setPopExit,
  popReserve,
  setPopReserve
}) => {
  const handleOpenGate = () => {
    SetBarrier(parkId);
  };
  const handleExitGate = () => {
    SetBarrier(parkId);
  };
  const handleReserve = () => {
    SetReserve(parkId);
  };
  return (
    <div>
      <DialogConfirm
        parkId={parkId}
        handleFunc={handleOpenGate}
        message="Are you sure to enter?"
        open={popEnter}
        setOpen={setPopEnter}
      />
      <DialogConfirm
        parkId={parkId}
        handleFunc={handleExitGate}
        message="Are you sure to exit?"
        open={popExit}
        setOpen={setPopExit}
      />
      <DialogConfirm
        parkId={parkId}
        handleFunc={handleReserve}
        message="Are you sure to reserve this park?"
        open={popReserve}
        setOpen={setPopReserve}
      />
    </div>
  );
};

export default PopupConfirm;
