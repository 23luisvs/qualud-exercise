import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { gql, useQuery } from "@apollo/client";
import "./Login.css";

import { User } from "../models/UserType";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../store/AuthContext";
import {
  fetchUser,
  LoginFormData,
  loginSchema,
} from "../hooks/LoginController";

const ALL_USERS = gql`
  query {
    users {
      nodes {
        id
        name
      }
      totalCount
    }
  }
`;

const Home: React.FC = () => {
  /*const result = useQuery(ALL_USERS);
  console.log(result);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };*/
  const { user, login } = useAuth();
  //form schema handler
  const [loading, setLoading] = useState(false);
  const [present] = useIonToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({ resolver: yupResolver(loginSchema) });
  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    if (
      data.username.toLowerCase() === "deepesh" ||
      data.username.toLowerCase() === "shanti"
    ) {
      //let userLogin: User;
      try {
        const res=await fetchUser(
          data.username.toLowerCase() === "deepesh" ? 888662 : 888659
        )
        console.log(res);
        

        //let userLogin: User = await res.data as User;
      } catch (err) {
        console.log("==================================error");

        present({
          message: err + "",
          duration: 2500,
          position: "top",
          color: "danger",
        });
      }
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
            <div className="ion-margin">
              <p>
                Use 'Deepesh' or 'Shanti' in user field and anything for the
                password field.
              </p>
            </div>

            <IonCard className="ion-marginion-margin">
              <IonCardHeader>
                <IonCardTitle>Log In</IonCardTitle>
                <IonCardSubtitle>
                  You must be log in to use this app!
                </IonCardSubtitle>
              </IonCardHeader>

              <IonCardContent>
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
                  <IonButton expand="full" type="submit">
                    Log In
                  </IonButton>
                </form>
              </IonCardContent>
            </IonCard>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
