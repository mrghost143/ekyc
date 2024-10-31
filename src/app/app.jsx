

// import { Header, Aside } from "@layout"
import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Loader } from "../shared/components";
const Routing = lazy(() => import("./route"));
const Header = lazy(() => import("@layout/header"));
const Aside = lazy(() => import("@layout/aside"));

export const App = () => {


  return (
    <Router>
      <Suspense fallback={<Loader size={"lg"} />}>
        <Header />
        <main >
          <Aside />
          <Routing />
        </main>
      </Suspense>

    </Router>

  )
}