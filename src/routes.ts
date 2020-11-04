import { Router } from "express"
import { getData, updateUser, deleteUser, loadData } from "./controllers/users"

const router = Router()

router.get("/load", loadData)
router.get("/", getData)

router.post("/:id", updateUser)

router.delete("/:id", deleteUser)

export default router
