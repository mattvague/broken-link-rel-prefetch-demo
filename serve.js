const express = require('express')
const app1 = express()
const app2 = express()

// In this serer, `<link rel="prefetch" ... >` works
app1.use(function (_req, _res, next) {
  setTimeout(next, 2000)
}).use(express.static('public'))

// But in this one it does not work because of `Vary: Accept` header which causes the cache to miss when navigating
app2.use(function (_req, res, next) {
  res.set('Vary', 'Accept')
  setTimeout(next, 2000)
}).use(express.static('public'))

app1.listen(3001, () => console.log(`Working server listening on port 3001`))
app2.listen(3002, () => console.log(`Broken server listening on port 3002`))
