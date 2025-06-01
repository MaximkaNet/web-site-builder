export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  if (!formData || formData.length === 0) {
    throw createError({
      statusCode: 400,
      statusMessage: 'No files uploaded'
    })
  }

  const file = formData[0]

  const storage = useStorage('uploads')

  try {
    const MAX_FILE_SIZE = 5 * 1024 * 1024
    if (file.data.length > MAX_FILE_SIZE) {
      throw createError({
        statusCode: 400,
        statusMessage: `File ${file.filename} exceeds maximum size of 5MB`
      })
    }

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif"
    ]

    if (!file.type || !allowedTypes.includes(file.type)) {
      throw createError({
        statusCode: 400,
        statusMessage: `File type ${file.type || "unknown"
          } not allowed. Allowed types: ${allowedTypes.join(", ")}`,
      });
    }

    if (!file || !file.filename) {
      console.warn("Skipping invalid file entry");
      return
    }

    // Store file using useStorage
    const fileName = `${Date.now()}-${file.filename}`;
    await storage.setItemRaw(`${fileName}`, file.data);
    return {
      filename: fileName,
      url: `/uploads/${fileName}`,
    }
  } catch (err) {
    throw err
  }
})