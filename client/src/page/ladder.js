import React, { useState } from "react";
import "./../css/ladder.css";

const Ladder = () => {
  const [participants, setParticipants] = useState(3); // 초기 인원 3명
  const [startNames, setStartNames] = useState(["A", "B", "C"]);
  const [endNames, setEndNames] = useState(["1", "2", "3"]);

  // 게임 인원 추가
  const addParticipant = () => {
    if (participants < 10) {
      setParticipants(participants + 1);
      setStartNames([...startNames, `Start ${participants + 1}`]);
      setEndNames([...endNames, `End ${participants + 1}`]);
    }
  };

  // 게임 인원 감소
  const removeParticipant = () => {
    if (participants > 2) {
      setParticipants(participants - 1);
      setStartNames(startNames.slice(0, -1));
      setEndNames(endNames.slice(0, -1));
    }
  };

  // 이름 변경 처리
  const handleNameChange = (index, type, value) => {
    if (type === "start") {
      const updated = [...startNames];
      updated[index] = value;
      setStartNames(updated);
    } else if (type === "end") {
      const updated = [...endNames];
      updated[index] = value;
      setEndNames(updated);
    }
  };

  return (
    <div className="ladder-container">
      <h1>사다리타기 게임</h1>
      <div className="controls">
        <button onClick={addParticipant} className="btn">
          +
        </button>
        <button onClick={removeParticipant} className="btn">
          -
        </button>
        <p>게임 인원: {participants}명</p>
      </div>

      <div className="names-section">
        <div>
          <h2>시작 부분</h2>
          {startNames.map((name, index) => (
            <input
              key={`start-${index}`}
              type="text"
              value={name}
              onChange={(e) =>
                handleNameChange(index, "start", e.target.value)
              }
              className="name-input"
            />
          ))}
        </div>
        <div>
          <h2>끝 부분</h2>
          {endNames.map((name, index) => (
            <input
              key={`end-${index}`}
              type="text"
              value={name}
              onChange={(e) => handleNameChange(index, "end", e.target.value)}
              className="name-input"
            />
          ))}
        </div>
      </div>

      <div className="ladder-structure">
        {Array.from({ length: participants }).map((_, idx) => (
          <div key={idx} className="ladder-line">
            {Array.from({ length: 5 }).map((__, stepIdx) => (
              <div
                key={stepIdx}
                className="ladder-step"
                style={{ top: `${stepIdx * 20}%` }}
              ></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ladder;