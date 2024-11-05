export const formatValue = (value: number) => {
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