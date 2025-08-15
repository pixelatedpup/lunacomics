// src/assets/AllImages.ts

// Glob import all icons and covers
const icons = import.meta.glob("./images/icon*.png", { eager: true, import: "default" });
const covers = import.meta.glob("./images/cover*.png", { eager: true, import: "default" });

export const allImages = Array.from({ length: 16 }, (_, i) => {
  const id = i + 1;
  return {
    id,
    icon: icons[`./images/icon${id}.png`] as string,
    cover: covers[`./images/cover${id}.png`] as string,
  };
});
