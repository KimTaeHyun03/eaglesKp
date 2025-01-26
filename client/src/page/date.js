import React from 'react';
import PropTypes from 'prop-types';
function CurrentDate({ num,text }) {
  // PropTypes를 사용해 num의 타입을 숫자로 지정
  CurrentDate.propTypes = {
    num: PropTypes.number.isRequired // 필수 숫자
  };

  // 현재 날짜 가져오기
  const today = new Date();

  // 년, 월, 일 추출
  const year = today.getFullYear(); // 년도
  const month = today.getMonth() + 1 + num; // 월 (0부터 시작하므로 +1)
  const date = today.getDate(); // 일
  
  if(month >12){
    month=1;
    year+=1;
  }
  
  return (
    <div>
      <h2>
        {year}년 {month}월 {text} 테스트
      </h2>
    </div>
  );
}

export default CurrentDate;
