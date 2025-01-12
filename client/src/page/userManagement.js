import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

function UserManagement() {
  const [users, setUsers] = useState([]); // 사용자 목록 상태
  const [name, setName] = useState(''); // 새 사용자 이름
  const [entryDate, setEntryDate] = useState(''); // 새 사용자 입대년월
  const [message, setMessage] = useState(''); // 메시지 상태
  
  let accessValue = useSelector(state => state.permissonAccess.value);

  // 사용자 목록 가져오기
  const fetchUsers = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}api/userGet`
      );
      setUsers(response.data);
    } catch (error) {
      console.error('사용자 목록을 가져오는 중 오류 발생:', error);
      setMessage('사용자 목록을 가져오는 중 오류가 발생했습니다.');
    }
  };

  // 사용자 추가하기
  const addUser = async () => {
    if (!name || !entryDate) {
      setMessage('이름과 입대년월을 모두 입력하세요.');
      return;
    }

    if (!/^\d{6}$/.test(entryDate)) {
      setMessage('입대년월은 6자리 숫자여야 합니다.');
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}api/user/add`,
        {
          이름: name,
          입대년월: entryDate
        }
      );
      setMessage(response.data.message); // API 응답 메시지 설정
      fetchUsers(); // 사용자 목록 갱신
      setName(''); // 입력 필드 초기화
      setEntryDate('');
    } catch (error) {
      console.error(
        '사용자 추가 중 오류 발생:',
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.error || '사용자 추가 중 오류가 발생했습니다.'
      );
    }
  };

  // 사용자 삭제하기
  const deleteUser = async id => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/delete/${id}`
      );
      setMessage(response.data.message); // API 응답 메시지 설정
      fetchUsers(); // 사용자 목록 갱신
    } catch (error) {
      console.error(
        '사용자 삭제 중 오류 발생:',
        error.response?.data || error.message
      );
      setMessage(
        error.response?.data?.error || '사용자 삭제 중 오류가 발생했습니다.'
      );
    }
  };

  // 컴포넌트 마운트 시 사용자 목록 가져오기
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>사용자 관리</h1>

      {/* 사용자 추가 폼 */}
      <div>
        <h2>사용자 추가</h2>
        <input
          type='text'
          placeholder='이름'
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type='text'
          placeholder='입대년월 (예: 231023)'
          value={entryDate}
          onChange={e => setEntryDate(e.target.value)}
        />
        <button onClick={addUser}>추가</button>
      </div>

      {/* 메시지 표시 */}
      {message && <p>{message}</p>}

      {/* 사용자 목록 표시 */}
      <div>
        <h2>사용자 목록</h2>
        {users.length === 0 ? (
          <p>사용자가 없습니다.</p>
        ) : (
          <ul>
            {users.map(user => (
              <li key={user.고유ID}>
                {user.이름} ({user.입대년월}) - 고유ID: {user.고유ID}
                {accessValue ? (
                  <button onClick={() => deleteUser(user.고유ID)}>삭제</button>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
