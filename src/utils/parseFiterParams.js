// Додайте можливість фільтрації продуктів за категорією (властивість category) та за ціною (властивість price) у відповіді для маршруту GET /products. Для цього використовуйте такі query параметри запиту:

// category - назва категорії
// minPrice - мінімільна ціна продукту
// maxPrice - максимальна ціна продукту
const parseCategory = (category) => {
  const isString = typeof category === 'string';
  if (!isString) {
    return;
  }
  const isCategory = ['books', 'electronics', 'clothing', 'other'];
  if (isCategory.includes(category)) return category;
};

const parseNumber = (price) => {
  const parsedNumber = Number(price);

  if (isNaN(parsedNumber)) return;

  return parsedNumber;
};

export const parseFilterParams = ({ category, minPrice, maxPrice }) => {
  const parsedCategory = parseCategory(category);

  const parsedMinPrice = parseNumber(minPrice);
  const parsedMaxPrice = parseNumber(maxPrice);

  return {
    category: parsedCategory,
    minPrice: parsedMinPrice,
    maxPrice: parsedMaxPrice,
  };
};
