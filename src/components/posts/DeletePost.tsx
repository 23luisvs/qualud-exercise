import { useMutation } from "@apollo/client";
import {
  IonButton,
  IonIcon,
  IonLabel,
  IonLoading,
  useIonActionSheet,
} from "@ionic/react";
import { trash } from "ionicons/icons";
import { useEffect } from "react";
import { CREATE_POST, DELETE_POST } from "../../hooks/PostController";
import { useAuth } from "../../store/AuthContext";
import { Haptics } from "@capacitor/haptics";
import "./DeletePost.css";
import { Post, PostConnection } from "../../models/PostTypes";

interface Props {
  postId: number;
  index: number;
  posts: PostConnection;
  setPosts: React.Dispatch<React.SetStateAction<PostConnection | null>>;
}
const DeletePost: React.FC<Props> = ({ postId, index, posts, setPosts }) => {
  const { user } = useAuth();
  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST);
  const [present] = useIonActionSheet();
  console.log(postId);
  

  //if create post success close modal and reload user posts
  useEffect(() => {
    if (data && !error) {
      console.log("deleted", data.post.id);
      let templist = posts.nodes;
      setPosts({ ...posts, nodes: templist.splice(index, 1) });
    }
  }, [data]);
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
      onDidDismiss: ({ detail }) => {
        if (detail.role === "destructive") {
          deletePost({
            variables: {
              input: { id: postId },
            },
          });
          console.log("deleting...");
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
