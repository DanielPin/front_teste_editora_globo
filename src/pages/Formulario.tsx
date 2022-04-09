import moment from "moment";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Nav } from "../components/nav/Nav";
import {
  ConexaoApiAtualizarNoticia,
  ConexaoApiBuscaNoticias,
  ConexaoApiSalvarNoticia
} from "../infra/ConexaoApi";
import style from "../styles/Formulario.module.css";

export function Formulario() {
  const { _id } = useParams();
  const [status, setStatus] = useState({ type: "", mensagem: "" });
  const [formValues, setFormValues] = useState({titulo: "", descricao: "", dataDePublicacao: ""});
  let editar = false;
  let idEditar = "";

  let navigate = useNavigate();

  if (_id) {
    useEffect(() => {
      ConexaoApiBuscaNoticias(_id).then((response) => {
        response.data.dataDePublicacao = moment(
          response.data.dataDePublicacao,
          "DD/MM/YYYY"
        ).format("YYYY-MM-DD");
        setFormValues(response.data);
      });
    }, []);

    editar = true;
    idEditar = formValues._id;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!(await validate())) return;
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    data.dataDePublicacao = moment(
      data.dataDePublicacao.toString(),
      "YYYY-MM-DD"
    ).format("DD/MM/YYYY");

    editar
      ? await ConexaoApiAtualizarNoticia(idEditar, data)
      : await ConexaoApiSalvarNoticia(data);
    navigate("/");
  };

  async function validate() {
    let schema = yup.object().shape({
      titulo: yup
        .string()
        .min(10, "Titulo minimo 10 caracteres")
        .max(1000, "Titulo maximo 1000 caracteres"),
      descricao: yup
        .string()
        .min(500, "Descricao minimo 500 caracteres")
        .max(7000, "Descricao maximo 7000 caracteres"),
      dataDePublicacao: yup.string(),
    });

    try {
      await schema.validate(formValues);
      return true;
    } catch (err) {
      setStatus({ type: "error", mensagem: err.errors });
      return false;
    }
  }

  return (
    <>
    <Nav />
      <div className={style.container}>
        {status.type === "error" ? (
          <p style={{ color: "#ff0000" }}>{status.mensagem}</p>
        ) : (
          ""
        )}
        <form onSubmit={handleSubmit}>
          <label>
            Titulo:
            <input
              placeholder="Titulo da noticia"
              type="text"
              name="titulo"
              onChange={handleInputChange}
              value={formValues.titulo || ""}
              required
              size={50}
            />
          </label>
          <label>
            Descrição:
            <textarea
              placeholder="Descrição min 500 caracteres e max 7000 caracteres"
              name="descricao"
              onChange={handleInputChange}
              rows="20"
              cols="70"
              value={formValues.descricao || ""}
              required
            />            
          </label>
          {formValues.descricao.length < 500 || formValues.descricao.length > 7000 ? <span style={{ color: "#ff0000" }}>{formValues.descricao.length}</span> : <span >{formValues.descricao.length} </span>}/7000 
          <label>
            Data De Publicação:
            <input
              type="date"
              name="dataDePublicacao"
              min={moment().format("YYYY-MM-DD")}
              onChange={handleInputChange}
              value={formValues.dataDePublicacao || ""}
              required
            />
          </label>
          <Link to="/">
            <button className={style.cancelar}>Cancelar</button>
          </Link>
          <button type="submit" className={style.enviar}>
            Enviar
          </button>
        </form>
      </div>
    </>
  );
}
