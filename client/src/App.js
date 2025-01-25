//라이브러리 임포트
import { Route, Routes } from 'react-router-dom';

//페이지 임포트
import './App.css';
import TopBar from './page/topBar.js';
import Main from './page/main.js';
import Permisson from './page/permisson.js';
//import RuleAdd from './page/ruleAdd.js';
import Group from './page/group.js';
import UserManagement from './page/userManagement.js';
import RedirectToChrome from './page/redirectToChrome.js';
import NextCook from './page/nextCook.js';

//앱 컴포넌트
function App() {
  return (
    <div className='App'>
      <TopBar />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/permisson' element={<Permisson />} />
        {/*<Route path='/permisson/ruleAdd' element={<RuleAdd />} />
         */}
        <Route path='/group' element={<Group />} />
        <Route path='/chrome' element={<RedirectToChrome />} />
        <Route path='/user' element={<UserManagement />} />
        <Route path='/nextCook' element={<NextCook />} />
      </Routes>
    </div>
  );
}

export default App;
