import { table } from "components/structures";
import { client } from "./client";

export const fetchUserAvatar = async (userId, avatarFileName) => {
  if (!userId) return null;

  try {
    const filePath = `avatars/${avatarFileName}`;

    const { data: signedUrlData, error: signedUrlError } = await client
      .storage
      .from(table)
      .createSignedUrl(filePath, 60);

    if (signedUrlError) {
      console.error("Error creando la URL firmada:", signedUrlError.message);
      return null;
    }

    return signedUrlData.signedUrl;
  } catch (error) {
    console.error("Error general:", error.message);
    return null;
  }
};
