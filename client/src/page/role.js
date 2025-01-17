import { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/tableStyle.css';
import { useSelector } from 'react-redux';

let Role = () => {
  let [loading, setLoading] = useState(true);
  let [role, setRole] = useState([]);
  let [index, setIndex] = useState(null);
  let [value, setValue] = useState(''); // 수정할 값
  let [trigger, setTrigger] = useState(false); // 수정창 표시 여부
  let [push1,setPush1] = useState('');
  let [push2,setPush2] = useState('');

  let accessValue = useSelector(state => state.permissonAccess.value);

  // 데이터 가져오기
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/roleGet`
        );
        setRole(response.data);
        setLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setLoading(false);
      }
    };
    fetchRoles();
  }, []);

  // 데이터 업데이트
  const update = async () => {
    try {
      if (!value) {
        alert('값을 입력하세요!');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/roleUpdate`,
        {
          sendIndex: index,
          sendValue: value // 입력된 새 값
        }
      );

      if (response.status === 200) {
        alert('업데이트 성공');
        // 데이터를 다시 가져옴
        const updatedRoles = await axios.get(
          `${process.env.REACT_APP_API_URL}api/roleGet`
        );
        setRole(updatedRoles.data);

        // 상태 초기화
        setIndex(null);
        setValue('');
        setTrigger(false);
      } else {
        alert('업데이트 실패');
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert('업데이트 중 오류 발생');
    }
  };
  
  let rolePush = async () => {
    try {
      if (!push1&&!push2) {
        alert('값을 입력하세요!');
        return;
      }

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/rolePush`,
        {
          sendPush1: push1,
          sendPush2: push2 // 입력된 새 값
        }
      );

      if (response.status === 200) {
        alert('업데이트 성공');
        // 데이터를 다시 가져옴
        const updatedRoles = await axios.get(
          `${process.env.REACT_APP_API_URL}api/roleGet`
        );
        setRole(updatedRoles.data);

        // 상태 초기화
        setPush1('');
        setPush2('');
      } else {
        alert('업데이트 실패');
      }
    } catch (error) {
      console.error('업데이트 실패:', error);
      alert(error);
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <div className='tableBox'>
        <table className='table'>
          <thead>
            <tr>
              <th>구역</th>
              <th>담당</th>
              {accessValue ? <th>비고</th> : null}
            </tr>
          </thead>
          <tbody>
            {role.map((item, idx) => (
              <tr key={idx}>
                <td>{item.구역}</td>
                <td>{item.담당}</td>
                {accessValue ? (
                  <td
                    onClick={() => {
                      setIndex(item.구역); // 선택된 구역 설정
                      setTrigger(true); // 수정창 표시
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
      
      {/*담당구역 추가(push)*/}
      {accessValue ? (
        <div>
          <div className='rolePush'>
            <input 
            type='text' 
            placeholder='구역을 입력하세요'
            onChange={(e)=>{
              setPush1(e.target.value);
            }}
            ></input>
            <input 
            type='text' 
            placeholder='담당을 입력하세요'
            onChange={(e)=>{
              setPush2(e.target.value);
            }}
            ></input>
          </div>
          <button onClick={rolePush}>+</button>
        </div>
      ) : null}
      
      {trigger && (
        <div className='tableUpdate'>
          <label>{index}</label>
          <br />
          <input
            className='input'
            type='text'
            placeholder='새 값을 입력하세요'
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button className='btn' onClick={update}>
            수정
          </button>
        </div>
      )}
    </>
  );
};

export default Role;
