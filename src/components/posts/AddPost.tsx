import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonNote,
  IonTextarea,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  CreatePostFormData,
  createPostSchema,
  CREATE_POST,
} from "../../hooks/PostController";
import { useAuth } from "../../store/AuthContext";

interface Props {
  myPostsAfterCreateHandler: () => void;
}
const AddPost: React.FC<Props> = ({ myPostsAfterCreateHandler }) => {
  const { user } = useAuth();
  const [createPost, { data, loading }] = useMutation(CREATE_POST);
  const modal = useRef<HTMLIonModalElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePostFormData>({ resolver: yupResolver(createPostSchema) });
  const onSubmit = (dataForm: CreatePostFormData) => {
    createPost({
      variables: {
        input: { title: dataForm.title, body: dataForm.body, userId: user?.id },
      },
    });
    console.log("Submited");
  };
  //if create post success close modal and reload user posts
  useEffect(()=>{
    if(data){
      myPostsAfterCreateHandler();
      modal.current?.dismiss();
    }
  },[data,myPostsAfterCreateHandler]);

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="center" edge={true}>
        <IonFabButton id="add-post">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal ref={modal} trigger="add-post">
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">Add Post</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <form id="create-post-form" onSubmit={handleSubmit(onSubmit)}>
            <IonItem
              className={`ion-margin-bottom ${!errors.title && "ion-valid"} ${
                errors.title && "ion-invalid"
              }`}
            >
              <IonLabel position="floating">Title</IonLabel>
              <IonInput
                placeholder="Enter title"
                {...register("title")}
              ></IonInput>
              <IonNote slot="helper">Required.</IonNote>
              <IonNote slot="error">{errors.title?.message}</IonNote>
            </IonItem>
            <IonItem
              className={`ion-margin-bottom ${!errors.body && "ion-valid"} ${
                errors.body && "ion-invalid"
              }`}
            >
              <IonLabel position="floating">Body</IonLabel>
              <IonTextarea
                placeholder="Enter the content"
                autoGrow={true}
                {...register("body")}
              ></IonTextarea>
              <IonNote slot="helper">Required.</IonNote>
              <IonNote slot="error">{errors.body?.message}</IonNote>
            </IonItem>
          </form>
          <IonLoading
            cssClass="my-custom-class"
            isOpen={loading}
            message={"Please wait..."}
          />
        </IonContent>
        <IonFooter>
          <IonToolbar className="ion-padding-start ion-padding-end">
            <IonButtons slot="start">
              <IonButton onClick={() => modal.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonButton
              slot="end"
              type="submit"
              form="create-post-form"
              color="primary"
            >
              Confirm
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    </>
  );
};

export default AddPost;
