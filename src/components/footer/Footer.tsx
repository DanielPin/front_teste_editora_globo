import { BottomNavigation, BottomNavigationAction, Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <BottomNavigation>
      <Link to={`/novaNoticia`}>
        <BottomNavigationAction label="Nearby" icon={<AddIcon />} />
      </Link>
    </BottomNavigation>
  );
}


