//라이브러리 임포트
import { Route, Routes } from 'react-router-dom';

//페이지 임포트
import './App.css';
import TopBar from './page/topBar.js';
import Permisson from './page/permisson.js';
import RuleAdd from './page/ruleAdd.js';
import Ra from './page/ra.js';
import Role from './page/role.js';
import Cook from './page/cook.js';
//앱 컴포넌트
function App() {
  return (
    <div className='App'>
      <TopBar />
      <Routes>
        <Route
          path='/'
          element={
            <>
              <Ra />
              <Role />
              <Cook />
            </>
          }
        />
        <Route path='/permisson' element={<Permisson />} />
        <Route path='/permisson/ruleAdd' element={<RuleAdd />} />
      </Routes>
    </div>
  );
}

export default App;
