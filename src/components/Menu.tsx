import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
} from "@ionic/react";
import MenuItem from "./MenuItem";

interface ContainerProps {}

const Menu: React.FC<ContainerProps> = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonList>
            <MenuItem link="/home">Home</MenuItem>
            <MenuItem link="/users">Users</MenuItem>
            <MenuItem link="/posts">Posts</MenuItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
