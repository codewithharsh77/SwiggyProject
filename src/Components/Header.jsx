import React, { useContext, useRef, useState } from "react";
import arrowDownSign from "../assets/arrow-down-sign-to-navigate.png";
import bag from "../assets/briefcase.png";
import search from "../assets/search-interface-symbol.png";
import offer from "../assets/sale.png";
import help from "../assets/help.png";
import signIn from "../assets/log-out.png";
import cart from "../assets/shopping-cart.png";
import { Link, Outlet } from "react-router-dom";
import { LocationContext } from "../context/contextApi";
import cross from "../assets/close.png";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toogleSearchBar } from "../utilis/toogleSlice";
import SignIn from "./SignIn";

function Header() {
  const navItems = [
    {
      name: "Search",
      image: <img className="w-5" src={search} alt="" />,
      path: "/search",
    },
    {
      // IMPORTANT: "sign in" same spelling used below
      name: "sign in",
      image: <img className="w-5" src={signIn} alt="" />,
      path: "/sigin",
    },
    {
      name: "Cart",
      image: <img className="w-5" src={cart} alt="" />,
      path: "/cart",
    },
  ];

  const { location, setLocation } = useContext(LocationContext);

  const [searchResult, setSearchResult] = useState([]);
  const timer = useRef(null);

  // Redux data
  const cartData = useSelector(
    (state) => state.cartSlice.cartItems
  );

  const userData = useSelector(
    (state) => state.authSlice.userData
  );

  // Search sidebar visibility
  const visible = useSelector(
    (state) => state.toogleSlice.searchBarToogle
  );

  // Login sidebar visibility
  const loginVisible = useSelector((state) => state.toogleSlice.loginToggle);

  const dispatch = useDispatch();

  // Search sidebar open/close
  function handleVisibility() {
    dispatch(toogleSearchBar());
  }

  // Login sidebar open/close
  function handleLogin() {
    dispatch(toggleLogin());
  }

  // Search city API
  async function searchResultFunc(city) {
    if (city === "") {
      setSearchResult([]);
      return;
    }

    const res = await fetch(
      `https://countries.dev/cities?q=${city}`
    );

    const data = await res.json();

    setSearchResult(data);
  }

  // Debouncing
  function handleSearch(e) {
    const city = e.target.value;

    // Purana timer cancel
    clearTimeout(timer.current);

    if (city === "") {
      setSearchResult([]);
      return;
    }

    // 500ms ke baad API call
    timer.current = setTimeout(() => {
      searchResultFunc(city);
    }, 500);
  }

  return (
    <>
      {/* ================================================= */}
      {/* SEARCH SIDEBAR - LEFT SIDE */}
      {/* ================================================= */}

      <div className="w-full">

        {/* Black Overlay */}
        <div
          onClick={handleVisibility}
          className={
            "w-full bg-black/50 z-30 h-full absolute " +
            (visible ? "visible" : "invisible")
          }
        ></div>

        {/* Search Sidebar */}
        <div
          className={
            "bg-white flex justify-end w-[40%] h-full z-40 absolute duration-500 " +
            (visible ? "left-0" : "-left-[100%]")
          }
        >
          <div className="flex flex-col gap-4 mt-3 w-[50%] mr-6">

            {/* Close Button */}
            <img
              className="w-4 pt-4 cursor-pointer"
              onClick={handleVisibility}
              src={cross}
              alt="close"
            />

            {/* Search Input */}
            <input
              type="text"
              className="border p-5 focus:outline-none focus:shadow-lg"
              placeholder="Search city..."
              onChange={handleSearch}
            />

            {/* Search Results */}
            <div className="border p-5 w-[40%]">
              <ul>
                {searchResult.map((data, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setLocation(data.name);

                      // Search sidebar close
                      dispatch(toogleSearchBar());

                      // Results clear
                      setSearchResult([]);
                    }}
                    className="py-4 border-b cursor-pointer hover:bg-gray-100"
                  >
                    {data.name}
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>


      {/* ================================================= */}
      {/* LOGIN SIDEBAR - RIGHT SIDE */}
      {/* ================================================= */}

      <div className="w-full">

        {/* Black Overlay */}
        <div
          onClick={handleLogin}
          className={
            "w-full bg-black/50 z-30 h-full absolute " +
            (loginVisible ? "visible" : "invisible")
          }
        ></div>

        {/* Login Sidebar */}
        <div
          className={
            "bg-white flex justify-start w-[40%] h-full z-40 fixed duration-500 " +
            (loginVisible ? "right-0" : "-right-[100%]")
          }
        >
          <div className="flex flex-col gap-4 mt-3 w-[80%] ml-6">

            {/* Close Button */}
            <img
              className="w-4 pt-4 cursor-pointer"
              onClick={handleLogin}
              src={cross}
              alt="close"
            />

            {/* Login Heading */}
            <div className="mt-0">
            <h2 className="text-2xl font-bold mt-5 border-b-2 border-black w-fit">
              Login
            </h2>
            <SignIn/>
            <p className="text-gray-500">
              By clicking on login, i accept the Terms & Conditions
            </p>
            </div>
          </div>
        </div>
      </div>


      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="relative w-full">

        <div className="w-full sticky bg-white z-20 top-0 shadow-md h-24 flex justify-center items-center">

          <div className=" w-full md:w-[70%] flex justify-between">

            {/* LEFT SIDE - LOGO + LOCATION */}
            <div className="flex items-center ml-12">

              {/* Logo */}
              <Link to={"/"}>
              <div  className="w-24">
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.DLxxi7Zc715sVAL1oFJpogHaEK?r=0&pid=Api&P=0&h=180"
                  alt="Swiggy"
                />
                </div>
              </Link>

              {/* Location */}
              <div
                className="flex items-center gap-3 cursor-pointer"
                onClick={handleVisibility}
              >
                <p className="font-bold border-b-2 border-black">
                  {location}
                </p>

                <img
                  className="w-4 mt-1"
                  src={arrowDownSign}
                  alt="arrow"
                />
              </div>

            </div>


            {/* RIGHT SIDE NAVIGATION */}
            <div className="flex items-center gap-2 md:gap-12">

              {navItems.map((data) => (

                data.name === "sign in" ? (

                  /* ============================= */
                  /* SIGN IN */
                  /* ============================= */

                  <div
                    onClick={handleLogin}
                    key={data.name}
                    className="cursor-pointer"
                  >
                    <div className="flex gap-2 items-center">

                      {userData ? (
                        <img
                          className="w-6 h-6 rounded-full"
                          src={userData.photo}
                          alt=""
                        />
                      ) : (
                        <p className="mt-1 text-gray-700">
                          {data.image}
                        </p>
                      )}

                      <p className="font-medium text-gray-700">
                        {userData
                          ? userData.name
                          : data.name}
                      </p>

                    </div>
                  </div>

                ) : (

                  /* ============================= */
                  /* OTHER NAV ITEMS */
                  /* ============================= */

                  <Link
                    key={data.name}
                    to={data.path}
                  >
                    <div className="flex gap-2 items-center">

                      <p className="mt-1 text-gray-700">
                        {data.image}
                      </p>

                      <p className="font-medium text-gray-700">
                        {data.name}
                      </p>

                      {/* Cart Count */}
                      {data.name === "Cart" &&
                        cartData.length > 0 && (
                          <span className="bg-orange-500 text-white rounded-full px-2 py-1 text-xs">
                            {cartData.length}
                          </span>
                        )}

                    </div>
                  </Link>

                )

              ))}

            </div>
            <div>
              
            </div>

          </div>

        </div>

        <Outlet />

      </div>
    </>
  );
}

export default Header;