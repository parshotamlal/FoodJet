import { useEffect,  } from "react";
import { setCity,setUserData } from "../redux/userSlice";
import { useDispatch } from "react-redux";


function useGetCity() {
    const dispatch =useDispatch()
  

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        // Reverse Geocoding (No API Key Needed - OpenStreetMap)
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
        );

        const data = await response.json();
        const detectedCity = data?.address?.city || data?.address?.town || data?.address?.village || "Unknown";
        dispatch(setCity(detectedCity));
        console.log(detectedCity)

      } catch (error) {
        console.log(error);
      }
    });
  }, [setUserData]);

}

export default useGetCity;
