import {
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
  IonPage,
  IonRow,
  IonTabBar,
  IonToggle,
} from "@ionic/react";
import { checkmarkCircle, ellipse } from "ionicons/icons";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import CreateTodo from "../../components/todos/CreateTodo";
import { showDate, showTodosQuantity } from "../../hooks/TodoController";
import { Todo } from "../../models/TodoTypes";
import { useAuth } from "../../store/AuthContext";

const Todos: React.FC = () => {
  const { user } = useAuth();
  const [todos, setTodos] = useState<Todo[]>([]);
  useEffect(() => {
    if (user) setTodos(user.todos.nodes);
  }, [user]);
  return (
    <IonPage>
      <Header pageTitle="Todos" backButton={true} />
      <IonContent fullscreen>
        <div className="ion-padding ion-align-items-center ion-justify-content-center">
          {todos.map((todo: Todo, index: number) => {
            return (
              <IonCard key={index}>
                <IonCardHeader>
                  <IonCardTitle>{todo.title}</IonCardTitle>
                  <IonCardSubtitle className="ion-text-end">
                    {"Date: " + showDate(new Date(todo.dueOn))}
                  </IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <IonGrid>
                    <IonRow>
                      <IonCol>
                        <IonItem>
                          <IonIcon
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
                            onIonChange={() => console.log("change")}
                            slot="end"
                          ></IonToggle>
                        </IonItem>
                      </IonCol>
                    </IonRow>
                  </IonGrid>
                </IonCardContent>
              </IonCard>
            );
          })}
          <CreateTodo todos={todos} setTodos={setTodos} />
        </div>
      </IonContent>
      <IonFooter>
        <IonTabBar>
          <IonLabel>{showTodosQuantity(todos.length)}</IonLabel>
        </IonTabBar>
      </IonFooter>
    </IonPage>
  );
};

export default Todos;
