import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { MainLayout } from "./layouts/main";
import PostById from "./pages/PostById";
import PageNotFound from "./pages/not-found";
import { PostsPage } from "./pages/posts";
import { UsersPage } from "./pages/users";
import UserById from "./pages/usersById";
import { HomePage } from "./pages/homePage";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route errorElement={<ErrorBoundary />} element={<MainLayout />}>
      <Route
        index={true}
        element={
          <HomePage />
        }
      />
        <Route path="users" element={<UsersPage />} />
        <Route
          path="/users/:id" 
          element={<UserById />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="posts"
          element={<PostsPage />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="post-info/:id"
          element={<PostById />}
          errorElement={<ErrorBoundary />}
        />
        <Route
          path="404"
          element={<PageNotFound />}
          errorElement={<ErrorBoundary />}
        />
    </Route>
  )
);

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}>
      </RouterProvider>
    </QueryClientProvider>
  );
}

export default App;
