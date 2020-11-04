import client from "../db"
import { RequestHandler, Request } from "express"
import fs from 'fs'


export class User {
  constructor(public id: string, public firstName: string, public middleName: string, public lastName: string, public email: string, public phoneNumber: string, public role: string, public address: string) { }

  public static getAllUsers(callback: any) {
    client.query("SELECT * FROM  users", (err: Error, data) => {
      if (err) throw Error('something wrong')
      else {
        callback(data.rows)
      }
    })
  }


  public static updateUser(req: Request) {

    return new Promise((resolve, reject) => {
      const userId = req.params.id
      const firstName = req.body.firstName

      const middleName = req.body.middleName
      const lastName = req.body.lastName
      const email = req.body.email
      const phoneNumber = req.body.phoneNumber
      const role = req.body.role
      const address = req.body.address
      const QUERY = `update users set firstName='${firstName}',lastName = '${lastName}',middleName = '${middleName}',email='${email}',phoneNumber='${phoneNumber}',role='${role}',address = '${address}' where id = '${userId}'`
      client.query(QUERY, (err: Error, data) => {
        if (err) reject("something wrong")
        else {
          resolve("user updated")
        }
      })
    })
  }

  public static deleteUser(req: Request) {
    return new Promise((resolve, reject) => {
      const userId = req.params.id
      const QUERY = `DELETE FROM users WHERE id='${userId}'`
      client.query(QUERY, function (err, data) {
        if (err) reject("something wrong")
        else {
          resolve('user deleted sucessfully')
        }
      })
    })
  }



  public static loadData() {
    return new Promise((resolve, reject) => {
      let data = fs.readFileSync('./data.json', 'utf-8')
      let dataObj = JSON.parse(data)
      console.log(dataObj)
      dataObj.map(async function (user: any) {
        await client.query(`insert into users values(${user.id},'${user.firstName}','${user.middleName}','${user.lastName}','${user.email}','${user.phoneNumber}','${user.role}','${user.address}')`, function (err, data) {
          if (err) {
            reject('something wrong in inserting data into database')
          }
        })
      })
      resolve("data loaded sucessfully")
    })

  }
}
