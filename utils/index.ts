const dateFormatter = (date: Date, format: string = "yyyy-mm-dd"): string => {
  const day = String(date.getDate());
  const month = String(date.getMonth() + 1);
  const year = String(date.getFullYear());

  switch (format) {
    case "yyyy-mm-dd":
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;

    default:
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  }
};

export { dateFormatter };
