import { IonContent, IonPage } from '@ionic/react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import './Home.css';

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <Header pageTitle="Not Found"/>
      <IonContent fullscreen>
        <p>La ruta a la que intenta acceder no existe.</p>
       <h3>Ir al <Link to="/">Inicio</Link></h3>
      </IonContent>
    </IonPage>
  );
};

export default NotFound;