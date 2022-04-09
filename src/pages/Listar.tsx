import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Fab,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "../components/nav/Nav";
import { ConexaoApiBuscaNoticias } from "../infra/ConexaoApi";
import style from "../styles/Listar.module.css";

interface Noticias {
  _id: string;
  titulo: string;
  descricao: string;
  dataDePublicacao: string;
}

export function Listar() {
  const [noticias, setNoticias] = useState(new Array());
  const [buscaNoticia, setBuscaNoticia] = useState("");
  const converter = new Array();

  useEffect(() => {
    ConexaoApiBuscaNoticias(buscaNoticia).then((response) => {
      Array.isArray(response.data)
        ? setNoticias(response.data)
        : (converter.push(response.data), setNoticias(converter));
    });
  }, [buscaNoticia]);

  return (
    <>
      <Nav />
      <div className={style.container}>
        <div className={style.box}>
          <h2 className={style.h2Busca}>Busca</h2>
          <input
            className={style.inputBusca}
            type="text"
            placeholder="Buscar por ID"
            value={buscaNoticia}
            onChange={(ev) => setBuscaNoticia(ev.target.value)}
          />
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead className={style.cabecalho}>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                  >
                    Titulo
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                  >
                    Data Publicação
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                  >
                    Detalhes
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {noticias.map((noticia: Noticias) => (
                  <TableRow
                    key={noticia._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">
                      {noticia.titulo}
                    </TableCell>

                    <TableCell component="th" scope="row" align="center">
                      {noticia.dataDePublicacao}
                    </TableCell>

                    <TableCell align="center">
                      <Link to={`/detalhes/${noticia._id}`}>
                        <VisibilityIcon
                          name="olho"
                          sx={{ cursor: "pointer" }}
                          color="disabled"
                        />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      <div className={style.novo}>
        <div className={style.btnAdd}>
          <Link to={`/novaNoticia`}>
            <Fab aria-label="add">
              <AddIcon />
            </Fab>
          </Link>
        </div>
      </div>
    </>
  );
}
