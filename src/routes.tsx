import {
  BrowserRouter, Navigate,
  Route, Routes
} from "react-router-dom";
import Detalhes from "./pages/Detalhes";
import { Formulario } from "./pages/Formulario";
import { Listar } from "./pages/Listar";
import Login from "./pages/Login";


const PrivateRoute = ({ children, redirectTo  }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  return isAuthenticated ? children : <Navigate to={redirectTo} />;
}

export function AppRoutes() {
  return (  
    <BrowserRouter>  
      <Routes>
        <Route path="/" element={<PrivateRoute redirectTo="/login"> <Listar/></PrivateRoute>} />
        <Route path="/detalhes/:_id" element={<PrivateRoute redirectTo="/login"> <Detalhes/></PrivateRoute>} />
        <Route path="/editar/:_id" element={<PrivateRoute redirectTo="/login"> <Formulario/></PrivateRoute>} />
        <Route path="/novaNoticia" element={<PrivateRoute redirectTo="/login"> <Formulario/></PrivateRoute>} />
        <Route path="/login" element={<Login />} />       
      </Routes>
    </BrowserRouter>  
    
  );
}
