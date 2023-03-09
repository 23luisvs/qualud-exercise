import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonMenuButton,
  IonIcon,
  IonBackButton,
} from "@ionic/react";
import { moonOutline } from "ionicons/icons";

interface ContainerProps {
  pageTitle?: string;
  backButton?: boolean;
}

const Header: React.FC<ContainerProps> = ({ pageTitle, backButton }) => {
  return (
    <IonHeader>
      <IonToolbar>
        {backButton && (
          <IonButtons slot="start">
            <IonBackButton>back</IonBackButton>
          </IonButtons>
        )}
        <IonTitle>{pageTitle}</IonTitle>
        <IonButtons slot="end">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
