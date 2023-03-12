import { useMutation } from "@apollo/client";
import { Haptics } from "@capacitor/haptics";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonModal,
  IonTitle,
  IonToolbar,
  useIonActionSheet,
  useIonToast,
} from "@ionic/react";
import { eye, trash } from "ionicons/icons";
import { useRef } from "react";
import { DELETE_COMMENT } from "../../hooks/CommentController";
import { showCommentsQuantity } from "../../hooks/PostController";
import { Comment, CommentConnection } from "../../models/CommentTypes";

interface Props {
  postId: number;
  comments: CommentConnection;
}
const ShowComments: React.FC<Props> = ({ comments, postId }) => {
  const modalShowComments = useRef<HTMLIonModalElement>(null);
  const [present] = useIonActionSheet();
  const [deleteComment, { loading }] = useMutation(DELETE_COMMENT);
  const [presentToast] = useIonToast();

  const deleteHandler = async (idC: number, index: number) => {
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
            const deleteRes = await deleteComment({
              variables: {
                input: { id: idC },
              },
            });
            if (deleteRes.data) {
              comments.nodes.splice(index, 1);
            }
            console.log("deleting...");
          } catch (err) {
            presentToast({
              message: err + "",
              duration: 2000,
              position: "top",
              color: "danger",
            });
            console.error("Error deleting: ", err);
          }
        }
      },
    });
  };
  return (
    <>
      <IonButton
        id={"show-comments-post-" + postId}
        className="ion-padding-end"
        size="small"
      >
        <IonIcon slot="start" icon={eye} />
        <IonLabel>Show</IonLabel>
      </IonButton>
      <IonModal
        ref={modalShowComments}
        trigger={"show-comments-post-" + postId}
      >
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">Comments</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <IonList>
            {comments.nodes.map((comment: Comment, index: number) => {
              return (
                <IonItem key={index}>
                  <IonLabel>
                    <h3>{comment.name}</h3>
                    <p>{comment.body}</p>
                  </IonLabel>
                  <IonButton
                    color="danger"
                    slot="end"
                    onClick={() => deleteHandler(comment.id, index)}
                  >
                    <IonIcon icon={trash} slot="icon-only"></IonIcon>
                  </IonButton>
                </IonItem>
              );
            })}
          </IonList>
        </IonContent>
        <IonFooter>
          <IonToolbar className="ion-padding-start ion-padding-end">
            <IonItem lines="none">
              <IonLabel>{showCommentsQuantity(comments.totalCount)}</IonLabel>
            </IonItem>
            <IonButtons slot="end">
              <IonButton onClick={() => modalShowComments.current?.dismiss()}>
                Close
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonFooter>
      </IonModal>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        message={"Please wait..."}
      />
    </>
  );
};

export default ShowComments;
