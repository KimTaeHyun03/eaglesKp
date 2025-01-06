import './../css/permisson.css';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//권한획득 상태 변경하는 리덕스 변경함수
import { access } from './../store';

let Permisson = () => {
  
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');
  let [ruleAdd, setRuleAdd] = useState(false);
  let [login,setLogin] = useState('로그인');
  //권한획득 상태를 나타내는 리덕스 값
  let accessValue = useSelector(state => state.permissonAccess.value);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let permissonChk = async () => {
    try {
      let response = await axios.post(`${process.env.REACT_APP_API_URL}api/permissonChk`,
        {
          sendId: id,
          sendPw: pw,
          sendAccessValue: accessValue
        }
      );
      if (response.status===200 && !accessValue) {
        alert(response.data);
        dispatch(access());
        setId('');
        setPw('');
      } else if (response.status===201 && accessValue) {
        alert('로그아웃 되었습니다.');
        dispatch(access());
      }
    } catch (error) {
      console.error('오류 발생:', error);
      alert('실패: ' + error.message);
    }
  };

  let showBtn = () => {
    navigate("/");
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
    </div>
  );
};

export default Permisson;
