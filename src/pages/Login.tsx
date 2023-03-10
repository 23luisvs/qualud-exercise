import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonSpinner,
  useIonToast,
} from "@ionic/react";
import { useLazyQuery } from "@apollo/client";
import "./Login.css";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../store/AuthContext";
import {
  GET_FIRST_USER,
  LoginFormData,
  loginSchema,
} from "../hooks/LoginController";
import { User } from "../models/UserType";

const Login: React.FC = () => {
  const [getUser, { loading, error, data }] = useLazyQuery(GET_FIRST_USER);

  const { user, login } = useAuth();
  const [present] = useIonToast();
  //hook used to save user. When data change, if exist data means that the query returned an user.
  useEffect(() => {
    if (data) {
      //se ordena para usar el Usuario con mayor cantidad de posts y tener mayor oportunidad ver comentarios.
      let toOrderData = [...data.users.nodes];
      toOrderData.sort((a: User, b: User) => {
        return b.posts.totalCount - a.posts.totalCount;
      });
      login(toOrderData[0] as User);
    }
  }, [data, login]);
  //if exist an error lanch a toast
  useEffect(() => {
    if (error)
      present({
        message: error + "",
        duration: 2000,
        position: "top",
        color: "danger",
      });
  }, [error, present]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });
  const onSubmit = (dataForm: LoginFormData) => {
    if (
      dataForm.username.toLowerCase() === "padma" ||
      dataForm.username.toLowerCase() === "saini"
    ) {
      getUser();
    } else {
      console.log("no user exist");
      present({
        message: "Sorry, this user don't exist",
        duration: 2500,
        position: "top",
        color: "danger",
      });
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <div className=" max-w500 ">
            {!user && (
              <div className="ion-margin">
                <p>
                  Use 'Padma' or 'Saini' in user field and anything for the
                  password field.
                </p>
              </div>
            )}

            <IonCard className="ion-marginion-margin">
              <IonCardHeader>
                <IonCardTitle>Log In</IonCardTitle>
                <IonCardSubtitle>
                  {user
                    ? "Welcome " + user.name
                    : "You must be log in to use this app!"}
                </IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
                {!user && (
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <IonItem
                      fill="outline"
                      className={`ion-margin-bottom ${
                        !errors.username && "ion-valid"
                      } ${errors.username && "ion-invalid"}`}
                    >
                      <IonLabel position="floating">User</IonLabel>
                      <IonInput
                        placeholder="Enter user"
                        {...register("username")}
                      ></IonInput>
                      <IonNote slot="helper">Enter a valid username</IonNote>
                      <IonNote slot="error">{errors.username?.message}</IonNote>
                    </IonItem>
                    <IonItem
                      fill="outline"
                      className={`ion-margin-bottom ${
                        !errors.password && "ion-valid"
                      } ${errors.password && "ion-invalid"}`}
                    >
                      <IonLabel position="floating">Password</IonLabel>
                      <IonInput
                        type="password"
                        placeholder="Enter password"
                        {...register("password")}
                      ></IonInput>
                      <IonNote slot="helper">Enter 6 characters</IonNote>
                      <IonNote slot="error">{errors.password?.message}</IonNote>
                    </IonItem>
                    <IonButton
                      expand="full"
                      size="large"
                      type="submit"
                      disabled={loading}
                    >
                      {loading && <IonSpinner name="lines-sharp" />}{" "}
                      &nbsp;&nbsp;Log In&nbsp;&nbsp;
                    </IonButton>
                  </form>
                )}
                {user && (
                  <div>
                    <p>
                      Email: <strong>{user.email}</strong>
                    </p>
                    <p>
                      Gender: <strong>{user.gender}</strong>
                    </p>
                  </div>
                )}
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
