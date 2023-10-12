import { Outlet } from 'react-router-dom';
import './App.css';
import LeftMenu from './components/leftmenu/leftmenu';
import { ApiProvider } from './components/apiprovider/apiprover';
import { CategoryProvider } from './components/apiprovider/categoryprovider';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    sessionStorage.setItem("State", JSON.stringify(0))
  }, [])
  return (
    <ApiProvider>
      <CategoryProvider>
        <div className="App">
          <div className='container'>
            <LeftMenu />
            <Outlet />
          </div>
        </div >
      </CategoryProvider>
    </ApiProvider>
  );
}

export default App;
