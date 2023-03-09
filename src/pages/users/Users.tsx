import { gql, useQuery } from "@apollo/client";
import {
  IonBadge,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect } from "react";
import ExploreContainer from "../../components/ExploreContainer";
import Header from "../../components/Header";
import { User } from "../../models/UserType";

const ALL_USERS = gql`
  query {
    users {
      nodes {
        id
        name
        email
        gender
        posts {
          totalCount
        }
      }
      totalCount
    }
  }
`;
const Users: React.FC = () => {
  const { data, loading, error } = useQuery(ALL_USERS);
  const [present] = useIonToast();
  useEffect(() => {
    if (error)
      present({
        message: error + "",
        duration: 2000,
        position: "top",
        color: "danger",
      });
  }, [error]);
  useEffect(() => {
    if (data) console.log(data);
  }, [data]);
  return (
    <IonPage>
      <Header pageTitle="Users" backButton={true} />
      <IonContent fullscreen>
        <div className="ion-margin ion-padding">
          {data && (
            <IonList>
              <IonListHeader>
                <IonLabel>Users list</IonLabel>
              </IonListHeader>
              {data.users.nodes.map((user: User, index: number) => {
                return (
                  <IonItem key={index}>
                    <IonLabel>{user.name}</IonLabel>
                    <IonBadge slot="end">
                      {user.posts.totalCount} posts
                    </IonBadge>
                  </IonItem>
                );
              })}
            </IonList>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Users;
