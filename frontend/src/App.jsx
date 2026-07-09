import { BrowserRouter, Routes, Route } from "react-router-dom";

// Authentication Pages
import Login from "./Mycomponent/Login";
import Register from "./Mycomponent/Register";

// Admin Page
import Admin from "./Mycomponent/Admin";

// User Pages
import Home from "./Mycomponent/Home";
import Series from "./Mycomponent/Series";
import AboutUs from "./Mycomponent/AboutUs";

// Series Management
import Addseries from "./Mycomponent/Addseries";
import Editseries from "./Mycomponent/Editseries";

// Movie Management
import AddMovies from "./Mycomponent/Addmovies";
import Editmovies from "./Mycomponent/Editmovies";

// Shared Layout (Header + Footer)
import Layout from "./Layout";

// Route Protection Component
import ProtectedRoutes from "./utils/ProtectedRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route element={<ProtectedRoutes />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />}/>
            <Route path="/viewseries" element={<Series />}/>
            <Route path="/about" element={<AboutUs />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/addseries" element={<Addseries />}/>
            <Route path="/editseries" element={<Editseries />}/>
            <Route path="/movies" element={<AddMovies />}/>
            <Route path="/edit" element={<Editmovies />}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;