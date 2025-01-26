import './../css/topBar.css';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector} from 'react-redux';

let TopBar = () => {
  //권한획득 상태를 나타내는 리덕스 값
  let accessValue = useSelector(state => state.permissonAccess.value);
  let navigate = useNavigate();
  // 슬라이드 메뉴 상태
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  let [help, setHelp] = useState(false);
  let [android, setAndroid] = useState(false);
  let [ios, setIos] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  //setIsMenuOpen 변경 함수 - onClick에 넣을 함수
  // let menuOpen = () => {
  //   setIsMenuOpen(!isMenuOpen);
  // };

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
      <button className='permissonBtn'>
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
{accessValue ? <div>
          <p
          className='ladderMenuP'
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            navigate('/user');
          }}
        >
          취사병 추가, 삭제
        </p>
        
        <p
          className='ladderMenuP'
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            navigate('/nextCook');
          }}
        >
          다음달 조리라인 관리
        </p>
</div> : null}
{accessValue ? <div>
        <p
          className='ladderMenuP'
          onClick={() => {
            setIsMenuOpen(!isMenuOpen);
            navigate('/nextRa');
          }}
        >
          창고구역 관리
        </p>
</div> : null}

        <p>
          <p className='help'>
            <h4
              onClick={() => {
                setHelp(!help);
              }}
            >
              설치 가이드
            </h4>
            <div className='androidIos'>
              <button
                onClick={() => {
                  setAndroid(!android);
                  setIos(false);
                }}
              >
                android
              </button>
              <button
                onClick={() => {
                  setIos(!ios);
                  setAndroid(false);
                }}
              >
                ios
              </button>
            </div>

            {android ? (
              <ol>
                <li>크롬으로 열기 버튼 클릭</li>

                <p className='link'>
                  <Link to='/chrome'>크롬으로 열기</Link>
                </p>
                <hr />
                <li>
                  크롬이 없다면 크롬 설치해야되는데 알아서 다운로드 페이지로감
                </li>
                <hr />
                <li>우측 상단에 ...세개 새로로 배열되어있는 버튼 클릭</li>
                <hr />
                <li>홈 화면에 추가 클릭</li>
                <hr />
                <li>이제 어플이 설치 되었을 것이야</li>
                <hr />
                <li>설치하면 앞으로 이걸로 편하게 쓸수 있단다 친구들</li>
                <hr />
              </ol>
            ) : null}

            {ios ? (
              <ol>
                <li>크롬이 없다면 크롬 설치 버튼 클릭</li>

                <p className='link'>
                  <Link to='/chrome'>크롬 설치</Link>
                </p>
                <hr />
                <li>
                  크롬 설치 후 링크를 크롬 검색창에 복붙해서 크롬으로 접속
                  <p className='urlLink'>https://port-0-eagleskp-m5dahxe3d1a3c3c2.sel4.cloudtype.app/</p>
                </li>
                <hr />
                <li>공유버튼 클릭</li>
                <hr />
                <li>홈 화면에 추가 클릭</li>
                <hr />
                <li>이제 어플이 설치 되었을 것이야</li>
                <hr />
                <li>설치하면 앞으로 이걸로 편하게 쓸수 있단다 친구들</li>
                <hr />
              </ol>
            ) : null}
          </p>
        </p>
        <p className='notice'>
          <h4>공지</h4>
          <p>
            1. 메인페이지에서 목록이 안뜨면 새로고침 여러번 하면
            됨
          </p>
          <p>
            2. 사이트 아무한테나 공유하면 부대 취사병의 이름이 유출될수있으니
            절대 누구에게도 공유하지 마십쇼 공유하면 사이트 그냥 없애버립니다
          </p>
          <p>3. 오류 발견하면 갠톡주십쇼</p>
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
