/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

const merge = (arr1, arr2) => {
  let newArr = [];
  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      newArr.push(arr1.shift());
    } else {
      newArr.push(arr2.shift());
    }
  }
  // if (arr1.length) {
  //   newArr = [...newArr, ...arr1];
  // } else {
  //   newArr = [...newArr, ...arr2];
  // }
  // return newArr;
  return newArr.concat(arr1, arr2);
};

const mergeSort = (nums) => {
  if (nums.length <= 1) return nums;
  const mid = Math.floor(nums.length / 2);
  const leftArr = nums.slice(0, mid);
  const rightArr = nums.slice(mid);
  const leftSort = mergeSort(leftArr);
  const rightSort = mergeSort(rightArr);
  return merge(leftSort, rightSort);
};

// unit tests
// do not modify the below code
test("merge sort", function () {
  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
