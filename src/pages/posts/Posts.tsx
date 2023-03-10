import { gql, useLazyQuery, useQuery } from "@apollo/client";
import {
  IonAccordion,
  IonAccordionGroup,
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
import { ALL_USERS, GET_USER_POSTS_BY_ID } from "../../hooks/UserController";
import {
  ALL_POSTS,
  showCommentsQuantity,
  showPostsQuantity,
} from "../../hooks/PostController";
import { Post, PostConnection } from "../../models/PostTypes";
import { User } from "../../models/UserType";
import { useAuth } from "../../store/AuthContext";
import "./Posts.css";

const Posts: React.FC = () => {
  const { user } = useAuth();
  const allPosts = useQuery(ALL_POSTS);
  const selectListAuthors = useQuery(ALL_USERS);
  const [getUserPosts, userAuthorPosts] = useLazyQuery(GET_USER_POSTS_BY_ID);
  //posts to show (Can be: all posts, my posts or user filter posts)
  const [posts, setPosts] = useState<PostConnection | null>(null);
  const selectAuthor = useRef<HTMLIonSelectElement>(null);
  const [present] = useIonToast();
  //execute when change data or cuando se reciben datos de GET_USER_POSTS_BY_ID
  useEffect(() => {
    if (allPosts.data) {
      console.log("All", allPosts.data);
      setPosts(allPosts.data.posts as PostConnection);
    }
  }, [allPosts.data]);
  //execute cuando se reciben datos de GET_USER_POSTS_BY_ID
  useEffect(() => {
    if (userAuthorPosts.data) {
      console.log("By ID", userAuthorPosts.data);
      setPosts(userAuthorPosts.data.user.posts as PostConnection);
    }
  }, [userAuthorPosts.data]);
  //execute a toast if error
  useEffect(() => {
    if (allPosts.error)
      present({
        message: allPosts.error + "",
        duration: 2000,
        position: "top",
        color: "danger",
      });
  }, [allPosts.error]);
  return (
    <IonPage>
      <Header pageTitle="Posts" backButton={true} />
      <IonContent fullscreen>
        {posts &&
          !allPosts.loading &&
          !userAuthorPosts.loading &&
          posts.nodes.map((post: Post, index: number) => {
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
                  <div className="q-flex ion-justify-content-end ion-align-items-center">
                    {user?.id === post.userId &&
                      post.comments?.totalCount > 0 && (
                        <IonButton className="ion-padding-end" size="small">
                          <IonIcon slot="start" icon={eye} />
                          <IonLabel>Show</IonLabel>
                        </IonButton>
                      )}
                    <IonText className="q-flex ion-justify-content-end ion-align-items-center">
                      <IonLabel className="mr-5">
                        {post.comments?.totalCount}
                      </IonLabel>
                      <IonIcon className="mr-5" icon={chatboxEllipses} />
                    </IonText>
                  </div>
                </IonCardContent>
              </IonCard>
            );
          })}
        {(allPosts.loading || userAuthorPosts.loading) && <PostsSkeletons />}
        <IonFab slot="fixed" vertical="bottom" horizontal="start">
          <IonFabButton size="small">
            <IonIcon icon={add}></IonIcon>
          </IonFabButton>
        </IonFab>
      </IonContent>
      <IonFooter>
        <IonToolbar className="">
          <IonAccordionGroup color="none">
            <IonAccordion value="first" color="none">
              <IonItem slot="header">
                <IonIcon slot="start" icon={funnel}></IonIcon>
                <IonLabel>Filters</IonLabel>
              </IonItem>
              <div slot="content">
                <IonButtons className="ion-padding q-flex ion-justify-content-around">
                  <IonButton
                    color="primary"
                    onClick={() =>
                      getUserPosts({ variables: { id: user?.id } })
                    }
                  >
                    <IonLabel>My posts</IonLabel>
                  </IonButton>
                  <IonButton color="primary" onClick={() => allPosts.refetch()}>
                    <IonLabel>All posts</IonLabel>
                  </IonButton>
                </IonButtons>
                <IonList>
                  <IonItem>
                    <IonLabel>Show posts by author</IonLabel>
                    <IonSelect
                      ref={selectAuthor}
                      interface="action-sheet"
                      placeholder="Select an author tu show his posts."
                      onIonChange={() => {
                        getUserPosts({
                          variables: { id: +selectAuthor.current?.value },
                        });
                      }}
                    >
                      {selectListAuthors.data &&
                        selectListAuthors.data.users.nodes.map(
                          (author: User, index: number) => {
                            return (
                              <IonSelectOption key={index} value={author.id}>
                                <IonLabel>{author.name}</IonLabel>
                              </IonSelectOption>
                            );
                          }
                        )}
                    </IonSelect>
                  </IonItem>
                </IonList>
              </div>
            </IonAccordion>
          </IonAccordionGroup>
        </IonToolbar>
        <IonToolbar>
          <IonItem lines="none">
            {posts && showPostsQuantity(posts.totalCount)}
          </IonItem>
          <IonButtons slot="end">
            <IonButton
              disabled={
                !allPosts.data || !allPosts.data.posts.pageInfo.hasPreviousPage
              }
              onClick={() =>
                allPosts.refetch({
                  before: allPosts.data.posts.pageInfo.startCursor,
                })
              }
            >
              Prev
            </IonButton>
            <IonButton
              disabled={
                !allPosts.data || !allPosts.data.posts.pageInfo.hasNextPage
              }
              onClick={() =>
                allPosts.refetch({
                  after: allPosts.data.posts.pageInfo.endCursor,
                })
              }
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
