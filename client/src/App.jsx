import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Pages
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import CreateEvent from "./pages/CreateEvent";
import EditEvent from "./pages/EditEvent";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import MyEvents from "./pages/MyEvents";
import MyTickets from "./pages/MyTickets";
import CheckIn from "./pages/CheckIn";
import Onboarding from "./pages/Onboarding";





// Components
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/explore" element={<Explore />} />



        {/* Protected Routes */}
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateEvent />
            </ProtectedRoute>
          }
        />

        <Route
          path="/events/:id/edit"                   
          element={
            <ProtectedRoute>
              <EditEvent />
            </ProtectedRoute>
          }
        />

        <Route
           path="/my-events"
           element={
               <ProtectedRoute>
               <MyEvents />
               </ProtectedRoute>
      }
         />

         <Route
  path="/my-tickets"
  element={
    <ProtectedRoute>
      <MyTickets />
    </ProtectedRoute>
  }
/>

<Route
  path="/check-in"
  element={
    <ProtectedRoute>
      <CheckIn />
    </ProtectedRoute>
  }
/>


<Route
  path="/onboarding"
  element={
    <ProtectedRoute>
      <Onboarding />
    </ProtectedRoute>
  }
/>



      </Routes>
    </Router>
  );
}

export default App;