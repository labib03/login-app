import { getUser, getUsernameFromToken } from "@/helpers/fetch.ts";
import { useEffect, useState } from "preact/hooks";
import { AxiosResponse } from "axios";
import { IDetailUserResponse, UserDetailType } from "@/types/fetching.ts";

const useGetUserDetail = () => {
  const [userDetail, setUserDetail] = useState<UserDetailType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = getUsernameFromToken();
        const {
          data: { data: userData },
        }: AxiosResponse<IDetailUserResponse> = await getUser(userName);

        setUserDetail(userData);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchData();
  }, []);
  return userDetail;
};

export default useGetUserDetail;
