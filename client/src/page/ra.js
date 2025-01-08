import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import './../css/tableStyle.css';

let Ra = () => {
  let [loading, setLoading] = useState(true);
  let [role, setRole] = useState([]);
  let [index, setIndex] = useState(null);
  let [trigger, setTrigger] = useState(false);
  //수정할 값
  let [field, setField] = useState('정');
  let [value, setValue] = useState(null);

  let accessValue = useSelector(state => state.permissonAccess.value);

  let update = async () => {
    try {
      if (!field || !value) {
        alert('필드와 값을 모두 입력해야 합니다!');
        return;
      }

      let response = await axios.post(`${process.env.REACT_APP_API_URL}api/dataUpdate`, {
        
        sendIndex: index,
        sendField: field, // 선택한 필드 (예: '정' 또는 '부')
        sendValue: value // 입력된 새 값
      });

      if (response.status === 200) {
        alert('성공적으로 업데이트되었습니다.');
        // 데이터를 다시 가져옴
        const updatedRoles = await axios.get(`${process.env.REACT_APP_API_URL}api/raGet`);
        setRole(updatedRoles.data);

        // 상태 초기화
        setIndex(null);
        setField('정');
        setValue('');
        setTrigger(false); // 수정창 닫기
      } else {
        alert('업데이트 실패: 서버에서 에러가 발생했습니다.');
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert('업데이트 중 오류가 발생했습니다.');
    }
  };

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/raGet`);
        setRole(response.data);
        setLoading(false); // 데이터 로딩이 끝나면 로딩 상태 업데이트
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setLoading(false); // 에러 발생 시에도 로딩 상태를 false로 설정
      }
    };
    fetchRoles();
  }, []); // 빈 배열로 설정하여 컴포넌트가 처음 렌더링될 때만 실행

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시
  }

  return (
    <>
      <div className='tableBox'>
        <table className='table'>
          <thead>
            <tr>
              <th>창고 구역</th>
              <th>정</th>
              <th>부</th>
              {accessValue ? <th>비고</th> : null}
            </tr>
          </thead>
          <tbody>
            {role.map((role, index) => (
              <tr key={index}>
                <td>{role.구역}</td>
                <td>{role.정}</td>
                <td>{role.부}</td>
                {accessValue ? (
                  <td
                    onClick={() => {
                      setIndex(role.구역);
                      setTrigger(!trigger);
                    }}
                  >
                    수정
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {trigger ? (
        <div className='tableUpdate'>
          <label>{index}</label>
          <br/>
          <select
          className='select'
          value={field}
          onChange={e => setField(e.target.value)}>
            <option value='정'>정</option>
            <option value='부'>부</option>
          </select>
          <input
            className='input'
            type='text'
            placeholder='값을 입력하세요'
            onChange={e => {
              setValue(e.target.value);
            }}
          ></input>
          <button 
          className='btn'
          onClick={update}
          >수정</button>
        </div>
      ) : null}
    </>
  );
};

export default Ra;
