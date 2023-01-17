import axios from 'axios';

class RandomUserAPI {
  async randomUserAPI(page: number){
    const url = `https://randomuser.me/api/?page=${page}&results=20&inc=picture,name,email,login,dob&seed=abc`
    const result = await (await axios(url)).data
    return result
  }
}

export default new RandomUserAPI()