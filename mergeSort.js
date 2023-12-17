function mergeSort(arr = []) {
  if (arr.length <= 1) {
    return arr;
  }
  if (arr.length == 2) {
    const merged = simpleMerge([arr[0]], [arr[1]]);
    return merged;
  }

  const mid = arr.length / 2;

  return simpleMerge(
    mergeSort(arr.slice(0, mid)),
    mergeSort(arr.slice(mid, arr.length)),
  );
}

function simpleMerge(arr1 = [], arr2 = []) {
  let x = 0;
  let y = 0;
  let arr = [];

  for (let i = 0; i < arr1.length + arr2.length; i++) {
    if (arr1[x] < arr2[y]) {
      arr.push(arr1[x]);
      x++;
    } else if (x > arr1.length - 1) {
      arr.push(arr2[y]);
      y++;
    } else if (y > arr2.length - 1) {
      arr.push(arr1[x]);
      x++;
    } else {
      arr.push(arr2[y]);
      y++;
    }
  }
  return arr;
}

// console.log(mergeSort([0, 5, 2, 3, 4, 1, 6, 101, 0, 10, 1]));
module.exports = mergeSort;
