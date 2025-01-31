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
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // Google
  // 91585630488-fkae9eoktjtupihjav9crscs2c0lqg1c.apps.googleusercontent.com
  // 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
  function handelSubmit() {
    console.log(email, password, firstName, lastName);
    if (
      email.trim() === "" ||
      password.trim() === "" ||
      firstName.trim() === "" ||
      lastName.trim() === ""
    ) {
      alert("Fill in both fields please :)");
      setIsLoading(false);
    } else {
      eSignUp(
        firstName,
        lastName,
        email,
        password,
        (response) => {
          console.log("Email Sign up", response);
          setIsLoading(false);
          router.push(response.data.uuid);
        },
        (error) => {
          console.log("Error fetching task:", error);
          setIsLoading(false);
          alert(error.response.data);
        }
      );
    }
  }

  async function handleGoogleLogin(accessToken) {
    // We need to take the googleAccesToken and authenticate it in our backend.

    gSignUp(
      accessToken,
      (response) => {
        console.log("Google Sign up", response);
        setIsLoading(false);
        router.push(response.data.uuid);
      },
      (error) => {
        console.log("Error fetching task:", error);
        setIsLoading(false);
        alert(error.response.data);
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
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-midnightGreen text-midnightGreen"
              placeholder="First Name"
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="lastname"
              id="lastname"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-midnightGreen text-midnightGreen"
              placeholder="Last Name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
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
              Sign Up using email
            </button>
            <button
              className="w-full bg-brightPinkCrayola text-white py-2 rounded-lg hover:bg-pink-700 focus:outline-none focus:bg-zinc-600"
              onClick={() => {
                setIsLoading(true);
                login();
              }}
            >
              Sign Up using Google
            </button>
            <div className="flex justify-center mt-2 text-lapisLazuli  ">
              Already have an account?
              <Link href={`/sign-in`} className="text-wine hover:text-blue-400">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
