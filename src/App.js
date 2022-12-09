import "./App.css";
import SignIn from "./Auth/SignIn";
import SignUp from "./Auth/SignUp";
import Dashboard from "./Views/Dashboard";
import User from "./Views/User/UserList";
import AddEditUser from "./Views/User/AddEditUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/userList" element={<User />} />
          <Route path="/addUser" element={<AddEditUser />} />
        </Routes>
      </BrowserRouter>
      {/* <Dashboard /> */}
    </div>
  );
}

export default App;
