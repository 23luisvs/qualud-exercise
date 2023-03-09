import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonIcon,
  IonPage,
} from "@ionic/react";
import Header from "../components/Header";
import "./Home.css";
import { arrowForward } from "ionicons/icons";

const Home: React.FC = () => {
  return (
    <IonPage>
      <Header pageTitle="QUALUD." />
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
              <div className="ion-text-end">
                <IonButton routerLink="/users" routerDirection="forward">
                  Go to page <IonIcon slot="end" icon={arrowForward} />
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
          <IonCard>
            <IonCardHeader>
              <IonCardTitle>Post</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <ul>
                <li>
                  El usuario debe poder ver una lista de publicaciones
                  existentes.
                </li>
                <li>
                  El usuario debe poder filtrar las publicaciones por autor
                </li>
                <li>
                  El usuario debe poder agregar una nueva publicación a la
                  lista.
                </li>
                <li>
                  El usuario debe poder eliminar las publicaciones en las que él
                  es autor.
                </li>
              </ul>
              <div className="ion-text-end">
                <IonButton routerLink="/posts" routerDirection="forward">
                  Go to page <IonIcon slot="end" icon={arrowForward} />
                </IonButton>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
