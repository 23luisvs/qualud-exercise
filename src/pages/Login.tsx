import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { gql, useQuery } from "@apollo/client";
import "./Login.css";

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
      <IonContent fullscreen>
        <div className="container">
          <IonCard className="ion-margin max-w500">
            <IonCardHeader>
              <IonCardTitle>Log In</IonCardTitle>
              <IonCardSubtitle>
                You must be log in to use this app!
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <form>
                <IonItem fill="outline">
                  <IonLabel position="floating">User</IonLabel>
                  <IonInput placeholder="Enter text"></IonInput>
                </IonItem>
                <IonItem fill="outline">
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput type="password" placeholder="Enter text"></IonInput>
                </IonItem>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
