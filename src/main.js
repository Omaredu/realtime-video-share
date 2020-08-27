const taskName = "[app]"
const express = require('express')

const app = express()

app.set('view engine', 'ejs')
app.use(express.static('public'));

const server = app.listen(3000, () => {
    console.log(taskName, `server on port: ${3000}`)
})

const io  = require('socket.io')(server)

io.on('connection', socket => {
    console.log("Conectado!")

    socket.on('stream', stream => {
        io.emit('view-stream',stream)
    })
})

app.get('/', (req, res) => {
    res.render('index', {title: "Share your video and view in /view route"})
})

app.get('/view', (req, res) => {
    res.render('view')
})