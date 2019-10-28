
export const shallowObjectCompare = (objA: any, objB: any): boolean => {
  const lengthMatch: boolean = Object.keys(objA).length === Object.keys(objB).length;
  const keyValueMatch: boolean = Object.keys(objA).every(key => {
    return objB.hasOwnProperty(key) && JSON.stringify(objA[key]) === JSON.stringify(objB[key]);
  });
  return lengthMatch && keyValueMatch;
};

export const removeNullUndefined = (obj: any): any => {
  for (const key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === void 0) {
      delete obj[key];
    }
  }
  return obj;
};