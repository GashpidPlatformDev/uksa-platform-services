import { useState } from 'react';
import { client } from './client';
import { useTranslation } from 'react-i18next';

const ImageUpload = ({ currentImage, onImageUpload, bucket="profile", customPath="avatars", idMatch }) => {
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadProfileImage = async (file, userId, replaceExisting = true) => {
    if (!file || !userId) {
      return null;
    }

    const fileExtension = file.name.split('.').pop();
    const fileName = `${userId}.${fileExtension}`;
    const filePath = `${customPath}/${fileName}`;

    if (replaceExisting) {
      const { data: existingFiles, error: fetchError } = await client.storage.from(bucket).list(customPath, { search: userId });
      if (fetchError) {
        return null;
      }

      if (existingFiles.length > 0) {
        for (const file of existingFiles) {
          if (file.name.startsWith(userId)) {
            await client.storage.from(bucket).remove([`${customPath}/${file.name}`]);
          }
        }
      }
    }

    const { data, error } = await client.storage.from(bucket).upload(filePath, file, { cacheControl: '3600', upsert: true });
    if (error) {
      return null;
    }

    if(bucket === "profile"){
      alert("profile")
      await client.from("profile").update({ avatar: fileName }).eq("id", userId);
      onImageUpload(true);
    
    setTimeout(() => {
      onImageUpload(false);
    },100);
    }
    else if(bucket === "courses"){
      await client.from("courses").update({ avatar: fileName }).eq("id", userId);
      onImageUpload(true);
    
    setTimeout(() => {
      onImageUpload(false);
    },100);
    }
    return data.path;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log("evente file: ", event, "file sel",selectedFile)
    if (selectedFile) {
      setFile(selectedFile);
      if(bucket === "courses"){
        setPreview(URL.createObjectURL(selectedFile));
      }
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    await uploadProfileImage(file, idMatch)
    .then(() => {
      setIsUploading(false);
    })
    
  };

  return (
    <div className="avatar-upload">
      <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} hidden />
      <label htmlFor="file-input" className="avatar-preview">
        <img src={preview || currentImage} alt="Avatar" />
      </label>
      <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? t("profile.settings.btn2.state2") : t("profile.settings.btn2.state1")}
      </button>
    </div>
  );
};

export default ImageUpload;
