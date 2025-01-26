import { useEffect, useState } from 'react';
import axios from 'axios';
// import './../css/tableStyle.css';
import './../css/nextRa.css';
import { useSelector } from 'react-redux';

import CurrentDate from './date.js';

const NextRa = () => {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState([]);
  const accessValue = useSelector(state => state.permissonAccess.value);

  // 첫 렌더링 시 로컬스토리지 데이터 가져오기
  useEffect(() => {
    const savedData = localStorage.getItem('raTable');
    if (savedData) {
      setRole(JSON.parse(savedData)); // 로컬스토리지 데이터를 role 상태로 설정
    }
    setLoading(false); // 로딩 완료
  }, []);

  // MongoDB에서 데이터 가져오기
  const fetchFromDatabase = async () => {
    setLoading(true); // 로딩 시작
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/infoGet`
      );
      const transformedData = response.data.map(item => ({
        id: item.id,
        name: item.name,
        ra1st: item.ra1st,
        ra2nd: item.ra2nd
      }));
      setRole(transformedData); // 상태 업데이트
    } catch (error) {
      alert('데이터를 가져오는 데 실패했습니다.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 로컬스토리지에 저장하는 함수
  const saveToLocalStorage = () => {
    const jsonData = JSON.stringify(role); // role 데이터를 JSON 문자열로 변환
    localStorage.setItem('raTable', jsonData); // 로컬스토리지에 저장
    alert('임시 저장되었습니다!');
  };

  // 데이터베이스에 저장하는 함수
  const saveToDatabase = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/raUpdate`,
        {
          data: role
        }
      );
      const jsonData = JSON.stringify(role); // role 데이터를 JSON 문자열로 변환
    localStorage.setItem('raTable', jsonData); // 로컬스토리지에 저장
      if (response.status === 200) {
        alert('데이터가 성공적으로 저장되었습니다!');
      } else {
        alert('저장 실패: ' + response.data.message);
      }
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <CurrentDate num={1} text={'창고구역'}/>
      <div className='tableBox'>
        <table className='table'>
          <thead>
            <tr>
              <th className='th1'>담당자</th>
              <th className='th2'>정</th>
              <th className='th3'>부</th>
            </tr>
          </thead>
          <tbody>
            {role.map((item, idx) => (
              <tr key={item.id}>
                <td className='th1'>{item.name}</td>
                <td className='th2'>
                  <textarea
                    value={item.ra1st} // 'cook' 필드를 수정할 수 있도록 설정
                    onChange={e => {
                      const updatedRole = [...role];
                      updatedRole[idx].ra1st = e.target.value; // 'cook' 필드만 업데이트
                      setRole(updatedRole);
                    }}
                    className='cookInput'
                  ></textarea>
                </td>
                <td className='th3'>
                <textarea
                    value={item.ra2nd} // 'cook' 필드를 수정할 수 있도록 설정
                    onChange={e => {
                      const updatedRole = [...role];
                      updatedRole[idx].ra2nd = e.target.value; // 'cook' 필드만 업데이트
                      setRole(updatedRole);
                    }}
                    className='cookInput'
                  ></textarea>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className='fetchBtn' onClick={fetchFromDatabase}>
          현재 조리라인 보기
        </button>
        <button className='saveBtn' onClick={saveToLocalStorage}>
          임시 저장
        </button>
        <button className='saveBtn' onClick={saveToDatabase}>
          저장
        </button>
      </div>
    </>
  );
};

export default NextRa;