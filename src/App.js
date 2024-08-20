import { FaLocationDot } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { FaPaperclip } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { useState } from "react";
import { debounce } from "lodash";

export default function App() {
  let apiUrl = `https://api.github.com/users/`;
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = debounce(async (e) => {
    const searchTerm = e.target.value.trim();
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setUser({});
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(apiUrl + `${e.target.value}`);
      console.log(res);
      if (res?.status === 200) {
        setUser(res.data);
      }
    } catch (error) {
      console.error(`An error occured while fetching the user, ${error}`);
      setLoading(false);
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  }, 500);

  const bodyCommonClasses = "bg-blue-dark w-full min-h-screen flex";

  return (
    <div
      className={
        (loading && searchTerm === "") || searchTerm === ""
          ? `${bodyCommonClasses} items-start pt-20 lg:pt-10 justify-start`
          : `${bodyCommonClasses} items-center justify-center`
      }
    >
      <div className="lg:w-2/5 w-[400px] mx-auto">
        <h1 className="font-poppins text-white font-bold text-xl pb-4 tracking-widest">
          GitHub Scout
        </h1>
        <SearchBar onChange={handleSearch} />
        {error && <ErrorMessage error={error} />}
        {searchTerm === "" ? (
          <div className="flex items-center justify-center h-[60vh] w-full">
            <p className="text-white font-light text-2xl">
              No User Profile to show...
            </p>
          </div>
        ) : (
          <>
            {loading ? (
              <div className="flex items-center justify-center h-[60vh] w-full">
                <p className="text-white font-light text-2xl">Loading...</p>
              </div>
            ) : (
              <UserProfile user={user} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

const ErrorMessage = ({ error }) => {
  return (
    <div className="error-message text-red-500 text-center py-4">
      <p>{error}</p>
    </div>
  );
};

const UserProfile = ({ user }) => {
  return (
    <div className="bg-blue-light rounded-lg py-10 px-8 mt-8 w-full">
      <div className="flex items-start gap-5 w-full">
        <img
          src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
          alt="Octocat"
          className="rounded-full w-28 h-28"
        />
        <div className="flex flex-col px-2 gap-2 lg:gap-0 lg:w-full">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-3 items-center">
            <h1 className="font-poppins text-white font-bold text-lg lg:text-xl tracking-widest">
              {user?.name ? user.name : "Not Available"}
            </h1>
            <h2 className="font-poppins text-gray-300 font-light text-sm lg:w-auto w-full">
              Joined 25 Jan 2011
            </h2>
          </div>
          <p className="text-blue-sky font-light text-lg">
            {user?.login ? user.login : "Not Available"}
          </p>
        </div>
      </div>
      <div className="w-full">
        <div className="w-full">
          <p className="font-poppins text-gray-300 text-sm mt-4 py-2">
            {user?.bio ? user.bio : "Not Available"}
          </p>
        </div>
        <div className="bg-blue-dark rounded-lg py-5 px-3 mt-5 w-full">
          <div className="flex items-center justify-around">
            <div>
              <h1 className="font-poppins text-gray-300 font-light text-sm">
                Repos
              </h1>
              <p className="font-poppins text-white font-bold text-xl">
                {user?.login ? user.public_repos : ""}
              </p>
            </div>
            <div>
              <h1 className="font-poppins text-gray-300 font-light text-sm">
                Followers
              </h1>
              <p className="font-poppins text-white font-bold text-xl">
                {user?.followers && user.followers}
              </p>
            </div>
            <div>
              <h1 className="font-poppins text-gray-300 font-light text-sm">
                Following
              </h1>
              <p className="font-poppins text-white font-bold text-xl">
                {user?.following && user.following}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-2 lg:grid-cols-2 text-gray-300 font-light w-full">
          <div className="flex items-center gap-2 w-full">
            <FaLocationDot />
            <p className="font-poppins text-sm">
              {user?.location ? user.location : "Not Available"}
            </p>
          </div>
          <div className="flex items-center gap-2 w-full">
            <FaTwitter />
            <p className="font-poppins text-sm">
              {user?.twitter_username ? user.twitter_username : "Not Available"}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full">
            <FaPaperclip />
            {user?.blog !== "" ? (
              <a href={user?.blog} className="font-poppins text-sm underline">
                {user?.blog}
              </a>
            ) : (
              <p>Not Available</p>
            )}
          </div>
          <div className="flex items-center gap-2 w-full">
            <BsBuildingsFill />
            <p className="font-poppins text-sm">
              {user?.company ? `${user.company}` : "Not Available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ onChange }) => {
  return (
    <div className="search-bar">
      <IoSearch className="text-blue-sky text-2xl" />
      <input
        type="text"
        placeholder="Search GitHub username here..."
        onChange={onChange}
        className="text-white pl-4"
      />
      <button className="search-button text-sm lg:text-md">Search</button>
    </div>
  );
};
