import './App.css';
import Login from './components/Login/Login';
import { Routes, Route } from 'react-router-dom'; 
import Layout from './components/Layout/layout';
import { Register } from './components/Register/Register';
import RequireAuth from './components/RequireAuth/RequireAuth';
import Home from './components/Home/Home';
import Missing from './components/Missing/Missing';
function App() {
  
  return (
     <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />


        {/* we want to protect these routes */}
        <Route element={<RequireAuth/>}>
          <Route path="/home" element={<Home />} />
        </Route>

        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
