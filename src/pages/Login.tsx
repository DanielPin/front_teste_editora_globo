import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ConexaoApiLogin } from "../infra/ConexaoApi";
import style from "../styles/Login.module.css";

export default function Login() {
  const [status, setStatus] = useState({ type: "", mensagem: "" });
  const [formValues, setFormValues] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const login = async (e) => {
    e.preventDefault();
    
    try {
      const {
        data: { token },
      } = await ConexaoApiLogin(formValues);
      localStorage.setItem("token", JSON.stringify(token));
      navigate("/");
    } catch (error) {
      setStatus({ type: "error", mensagem: "Login ou senha inválido." });
    }
  };

  return (
    <div className={style.container}>
      <h2>Autenticação</h2>
      {status.type === "error" ? ( <span style={{ color: "#ff0000" }}>{status.mensagem}</span>) : ("")}
      <form onSubmit={login} className={style.form}>
        <input
          type="text"
          name="login"
          placeholder="Login"
          onChange={handleInputChange}
          size={30}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          onChange={handleInputChange}
          size={30}
          required
        />
        <button className={style.logar} type="submit">
          Entrar
        </button>
      </form>
    </div>
  );
}
