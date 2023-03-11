import { useMutation } from "@apollo/client";
import {
  IonButton,
  IonIcon,
  IonLabel,
  IonLoading,
  useIonActionSheet,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { DELETE_POST } from "../../hooks/PostController";
import { Haptics } from "@capacitor/haptics";
import "./DeletePost.css";
import { PostConnection } from "../../models/PostTypes";

interface Props {
  postId: number;
  index: number;
  posts: PostConnection;
  setPosts: React.Dispatch<React.SetStateAction<PostConnection | null>>;
}
const DeletePost: React.FC<Props> = ({ postId, index, posts, setPosts }) => {
  const [deletePost, { loading }] = useMutation(DELETE_POST);
  const [present] = useIonActionSheet();
  console.log(postId);

  //delete post from list of posts
  const deletePostFromList = () => {
    let nodes = posts.nodes;
    nodes.splice(index, 1);
    console.log("After splice: ", {
      ...posts,
      nodes: nodes,
      totalCount: posts.totalCount - 1,
    });

    setPosts({
      ...posts,
      nodes: nodes,
      totalCount: posts.totalCount - 1,
    });
  };

  const deleteHandler = async () => {
    await Haptics.vibrate();
    present({
      header: "Confirm the action",
      buttons: [
        {
          text: "Delete",
          role: "destructive",
          data: {
            action: "delete",
          },
        },
        {
          text: "Cancel",
          role: "cancel",
          data: {
            action: "cancel",
          },
        },
      ],
      onDidDismiss: async ({ detail }) => {
        if (detail.role === "destructive") {
          try {
            const deleteRes = await deletePost({
              variables: {
                input: { id: postId },
              },
            });
            if (deleteRes.data) {
              deletePostFromList();
            }
            console.log("deleting...");
          } catch (err) {
            console.error("Error deleting: ", err);
          }
        }
      },
    });
  };

  return (
    <>
      <IonButton
        className="ion-padding-end"
        size="small"
        color="danger"
        onClick={() => deleteHandler()}
      >
        <IonIcon slot="start" icon={trash} />
        <IonLabel>Delete</IonLabel>
      </IonButton>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        message={"Please wait..."}
      />
    </>
  );
};

export default DeletePost;
