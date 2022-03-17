import { Routes, Route } from "react-router";
import Header from "./components/Header/Header";
import Teachers from "./components/Teachers/Teachers";
import Students from "./components/Students/Students";
import NavBar from './components/NavBar/NavBar';
import SchoolClasses from "./components/SchoolClasses/SchoolClasses";

function App() {
  return (
    <div className="App">
      <Header />
      <hr />
      <div className="flex w-full">
        <NavBar />
        <Routes>
          <Route path="/teachers" element={<Teachers />}>
            
          </Route>
          <Route path="/students" element={<Students />}>
            
          </Route>
          <Route path="/classes" element={<SchoolClasses />}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
