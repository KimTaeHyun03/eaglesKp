import './../css/topBar.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

let TopBar = () => {
  //권한획득 상태를 나타내는 리덕스 값
  let accessValue = useSelector(state => state.permissonAccess.value);
  // 슬라이드 메뉴 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  

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
        <h2>메뉴 내용</h2>
        <p>여기에 메뉴 내용을 추가하세요.</p>
      </div>
      
      {/* 오버레이 */}
      <div className={`overlay ${isMenuOpen ? "show" : ""}`} onClick={toggleMenu}></div>
    </div>
  );
};

export default TopBar;
