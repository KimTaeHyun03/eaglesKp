import './../css/permisson.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//권한획득 상태 변경하는 리덕스 변경함수
import { access } from './../store';

let Permisson = () => {
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');
  let [ruleAdd, setRuleAdd] = useState(false);
  let [login, setLogin] = useState('로그인');
  //권한획득 상태를 나타내는 리덕스 값
  let accessValue = useSelector(state => state.permissonAccess.value);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let permissonChk = async () => {
    try {
      let response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/permissonChk`,
        {
          sendId: id,
          sendPw: pw,
          sendAccessValue: accessValue
        }
      );
      if (response.status === 200 && !accessValue) {
        alert(response.data);
        dispatch(access());
        setId('');
        setPw('');
      } else if (response.status === 201 && accessValue) {
        alert('로그아웃 되었습니다.');
        dispatch(access());
      }
    } catch (error) {
      console.error('오류 발생:', error);
      alert('실패 : 아이디나 비번이 틀리면 로그인 절대 안됩니당');
    }
  };

  let showBtn = () => {
    navigate('/');
  };
  

  useEffect(() => {
    const changeLoginout = () => {
      try {
        if (accessValue) {
          setLogin('로그아웃');
        } else {
          setLogin('로그인');
        }
      } catch (error) {
        console.error(error);
      }
    };
    changeLoginout();
  }, [accessValue]);

  return (
    <div className='permissonLogin'>
      <input
        type='text'
        placeholder='아이디를 입력하세요'
        onChange={e => {
          setId(e.target.value);
        }}
        value={id}
      ></input>
      <input
        type='password'
        placeholder='비밀번호를 입력하세요'
        onChange={e => {
          setPw(e.target.value);
        }}
        value={pw}
      ></input>
      <button onClick={permissonChk}>{login}</button>
      <button onClick={showBtn}>메인으로 돌아가기</button>
     {/* <button className='ruleAddBtn'><Link to='/permisson/ruleAdd'>구역 추가</Link></button>
     */}
      <div className='alert'>
        <h3>주의사항</h3>
        <p>
          수정권한은 관리관님과 왕고라인한테만 줄거고 아이디와 비번이 유출되지않게 조심해주시기 바랍니다.
        </p>
        <p>
          유출되어서 누군가가 데이터 베이스 막 건들여서 발생하는 문제는 책임지지 않습니당.
        </p>
        <p>
          개인정보는 털릴 일이 없으니 그건 안심하시고
        </p>
         <p>
           선임이 후임한테 인수인계 잘 해주시고요
         </p>
         <p>
           안쓸거면 개인톡으로 알려주십쇼 서버 닫을겁니다
         </p>
         <p>월에 5500원이거든요</p>
        
        
      </div>
    </div>
  );
};

export default Permisson;
