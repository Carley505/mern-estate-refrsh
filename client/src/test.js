

const name = "Mark John Wafula Ignatious"

const username = name.split(" ").join("").toLowerCase().slice(0, 5) + Math.random().toString(36).slice(-4)

console.log(username)