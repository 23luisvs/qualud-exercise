import { Haptics } from "@capacitor/haptics";
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardSubtitle,
  IonCardTitle,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonIcon,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonRow,
  IonToggle,
  IonToolbar,
  useIonActionSheet,
} from "@ionic/react";
import { checkmarkCircle, ellipse, trash } from "ionicons/icons";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import CreateTodo from "../../components/todos/CreateTodo";
import { showDate, showTodosQuantity } from "../../hooks/TodoController";
import { Todo } from "../../models/TodoTypes";
import { useAuth } from "../../store/AuthContext";

const Todos: React.FC = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [present] = useIonActionSheet();
  useEffect(() => {
    if (user) setTodos(user.todos.nodes);
  }, [user]);
  //action para cambiar de estado
  const changeTodoStatus = (index: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      let cloneTodos: Todo[] = [...todos];
      cloneTodos[index] = {
        id: todos[index].id,
        status: todos[index].status === "completed" ? "pending" : "completed",
        dueOn: todos[index].dueOn,
        title: todos[index].title,
      };
      setTodos(cloneTodos);
    }, 1000);
  };
  const deleteHandler = async (index: number) => {
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
          setLoading(true);
          setTimeout(() => {
            setLoading(false);
            let cloneTodos: Todo[] = [...todos];
            cloneTodos.splice(index, 1);
            setTodos(cloneTodos);
          }, 1000);
        }
      },
    });
  };
  return (
    <IonPage>
      <Header pageTitle="Todos" backButton={true} />
      <IonContent fullscreen>
        <div className="ion-padding ion-align-items-center ion-justify-content-center">
          {todos.map((todo: Todo, index: number) => {
            return (
              <IonCard key={index}>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonIcon
                            className="ion-margin-bottom"
                            slot="start"
                            icon={
                              todo.status === "completed"
                                ? checkmarkCircle
                                : ellipse
                            }
                            color={
                              todo.status === "completed" ? "success" : "medium"
                            }
                          />
                          <IonLabel>Is {todo.status}</IonLabel>
                          <IonToggle
                            checked={todo.status === "completed" ? true : false}
                            onIonChange={() => changeTodoStatus(index)}
                            slot="end"
                          ></IonToggle>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonCardTitle>{todo.title}</IonCardTitle>
                        <IonCardSubtitle className="ion-text-end">
                          {"Date: " + showDate(new Date(todo.dueOn))}
                        </IonCardSubtitle>
                      </IonCol>
                    </IonRow>
                    <IonRow>
                      <IonCol>
                        <IonButton
                          className="ion-padding-end"
                          size="small"
                          color="danger"
                          onClick={() => deleteHandler(index)}
                        >
                          <IonIcon slot="start" icon={trash} />
                          <IonLabel>Delete</IonLabel>
                        </IonButton>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            );
          })}
        </div>
        <CreateTodo todos={todos} setTodos={setTodos} />
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <IonItem>
            <IonLabel>{showTodosQuantity(todos.length)}</IonLabel>
          </IonItem>
        </IonToolbar>
      </IonFooter>
      <IonLoading
        cssClass="my-custom-class"
        isOpen={loading}
        message={"Please wait..."}
      />
    </IonPage>
  );
};

export default Todos;
