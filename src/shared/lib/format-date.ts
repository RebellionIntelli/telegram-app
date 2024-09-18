function formatDate(isoString: string): string {
  const date = new Date(isoString);

  // Получаем компоненты даты
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Месяцы в JS начинаются с 0
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  // Формируем строку в нужном формате
  return `${day}.${month}.${year} ${hours}:${minutes}`;
}

export default formatDate;

export function formatDateV2(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate();
  const month = date.toLocaleString("ru-RU", { month: "long" });
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}
