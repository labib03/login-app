import { generateOTP } from "@/helpers/fetch.ts";

export async function sendOtpToEmail({ userName }: { userName: string }) {
  try {
    // let { data: dataUser }: AxiosResponse<IDetailUserResponse> = await getUser(
    //   userName,
    // );
    // const {
    //   data: { email },
    // } = dataUser;

    return await generateOTP({
      userName,
    });
  } catch (error) {
    return error;
  }
}
