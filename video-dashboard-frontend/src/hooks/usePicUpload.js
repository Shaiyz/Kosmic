import { useState } from 'react'
import { toast } from 'react-toastify'

const usePicUpload = () => {
  const [isFileUploading, setIsFileUploading] = useState(false)
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };
  const uploadPic = async (file) => {
    try {
      setIsFileUploading(true);
      const base64String = await convertFileToBase64(file);
      setIsFileUploading(false);
      return base64String;

    } catch (error) {
      setIsFileUploading(false);
      toast.error('Error converting file to base64');
      return '';
    }
  }

  return { isFileUploading, uploadPic }
}


export default usePicUpload
