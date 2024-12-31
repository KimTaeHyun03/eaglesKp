import './../css/permisson.css';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux';

import { access } from './../store';

let Permisson = () => {
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');
  let [ruleAdd,setRuleAdd] = useState(false);
  
  let accessValue = useSelector((state) => state.permissonAccess.value);
  
  let navigate = useNavigate();
  let dispatch = useDispatch();
  
  let permissonChk = async () => {
    try {
      let response = await axios.post(
        'http://localhost:3030/api/permissonChk',
        {
          sendId: id,
          sendPw: pw
        }
      );
      alert(response.data);
      dispatch(access());
    } catch (error) {
      console.error('오류 발생:', error);
      alert('실패: ' + error.message);
    }
  };
  
  let showBtn = ()=>{
    setRuleAdd(true);
  }
  
  return (
    <div className='permissonLogin'>
      <input
        type='text'
        placeholder='아이디를 입력하세요'
        onChange={e => {
          setId(e.target.value);
        }}
      ></input>
      <input
        type='password'
        placeholder='비밀번호를 입력하세요'
        onChange={e => {
          setPw(e.target.value);
        }}
      ></input>
      <button onClick={permissonChk} >로그인</button>
      {
        accessValue ? <button onClick={showBtn} >규칙 추가</button> : null
      }
      {/*
        ruleadd가 트루이면
        RuleAdd컴포넌트페이지로 이동
       */}
       <div>
      {
        ruleAdd ? navigate('./ruleAdd') : null
      }
      </div>
      <div>
        {accessValue ? 'true' : 'false'}
      </div>
      
    </div>
  );
};



export default Permisson;
