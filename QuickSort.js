function partition(nums, low, high){
    const pivot = nums[high];
    let i = low;

    for(let j = low; j < high; j++){
        if(nums[j] < pivot){
            [nums[i], nums[j]] = [nums[j], nums[i]];
            i++;
        }
    }

    [nums[i], nums[high]] = [nums[high], nums[i]];
    return i;
}

function quicksort(nums, low = 0, high = nums.length - 1){
    if(low >= high) return nums;

    const p = partition(nums, low, high);
    quicksort(nums, low, p - 1);
    quicksort(nums, p + 1, high);

    return nums;
}

let arr = [20,3,4,1,50,61];
console.log(quicksort(arr));
