function bubbleSort(arr){
    let a = arr.length;

    for(let i = 0; i < a; i++){
        for(let j = 0; j < a - i -1; j++){
          if(arr[j] > arr[j + 1]){

            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
    }
    return arr;
}

let numbers = [10,1,4,6,2,8];
console.log(bubbleSort(numbers));