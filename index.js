function called (key, value) {
  const coll = new Map()
  const obj = {}
  for (let i = 0; i < key.length; i++) {
    coll.set(key[i], value[i])
    Object.assign(obj, { [key[i]]: value[i] })
  }
  return [coll, obj]
}

console.log(called(['a', 'b'], [1, 2, 3]))
