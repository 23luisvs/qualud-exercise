import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonSkeletonText,
  IonCardSubtitle,
  IonCardContent,
  IonText,
  IonLabel,
} from "@ionic/react";

const PostsSkeletons = () => {
  return (
    <>
      {"4444".split("").map((ele: string, index: number) => {
        return (
          <IonCard key={index}>
            <IonCardHeader>
              <IonCardTitle>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "100%" }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "100%" }}
                ></IonSkeletonText>
              </IonCardTitle>
              <IonCardSubtitle>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "45%" }}
                ></IonSkeletonText>
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="ion-text-justify">
                <IonSkeletonText
                  animated={true}
                  style={{ width: "100" }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "100" }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "100" }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "100" }}
                ></IonSkeletonText>
                <IonSkeletonText
                  animated={true}
                  style={{ width: "100" }}
                ></IonSkeletonText>
              </div>
              <div className="ion-text-end">
                {
                  <IonText className="q-flex ion-justify-content-end ion-align-items-center">
                    <IonLabel className="mr-5">
                      <IonSkeletonText
                        animated={true}
                        style={{ width: "5%" }}
                      ></IonSkeletonText>
                    </IonLabel>
                  </IonText>
                }
              </div>
            </IonCardContent>
          </IonCard>
        );
      })}
    </>
  );
};

export default PostsSkeletons;
