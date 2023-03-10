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
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonSkeletonText,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { add, chatboxEllipses, eye, funnel } from "ionicons/icons";
import { useEffect, useRef, useState } from "react";
import ExploreContainer from "../../components/ExploreContainer";
import Header from "../../components/Header";
import PostsSkeletons from "../../components/posts/PostsSkeletons";
import {
  ALL_POSTS,
  showCommentsQuantity,
  showPostsQuantity,
} from "../../hooks/PostController";
import { Post } from "../../models/PostTypes";
import { User } from "../../models/UserType";
import { useAuth } from "../../store/AuthContext";
import "./Posts.css";

const Posts: React.FC = () => {
  const { user } = useAuth();
  const { data, loading, error, refetch } = useQuery(ALL_POSTS);
  const [authors, setAutors] = useState<User[]>([]);
  const selectAuthor = useRef<HTMLIonSelectElement>(null);
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
    if (data) {
      console.log(data);
      let tempAuthors: User[] = [];
      //get Authors for the filter by authors
      data.posts.nodes.map((post: Post) => {
        tempAuthors.push(post.user);
      });
      setAutors(tempAuthors);
    }
  }, [data]);
  useEffect(() => {
    console.log(selectAuthor.current?.value);
  }, [selectAuthor]);
  return (
    <IonPage>
      <Header pageTitle="Posts" backButton={true} />
      <IonContent fullscreen>
        {data &&
          !loading &&
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
        {loading && <PostsSkeletons />}
        <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={true}>
          <IonFabButton>
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter>
        <IonToolbar className="ion-padding-start ion-padding-end">
          <IonButtons color="medium">
            <IonItem lines="none">
              <IonIcon slot="start" icon={funnel} />
            </IonItem>
            <IonList>
              <IonItem>
                <IonSelect
                  ref={selectAuthor}
                  interface="action-sheet"
                  placeholder="Author"
                >
                  <IonSelectOption value="0">No filter</IonSelectOption>
                  <IonSelectOption value="oranges">Oranges</IonSelectOption>
                  <IonSelectOption value="bananas">Bananas</IonSelectOption>
                </IonSelect>
              </IonItem>
            </IonList>
            <IonButton color="primary">
              <IonLabel>My posts</IonLabel>
            </IonButton>
            <IonButton color="primary">
              <IonLabel>All</IonLabel>
            </IonButton>
          </IonButtons>
        </IonToolbar>
        <IonToolbar>
          <IonItem lines="none">
            {data && showPostsQuantity(data.posts.totalCount)}
          </IonItem>
          <IonButtons slot="end">
            <IonButton
              disabled={!data || !data.posts.pageInfo.hasPreviousPage}
              onClick={() =>
                refetch({ before: data.posts.pageInfo.startCursor })
              }
            >
              Prev
            </IonButton>
            <IonButton
              disabled={!data || !data.posts.pageInfo.hasNextPage}
              onClick={() => refetch({ after: data.posts.pageInfo.endCursor })}
            >
              Next
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Posts;
