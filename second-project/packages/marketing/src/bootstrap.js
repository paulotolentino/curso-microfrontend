import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./app";

const mount = (el, { onNavigate, initialPathname, defaultHistory }) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  if (initialPathname) {
    const { pathname } = history.location;
    if (pathname !== initialPathname) {
      history.push(initialPathname);
    }
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    const defaultHistory = createBrowserHistory();
    mount(devRoot, { defaultHistory });
  }
}

export { mount };
