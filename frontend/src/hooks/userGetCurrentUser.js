import { useEffect, useState } from "react";
import axios from "axios";
import ServerUrl from "../Url/ServerUrl";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function useGetCurrentUser() {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const result = await axios.get(
          `${ServerUrl}/api/user/current`,
          { withCredentials: true }
        );

        setUser(result.data.user); 
        dispatch(setUserData(result.data.user)); // ✅ Correct action dispatch

      } catch (error) {
        console.log("Error fetching current user:", error);
      }
    };

    fetchUser();
  }, []);

  return user;
}

export default useGetCurrentUser;
