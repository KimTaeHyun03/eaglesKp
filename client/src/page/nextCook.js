import { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/tableStyle.css';
import { useSelector } from 'react-redux';

import CurrentDate from './date.js';

let NextCook = () => {
  let [loading, setLoading] = useState(true);
  let [role, setRole] = useState([]);
  let accessValue = useSelector(state => state.permissonAccess.value);

  // 첫 렌더링 시 로컬스토리지 데이터 가져오기
  useEffect(() => {
    const savedData = localStorage.getItem('cookTable');
    if (savedData) {
      setRole(JSON.parse(savedData)); // 로컬스토리지 데이터를 role 상태로 설정
    }
    setLoading(false); // 로딩 완료
  }, []);

  // MongoDB에서 데이터 가져오기
  const fetchFromDatabase = async () => {
    setLoading(true); // 로딩 시작
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}api/infoGet`);
      // MongoDB에서 가져온 데이터를 id, name, cook만 추출하여 role 상태로 업데이트
      const transformedData = response.data.map(item => ({
        id: item.id,
        name: item.name,
        cook: item.cook,
      }));
      setRole(transformedData); // 상태 업데이트
    } catch (error) {
      console.error('데이터 가져오기 실패:', error);
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  // 로컬스토리지에 저장하는 함수
  const saveToLocalStorage = () => {
    const jsonData = JSON.stringify(role); // role 데이터를 JSON 형식으로 변환
    localStorage.setItem('cookTable', jsonData); // 로컬스토리지에 저장
    alert('임시 저장되었습니다!');
  };

  // 데이터베이스에 저장하는 함수
  const saveToDatabase = async () => {
    try {
      // MongoDB에 업데이트 요청
      const response = await axios.post(`${process.env.REACT_APP_API_URL}api/infoUpdate`, {
        data: role, // 현재 role 데이터를 서버로 전달
      });

      if (response.status === 200) {
        alert('데이터가 성공적으로 저장되었습니다!');
      } else {
        alert('저장 실패: ' + response.data.message);
      }
    } catch (error) {
      console.error('저장 중 오류 발생:', error);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <CurrentDate></CurrentDate>
      <div className="tableBox">
        <table className="table">
          <thead>
            <tr>
              <th>id</th>
              <th>역할</th>
              <th>담당자</th>
            </tr>
          </thead>
          <tbody>
            {role.map((item, idx) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.cook}</td>
                <td>
                  <textarea
                    value={item.name} // 현재 name 값 표시
                    onChange={(e) => {
                      const updatedRole = [...role];
                      updatedRole[idx].name = e.target.value; // 입력된 값으로 name 업데이트
                      setRole(updatedRole); // 상태 업데이트
                    }}
                    className="nameInput"
                  ></textarea>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <button className="fetchBtn" onClick={fetchFromDatabase}>
          현재 조리라인 보기
        </button>
        <button className="saveBtn" onClick={saveToLocalStorage}>
          임시 저장
        </button>
        <button className="saveBtn" onClick={saveToDatabase}>
          저장
        </button>
      </div>
    </>
  );
};

export default NextCook;