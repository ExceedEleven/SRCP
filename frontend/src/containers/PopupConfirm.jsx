import React from 'react';
import DialogConfirm from '../components/DialogConfirm/DialogConfirm';

const PopupConfirm = ({ park_id, popEnter, setPopEnter, popExit, setPopExit }) => {
  return (
    <div>
      <DialogConfirm
        park_id={park_id}
        message="Are you sure to enter?"
        open={popEnter}
        setOpen={setPopEnter}
      />
      <DialogConfirm
        park_id={park_id}
        message="Are you sure to exit?"
        open={popExit}
        setOpen={setPopExit}
      />
    </div>
  );
};

export default PopupConfirm;
