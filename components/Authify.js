// components/Authify.js
import React, { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { isNonSessionPage } from "@/utils/router";
import { SessionContext } from "./SessionContext";
import Navbar from "./NavBar";

const Authify = ({ children, userSetter }) => {
  const router = useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const { user, setUser, isAuthenticated, setIsAuthenticated } =
    useContext(SessionContext);

  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
      }
      try {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/verify-token`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.data.user.uuid === router.query.userUUID) {
          setUser(response.data.user);
          setIsAuthenticated(true);
        } else {
          console.log("invalid userUUID url -> 404");
          router.push("/404");
        }
      } catch (error) {
        console.log(error);
        router.push("/sign-in");
      }
    }

    if (!isNonSessionPage(router)) {
      if (!!router.query.userUUID) {
        verifyToken();
      }
    } else {
      setIsAuthenticated(false);
      if (router.asPath == `/sign-in`) {
        setIsSignIn(true);
      } else {
        setIsSignIn(false);
      }
    }
  }, [router, setIsAuthenticated, setUser]);

  return (
    <>
      {isAuthenticated !== null ? (
        isAuthenticated === true ? (
          <>
            <Navbar
              isAuthenticated={true}
              onSignOut={() => {
                const token = localStorage.removeItem("token");
                router.push(`sign-in`);
              }}
            />
            {children}
          </>
        ) : (
          <>
            <Navbar
              isAuthenticated={false}
              isSignIn={isSignIn}
              onSignOut={() => {
                const token = localStorage.removeItem("token");
                router.push(`sign-in`);
                console.log("onSignOut");
              }}
              onSignIn={() => {
                router.push(`sign-in`);
              }}
              onSignUp={() => {
                {
                  router.push(`/sign-up`);
                }
              }}
            />
            {children}
          </>
        )
      ) : (
        <div className=" bg-nyanza h-screen w-full">
          <div className="flex justify-center">
            <div className="inline-block w-8 h-8 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Authify;
