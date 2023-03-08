import {
    IonButton,
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
  const handleSubmit=(e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <IonCard className="ion-margin max-w500 ion-margin">
            <IonCardHeader>
              <IonCardTitle>Log In</IonCardTitle>
              <IonCardSubtitle>
                You must be log in to use this app!
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent>
              <form onSubmit={handleSubmit}>
                <IonItem fill="outline" className="ion-margin-bottom">
                  <IonLabel position="floating">User</IonLabel>
                  <IonInput placeholder="Enter user"></IonInput>
                </IonItem>
                <IonItem fill="outline" className="ion-margin-bottom">
                  <IonLabel position="floating">Password</IonLabel>
                  <IonInput type="password" placeholder="Enter password"></IonInput>
                </IonItem>
                <IonButton expand="full" type="submit">Log In</IonButton>
              </form>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
