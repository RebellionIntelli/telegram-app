const getFileWord = (count: number) => {
  if (count === 1) return "файл";
  if (count >= 2 && count <= 4) return "файла";
  return "файлов";
};
export default getFileWord;
