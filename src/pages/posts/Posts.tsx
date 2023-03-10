import { gql, useQuery } from "@apollo/client";
import {
  IonBadge,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
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
import { add, chatboxEllipses, eye, funnel } from "ionicons/icons";
import { useEffect } from "react";
import ExploreContainer from "../../components/ExploreContainer";
import Header from "../../components/Header";
import { showCommentsQuantity, showPostsQuantity } from "../../hooks/Post";
import { Post } from "../../models/PostTypes";
import { User } from "../../models/UserType";
import { useAuth } from "../../store/AuthContext";
import "./Posts.css";

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
        comments {
          totalCount
        }
      }
      totalCount
    }
  }
`;

const Posts: React.FC = () => {
  const { user } = useAuth();
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
        {data &&
          data.posts.nodes.map((post: Post, index: number) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{post.title}</IonCardTitle>
                  <IonCardSubtitle>
                    {"Author: " + post.user.name}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="ion-text-justify">{post.body}</div>
                  <div className="ion-text-end">
                    {/*showCommentsQuantity(post.comments?.totalCount)*/}
                    {
                      <IonText className="q-flex ion-justify-content-end ion-align-items-center">
                        <IonLabel className="mr-5">
                          {post.comments?.totalCount}
                        </IonLabel>
                        <IonIcon className="mr-5" icon={chatboxEllipses} />
                      </IonText>
                    }
                    {user?.id === post.userId &&
                      post.comments?.totalCount > 0 && (
                        <IonButton size="small">
                          <IonIcon icon={eye} />
                          <IonLabel>Show</IonLabel>
                        </IonButton>
                      )}
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })}
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonButton slot="start" color="primary">
            <IonLabel>Add</IonLabel> <IonIcon slot="start" icon={add} />
          </IonButton>
          <IonButtons color="medium">
            <IonItem lines="none">
              <IonIcon slot="start" icon={funnel} />
              <IonLabel>Filters:</IonLabel>
            </IonItem>
            <IonButton color="primary">
              <IonLabel>Author</IonLabel>
            </IonButton>
            <IonButton color="primary">
              <IonLabel>My posts</IonLabel>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonItem lines="none">
            {data && showPostsQuantity(data.posts.totalCount)}
          </IonItem>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Posts;
