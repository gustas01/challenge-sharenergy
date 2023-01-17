import axios from 'axios';

class HttpCatAPI {
  async httpCatAPI(code: number){
    const url = `https://http.cat/${code}`  
    return url
  }
}

export default new HttpCatAPI()