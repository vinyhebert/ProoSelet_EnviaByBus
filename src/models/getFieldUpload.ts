export const getField = (line: string, start: number, end: number): string => {
    return line.substring(start - 1, end).trim();
  };