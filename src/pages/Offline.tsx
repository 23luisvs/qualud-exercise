import {
  IonContent,
  IonIcon,
  IonLabel,
  IonPage,
} from "@ionic/react";
import { warningOutline } from "ionicons/icons";
import Header from "../components/Header";
import "./Home.css";

const Offline: React.FC = () => {
  return (
    <IonPage>
      <Header pageTitle="You are offline" />
      <IonContent fullscreen>
        <div className="container">
          <h3>
            <IonLabel><IonIcon slot="start" icon={warningOutline} color="danger" /> Ups, you are offline!</IonLabel>
          </h3>
          <p>Please check your internet connection.</p>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Offline;
