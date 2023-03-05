import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonIcon,
} from "@ionic/react";
import { moonOutline } from "ionicons/icons";

interface ContainerProps {}

const Header: React.FC<ContainerProps> = () => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>Header</IonTitle>
        <IonButtons slot="end">
          <span className="toogle-theme ion-margin-end">
            <IonIcon icon={moonOutline}></IonIcon>
          </span>
          <IonMenuButton></IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
