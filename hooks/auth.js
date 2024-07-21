import axios from "axios";
import { useRouter } from "next/router";
export const useGoogleSignIn = () => {
  const router = useRouter();

  const gSignIn = async (googleToken, onSuccess, onError) => {
    try {
      const response = await axios.post("http://localhost:3000/signin/google", {
        googleToken: googleToken,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Assuming the response contains a new token
        if (onSuccess) {
          onSuccess(response);
        }
      } else {
        if (onError) {
          onError(new Error("Failed to sign in with Google"));
        }
        router.push("/sign-in");
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
      router.push("/sign-in");
    }
  };

  return { gSignIn };
};

export const useGoogleSignUp = () => {
  const router = useRouter();

  const gSignUp = async (googleToken, onSuccess, onError) => {
    try {
      const response = await axios.post("http://localhost:3000/signup/google", {
        googleToken: googleToken,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Assuming the response contains a new token
        if (onSuccess) {
          onSuccess(response);
        }
      } else {
        if (onError) {
          onError(new Error("Failed to sign in with Google"));
        }
        router.push("/sign-in");
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
      router.push("/sign-in");
    }
  };

  return { gSignUp };
};

export const useEmailSignIn = () => {
  const router = useRouter();

  const eSignIn = async (email, password, onSuccess, onError) => {
    try {
      const response = await axios.post(`http://localhost:3000/signin/email`, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Assuming the response contains a new token
        if (onSuccess) {
          onSuccess(response);
        }
      } else {
        if (onError) {
          onError(new Error("Failed to sign in using email"));
        }
        router.push("/sign-in");
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
      router.push("/sign-in");
    }
  };

  return { eSignIn };
};

export const useEmailSignUp = () => {
  const router = useRouter();

  const eSignUp = async (
    firstName,
    lastName,
    email,
    password,
    onSuccess,
    onError
  ) => {
    try {
      const response = await axios.post(`http://localhost:3000/signup/email`, {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
      });
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token); // Assuming the response contains a new token
        if (onSuccess) {
          onSuccess(response);
        }
      } else {
        if (onError) {
          onError(new Error("Failed to sign in using email"));
        }
        router.push("/sign-in");
      }
    } catch (error) {
      if (onError) {
        onError(error);
      }
      router.push("/sign-in");
    }
  };

  return { eSignUp };
};
