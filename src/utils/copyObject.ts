function copyObject<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export default copyObject;