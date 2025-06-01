export const useUploadFile = (file: File) => {

  const formData = new FormData()
  formData.append('file', file)

  const { getToken } = useAccessToken()

  const upload = async () => {
    const uploaded = await $fetch(`/api/upload/media`, {
      method: 'post', credentials: 'include',
      headers: {
        authorization: `Bearer ${getToken()}`
      },
      body: formData
    })
  }
}