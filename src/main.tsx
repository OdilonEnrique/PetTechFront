import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./styles/global.css";
import "./styles/buttons.css";
import "./styles/header.css";
import "./styles/feed.css";
import "./styles/post-card.css";
import "./styles/modal.css";
import "./styles/forms.css";
import "./styles/animal.css";
import "./styles/post-detail.css";
import "./styles/comments.css";
import "./styles/responsive.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
);
