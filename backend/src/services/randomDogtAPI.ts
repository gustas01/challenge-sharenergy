import axios from 'axios';

class RandomDogtAPI {
  async randomDogtAPI(){
    const url = `https://random.dog/woof?include=jpg,png`
    const result = await (await axios(url)).data
    const imageURL = 'https://random.dog/' + result
    return imageURL
  }
}

export default new RandomDogtAPI()