export class ListTest {
  public myArray: number[] = [];

  constructor(private list: number[]) {
      this.myArray = this.list;
  }

  static create(...vals: any): ListTest {
    console.log('vals ', vals);
    //   let that = vals.join(',');
    // if (that.length == 0) return new ListTest([]);
    // let index = 0;
    // let newList = {
    //   next: (): IteratorResult<number> => {
    //     if (
    //       index < that.split(',').length &&
    //       parseInt(that.split(',')[index++])
    //     ) {
    //       console.log('err ', that.split(',')[index++]);
    //       return { value: Number(that.split(',')[index++]), done: false };
    //     } else {
    //       return { done: true, value: undefined };
    //     }
    //   },
    //   [Symbol.iterator]() {
    //     return this;
    //   },
    // };
    return new ListTest(vals);
  }

  private static *createIterator(values: number[]): IterableIterator<number> {
    for (const value of values) {
      yield value;
    }
  }

  //forEach
  forEach(callbackfn: (item: number) => void) {
    for (const elem of this.myArray) {
      callbackfn(elem);
    }
  }

  // append
  append(listOne: ListTest) {
    let updatedList: number[] = [...this.myArray];

    for (const elem of this.myArray) {
      updatedList = [...updatedList, elem];
    }

    for (const item of listOne.myArray) {
      updatedList = [...updatedList, item];
    }

    return { list: listOne.myArray, myArray: updatedList };
  }

  // concatenate
  concat(...lists: ListTest[]) {
    let updatedList: number[] = [];

    for (const elem of this.myArray) {
      updatedList = [...updatedList, elem];
    }

    for (const list of lists) {
      updatedList = [...updatedList, ...list.myArray];
    }

    return updatedList;
  }

  //filter
  filter(predicate: (item: number) => boolean) {
    let filteredArray: number[] = [];

    for (const item of this.myArray) {
      if (predicate(item)) filteredArray = [...filteredArray, item];
    }

    return filteredArray;
  }

  // length
  length() {
    let totalItems = 0;

    for (const _ of this.myArray) {
      totalItems++;
    }

    return totalItems;
  }

  // map
  map(func: (item: number) => number) {
    let toBeReturnedList: number[] = [];

    for (const item of this.myArray) {
      toBeReturnedList = [...toBeReturnedList, func(item)];
    }

    return toBeReturnedList;
  }

  // foldl
  foldl(func: (acc: number, item: number) => number, accumulator: number) {
    for (const item of this.myArray) {
      accumulator = func(accumulator, item);
    }

    return accumulator;
  }

  // foldr
  foldr(func: (item: number, acc: number) => number, accumulator: number) {
    for (const item of this.myArray) {
      accumulator = func(item, accumulator);
    }

    return accumulator;
  }

  // reverse
  reverse() {
    let updatedList: number[] = [];

    for (const item of this.myArray) {
      updatedList = [item, ...updatedList];
    }

    return updatedList;
  }
}
