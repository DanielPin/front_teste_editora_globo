import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ConexaoApiExcluirNoticia } from "../../infra/ConexaoApi";

export function Modal(props) {
  let navigate = useNavigate();
  let { open, setOpen, noticia } = props;
  
  const handleClose = () => {
    setOpen(false);
  };

  const excluir = async () => {
    await ConexaoApiExcluirNoticia(noticia._id);
    navigate("/");
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Deseja realmente excluir?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Titulo: {noticia?.titulo}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={excluir}>Excluir</Button>
      </DialogActions>
    </Dialog>
  );
}
