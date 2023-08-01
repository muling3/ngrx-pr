class ListTest {
  static create(...vals) {
    let that = vals.join(",");
    let newList = {
      that,
      [Symbol.iterator]() {
        let index = 0;

        return {
          next: () => {
            if (index < this.that.split(",").length) {
              return { value: this.that.split(",")[index++], done: false };
            } else {
              return { done: true };
            }
          },
        };
      },
    };

    return newList;
  }

  //forEach
  forEach()

  // append
  append(listOne, listTwo) {
    let updatedList = [...listOne, ...listTwo];

    return updatedList;
  }

  // concatenate
  concatenate(...lists) {
    let updatedList = [];

    for (const list of lists) {
      updatedList = [...updatedList, ...list];
    }

    return updatedList;
  }

  //filter
  filter(predicate, list) {
    let filteredArray = [];

    for (const item of list) {
      if (predicate(item)) filteredArray = [...filteredArray, item];
    }

    return filteredArray;
  }

  // length
  length(list) {
    let totalItems = 0;

    for (const _ of list) {
      totalItems++;
    }

    return totalItems;
  }

  // map
  map(func, list) {
    let toBeReturnedList = [];

    for (const item of list) {
      toBeReturnedList = [...toBeReturnedList, func(item)];
    }

    return toBeReturnedList;
  }

  // foldl
  foldl(func, list, accumulator) {
    for (const item of list) {
      accumulator = func(accumulator, item);
    }

    return accumulator;
  }

  // foldr
  foldr(func, list, accumulator) {
    for (const item of list) {
      accumulator = func(item, accumulator);
    }

    return accumulator;
  }

  // reverse
  reverse(list){
    let updatedList = []

    for (const item of list) {
      updatedList = [item, ...updatedList];
    }

    return updatedList
  }
}