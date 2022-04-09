import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import style from "../../styles/FooterCard.module.css";
import { Modal } from "../modal/Modal";

export function FooterCard(props) {
  const { open, setOpen, noticia } = props;
  
  return (
    <>
      <div className={style.footer}>
        <div className={style.editar}>
          <Link to={`/editar/${noticia?._id}`}>
            <EditIcon />
          </Link>
        </div>

        <div className={style.deletar}>
          <a onClick={() => setOpen(true)} style={{ cursor: "pointer" }}>
            <DeleteIcon />
          </a>
        </div>
      </div>
      <Modal open={open} setOpen={setOpen} noticia={noticia} />
    </>
  );
}
