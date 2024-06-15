import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* <Route path='/' element={<Home/>} /> */}
      </Routes>
      {/* <Home/> */}
    </div>
  );
}

export default App;
