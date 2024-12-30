import './../css/permisson.css';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

let Permisson = () => {
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');
  let [permisson,setPermisson] = useState(false);
  let [ruleAdd,setRuleAdd] = useState(false);
  
  let navigate = useNavigate();
  
  
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
      setPermisson(true);
    } catch (error) {
      console.error('오류 발생:', error);
      alert('실패: ' + error.message);
    }
  };
  
  
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
        permisson ? <button onClick={()=>{
          setRuleAdd(true);
        }} >규칙 추가</button> : null
      }
      {/*
        ruleadd가 트루이면
        RuleAdd컴포넌트페이지로 이동
       */}
      {
        ruleAdd ? navigate('./ruleAdd') : null
      }
    </div>
  );
};



export default Permisson;
