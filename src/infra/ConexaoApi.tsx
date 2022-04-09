import axios from "axios";


export async function ConexaoApiBuscaNoticias(id?: string) {
    
const token = retornaToken();

  if (id) {
    return axios.get(`http://localhost:3000/noticias/${id}`, { headers: { Authorization: token } });
  }

  return axios.get("http://localhost:3000/noticias",{ headers: { Authorization: token } });
}

export async function ConexaoApiExcluirNoticia(id: string) {
    const token = retornaToken();
  return axios.delete(`http://localhost:3000/noticias/${id}`, { headers: { Authorization: token } });
}

export async function ConexaoApiSalvarNoticia(noticia) {
  const token = retornaToken();
  return axios.post("http://localhost:3000/noticias", noticia, { headers: { Authorization: token } });
}

export async function ConexaoApiAtualizarNoticia(id:string, noticia) {
  const token = retornaToken();
  return axios.put(`http://localhost:3000/noticias/${id}`, noticia, { headers: { Authorization: token } });
}

export async function ConexaoApiLogin(login){    
    return axios.post('http://localhost:3000/login', login);
}


function retornaToken(){
    const token = JSON.parse(localStorage.getItem("token") || "{}");
    const AuthStr = `Bearer ${token}`;
    return AuthStr;
}