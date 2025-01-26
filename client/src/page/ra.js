import { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/tableStyle.css';
// import { useSelector } from 'react-redux';

import CurrentDate from './date.js';

let Ra = () => {
  let [loading, setLoading] = useState(true);
  let [role, setRole] = useState([]);
  // let accessValue = useSelector(state => state.permissonAccess.value);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/infoGet`
        );
        // 데이터에서 필요한 필드만 추출
        const transformedData = response.data.map(item => ({
          id: item.id,
          name: item.name,
          ra1st: item.ra1st,
          ra2nd: item.ra2nd
        }));
        setRole(transformedData); // 상태 업데이트
        setLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // "부" 데이터 매핑 함수
  const findSecondary = ra2nd => {
    // ra2nd와 일치하는 ra1st 값을 가진 항목 찾기
    const matchedItem = role.find(item => item.ra1st === ra2nd);
    return matchedItem ? matchedItem.name : ''; // 매칭된 이름 반환
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
            <CurrentDate num={0} text={'창고구역'}/>
      <div className='tableBox'>
        <table className='table'>
          <thead>
            <tr>
              <th>담당자</th>
              <th>(창고) 정</th>
              <th>(창고) 부</th>
            </tr>
          </thead>
          <tbody>
            {role.map(item => (
              <tr key={item.id}>
                <td>{item.name}</td> {/* 창고 구역 */}
                <td>{item.ra1st}</td> {/* 정 */}
                <td>{item.ra2nd}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
    </>
  );
};

export default Ra;
