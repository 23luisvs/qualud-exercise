import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonModal,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useRef } from "react";

interface Props {}
const AddPost: React.FC<Props> = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="center" edge={true}>
        <IonFabButton id="add-post">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal ref={modal} trigger="add-post">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonTitle className="ion-text-center">Add Post</IonTitle>
            <IonButtons slot="end">
              <IonButton strong={true} onClick={() => modal.current?.dismiss()}>
                Confirm
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonItem>
            <IonLabel position="stacked">Enter your name</IonLabel>
            <IonInput type="text" placeholder="Your name" />
          </IonItem>
        </IonContent>
      </IonModal>
    </>
  );
};

export default AddPost;
