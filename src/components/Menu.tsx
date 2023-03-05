import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
} from "@ionic/react";

interface ContainerProps {}

const Menu: React.FC<ContainerProps> = () => {
  return (
    <IonMenu contentId="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">This is the menu content.</IonContent>
    </IonMenu>
  );
};

export default Menu;
