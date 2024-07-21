import Navbar from "@/components/NavBar";
import { useEmailSignUp, useGoogleSignUp } from "@/hooks/auth";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lastName, setLastName] = useState("");
  const { gSignUp } = useGoogleSignUp();
  const { eSignUp } = useEmailSignUp();
  const router = useRouter();
  // Google
  // 91585630488-fkae9eoktjtupihjav9crscs2c0lqg1c.apps.googleusercontent.com
  // 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
  function handelSubmit() {
    console.log(email, password, firstName, lastName);

    eSignUp(
      firstName,
      lastName,
      email,
      password,
      (response) => {
        console.log("Email Sign up", response);
        router.push(response.data.uuid);
      },
      (error) => {
        console.log("Error fetching task:", error);
      }
    );
  }

  async function handleGoogleLogin(accessToken) {
    // We need to take the googleAccesToken and authenticate it in our backend.

    gSignUp(
      accessToken,
      (response) => {
        console.log("Google Sign up", response);
        router.push(response.data.uuid);
      },
      (error) => {
        console.log("Error fetching task:", error);
      }
    );
    console.log(accessToken);
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
      <div className="bg-gray-200 flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg ">
          <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
            Sign Up
          </h2>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="firstname"
              id="firstname"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="lastname"
              id="lastname"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 text-black"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
              Sign Up
            </button>
            <button
              className="w-full bg-zinc-300 text-white py-2 rounded-lg hover:bg-zinc-400 focus:outline-none focus:bg-zinc-600"
              onClick={() => login()}
            >
              Sign In using Google
            </button>
            <div className="flex justify-center mt-2">
              Already have an account?
              <Link
                href={`/sign-in`}
                className="text-blue-800 hover:text-blue-400"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
