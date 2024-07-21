import Navbar from "@/components/NavBar";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

import { useGoogleLogin } from "@react-oauth/google";
import { useEmailSignIn, useGoogleSignIn } from "@/hooks/auth";
export default function SignIn() {
  const router = useRouter();
  const [email, setEmail] = useState("mycroft@angelina.com");
  const [password, setPassword] = useState("123123123");
  const { gSignIn } = useGoogleSignIn();
  const { eSignIn } = useEmailSignIn();

  const handelSubmit = async () => {
    eSignIn(
      email,
      password,
      (response) => {
        console.log("Email Sign in", response);
        router.push(response.data.uuid);
      },
      (error) => {
        console.log("Error fetching task:", error);
      }
    );
  };

  async function handleGoogleLogin(googleToken) {
    // We need to take the googleAccesToken and authenticate it in our backend.

    gSignIn(
      googleToken,
      (response) => {
        console.log("Google Sign in", response);
        router.push(response.data.uuid);
      },
      (error) => {
        console.log("Error fetching task:", error);
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
    },
    onNonOAuthError: (error) => {
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
      <div className="bg-gray-200 flex flex-col items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg ">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
              onClick={() => {
                handelSubmit();
              }}
            >
              Sign In using email
            </button>
          </form>
          <button
            className="mt-2 w-full bg-zinc-300 text-white py-2 rounded-lg hover:bg-zinc-400 focus:outline-none focus:bg-zinc-600"
            onClick={() => login()}
          >
            Sign In using Google
          </button>
          <div className="flex justify-center mt-2">
            Dont have an account?
            <Link
              href={`/sign-up`}
              className="text-blue-800 hover:text-blue-400"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
