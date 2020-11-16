import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import IdeaView from '../views/Ideas_view'
import Idea from '../models/Idea';
import * as Yup from 'yup'


export default {

    async index(request: Request, response: Response) {
        const IdeasRepository = getRepository(Idea)

        const Ideas = await IdeasRepository.find({
            relations: ['images']
        })

        return response.json(IdeaView.renderMany(Ideas))
    },

    async show(request: Request, response: Response) {
        const { id } = request.params
        const IdeasRepository = getRepository(Idea)

        const Idea = await IdeasRepository.findOneOrFail(id, {
            relations: ['images']
        })

        return response.json(IdeaView.render(Idea))
    },

    async create(request: Request, response: Response) {
        const {
            name,
            latitude,
            longitude,
            about,
            number,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body

        const IdeasRepository = getRepository(Idea)

        const requestImages = request.files as Express.Multer.File[]

        const images = requestImages.map(image => {
            return { path: image.filename }
        })

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends : open_on_weekends === 'true',
            images,
            number
        }

        const schema = Yup.object().shape({
            name: Yup.string().required('Campo obrigatório'),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            image: Yup.array(Yup.object().shape({
                path: Yup.string().required()
            }))
        })

        await schema.validate(data, {
            abortEarly: false
        })

        const Idea = IdeasRepository.create(data)

        await IdeasRepository.save(Idea)

        return response.status(201).json(Idea)
    }
}