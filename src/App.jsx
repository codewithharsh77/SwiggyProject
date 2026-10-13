import Header from "./Components/Header";
import Body from "./Components/Body";
import { Route, Routes } from "react-router-dom";
import RestaurantMenu from "./Components/RestaurantMenu";
import { LocationProvider } from "./context/contextApi";
import Cart from "./Components/Cart";
import { useSelector } from "react-redux";
import SignIn from "./Components/SignIn";
import Search from "./Components/Search";

function App() {

  const visible = useSelector(
    (state) => state.toogleSlice.searchBarToogle
  );

  const loginVisible = useSelector(
    (state) => state.toogleSlice.loginToggle
  );

  return (
    <LocationProvider>

      <div
        className={
          visible || loginVisible
            ? "max-h-screen overflow-hidden"
            : ""
        }
      >

        <Routes>

          <Route path="/" element={<Header />}>

            {/* Home */}
            <Route
              index
              element={<Body />}
            />

            {/* Restaurant Menu */}
            <Route
              path="restaurantMenu/:id"
              element={<RestaurantMenu />}
            />

            {/* Cart */}
            <Route
              path="cart"
              element={<Cart />}
            />

            {/* Sign In */}
            <Route
              path="sigin"
              element={<SignIn />}
            />

            {/* Search */}
            <Route
              path="search"
              element={<Search />}
            />

          </Route>

        </Routes>

      </div>

    </LocationProvider>
  );
}

export default App;