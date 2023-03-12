import { useMutation } from "@apollo/client";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonDatetime,
  IonFab,
  IonFabButton,
  IonFooter,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonModal,
  IonNote,
  IonRow,
  IonTitle,
  IonToggle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { add } from "ionicons/icons";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  CreateTodoFormData,
  createTodoSchema,
  CREATE_TODO,
} from "../../hooks/TodoController";
import { Todo } from "../../models/TodoTypes";
import { useAuth } from "../../store/AuthContext";

interface Props {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}
const CreateTodo: React.FC<Props> = ({ todos, setTodos }) => {
  const { user } = useAuth();
  const [createTodo, { loading }] = useMutation(CREATE_TODO);
  const modalCreateTodo = useRef<HTMLIonModalElement>(null);
  const dueOn = useRef<HTMLIonDatetimeElement>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [present] = useIonToast();
  let today = new Date();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateTodoFormData>({ resolver: yupResolver(createTodoSchema) });
  const onSubmit = async (dataForm: CreateTodoFormData) => {
    try {
      const todoRes = await createTodo({
        variables: {
          input: {
            title: dataForm.title,
            dueOn: dueOn.current?.value,
            status: isCompleted ? "completed" : "pending",
            userId: user?.id,
          },
        },
      });
      let listTodos: Todo[] = [...todos];
      listTodos.push(todoRes.data.createTodo.todo as Todo);
      setTodos(listTodos);
      reset({ title: "" });
      modalCreateTodo.current?.dismiss();
      setIsCompleted(false);
      console.log("creaDA", todoRes);
    } catch (err) {
      present({
        message: err + "",
        duration: 2500,
        position: "top",
        color: "danger",
      });
      console.log(err);
    }
  };

  return (
    <>
      <IonFab slot="fixed" vertical="bottom" horizontal="end" edge={true}>
        <IonFabButton id="add-todo">
          <IonIcon icon={add}></IonIcon>
        </IonFabButton>
      </IonFab>
      <IonModal ref={modalCreateTodo} trigger="add-todo">
        <IonHeader>
          <IonToolbar>
            <IonTitle className="ion-text-center">Create Todo</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="ion-padding">
          <form id="create-todo-form" onSubmit={handleSubmit(onSubmit)}>
            <IonGrid>
              <IonRow>
                <IonCol>
                  <IonItem
                    className={`ion-margin-bottom ${
                      !errors.title && "ion-valid"
                    } ${errors.title && "ion-invalid"}`}
                  >
                    <IonLabel position="floating">Title</IonLabel>
                    <IonInput
                      placeholder="Enter title"
                      {...register("title")}
                    ></IonInput>
                    <IonNote slot="helper">Required.</IonNote>
                    <IonNote slot="error">{errors.title?.message}</IonNote>
                  </IonItem>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonDatetime
                    ref={dueOn}
                    value={today.toISOString()}
                    min={today.toISOString()}
                  ></IonDatetime>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel>Is completed</IonLabel>
                    <IonToggle
                      checked={isCompleted}
                      onIonChange={() => setIsCompleted(!isCompleted)}
                      slot="end"
                    ></IonToggle>
                  </IonItem>
                </IonCol>
              </IonRow>
            </IonGrid>
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
              <IonButton onClick={() => modalCreateTodo.current?.dismiss()}>
                Cancel
              </IonButton>
            </IonButtons>
            <IonButton
              slot="end"
              type="submit"
              form="create-todo-form"
              color="primary"
            >
              Create
            </IonButton>
          </IonToolbar>
        </IonFooter>
      </IonModal>
    </>
  );
};

export default CreateTodo;
