import React from "react";

function CurrentDate() {
  // 현재 날짜 가져오기
  const today = new Date();

  // 년, 월, 일 추출
  const year = today.getFullYear(); // 년도
  const month = today.getMonth() + 1; // 월 (0부터 시작하므로 +1)
  const date = today.getDate(); // 일

  return (
    <div>
      <h2>
        {year}년 {month}월 조리라인
      </h2>
    </div>
  );
}

export default CurrentDate;