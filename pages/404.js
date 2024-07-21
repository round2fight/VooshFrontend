import { useRouter } from "next/router";
import Image from "next/image";

const NotFoundPage = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.push("/sign-in"); // Adjust the path if your sign-in page has a different route
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
      <div className="text-center">
        {/* <Image
          src="/images/404.svg" // Add your 404 image to the public/images folder
          alt="404"
          width={300}
          height={300}
        /> */}
        <h1 className="mt-4 text-4xl font-bold text-gray-800">
          Oops! Page Not Found
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          It looks like you’ve stumbled upon a page that doesn’t exist.
        </p>
        <button
          onClick={handleGoBack}
          className="mt-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Go Back to Sign In
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;
