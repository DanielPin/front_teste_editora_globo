import { Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FooterCard } from "../components/footer/FooterCard";
import { Nav } from "../components/nav/Nav";
import { ConexaoApiBuscaNoticias } from "../infra/ConexaoApi";
import style from "../styles/Detalhes.module.css";

interface Noticias {
  _id: string;
  titulo: string;
  descricao: string;
  dataDePublicacao: string;
}

export default function Detalhes() {
  const [noticia, setNoticia] = useState<Noticias>();
  const { _id } = useParams();
  const [open, setOpen] = useState(false);

  if (_id) {
    useEffect(() => {
      ConexaoApiBuscaNoticias(_id).then((response) => {
        setNoticia(response.data);
      });
    }, []);
  }

  return (
    <>
    <Nav />
      <div className={style.container}>        
          <Paper
            elevation={24}
            sx={{
              p: 0,
              mb: 0,
              ml: 0,
              flexGrow: 0,
              maxWidth: 1000,             
              overflow:'visible',
              display: { sm: 'block'}
            }}
          >   
          <div style={{ padding: '1rem'}}>     
              <Grid item xs={24} sm container spacing={2} >
                <Grid item sx={{ p: 2, overflow:'visible', }}>
                  <Typography variant="body2">
                    <b> Data De Publicação: </b> {noticia?.dataDePublicacao}
                  </Typography>

                  <Typography variant="body2">
                    <b> Titulo: </b> {noticia?.titulo}
                  </Typography>

                  <Typography variant="body2">
                    <b> DESCRIÇÃO: </b> <p style={{ overflowY:'auto',maxHeight:300}}>{noticia?.descricao}</p>
                  </Typography>                  
                </Grid>
              </Grid>
              </div>    
              <FooterCard open={open} setOpen={setOpen} noticia={noticia}/>
          </Paper>
      </div>
    </>
  );
}
