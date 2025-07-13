import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivitiesDashboard from "../../features/activities/dashboard/ActivitiesDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";

 export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />, 
        children: [
            {path: "", element: <HomePage />},
            {path: "activities", element: <ActivitiesDashboard />},
            {path: "activities/:id", element: <ActivityDetails />},
            {path: "createActivity", element: <ActivityForm key='create' />},
            {path: "manage/:id", element: <ActivityForm />},
        ]
    }
 ])