import { useState } from 'react';
import { client } from '../../schema/client';
import { useTask } from 'context/TaskContext';
import { table, user_bucket } from 'components/structures';

const AvatarUpload = ({ onAvatarUpload, currentAvatar }) => {
  const { userId } = useTask();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const uploadProfileImage = async (file, userId, customPath = 'avatars', replaceExisting = true) => {
    if (!file || !userId) {
      console.error('Falta el archivo o el ID del usuario');
      return null;
    }

    
    const fileExtension = file.name.split('.').pop();
    const fileName = `${userId}.${fileExtension}`;
    const filePath = `${customPath}/${fileName}`;

    if (replaceExisting) {
      const { data: existingFiles, error: fetchError } = await client.storage.from(user_bucket).list(customPath, { search: userId });
      if (fetchError) {
        console.error('Error al buscar archivos existentes:', fetchError.message);
        return null;
      }

      if (existingFiles.length > 0) {
        for (const file of existingFiles) {
          if (file.name.startsWith(userId)) {
            await client.storage.from(user_bucket).remove([`${customPath}/${file.name}`]);
          }
        }
      }
    }

    const { data, error } = await client.storage.from(user_bucket).upload(filePath, file, { cacheControl: '3600', upsert: true });
    if (error) {
      console.error('Error subiendo el archivo:', error.message);
      return null;
    }

    await client.from(table).update({ avatar: fileName }).eq("id", userId);
    onAvatarUpload(true);
    setTimeout(() => {
      onAvatarUpload(false);
    },100);
    return data.path;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setIsUploading(true);
    await uploadProfileImage(file, userId, 'avatars');
    setIsUploading(false);
  };

  return (
    <div className="avatar-upload">
      <input type="file" id="file-input" accept="image/*" onChange={handleFileChange} hidden />
      <label htmlFor="file-input" className="avatar-preview">
        <img src={preview || currentAvatar} alt="settings-avatar" />
      </label>
      <button onClick={handleUpload} disabled={!file || isUploading}>
        {isUploading ? 'Subiendo...' : 'Subir Archivo'}
      </button>
    </div>
  );
};

export default AvatarUpload;