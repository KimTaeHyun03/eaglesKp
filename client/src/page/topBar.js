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
  
  let [help,setHelp] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //setIsMenuOpen 변경 함수 - onClick에 넣을 함수
  let menuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='main'>
      <button onClick={toggleMenu} className='menu-button'>
        메뉴
      </button>
      <span className='title'>
        <h1>
          <Link to='/' className='titleLink'>
            취사병 업무
          </Link>
        </h1>
      </span>
      <button className='loginBtn'>
        <Link to='/permisson'>수정권한</Link>
      </button>
      {/*
        accessValue ? <Link className='loginBtn' to='/permisson'>수정권한</Link> : null
      */}

      {/* 슬라이드 메뉴 */}
      <div className={`side-menu ${isMenuOpen ? 'open' : ''}`}>
        <h2>MENU</h2>
        <p
          className='ladderMenuP'
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            navigate('/group');
          }}
        >
          조짜기
        </p>
        
        <p>
          <p className='help'>
            <h4 onClick={()=>{
              setHelp(!help);
            }}>
              설치 가이드 : {!help?<span>클릭하십쇼</span> : <span>닫을거면 또 클릭하십쇼</span>}
            </h4>
            {help ? 
            <ol>
              <li>크롬으로 열기 버튼 클릭</li>
              
              <p className='link'>
          <Link to='/chrome'>크롬으로 열기</Link>
        </p>
        <hr/>
              <li>크롬이 없다면 크롬 설치해야되는데 알아서 다운로드 페이지로감</li>
              <hr />
              <li>우측 상단에 ...세개 새로로 배열되어있는 버튼 클릭</li>
              <hr />
              <li>홈 화면에 추가 클릭</li>
              <hr />
              <li>이제 어플이 설치 되었을 것이야</li>
              <hr />
              <li>설치하면 앞으로 이걸로 편하게 쓸수 있단다 친구들</li>
              <hr />
            </ol> : null}
          </p>
        </p>
        <p className='notice'>
          <h4>공지</h4>
          <p>
            1. 관리관님이 지적사항 있는 구역 체크시 푸시알림뜨는 기능 할수있으면
            업데이트 예정...이었는데 지식이 부족하여 불가능할거같습니다
          </p>
          <p>
            2. 조리라인을 어떻게 굴릴건지 보여주는건 추후 업데이트 예정
          </p>
          <p>
            3. 아직 미완성이라 메인페이지에서 목록이 안뜨면 새로고침 여러번 하면 됨
          </p>
          <p>
            4. 사이트 아무한테나 공유하면 부대 취사병의 이름이 유출될수있으니 절대 누구에게도 공유하지 마십쇼
            공유하면 사이트 그냥 없애버립니다
            <p>
              로그인해서 쓰게끔 할까 했는데 휴대폰으로 개발하는데 어려움이 있어 포기합니다
            </p>
            
          </p>
          <p>
            5. 오류 발견하면 갠톡주십쇼
          </p>
        </p>
      </div>

      {/* 오버레이 */}
      <div
        className={`overlay ${isMenuOpen ? 'show' : ''}`}
        onClick={toggleMenu}
      ></div>
    </div>
  );
};

export default TopBar;
