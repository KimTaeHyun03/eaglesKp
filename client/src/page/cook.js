import { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/tableStyle.css';
// import { useSelector } from 'react-redux';

import CurrentDate from './date.js';

let Cook = () => {
  let [loading, setLoading] = useState(true);
  let [role, setRole] = useState([]);
  //let [index, setIndex] = useState(null);
  // let [value, setValue] = useState(''); // 수정할 값
  // let [trigger, setTrigger] = useState(false); // 수정창 표시 여부

  // let accessValue = useSelector(state => state.permissonAccess.value);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}api/infoGet`);
        // 데이터에서 id, name, cook만 추출
        const transformedData = response.data.map(item => ({
          id: item.id,
          name: item.name,
          cook: item.cook,
        }));
        setRole(transformedData);
        setLoading(false);
      } catch (error) {
        console.error('데이터 가져오기 실패:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <>
      <CurrentDate num={0} text={'조리라인'} />
      <div className="tableBox">
        <table className="table">
          <thead>
            <tr>
              <th>역할</th>
              <th>담당자</th>
            </tr>
          </thead>
          <tbody>
            {role.map((item, idx) => (
              <tr key={item.id}>
                <td>{item.cook}</td>
                <td>{item.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Cook;