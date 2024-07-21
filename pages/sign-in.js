import Navbar from "@/components/NavBar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";
import { useEmailSignIn, useGoogleSignIn } from "@/hooks/auth";
export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { gSignIn } = useGoogleSignIn();
  const { eSignIn } = useEmailSignIn();

  const handelSubmit = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Fill in both fields please :)");
      setIsLoading(false);
    } else {
      eSignIn(
        email,
        password,
        (response) => {
          console.log("Email Sign in", response);
          setIsLoading(false);
          router.push(response.data.uuid);
        },
        (error) => {
          console.log("Error fetching task:", error.response.data);
          setIsLoading(false);
          alert(error.response.data);
        }
      );
    }
  };

  async function handleGoogleLogin(googleToken) {
    // We need to take the googleAccesToken and authenticate it in our backend.

    gSignIn(
      googleToken,
      (response) => {
        console.log("Google Sign in", response);
        setIsLoading(false);
        router.push(response.data.uuid);
      },
      (error) => {
        console.log("Error fetching task:", error);
        setIsLoading(false);
        alert(error.response.data);
      }
    );
    console.log(googleToken);
  }

  const login = useGoogleLogin({
    // This plugin helps us use Google login in the frontend whcih returns an accessToken
    // that we can use in the backend to authenticate the user.
    onSuccess: (tokenResponse) => {
      handleGoogleLogin(tokenResponse.access_token);
    },
    onError: (error) => {
      console.debug("Login Failed -> onError :", error);
      setIsLoading(false);
    },
    onNonOAuthError: (error) => {
      setIsLoading(false);
      console.debug("Login Failed -> onNonOauthError:", error);
      if (error.type == "popup_closed") {
        console.debug("Login Failed -> googleNonOauthPopupClosed:", error);
      } else {
        console.debug("Login Failed -> googleNonOauthFallbackError:", error);
      }
    },
  });

  return (
    <>
      <div className="bg-nyanza dark:bg-airForceBlue flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg ">
          {isLoading === true && (
            <div className="flex justify-center">
              <div className="inline-block w-8 h-8 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
            </div>
          )}
          <h2 className="text-2xl font-bold mb-6 text-center text-lapisLazuli">
            Sign In
          </h2>

          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-midnightGreen text-midnightGreen"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-midnightGreen text-midnightGreen"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-lapisLazuli text-white py-2 rounded-lg hover:bg-midnightGreen focus:outline-none focus:bg-blue-600"
              onClick={() => {
                setIsLoading(true);
                handelSubmit();
              }}
            >
              Sign In using email
            </button>
          </form>
          <button
            className="mt-2 w-full bg-brightPinkCrayola text-white py-2 rounded-lg hover:bg-pink-700 focus:outline-none focus:bg-zinc-600"
            onClick={() => {
              setIsLoading(true);
              login();
            }}
          >
            Sign In using Google
          </button>
          <div className="flex justify-center mt-2 text-lapisLazuli  ">
            Dont have an account ?
            <Link href={`/sign-up`} className="text-wine hover:text-blue-400">
              {" "}
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
