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
    console.log(isAuthenticated, user);
  }, [isAuthenticated, user]);
  useEffect(() => {
    async function verifyToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/sign-in");
      }
      try {
        let response = await axios.get(
          "http://localhost:3000/api/auth/verify-token",
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
  }, [router]);

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
        <>Loading</>
      )}
    </>
  );
};

export default Authify;
