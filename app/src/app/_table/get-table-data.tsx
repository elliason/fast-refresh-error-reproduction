const BE_URL = process.env.NEXT_PUBLIC_BE_URL;

export const getTableData = async () => {
  const response = await fetch(`${BE_URL}/grid/definition/no-features`);
  const data = await response.json();
  return data;
};
