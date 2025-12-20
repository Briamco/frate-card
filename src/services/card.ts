export const CardCategory = {
  PREGUNTA: 'PREGUNTA',
  MOMENTO: 'MOMENTO',
  ACCION: 'ACCION',
  CONSEJO: 'CONSEJO',
  RETO: 'RETO',
} as const;

type CardCategory = typeof CardCategory[keyof typeof CardCategory];

export interface Card {
  src: string
  category: CardCategory
}

const imageModules = import.meta.glob('/imgs/cards/**/*.png', {
  eager: true,
  as: 'url'
});

const covertsModules = import.meta.glob('/imgs/cards/covert/*.png,jpg,jpeg,svg,webp', {
  eager: true,
  as: 'url'
});

const Cards: Card[] = [];
const Coverts: Card[] = [];

Object.keys(imageModules).forEach((path) => {
  const pathParts = path.split('/');
  const categoryIndex = pathParts.findIndex(part => part === 'cards') + 1;
  const category = pathParts[categoryIndex]?.toUpperCase();

  if (category && category in CardCategory) {
    Cards.push({
      src: imageModules[path] as string,
      category: CardCategory[category as keyof typeof CardCategory],
    });
  }
});

Object.keys(covertsModules).forEach((path) => {
  const fileName = path.split('/').pop()?.split('.')[0]?.toUpperCase();

  if (fileName && fileName in CardCategory) {
    Coverts.push({
      src: covertsModules[path] as string,
      category: CardCategory[fileName as keyof typeof CardCategory],
    });
  }
});

export { Cards, Coverts }