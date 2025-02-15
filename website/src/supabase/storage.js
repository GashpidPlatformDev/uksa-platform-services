import { client } from "./client";

export const fetchUserAvatar = async (userId, avatarFileName) => {
  if (!userId) return null;

  try {
    const filePath = `avatars/${avatarFileName}`; // Ruta completa en el bucket

    // 2️⃣ Obtener una URL firmada desde Supabase Storage
    const { data: signedUrlData, error: signedUrlError } = await client
      .storage
      .from("profile")
      .createSignedUrl(filePath, 60); // URL válida por 60 segundos

    if (signedUrlError) {
      console.error("Error creando la URL firmada:", signedUrlError.message);
      return null;
    }

    return signedUrlData.signedUrl; // Devolver la URL firmada
  } catch (error) {
    console.error("Error general:", error.message);
    return null;
  }
};
