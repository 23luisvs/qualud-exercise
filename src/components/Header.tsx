import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonIcon,
} from "@ionic/react";
import { moonOutline } from "ionicons/icons";

interface ContainerProps {
  page?: string;
}

const Header: React.FC<ContainerProps> = ({ page }) => {
  return (
    <IonHeader>
      <IonToolbar>
        <IonTitle>{page}</IonTitle>
        <IonButtons slot="end">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
