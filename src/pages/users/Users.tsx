import { useQuery } from "@apollo/client";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSkeletonText,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect } from "react";
import Header from "../../components/Header";
import { ALL_USERS, showUsersQuantity } from "../../hooks/UserController";
import { showPostsQuantity } from "../../hooks/PostController";
import { User } from "../../models/UserType";

const Users: React.FC = () => {
  const { data, loading, error, refetch } = useQuery(ALL_USERS);
  const [present] = useIonToast();
  useEffect(() => {
    if (error)
      present({
        message: error + "",
        duration: 2000,
        position: "top",
        color: "danger",
      });
  }, [error,present]);
  return (
    <IonPage>
      <Header pageTitle="Users" backButton={true} />
      <IonContent fullscreen>
        <IonList>
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
            "1111111111".split("").map((ele: string, index: number) => {
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
      <IonFooter>
        <IonToolbar>
          <IonItem lines="none">
            {data && showUsersQuantity(data.users.totalCount)}
          </IonItem>
          <IonButtons slot="end">
            <IonButton
              disabled={!data || !data.users.pageInfo.hasPreviousPage}
              onClick={() =>
                refetch({ before: data.users.pageInfo.startCursor })
              }
            >
              Prev
            </IonButton>
            <IonButton
              disabled={!data || !data.users.pageInfo.hasNextPage}
              onClick={() => refetch({ after: data.users.pageInfo.endCursor })}
            >
              Next
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Users;
