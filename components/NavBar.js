import React from "react";

const Navbar = ({
  isAuthenticated,
  isSignIn,
  onSignIn,
  onSignOut,
  onSignUp,
}) => {
  return (
    <nav className="bg-midnightGreen p-4 flex justify-between items-center">
      {/* Logo on the left */}
      <div className="text-white text-lg font-bold">Roshan X Voosh</div>

      {/* Sign-out or sign-up button on the right */}
      <div className="flex items-center space-x-4">
        {isAuthenticated ? (
          <button
            onClick={onSignOut}
            className="bg-brightPinkCrayola text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-wine focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Sign Out
          </button>
        ) : isSignIn === true ? (
          <button
            onClick={onSignUp}
            className="bg-lapisLazuli text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Sign Up
          </button>
        ) : (
          <button
            onClick={onSignIn}
            className="bg-lapisLazuli text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
