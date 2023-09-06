import { useState } from 'react'
import backend from '../api'
import { toast } from 'react-toastify'

const useSampleUpload = () => {
  const [isSampleUploading, setIsSampleUploading] = useState(false)

  const uploadSample = async (file) => {
    try {
      setIsSampleUploading(true)
      const formData = new FormData()
      formData.append('track', file)
      const { data } = await backend.post('/uploadTrack', formData)
      setIsSampleUploading(false)
      return data.location
    } catch (error) {
      setIsSampleUploading(false)
      toast.error('only mp3,mpeg and wave files are acceptable')
      return ''
    }
  }

  return { isSampleUploading, uploadSample }
}

export default useSampleUpload
