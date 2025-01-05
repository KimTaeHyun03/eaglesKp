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
          navigate('/group');
        }} >조짜기</p>
        <p>조리 순번. 화부조.홀.아래 순번 정하는거 업데이트 예정</p>
        <p>관리관님이 지적사항 있는 구역 체크시 푸시알림뜨는 기능 할수있으면 업데이트 예정</p>
        
        
      </div>
      
      {/* 오버레이 */}
      <div className={`overlay ${isMenuOpen ? "show" : ""}`} onClick={toggleMenu}></div>
    </div>
  );
};

export default TopBar;
