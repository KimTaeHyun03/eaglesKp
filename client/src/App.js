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
import Ladder from './page/ladder.js';
import Install from './page/install.js';

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
              <Install/>
              <Ra />
              <Role />
              <Cook />
            </>
          }
        />
        <Route path='/permisson' element={<Permisson />} />
        <Route path='/permisson/ruleAdd' element={<RuleAdd />} />
        <Route path='/ladder' element={<Ladder />} />
      </Routes>
    </div>
  );
}

export default App;
