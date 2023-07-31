class CustomList {
  myArray;

  constructor(modifiedArray) {
    this.myArray = modifiedArray;
  }

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

    return new CustomList(newList);
  }

  updateMyArray(that) {
    let updated = {
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

    this.myArray = updated; // only for append and concatenate

    return new CustomList(updated);
  }

  // forEach
  myForEach(callbackfn) {
    for (const elem of this.myArray) {
      callbackfn(elem);
    }
  }

  // append
  append(val) {
    let values = this.myArray.that + "," + String(val);
    this.updateMyArray(values);
  }

  // concatenate
  concatenate(...newListVals) {
    let asArray = newListVals.join(",");
    let values = this.myArray.that + "," + asArray;
    this.updateMyArray(values);
  }

  // filter
  filter(callbackfn) {
    let filteredElems = "";
    for (const elem of this.myArray) {
      if (callbackfn(elem) && filteredElems.length == 1) filteredElems += elem;
      else if (callbackfn(elem)) filteredElems += elem + ",";
    }

    return this.updateMyArray(filteredElems);
  }

  // length
  length() {
    let len = 0;
    for (const elem of this.myArray) {
      len++;
    }
    return len;
  }

  // map
  map(callbackfn) {
    let mappedElems = "";
    for (const elem of this.myArray) {
      if (mappedElems.length == 1) mappedElems += callbackfn(elem);
      else mappedElems += callbackfn(elem) + ",";
    }

    return this.updateMyArray(mappedElems);
  }

  // foldl
  // TODO:

  // foldr
  // TODO:
  
  // reverse
  reverse() {
    let reversedElems = "";
    let myArrayLen = this.length() - 1;

    for (const elem of this.myArray) {
      if (reversedElems.length == 1)
        reversedElems += this.myArray.that.split(",")[myArrayLen];
      else reversedElems += this.myArray.that.split(",")[myArrayLen] + ",";
      myArrayLen--;
    }

    return this.updateMyArray(reversedElems);
  }
}

let mySampleList = CustomList.create(12, 12, 13, 14);
// mySampleList.append(20);
// mySampleList.append(22);
// mySampleList.append(42);
// mySampleList.append(52);

mySampleList.concatenate(20, 22, 42, 52)

// mySampleList.myForEach((elem) => console.log(elem));

// let myFilteredArray = mySampleList.filter((elem) => elem < 15)
// myFilteredArray.myForEach((elem) => console.log(elem))

// let myMappedArray = mySampleList.map((elem) => elem * 10)
// myMappedArray.myForEach((elem) => console.log(elem))

// console.log("samplelist length", mySampleList.length());

let myReversedArray = mySampleList.reverse();
myReversedArray.myForEach((elem) => console.log(elem));

console.log("samplelist ", mySampleList);
