function CumulativecountingSort(arr){
    if(arr.length <= 1) return arr;

    let max = Math.max(...arr);
    let min = Math.min(...arr);

    const count = Array(max - min + 1).fill(0);

    for(let i = 0; i < arr.length; i++){
        count[arr[i] - min]++;
    }

    for(let i = 1; i < count.length; i++){
        count[i] += count[i - 1];
    }

    let output = new Array(arr.length);

    for(let i = arr.length - 1; i >= 0; i--){
        let value = arr[i];
        let index = value - min;
        let pos = count[index] - 1;

        output[pos] = value;
        count[index]--;
    }

    return output;
}

let arr = [3,5,6,7,7,9,1,2,3];
console.log(CumulativecountingSort(arr));
