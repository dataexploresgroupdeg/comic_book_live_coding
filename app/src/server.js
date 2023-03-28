import fastify from 'fastify'
import { comicBookControllers } from './controller/comicBookControllers.js'
import * as dotenv from 'dotenv'
dotenv.config()

const app = fastify({
    logger: true
})

app.register( comicBookControllers, {
    prefix: 'comic_book'
})

app.listen(
    {
        port: process.env.PORT,
        host: '0.0.0.0'
    },
    (err, _) => {
    if(err) {
        app.log.error(err)
        process.exit(1)
    }
})