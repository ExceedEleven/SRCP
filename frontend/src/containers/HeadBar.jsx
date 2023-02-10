import React, { useState } from 'react';
import ButtonAppBar from '../components/ButtonAppBar/ButtonAppBar';
const HeadBar = () => {
  const [isLogin, setLogin] = useState(false);
  return (
    <div className="container-bar">
      <ButtonAppBar isLogin={isLogin} setLogin={setLogin} />
    </div>
  );
};

export default HeadBar;
