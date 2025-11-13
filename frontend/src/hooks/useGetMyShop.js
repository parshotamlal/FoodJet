import { useEffect, useState } from "react";
import axios from "axios";
import ServerUrl from "../Url/ServerUrl";
import { useDispatch } from "react-redux";
import { setShopData } from "../redux/shopSlice"; // ✅ use correct slice

function useGetMyShop() {
  const [owner, setOwner] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchShop = async () => {
      try {
        const result = await axios.get(
          `${ServerUrl}/api/shop/get-myshop`,
          { withCredentials: true }
        );

        setOwner(result.data.shop); 
        dispatch(setShopData(result.data.shop));

      } catch (error) {
        console.log("Error fetching shop:", error);
      }
    };

    fetchShop();
  }, []);

  return owner;
}

export default useGetMyShop;
