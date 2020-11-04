import { RequestHandler } from "express"
import { User } from "../models/user"


// export const createTodo: RequestHandler = (req, res, next) => {
//   // const text = req.body.text
//   // const newTodo = new User(Math.random().toString(), text)
//   // USERS.push(newTodo)
//   // res.status(201).json({ message: "Created the todo.", createedTodo: newTodo })
// }

export const getData: RequestHandler = (req, res) => {
  // res.json(USERS)
  User.getAllUsers(function (data: User[]) {

    res.send(data)
  })

}

export const updateUser: RequestHandler<{ id: string }> = (req, res) => {
  User.updateUser(req).then((data) => { res.send(data) }).catch((err) => { res.send(err) })
}

export const deleteUser: RequestHandler = (req, res) => {
  User.deleteUser(req).then(data => res.send(data)).catch(err => res.send(err))
}


export const loadData: RequestHandler = function (req, res) {
  User.loadData().then(data => res.send(data)).catch(err => res.send(err))
}