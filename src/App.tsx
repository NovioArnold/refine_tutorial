import React from "react";

import { Refine, GitHubBanner } from "@pankod/refine-core";
import {
  notificationProvider,
  RefineSnackbarProvider,
  CssBaseline,
  GlobalStyles,
  Layout,
  ThemeProvider,
  LightTheme,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-mui";

import routerProvider from "@pankod/refine-react-router-v6";
import DataProvider from "@pankod/refine-simple-rest";
import { MuiInferencer } from "@pankod/refine-inferencer/mui";

function App() {
  return (
    <>
      <GitHubBanner />
      <ThemeProvider theme={LightTheme}>
        <CssBaseline />
        <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
        <RefineSnackbarProvider>
          <Refine
            //dataProvider={dataProvider}
            notificationProvider={notificationProvider}
            Layout={Layout}
            ReadyPage={ReadyPage}
            catchAll={<ErrorComponent />}
            resources={[
              {
                name: 'products',
                list: MuiInferencer,
                create: MuiInferencer,
                edit: MuiInferencer,
                show: MuiInferencer,
              },
            ]}
            routerProvider={routerProvider}
            dataProvider={DataProvider("https://api.fake-rest.refine.dev")}
          />
        </RefineSnackbarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
