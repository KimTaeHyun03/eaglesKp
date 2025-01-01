import './../css/permisson.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

//권한획득 상태 변경하는 리덕스 변경함수
import { access } from './../store';

let Permisson = () => {
  let [id, setId] = useState('');
  let [pw, setPw] = useState('');
  let [ruleAdd, setRuleAdd] = useState(false);

  //권한획득 상태를 나타내는 리덕스 값
  let accessValue = useSelector(state => state.permissonAccess.value);

  let navigate = useNavigate();
  let dispatch = useDispatch();

  let permissonChk = async () => {
    try {
      let response = await axios.post(
        'https://port-0-eagleskp-m5dahxe3d1a3c3c2.sel4.cloudtype.app/api/permissonChk',
        {
          sendId: id,
          sendPw: pw
        }
      );
      if (!accessValue) {
        alert(response.data);
        dispatch(access());
      } else {
        alert('이미 권한 획득 상태입니다');
      }
    } catch (error) {
      console.error('오류 발생:', error);
      alert('실패: ' + error.message);
    }
  };

  let showBtn = () => {
    setRuleAdd(true);
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
      <button onClick={permissonChk}>로그인</button>
      {accessValue ? <button onClick={showBtn}>규칙 추가</button> : null}
    </div>
  );
};

export default Permisson;
