import { useEffect, useState } from 'react';
import axios from 'axios';
import './../css/tableStyle.css';
import { useSelector, useDispatch } from 'react-redux';

let Ra = () => {
  let [loading, setLoading] = useState(true);
  let [role, setRole] = useState([]);
  let [index, setIndex] = useState(null);

  let accessValue = useSelector(state => state.permissonAccess.value);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:3030/api/roleGet');
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
              <th>조리시 담당 구역</th>
              <th>담당</th>
              {accessValue ? <th>비고</th> : null}
            </tr>
          </thead>
          <tbody>
            {role.map((role, index) => (
              <tr key={index}>
                <td>{role.구역}</td>
                <td>{role.담당}</td>
                {accessValue ? (
                  <td
                    onClick={() => {
                      setIndex(role.구역);
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
              {index && <div>선택한 구역: {index}</div>}
    </>
  );
};

export default Ra;
