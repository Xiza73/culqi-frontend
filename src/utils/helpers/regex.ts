export const onlyNumbers = /\D/g;

export const emailRegex = /[^a-zA-Z0-9-@.!#$%&'*+\/=?^_`{|}~]/g;

export const formatCardNumber = (input: string): string => {
  const cleanedInput = input.replace(/\D/g, "");
  const formattedInput = cleanedInput.match(/.{1,4}/g)?.join(" ") || "";
  return formattedInput.slice(0, 19);
};

export const formatExpirationDate = (input: string): string => {
  const cleanedInput = input.replace(/\D/g, "");
  const month = cleanedInput.slice(0, 2);
  const monthNumber = Number(month);
  const monthIsValid = monthNumber >= 0 && monthNumber <= 12;
  const year = cleanedInput.slice(2, 4);
  const yearNumber = Number(year);
  const yearIsValid = yearNumber >= 0 && yearNumber <= 99;
  if (!monthIsValid || !yearIsValid) return "";
  const formattedInput = cleanedInput.match(/.{1,2}/g)?.join("/") || "";
  return formattedInput.slice(0, 5);
};

export const maxCharacters =
  (max: number) =>
  (input: string): string => {
    return input.slice(0, max);
  };

export const formatCVV = (input: string): string => {
  const cleanedInput = input.replace(/\D/g, "");
  return maxCharacters(4)(cleanedInput);
};

export const regexInputHandler = (
  value: string,
  {
    regex,
    regexFunction,
  }: {
    regex?: RegExp;
    regexFunction?: (value: string) => string;
    name?: string;
  }
): string => {
  if (regexFunction || regex) {
    const sanitizedValue = regexFunction
      ? regexFunction(value)
      : value.replace(regex!, "");
    if (value !== sanitizedValue)
      return sanitizedValue;
  }

  return value;
};
