import startDB from "./mongoDBConnection";

class Loaders {
    start(){
        startDB()
    }
}

export default new Loaders()