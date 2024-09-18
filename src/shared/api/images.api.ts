const API_KEY = "7a13b5b0bccd2030e2fefe7a20b86591"; // Замените на ваш API ключ ImgBB

export async function imagesApi(files: FileList): Promise<string[]> {
  if (files.length === 0) return [];

  try {
    const uploadPromises = Array.from(files).map(async (file) => {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        return result.data.url;
      } else {
        throw new Error("Ошибка загрузки файла");
      }
    });

    const urls = await Promise.all(uploadPromises);
    return urls;
  } catch (error) {
    console.error("Ошибка загрузки файлов:", error);
    throw error;
  }
}
