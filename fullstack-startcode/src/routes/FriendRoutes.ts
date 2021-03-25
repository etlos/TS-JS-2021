import {Router} from 'express'
import app from '../app'
const router = Router()
import { ApiError } from "../errors/APIErrors"
import authMiddleware from "../middleware/basic-auth"
import facade from "../facade/DummyDB-Facade"
import { IFriend } from '../interfaces/IFriend';
router.use(authMiddleware)

//Get All Friends
router.get("/all", async (req,res) => {
  const friends = await facade.getAllFriends()
  const friendsDTO = friends.map(friend => {
      const {firstName,lastName} = friend //Destructuring
      return {firstName,lastName} //return new object to friendsDTO array
  })
  res.json(friendsDTO)
})

//Get Friend by mail
router.get("/me", async (req:any, res, next) => {
  const userId = req.credentials.userName;
  try{
  const friend = await facade.getFriend(userId);
  if (friend == null) {
    throw new ApiError("user not found",404)
  }
  const { firstName, lastName, email } = friend;
  const friendDTO = { firstName, lastName, email }
  res.json(friendDTO);
} catch (err) {
  next(err)
}
})
/*router.get("/findby-username/:userid", async (req, res, next) => {
    const userId = req.params.userid;
    try{
    const friend = await facade.getFriend(userId);
    if (friend == null) {
      throw new ApiError("user not found",404)
    }
    const { firstName, lastName, email } = friend;
    const friendDTO = { firstName, lastName, email }
    res.json(friendDTO);
  } catch (err) {
    next(err)
  }
})*/
  
//Add Friend
router.post("/add", async (req,res) => {
    console.log("Hello")
    console.log(req.body)
    let friend : IFriend = {
        id: "",
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password 
    }
    const addFriend = await facade.addFriend(friend)
    res.send(addFriend)
  })

//Delete by email
router.delete("/delete/:id", async (req,res) => {
    const friend = await facade.deleteFriend(req.params.id)
    res.json(friend)
})


export default router