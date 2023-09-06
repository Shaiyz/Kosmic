import { useState } from 'react'
import backend from '../api'
import { toast } from 'react-toastify'

const useAudioUpload = () => {
  const [isFileUploading, setIsFileUploading] = useState(false)

  const uploadAudio = async (file) => {
    try {
      setIsFileUploading(true)
      const formData = new FormData()
      formData.append('track', file)
      const { data } = await backend.post('/uploadTrack', formData)
      setIsFileUploading(false)
      return data.location
    } catch (error) {
      setIsFileUploading(false)
      toast.error('only mp3,mpeg and wave files are acceptable')
      return ''
    }
  }

  return { isFileUploading, uploadAudio }
}

export default useAudioUpload
