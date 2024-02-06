import './App.css';
import AccountDetails from './components/AccountCard';
// import Delete from './components/Delete';
import AccountForm from './pages/AccountForm';
// import AccountCard from './components/AccountCard';
import Home from './pages/Home';
import RegistrationForm from './pages/RegisterForm';
// import AllContacts from './components/AllContacts';
import { Route, Routes } from "react-router-dom";


function App() {
  return (
    <div className="App">
      {/* <Home/> */}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Registration" element={<RegistrationForm/>}/>
        <Route path='/account/:accountNo' element={<AccountDetails/>}/>
        <Route path='/AccountRegistration/:contactId' element={<AccountForm/>}/>
        {/* <Route path='/DeleteAccount' element={<Delete/>}/> */}
      </Routes>
    </div>
  );
}

export default App;
