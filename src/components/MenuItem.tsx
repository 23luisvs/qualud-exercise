import "./Header.css";
import { useLocation } from "react-router-dom";
import { IonItem } from "@ionic/react";
interface Props {
  link: string;
  action?: "signin";
  children?: React.ReactNode;
}
const MenuItem: React.FC<Props> = ({ link, action, children }) => {
  let location = useLocation();
  return (
    <IonItem button lines="full" className={location.pathname === link ? "active" : ""} color={location.pathname === link ? "primary" : ""}  routerLink={link}>
        {children}
    </IonItem>
  );
};
export default MenuItem;
