import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import Header from '../../components/Header';

const Users: React.FC = () => {
  return (
    <IonPage>
      <Header page="Users"/>
      <IonContent fullscreen>
        <h3>Users</h3>
        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Users;
