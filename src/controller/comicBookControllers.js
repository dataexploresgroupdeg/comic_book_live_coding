import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import { knex as database } from '../databaseConfig.js'

export async function comicBookControllers(app) {

    app.get('/', async (_, reply) => {
        const comicBooks = await database('comic_books').select('*')
        return reply.send({comicBooks})
    })

    app.get('/:id', async ( request, reply) => {

        const getComicBookIdParamsSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = getComicBookIdParamsSchema.parse(request.params)

        const comicBook =  await database('comic_books').where({id}).first()

        return reply.send({comicBook})
    })

    app.post('/', async (request, reply) => {
        const createComicBookParamsSchema = z.object({
            title: z.string(),
            issue_number: z.string().default(null),
            writer: z.string(),
            artist: z.string(),
            publisher: z.string(),
            gender: z.string(),
            cover_image_url: z.string().default(null)
        })

        const { 
            title,
            issue_number,
            writer,
            artist,
            publisher,
            gender,
            cover_image_url,
        } = createComicBookParamsSchema.parse(request.body)

        await database('comic_books')
            .insert({
                id: randomUUID(),
                title,
                issue_number,
                writer,
                artist,
                publisher,
                gender,
                cover_image_url,
            })

        return reply.status(201).send()
    })

    app.put('/:id', async ( request, reply) => {

        const getComicBookIdParamsSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = getComicBookIdParamsSchema.parse(request.params)

        const createComicBookParamsSchema = z.object({
            title: z.string(),
            issue_number: z.string().default(null),
            writer: z.string(),
            artist: z.string(),
            publisher: z.string(),
            gender: z.string(),
            cover_image_url: z.string().default(null)
        })

        const { 
            title,
            issue_number,
            writer,
            artist,
            publisher,
            gender,
            cover_image_url,
        } = createComicBookParamsSchema.parse(request.body)

        await database('comic_books').where({ id })
            .update({
                title,
                issue_number,
                writer,
                artist,
                publisher,
                gender,
                cover_image_url,
            })

        return reply.status(204).send()
    })

    app.delete('/:id', async ( request, reply) => {

        const getComicBookIdParamsSchema = z.object({
            id: z.string().uuid(),
        })
        const { id } = getComicBookIdParamsSchema.parse(request.params)

        await database('comic_books').where({ id }).del()

        return reply.status(204).send()
    })
}