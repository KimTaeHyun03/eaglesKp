import { useState } from 'react';
import './../css/menu.css';

let Menu =()=> {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='App'>
      <button onClick={toggleMenu} className='menu-button'>
        메뉴
      </button>
      <div className={`side-menu ${isOpen ? 'open' : ''}`}>
        <h2>메뉴 내용</h2>
        <p>여기에 메뉴 내용을 추가하세요.</p>
      </div>
      <div
        className={`overlay ${isOpen ? 'show' : ''}`}
        onClick={toggleMenu}
      ></div>
    </div>
  );
}

export default Menu;
