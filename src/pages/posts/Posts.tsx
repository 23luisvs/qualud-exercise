import { gql, useQuery } from "@apollo/client";
import {
  IonBadge,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
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

const ALL_POSTS = gql`
  query {
    posts {
      pageInfo {
        endCursor
        hasNextPage
        hasPreviousPage
        startCursor
      }
      nodes {
        id
        title
        body
        user {
          id
          name
        }
        userId
      }
      totalCount
    }
  }
`;

const Posts: React.FC = () => {
  const { data, loading, error } = useQuery(ALL_POSTS);
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
      <Header pageTitle="Posts" backButton={true} />
      <IonContent fullscreen>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Card Title</IonCardTitle>
            <IonCardSubtitle>Card Subtitle</IonCardSubtitle>
          </IonCardHeader>

          <IonCardContent>
            Here's a small text description for the card content. Nothing more,
            nothing less.
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Posts;
