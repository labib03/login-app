import { toast } from "react-hot-toast";

/** image onto base64 */
export default function convertToBase64(file: File | null) {
  const typeFile = "image/jpeg";

  if (!file) {
    return;
  }
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);

    if (file.type === typeFile) {
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
    } else {
      toast.error("type file not supported");
      throw new Error("type file not supported");
    }

    fileReader.onerror = (error) => {
      reject(error);
    };
  });
}
