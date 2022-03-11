const express = require('express')
require('./db/mongoose')
const employeeRouter = require('./routers/employee')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(employeeRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})