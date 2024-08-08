function formatDate(d: Date | string, separator: string): string {
  const date = typeof d === 'string' ? new Date(d) : d;
  const year = String(date.getFullYear());
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 월을 두 자리로 포맷팅
  const day = String(date.getDate()).padStart(2, '0'); // 일을 두 자리로 포맷팅

  const formattedDate = [year, month, day].join(separator);

  return formattedDate;
}

export { formatDate };
