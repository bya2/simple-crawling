module.exports = obj => {
  if (obj === null || typeof obj !== 'object') return obj;

  const result = Array.isArray(obj) ? [] : {};

  for (const key of Object.keys(obj)) {
    result[key] = deepCopy(obj[key]);
  }

  return obj;
}