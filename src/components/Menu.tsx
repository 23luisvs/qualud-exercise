import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
  IonItem,
  IonMenuToggle,
  IonButtons,
  IonIcon,
  IonButton,
} from "@ionic/react";
import { close, exitOutline, moonOutline } from "ionicons/icons";
import { useAuth } from "../store/AuthContext";
import { useTheme } from "../store/ThemeContext";
import MenuItem from "./MenuItem";

interface ContainerProps {}

const Menu: React.FC<ContainerProps> = () => {
  const {dark,setThemeDark} = useTheme();
  const {user}=useAuth();
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>{user?.name}</IonTitle>
          <IonButtons slot="end">
            <IonItem
              lines="none"
              button
              onClick={() => setThemeDark(!dark)}
            >
              <IonIcon icon={moonOutline}></IonIcon>
            </IonItem>
            <IonItem lines="none" button>
              <IonMenuToggle>
                <IonIcon className="icon" icon={close} />
              </IonMenuToggle>
            </IonItem>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="">
        <IonMenuToggle>
          <MenuItem link="/home">Home</MenuItem>
          <MenuItem link="/users">Users</MenuItem>
          <MenuItem link="/posts">Posts</MenuItem>
          <div className="ion-text-end ion-padding">
            <IonButton onClick={() => console.log("Sign out")}>
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
