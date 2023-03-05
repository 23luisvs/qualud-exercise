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
import MenuItem from "./MenuItem";

interface ContainerProps {}

const Menu: React.FC<ContainerProps> = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
          <IonButtons slot="end">
            <IonItem lines="none" button>
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
      <IonContent className="ion-padding">
        <IonMenuToggle>
          <IonList>
            <MenuItem link="/home">Home</MenuItem>
            <MenuItem link="/users">Users</MenuItem>
            <MenuItem link="/posts">Posts</MenuItem>
          </IonList>
          <div className="ion-text-end">
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
