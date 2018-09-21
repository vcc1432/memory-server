import { JsonController, Get} from 'routing-controllers'
import Emoji from './entity'

@JsonController()
export default class ImagesController {

  //@Authorized()
  @Get('/images')
  async getImages() {
    const images = await Emoji.find()
    return {images}
  }
}

