function countingSort(arr) {
  if (arr.length <= 1) return arr;

  let max = Math.max(...arr);
  let min = Math.min(...arr);

  const count = Array(max - min + 1).fill(0);

  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  const sorted = [];
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      sorted.push(i + min);
      count[i]--;
    }
  }

  return sorted;
}
const arr = [12,2,13,4,5,66]
console.log(countingSort(arr))