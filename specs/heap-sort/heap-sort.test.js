/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
  createMaxHeap(array);
  for (let i = array.length - 1; i > 0; i--) {
    [array[0], array[i]] = [array[i], array[0]];
    heapify(array, 0, i);
  }
  return array;
};

const createMaxHeap = (array) => {
  for (let i = Math.floor(array.length / 2) - 1; i >= 0; i--) {
    heapify(array, i);
  }
};

const heapify = (array, index, heapSize = array.length) => {
  const leftIdx = 2 * index + 1;
  const rightIdx = 2 * index + 2;
  const leftVal = leftIdx < heapSize ? array[leftIdx] : 0;
  const rightVal = rightIdx < heapSize ? array[rightIdx] : 0;
  if (rightVal > array[index] && rightVal > leftVal) {
    [array[index], array[rightIdx]] = [array[rightIdx], array[index]];
    heapify(array, rightIdx, heapSize);
  } else if (leftVal > array[index] && leftVal > rightVal) {
    [array[index], array[leftIdx]] = [array[leftIdx], array[index]];
    heapify(array, leftIdx, heapSize);
  }
};

// unit tests
// do not modify the below code
test("heap sort", function () {
  const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
  heapSort(nums);
  expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
