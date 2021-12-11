export const slugify = (toConvert: string) => {
  return toConvert
    .toLowerCase()
    .replace(/\s/g, '_')
    .replace(/\W/g, '')
    .substring(0, 20);
};
