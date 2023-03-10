import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { defineCustomElements } from "@ionic/pwa-elements/loader";
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
// Call the element loader after the platform has been bootstrapped
defineCustomElements(window);
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: "https://gorest.co.in/public/v2/graphql",
    headers: {
      authorization:
        "Bearer 0f8b90701db4892bff3cd04bde62d025ff54ae8f26aa630ec2eacf2d868c86ff",
    },
  }),
});
const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
