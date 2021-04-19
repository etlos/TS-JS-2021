export enum Gender {
  MALE,
  FEMALE,
  OTHER
 }
 
 export default interface ILyndaFriend  {
   id? :string
   firstName: string
   lastName: string
   gender : Gender
   age: string
   email: string
 }
 