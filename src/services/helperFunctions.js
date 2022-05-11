
export var apiProgressBar = ''
export const setapiProgressBar = per => {
  apiProgressBar = per
  console.log(apiProgressBar)
};



export const alphabeticallyGrouping = (data = [], key) => {
  let result = data.reduce((r, e) => {

    // get first letter of name of current element
    let alphabet = e[key][0];

    // if there is no property in accumulator with this letter create it
    if (!r[alphabet]) r[alphabet] = { alphabet, record: [e] }

    // if there is push current element to children array for that letter
    else r[alphabet].record.push(e);

    // return accumulator
    return r;
  }, {});

  return Object.values(result);
}


export const removeDuplicateArray = (data,key) => {
  return [...new Map(data?.map(item => [item[key], item])).values()]
}