export const slugify = (toConvert: string) => {
  return toConvert.toLowerCase().replace(/\s/g, '_');
};
