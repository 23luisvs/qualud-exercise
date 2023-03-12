import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonItem,
  IonMenuToggle,
  IonButtons,
  IonIcon,
  IonButton,
  IonLabel,
} from "@ionic/react";
import { close, exitOutline, moon, sunny } from "ionicons/icons";
import { useAuth } from "../store/AuthContext";
import { useTheme } from "../store/ThemeContext";
import MenuItem from "./MenuItem";

interface ContainerProps {}

const Menu: React.FC<ContainerProps> = () => {
  const { dark, setThemeDark } = useTheme();
  const { user, logout } = useAuth();
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            <IonLabel>{user?.name}</IonLabel>
          </IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => setThemeDark(!dark)}>
              <IonIcon icon={dark ? sunny : moon}></IonIcon>
            </IonButton>
            <IonMenuToggle>
              <IonItem lines="none" button>
                <IonIcon className="icon" icon={close} />
              </IonItem>
            </IonMenuToggle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="">
        <IonMenuToggle>
          <MenuItem link="/home">Home</MenuItem>
          <MenuItem link="/users">Users</MenuItem>
          <MenuItem link="/posts">Posts</MenuItem>
          <div className="ion-text-end ion-padding">
            <IonButton onClick={() => logout()}>
              Sign Out
              <IonIcon slot="end" icon={exitOutline}></IonIcon>
            </IonButton>
          </div>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
