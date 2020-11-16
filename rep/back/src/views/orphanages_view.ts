import Idea from '../models/Idea'
import imagesView from './images_views'

export default {
    render(Idea: Idea) {

        return {
            id: Idea.id,
            name: Idea.name,
            latitude: Idea.latitude,
            longitude: Idea.longitude,
            about: Idea.about,
            instructions: Idea.instructions,
            opening_hours: Idea.opening_hours,
            open_on_weekends: Idea.open_on_weekends,
            images: imagesView.renderMany(Idea.images)
        }
    },

    renderMany(Ideas: Idea[]){
        return Ideas.map(Idea => this.render(Idea))
    }
}