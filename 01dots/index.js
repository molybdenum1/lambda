function allPossible(str) {
    let result = [];
    if (str.length == 1 || str.length == 0) {
      result.push(str);
      return result;
    } 
    let tmp = allPossible(str.substring(1, str.length));
    for (let i in tmp) {
      result.push(str[0] + tmp[i]);
      result.push(str[0] + "." + tmp[i]);
    }
    return result;
  }
  
  console.log(allPossible("abcdeАDВ"));
  console.log(new Set(allPossible("abcdeАDВ")));