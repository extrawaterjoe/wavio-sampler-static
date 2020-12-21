export const availableId = (arr) => {
  var min = 1;
  arr.sort((a,b) => {
    return a - b; 
  });

  for (var i in arr) {
    // eslint-disable-next-line
    if (arr[i] > -1 && arr[i] == min) {
      min++;
    }
  }
  return min;
};