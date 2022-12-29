import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import HomePage from './Component/HomePage';
import LoginPage from './Component/LoginPage';
import SignupPage from './Component/SignupPage';
import { DataProvider } from './context/DataContext';

function App() {
  return (
    <div className="App">
      <DataProvider>
      <Routes>
        <Route path='/' element = {<LoginPage/>}/>
        <Route path='/signup' element = {<SignupPage/>}/>
        <Route path='/home' element = {<HomePage/>}/>
      </Routes>
      </DataProvider>
      
    </div>
  );
}

export default App;
