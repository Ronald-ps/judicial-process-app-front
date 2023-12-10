/**
 * @description Formata uma data no formato dd/mm/yy, às hh:mm
 * @param {string} dateString Data no formato ISO 8601
 * @returns {string} Data formatada
 * @example
 * formatDate('2021-08-01T00:00:00.000Z') // '01/08/21, às 21:00'
 * formatDate('2021-08-01T00:00:00.000Z') // '01/08/21, às 21:00'
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear().toString().slice(-2);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year}, às ${hours}:${minutes}`;
}
