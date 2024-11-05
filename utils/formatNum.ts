export const formatValue = (value: string | Number) => {

    if (value === undefined || value === null) {
        return "N/A";
      }
    const numericValue = Number(value);
    if (isNaN(numericValue)) {
        return "N/A";
    }

    const formattedValue = numericValue.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });

      return formattedValue;
}