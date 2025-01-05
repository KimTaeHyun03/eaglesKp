import './../css/topBar.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

let TopBar = () => {
  //권한획득 상태를 나타내는 리덕스 값
  let accessValue = useSelector(state => state.permissonAccess.value);
  let navigate = useNavigate();
  // 슬라이드 메뉴 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  //setIsMenuOpen 변경 함수 - onClick에 넣을 함수
  let menuOpen = ()=>{
    setIsMenuOpen(!isMenuOpen);
  }
  
  

  return (
    <div className='main'>
      <button onClick={toggleMenu} className='menu-button'>
        메뉴
      </button>
      <span className='title'>
        <h1><Link to='/' className='titleLink'>취사병 업무</Link></h1>
      </span>
      <button  className='loginBtn' ><Link to='/permisson'>
        수정권한
      </Link></button>
      {/*
        accessValue ? <Link className='loginBtn' to='/permisson'>수정권한</Link> : null
      */}
      
      {/* 슬라이드 메뉴 */}
      <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
        <h2>MENU</h2>
        <p className='ladderMenuP' onClick={()=>{
          setIsMenuOpen(!isMenuOpen);
          navigate('/ladder');
        }} >사다리타기 조짜기</p>
        
      </div>
      
      {/* 오버레이 */}
      <div className={`overlay ${isMenuOpen ? "show" : ""}`} onClick={toggleMenu}></div>
    </div>
  );
};

export default TopBar;
