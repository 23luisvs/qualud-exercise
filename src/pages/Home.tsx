import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import Header from '../components/Header';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header page='Home'/>
      <IonContent fullscreen>
        <h3>Home</h3>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
