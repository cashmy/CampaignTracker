import React from "react";
import AppPage from "../core/AppLayout/AppPage";
import asyncComponent from "../../lib/components/AppAsyncComponent";

const Error503 = asyncComponent(() => import("../modules/errorPages/Error503"));
export default AppPage(() => <Error503 />);
