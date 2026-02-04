function MergeSortt(arr){
    if(arr.length <= 1){
        return arr;
    }
   const mid = Math.floor(arr.length / 2);
   const left = arr.slice(0, mid);
   const right =arr.slice(mid);
   const sorted_left = MergeSortt(left);
   const sorted_right = MergeSortt(right);
   return Merge(sorted_left,sorted_right); 
}

function Merge(left,right){
    const size = left.length;
    const size1 = right.length;
    let i = 0; 
    let j = 0;
    let res = [];
    while(i < size && j < size1){
        if(left[i] <= right[j]){
            res.push(left[i++])
        }
        else res.push(right[j++])
    }
    while(i < size){
        res.push(left[i++])
    }
    while(j < size1){
        res.push(right[j++])
    }
    return res;
}
let arr = [2,5,61,7,8,9,90,1,0]
console.log(MergeSortt(arr));