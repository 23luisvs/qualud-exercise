import { useLazyQuery, useQuery } from "@apollo/client";
import {
  IonAccordion,
  IonAccordionGroup,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonRow,
  IonSelect,
  IonSelectOption,
  IonText,
  IonToolbar,
  RefresherEventDetail,
  useIonToast,
} from "@ionic/react";
import {
  chatboxEllipses,
  chevronBack,
  chevronForward,
  funnel,
} from "ionicons/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import Header from "../../components/Header";
import PostsSkeletons from "../../components/posts/PostsSkeletons";
import { ALL_USERS, GET_USER_POSTS_BY_ID } from "../../hooks/UserController";
import { ALL_POSTS, showPostsQuantity } from "../../hooks/PostController";
import { Post, PostConnection } from "../../models/PostTypes";
import { User } from "../../models/UserType";
import { useAuth } from "../../store/AuthContext";
import "./Posts.css";
import AddPost from "../../components/posts/AddPost";
import DeletePost from "../../components/posts/DeletePost";
import ShowComments from "../../components/comments/ShowComments";

const Posts: React.FC = () => {
  const { user } = useAuth();
  /* GraphQL requests */
  const allPosts = useQuery(ALL_POSTS);
  const selectListAuthors = useQuery(ALL_USERS);
  const [getUserPosts, userAuthorPosts] = useLazyQuery(GET_USER_POSTS_BY_ID);
  //posts to show (Can be: all posts, my posts or user filter posts)
  //Of type PostConnection | null
  const [posts, setPosts] = useState<PostConnection | null>(null);
  /*
  0: List all posts.
  1: List user authenticated posts.
  2: List user filter posts.
   */
  const [typeOfPostsList, setTypeOfPostsList] = useState(0);
  const selectedAuthor = useRef<HTMLIonSelectElement>(null);
  const [present] = useIonToast();
  //execute when change data or cuando se reciben datos de GET_USER_POSTS_BY_ID
  useEffect(() => {
    if (allPosts.data) {
      console.log("All", allPosts);
      setPosts(allPosts.data.posts as PostConnection);
    }
  }, [allPosts]);
  //execute cuando se reciben datos de GET_USER_POSTS_BY_ID
  useEffect(() => {
    if (userAuthorPosts.data) {
      console.log("By ID", userAuthorPosts.data);
      setPosts(userAuthorPosts.data.user.posts as PostConnection);
    }
  }, [userAuthorPosts.data]);
  //execute a toast if error
  useEffect(() => {
    if (allPosts.error || userAuthorPosts.error)
      present({
        message: allPosts.error
          ? allPosts.error + ""
          : userAuthorPosts.error + "",
        duration: 2000,
        position: "top",
        color: "danger",
      });
  }, [allPosts.error, userAuthorPosts.error, present]);
  // handler to the button filter MY POSTS
  const myPostsFilterHandler = () => {
    setTypeOfPostsList(1);
    if (userAuthorPosts.data && userAuthorPosts.data.user.id === user?.id) {
      setPosts(userAuthorPosts.data.user.posts);
    } else {
      setPosts(null);
      getUserPosts({ variables: { id: user?.id } });
    }
  };
  const myPostsAfterCreateHandler = useCallback(async () => {
    setTypeOfPostsList(1);
    setPosts(null);
    try {
      await getUserPosts({
        variables: { id: user?.id },
        fetchPolicy: "no-cache",
      });
    } catch (err) {
      console.error(err);
    }
  }, [getUserPosts, user?.id]);
  // handler to the button filter ALL POSTS
  const allPostsFilterHandler = () => {
    if (selectedAuthor.current) selectedAuthor.current.selectedText = "";
    setTypeOfPostsList(0);
    setPosts(allPosts.data.posts as PostConnection);
  };
  // handler to the Select filter User Author
  const selectedAuthorFilterHandler = () => {
    setTypeOfPostsList(2);
    if (
      userAuthorPosts.data &&
      userAuthorPosts.data.user.id === +selectedAuthor.current?.value
    ) {
      setPosts(userAuthorPosts.data.user.posts);
    } else {
      setPosts(null);
      getUserPosts({
        variables: { id: +selectedAuthor.current?.value },
      });
    }
  };
  //refresh data, swipe down
  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    try {
      if (typeOfPostsList === 0) {
        await allPosts.refetch({ fetchPolicy: "no-cache" });
      } else if (typeOfPostsList === 1) {
        await getUserPosts({
          variables: { id: user?.id },
          fetchPolicy: "no-cache",
        });
      } else {
        await getUserPosts({
          variables: {
            id: +selectedAuthor.current?.value,
            fetchPolicy: "no-cache",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
    event.detail.complete();
  };
  return (
    <IonPage>
      <Header pageTitle="Posts" backButton={true} />
      <IonContent fullscreen>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <div className="ion-padding">
          <h2>
            {typeOfPostsList === 0
              ? "List of all posts."
              : typeOfPostsList === 1
              ? "List of my posts"
              : "Posts of " +
                selectListAuthors.data.users.nodes.find((user: User) => {
                  return user.id === selectedAuthor.current?.value;
                }).name +
                "."}
          </h2>
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
                    <IonGrid>
                      <IonRow>
                        <IonCol size="auto">
                          {user?.id === post.userId && (
                            <DeletePost
                              postId={post.id}
                              index={index}
                              posts={posts}
                              setPosts={setPosts}
                            />
                          )}
                        </IonCol>
                        <IonCol>
                          <div className="q-flex ion-justify-content-end ion-align-items-center">
                            {user?.id === post.userId &&
                              post.comments?.totalCount > 0 && (
                                <ShowComments
                                  comments={post.comments}
                                  postId={post.id}
                                />
                              )}
                            <IonText className="q-flex ion-justify-content-end ion-align-items-center">
                              <IonLabel className="mr-5">
                                {post.comments?.totalCount}
                              </IonLabel>
                              <IonIcon
                                className="mr-5"
                                icon={chatboxEllipses}
                              />
                            </IonText>
                          </div>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              );
            })}
          {posts && posts.nodes.length === 0 && (
            <IonCard>
              <IonCardContent>
                <p>List of posts is empty.</p>
              </IonCardContent>
            </IonCard>
          )}
          {(allPosts.loading || userAuthorPosts.loading || posts === null) &&
            !allPosts.error &&
            !userAuthorPosts.error && <PostsSkeletons />}
          {((allPosts.error && typeOfPostsList === 0) ||
            (userAuthorPosts.error &&
              (typeOfPostsList === 1 || typeOfPostsList === 2))) && (
            <p>
              <IonText color="danger" className="ion-text-center">
                Ups, error when fetching data. Please swipe down to refresh.
              </IonText>
            </p>
          )}
        </div>

        <AddPost myPostsAfterCreateHandler={myPostsAfterCreateHandler} />
      </IonContent>
      <IonFooter>
        <IonToolbar className="">
          <IonAccordionGroup color="none">
            <IonAccordion value="first" color="none" toggleIconSlot="start">
              <IonItem slot="header">
                <IonIcon className="ion-padding-end" icon={funnel}></IonIcon>
                <IonLabel>Posts filters</IonLabel>
              </IonItem>
              <div slot="content">
                <IonButtons className="ion-padding q-flex ion-justify-content-around">
                  <IonButton
                    color="primary"
                    onClick={() => myPostsFilterHandler()}
                  >
                    <IonLabel>My posts</IonLabel>
                  </IonButton>
                  <IonButton
                    color="primary"
                    onClick={() => allPostsFilterHandler()}
                  >
                    <IonLabel>All posts</IonLabel>
                  </IonButton>
                </IonButtons>
                <IonList>
                  <IonItem>
                    <IonLabel>Show posts by author</IonLabel>
                    <IonSelect
                      ref={selectedAuthor}
                      onSelect={() => console.log("salest")}
                      interface="action-sheet"
                      placeholder="Select an author tu show his posts."
                      onIonChange={() => selectedAuthorFilterHandler()}
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
                !allPosts.data ||
                !allPosts.data.posts.pageInfo.hasPreviousPage ||
                typeOfPostsList !== 0 ||
                !posts
              }
              onClick={() => {
                setPosts(null);
                allPosts.refetch({
                  before: allPosts.data.posts.pageInfo.startCursor,
                });
              }}
            >
              <IonIcon slot="start" icon={chevronBack} />
              <IonLabel>Prev</IonLabel>
            </IonButton>
            <IonButton
              disabled={
                !allPosts.data ||
                !allPosts.data.posts.pageInfo.hasNextPage ||
                typeOfPostsList !== 0 ||
                !posts
              }
              onClick={() => {
                setPosts(null);
                allPosts.refetch({
                  after: allPosts.data.posts.pageInfo.endCursor,
                });
              }}
            >
              <IonLabel>Next</IonLabel>{" "}
              <IonIcon slot="end" icon={chevronForward} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Posts;
