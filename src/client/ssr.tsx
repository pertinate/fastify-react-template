import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import Router from "./router";

export function render(url: string) {
  return ReactDOMServer.renderToString(
    <StaticRouter location={url}>
      <Router />
    </StaticRouter>
  );
}
