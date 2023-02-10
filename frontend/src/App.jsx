import React, { useState } from 'react';
import './App.css';
import HeadBar from './containers/HeadBar';
import PopupConfirm from './containers/PopupConfirm';

function App() {
  const [popEnter, setPopEnter] = useState(false);
  const [popExit, setPopExit] = useState(false);
  const [isLogin, setLogin] = useState(false);
  const [id, setId] = useState(-1);

  return (
    <main>
      <HeadBar isLogin={isLogin} setLogin={setLogin} />

      <PopupConfirm
        id={id}
        popEnter={popEnter}
        setPopEnter={setPopEnter}
        popExit={popExit}
        setPopExit={setPopExit}
      />
    </main>
  );
}

export default App;
