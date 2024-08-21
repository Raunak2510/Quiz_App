
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from "react-router-dom";
import Protected from "./private_route.js";
import Login from "../components/login/index.js";
import SignUp from "../components/signup/index.js";
import QuestionDashboard from "../pages/question-dashboard/index.js";
import { redirectIfAuthenticated } from "./helper.js";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* Protected Route, only accessible if logged in */}
      <Route element={<Protected />}>
        <Route index element={<QuestionDashboard />} />
      </Route>
      {/* Public Routes for Login and Signup */}
      <Route path="login" element={<Login />} loader={redirectIfAuthenticated} />
      <Route path="register" element={<SignUp />} loader={redirectIfAuthenticated} />
    </Route>
  )
);

const Index = () => {
  return <RouterProvider router={router} />;
}

export default Index;
