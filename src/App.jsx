import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import LeftMenu from './components/left-menu/leftMenu';
import { ApiProvider } from './components/providers/apiProvider';
import { CategoryProvider } from './components/providers/categoryProvider';
import { ThemeProvider } from './components/providers/themeProvider';
import { KeyProvider } from './components/providers/keyProvider';
import './App.css';

function App() {
  useEffect(() => {
    sessionStorage.setItem("State", JSON.stringify(0))
  }, [])
  return (
    <ThemeProvider>
      <KeyProvider>
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
      </KeyProvider>
    </ThemeProvider>
  );
}

export default App;
