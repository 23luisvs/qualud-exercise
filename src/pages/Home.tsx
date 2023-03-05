import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { gql, useQuery } from "@apollo/client";
import Header from "../components/Header";
import "./Home.css";

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
        
      </IonContent>
    </IonPage>
  );
};

export default Home;
