import { Router } from 'express';
import IdeasController from './controllers/IdeasController'
import multer from 'multer'
import uploadConfig from './config/upload'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/Ideas', IdeasController.index)
routes.get('/Ideas/:id', IdeasController.show)
routes.post('/Ideas', upload.array('images'), IdeasController.create)


export default routes