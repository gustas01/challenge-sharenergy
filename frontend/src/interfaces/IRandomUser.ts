export interface IRandomUser{
 dob: {age: number, date: string},
 email: string,
 login: {md5: string, password: string, salt: string, sha1: string, sha256: string, username: string, uuid: string}
 name: {first: string, last: string, title: string},
 picture: {large: string, medium: string, thumbnail: string}
}