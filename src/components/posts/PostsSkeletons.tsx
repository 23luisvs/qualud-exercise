import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonSkeletonText,
  IonCardSubtitle,
  IonCardContent,
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
              </div>
              <div className="ion-text-end">
                <IonSkeletonText
                  slot="end"
                  animated={true}
                  style={{ width: "10%" }}
                ></IonSkeletonText>
              </div>
            </IonCardContent>
          </IonCard>
        );
      })}
    </>
  );
};

export default PostsSkeletons;
