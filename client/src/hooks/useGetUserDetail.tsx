import { getUser, getUsernameFromToken } from "@/helpers/fetch.ts";
import { useEffect, useState } from "preact/hooks";
import { AxiosResponse } from "axios";
import { IDetailUserResponse, UserDetailType } from "@/types/fetch.type.ts";

const initialData = {
  _id: "",
  userName: "",
  email: "",
  profile: "",
  __v: 0,
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

const useGetUserDetail = (payloadUserName?: string) => {
  const [userDetail, setUserDetail] = useState<UserDetailType>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userName = payloadUserName
          ? payloadUserName
          : getUsernameFromToken();
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
