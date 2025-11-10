

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../redux/userSlice";

function useGetCity() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // ✅ Correct: No array destructuring

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        const data = await response.json();
        const detectedCity =
          data?.address?.city ||
          data?.address?.town ||
          data?.address?.village ||
          "Unknown";

        dispatch(setCity(detectedCity));
        console.log("Detected City:", detectedCity);
      } catch (error) {
        console.log("City Fetch Error:", error);
      }
    });
  }, [dispatch, user]);
}

export default useGetCity;
