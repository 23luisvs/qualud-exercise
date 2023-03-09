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
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect } from "react";
import ExploreContainer from "../../components/ExploreContainer";
import Header from "../../components/Header";
import { showPostsQuantity } from "../../hooks/Post";
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
  const skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
        <IonList>
          <IonListHeader className="ion-padding-end">
            <IonLabel>
              Users list {data && <span>({data.users.totalCount})</span>}
            </IonLabel>
          </IonListHeader>
          {data &&
            data.users.nodes.map((user: User, index: number) => {
              return (
                <IonItem key={index}>
                  <IonLabel>
                    <p>{user.name}</p>
                    <small>{user.email}</small>
                  </IonLabel>
                  <IonBadge slot="end">
                    {showPostsQuantity(user.posts.totalCount)}
                  </IonBadge>
                </IonItem>
              );
            })}
          {loading &&
            skeleton.map((index: number) => {
              return (
                <IonItem key={index}>
                  <IonLabel>
                    <p>
                      <IonSkeletonText
                        animated={true}
                        style={{ width: "45%" }}
                      ></IonSkeletonText>
                    </p>
                    <small>
                      <IonSkeletonText
                        animated={true}
                        style={{ width: "80%" }}
                      ></IonSkeletonText>
                    </small>
                  </IonLabel>
                </IonItem>
              );
            })}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Users;
