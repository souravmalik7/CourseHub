import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./assets/css/App.css";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import AdminDashboard from "./components/Admin/AdminDashboard";
import Home from "./pages/Home";
import CoursePage from "./pages/CoursePage";
import Coupons from "./components/coupons";
import Wishlist from "./components/Wishlist/Wishlist";
import Logout from "./components/Sign out";
import Cart from "./pages/Cart";
import Order from "./components/Order/Order";
import ActiveOrderOpen from "./components/Order/ActiveOrderOpen";
import Topics from "./components/DiscussionThread/Topics";
import TopicDetails from "./components/DiscussionThread/TopicDetails";
import NewThread from "./components/DiscussionThread/NewThread";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <div className="App">


      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          {/* <Route exact path="/profile" element={<Profile />} /> */}
          <Route exact path="/forgotPassword" element={<ForgotPassword />} />
          <Route exact path="/admin" element={<AdminDashboard />} />
          <Route exact path="/home" element={<Home />} />
          <Route exact path="/courses/:courseName" element={<CoursePage />} />
          <Route exact path="/my-account" element={<Profile />} />
          <Route exact path="/discount" element={<Coupons />} />
          <Route exact path="/order" element={<Order />} />
          <Route exact path="/order/:orderId" element={<ActiveOrderOpen />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/discussion" element={<Topics />} />
          <Route exact path="/discussion/topic/:topicId" element={<TopicDetails />} />
          <Route exact path="/discussion/new-thread" element={<NewThread />} />
          <Route exact path="/logout" element={<Logout />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route
            exact
            path="/authenticate/forgotPassword"
            element={<ForgotPassword />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
