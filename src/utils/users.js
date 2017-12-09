export function usersToArray(usersObj) {
  const usersArr = [];

  for (const key in usersObj) {
    if (usersObj.hasOwnProperty(key)) {
      usersArr.push({
        id: key,
        ...usersObj[key]
      });
    }
  }

  return usersArr;
}

export function usersToObject(usersArray) {
  const usersObj = {};

  usersArray.forEach(({ id, name, email }) => {
    usersObj[id] = { name, email };
  });

  return usersObj;
}
