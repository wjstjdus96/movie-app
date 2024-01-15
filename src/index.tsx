import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import App from "./App";
import GlobalStyles from "./styles/GlobalStyles";
import { theme } from "./styles/theme";

const client = new QueryClient();

ReactDOM.render(
  <RecoilRoot>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </RecoilRoot>,
  document.getElementById("root")
);
