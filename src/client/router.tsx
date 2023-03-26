import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="bg-black">
            <p>hello world</p>
          </div>
        }
      ></Route>
      <Route path="/not-found" element={<>not found</>} />
    </Routes>
  );
};
