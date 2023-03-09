import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { gql, useQuery } from "@apollo/client";
import Header from "../components/Header";
import "./Home.css";
import { Icon } from "ionicons/dist/types/components/icon/icon";
import { arrowForward } from "ionicons/icons";

const ALL_USERS = gql`
  query {
    users {
      nodes {
        id
        name
      }
      totalCount
    }
  }
`;

const Home: React.FC = () => {
  const result = useQuery(ALL_USERS);
  console.log(result);

  return (
    <IonPage>
      <Header page="Not Found" />
      <IonContent fullscreen>
        <div className="ion-padding ion-align-items-center ion-justify-content-center">
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Users</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ul>
                <li>
                  El usuario debe poder ver una lista de usuarios existentes.
                </li>
                <li>
                  El usuario debe poder ver la cantidad de post que tiene cada
                  usuario en el mismo listado.
                </li>
              </ul>
              <IonButton>
                Go to page <IonIcon slot="end" icon={arrowForward} />
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
