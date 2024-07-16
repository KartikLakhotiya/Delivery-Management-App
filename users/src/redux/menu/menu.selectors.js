import { createSelector } from "reselect";

const selectMenu = (state) => state.menu.menu;
const selectSearch = (state) => state.menu.search;

export const selectAllItems = createSelector([selectMenu], (menu) => menu);

export const selectCartItems = createSelector([selectMenu], (menu) =>
  menu.filter((item) => {
    if (item.quantity > 0) {
      return item;
    }
  })
);

export const selectCuisineItems = createSelector(
  [selectMenu, (state, cuisine) => cuisine],
  (menu, cuisine) =>
    menu.filter((item) => {
      if (item.cuisine.includes(cuisine)) {
        return item;
      }
    })
);

export const selectSearchItems = createSelector(
  [selectMenu, selectSearch],
  (menu, search) =>
    menu.filter((item) => {
      if (item.name.toLowerCase().includes(search.toLowerCase())) {
        return item;
      }
    })
);

export const totalItems = createSelector([selectMenu], (menu) =>
  menu.reduce((total, item) => total + item.quantity, 0)
);

export const selectTotalAmount = createSelector([selectMenu], (menu) =>
  menu.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0)
);

export const bookmarkedItems = createSelector([selectMenu], (menu) =>
  menu.filter((item) => {
    if (item.bookmark) {
      return item;
    }
  })
);
