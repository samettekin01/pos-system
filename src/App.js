import { Outlet } from 'react-router-dom';
import './App.css';
import LeftMenu from './components/leftmenu/leftmenu';
import { ApiProvider } from './components/apiprovider/apiprover';
import { CategoryProvider } from './components/apiprovider/categoryprovider';
import { useEffect } from 'react';
import { setOrder } from './components/calculate/calculate';
import { ThemeProvider } from './components/apiprovider/themeprovider';

function App() {
  useEffect(() => {
    sessionStorage.setItem("State", JSON.stringify(0))
    setOrder()
  }, [])
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
}

export default App;
