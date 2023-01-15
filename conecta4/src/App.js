import Conecta4 from './components/conecta4';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Conecta4 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
