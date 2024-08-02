function formatDate(date: Date, separator: string): string {
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 포맷팅
  const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 포맷팅

  const formattedDate = [year, month, day].join(separator);

  return formattedDate;
}

export { formatDate };
