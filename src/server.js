import fastify from 'fastify'
import { comicBookControllers } from './controller/comicBookControllers.js'

const app = fastify({
    logger: true
})

app.register( comicBookControllers, {
    prefix: 'comic_book'
})


app.listen({port: 3333}, (err, _) => {
    if(err) {
        app.log.error(err)
        process.exit(1)
    }
})