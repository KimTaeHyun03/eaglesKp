import './../css/topBar.css';
import { useState } from 'react';
import {Link} from 'react-router-dom';

let TopBar = () => {

  
  return (
    <div className='main'>
      <span className='title'>
        <h1>취사병 업무</h1>
      </span>
      <Link className='loginBtn' to='/permisson'>수정권한</Link>
    </div>
  );
};

export default TopBar;
