import './../css/topBar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

let TopBar = () => {
  //권한획득 상태를 나타내는 리덕스 값
  let accessValue = useSelector(state => state.permissonAccess.value);

  return (
    <div className='main'>
      <span className='title'>
        <h1><Link to='/' className='titleLink'>취사병 업무</Link></h1>
      </span>
      <Link className='loginBtn' to='/permisson'>
        수정권한
      </Link>
      {/*
        accessValue ? <Link className='loginBtn' to='/permisson'>수정권한</Link> : null
      */}
    </div>
  );
};

export default TopBar;
