import './../css/ruleAdd.css';

import {useState} from 'react';

let RuleAdd = () => {
  //COOK.RA.Role
let [field,setField] = useState('');
  return (
    <div className='ruleAdd'>
      <h2>구역,역할 추가</h2>
      <select
        className='select'
        value={field}
        onChange={e => setField(e.target.value)}
      >
        <option value='Ra'>창고 구역</option>
        <option value='Role'>조리시 정리구역</option>
        <option value='COOK'>조리라인</option>
      </select>
    </div>
  );
};
export default RuleAdd;
