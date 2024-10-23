import { useState, useEffect } from "react";
import axios from "axios";
import { CiLocationOn } from "react-icons/ci";
import { IoLogoTwitter } from "react-icons/io5";
import { IoMoonOutline } from "react-icons/io5";
import { CiLight } from "react-icons/ci";

const GithubUserSearch = ({ toggleColor, isDarkMode }) => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(false);

  const fetchUser = async () => {
    if (!username) return;
    setError(false);

    try {
      const response = await axios.get(
        `https://api.github.com/users/${username}`
      );
      setUserData(response.data);
    } catch (err) {
      setError(true);
      setUserData(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [username]);

  return (
    <div
      className={`${
        isDarkMode ? "bg-blue-950" : "bg-[#e9ecef]"
      } min-h-screen flex flex-col items-center p-6`}
    >
      <h1
        className={`${isDarkMode ? "text-white" : "text-black"} text-3xl mb-8`}
      >
        Github UserName Finder
      </h1>
      <div className="w-full max-w-2xl p-4 rounded-lg flex items-center space-x-3">
        <input
          type="text"
          className={`flex-grow p-2 rounded-md ${
            isDarkMode ? "bg-[#1E3E62] text-white" : "bg-white text-black"
          }`}
          placeholder="Enter UserName..."
          onChange={(e) => setUsername(e.target.value)}
        />
        <button
          onClick={fetchUser}
          className="bg-blue-500 text-white rounded-md px-5 py-2"
        >
          Search
        </button>
        {isDarkMode ? (
          <CiLight
            onClick={toggleColor}
            className=" text-xl cursor-pointer opacity-90 transition-all duration-300 hover:text-red-500 hover:opacity-100"
          />
        ) : (
          <IoMoonOutline
            onClick={toggleColor}
            className="text-xl cursor-pointer opacity-90 transition-all duration-300 hover:text-red-500 hover:opacity-100"
          />
        )}
      </div>
      {error && (
        <p className="text-red-500 mt-4">
          No search results with this username
        </p>
      )}

      {userData && (
        <div
          className={`mt-8 ${
            isDarkMode ? "bg-[#0B192C] text-white" : "bg-white text-black"
          } p-6 rounded-md w-full max-w-xl shadow-md `}
        >
          <div className="flex items-center space-x-4">
            <img
              className="h-24 w-24 rounded-full"
              src={userData.avatar_url}
              alt={userData.name}
            />
            <div>
              <h2 className="text-2xl">
                {userData.name || "No Name Available"}
              </h2>
              <h4 className="text-blue-400">{userData.login}</h4>
              <p className="text-gray-400">
                Joined {new Date(userData.created_at).toLocaleDateString()}
              </p>
              {userData.bio && <p className="mt-2">{userData.bio}</p>}
            </div>
          </div>
          <div
            className={`${
              isDarkMode ? "bg-blue-950" : "bg-white"
            } mt-4 p-4 rounded-md flex justify-around`}
          >
            <div className="flex flex-col items-center">
              <h3>Repos</h3>
              <p>{userData.public_repos}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3>Followers</h3>
              <p>{userData.followers}</p>
            </div>
            <div className="flex flex-col items-center">
              <h3>Following</h3>
              <p>{userData.following}</p>
            </div>
          </div>
          <div className="flex justify-around mt-4">
            <div className="flex items-center">
              <CiLocationOn />
              <p className="ml-2">{userData.location || "Not Available"}</p>
            </div>
            <div className="flex items-center">
              <IoLogoTwitter />
              <p className="ml-2">
                {userData.twitter_username || "Not Available"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GithubUserSearch;
