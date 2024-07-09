import { Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import CallDetails from "../component/CallDetails.jsx";
import NotFound from "../pages/404.jsx";

export const Routes = (<>
    <Route path="/" element={<Home />} />
    <Route path="call/:id" element={<CallDetails />} />
    <Route path="*" element={<NotFound />} /></>
)