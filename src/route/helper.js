
import { redirect } from "react-router-dom";


export const isAuthenticated = () => {
 
  return !!localStorage.getItem('authToken'); 
};

// Loader to redirect authenticated users away from login and signup pages
export const redirectIfAuthenticated = async () => {
  if (isAuthenticated()) {
    return redirect('/'); // Redirect to the dashboard if already authenticated
  }
  return null;
};
