import './../css/nextCook.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

let NextCook = () => {
  let [cookLine, setCookLine] = useState(() => {
    const savedData = localStorage.getItem('cookLine');
    return savedData ? JSON.parse(savedData) : [
  { 역할: '밥', 담당자: '' },
  { 역할: '설거지', 담당자: '' },
  { 역할: '튀김', 담당자: '' },
  { 역할: '볶음', 담당자: '' },
  { 역할: '국', 담당자: '' },
  { 역할: '나물', 담당자: '' },
  { 역할: '총괄', 담당자: '' },
  { 역할: '칼질1', 담당자: '' },
  { 역할: '칼질2', 담당자: '' },
  { 역할: '신병', 담당자: '' },
];
  });

  // 로컬스토리지에 저장하는 함수
  const saveToLocalStorage = () => {
    localStorage.setItem('cookLine', JSON.stringify(cookLine));
    alert('저장되었습니다!');
  };

  // 서버에 cookLine 데이터를 제출하는 함수
  // 서버에 cookLine 데이터를 제출하는 함수
const submitToDatabase = async () => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_URL}api/cook/update`, {
      cookLine,
    });
    alert(response.data.message || '제출되었습니다!');
  } catch (error) {
    console.error('제출 중 오류 발생:', error);

    // 오류 메시지를 확인하고 처리
    const errorMessage = error.response?.data?.error || error.response?.data || error.message || '알 수 없는 오류';
    
    // alert에 오류 메시지 출력
    alert(`제출 중 오류 발생: ${errorMessage}`);
  }
};
  return (
    <div className='nextcook'>
      <h2> 다음달 조리라인</h2>

      <table className='table'>
        <thead>
          <tr>
            <th>라인</th>
            <th>담당</th>
          </tr>
        </thead>

        <tbody>
          {cookLine.map((item, index) => (
            <tr key={index}>
              <td>{item.라인}</td>
              <td>
                <textarea
                  type='text'
                  value={item.담당}
                  onChange={(e) => {
                    const updatedCookLine = [...cookLine];
                    updatedCookLine[index].담당 = e.target.value;
                    setCookLine(updatedCookLine);
                  }}
                  className='textarea'
                ></textarea>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div><h3>저장은 임시저장하는거고 제출은 저장사항 반영하는거임</h3></div>
      <div>
        <button className='nextCookBtn' onClick={saveToLocalStorage}>
          저장
        </button>
        <button className='nextCookBtn' onClick={submitToDatabase}>
          제출
        </button>
      </div>
    </div>
  );
};

export default NextCook;