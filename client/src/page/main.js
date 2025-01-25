import Ra from './ra.js';
import Role from './role.js';
import Cook from './cook.js';

import './../css/main.css';
import { useState } from 'react';

let Main = () => {
  let [tab, setTab] = useState(1);

  let changeTab = (x) => {
    setTab(x);
  };

  return (
    <>
      <div className="mainTabContainer">
        <span
          className={`mainTab ${tab === 1 ? 'active' : ''}`}
          onClick={() => changeTab(1)}
        >
          조리라인
        </span>
        <span
          className={`mainTab ${tab === 2 ? 'active' : ''}`}
          onClick={() => changeTab(2)}
        >
          담당 창고
        </span>
        <span
          className={`mainTab ${tab === 3 ? 'active' : ''}`}
          onClick={() => changeTab(3)}
        >
          조리 시 담당구역
        </span>
      </div>
      <div className="mainShowTable">
        {tab === 1 && <Cook />}
        {tab === 2 && <Ra />}
        {tab === 3 && <Role />}
      </div>
    </>
  );
};

export default Main;