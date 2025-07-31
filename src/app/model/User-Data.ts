export interface UserData{
  id?: number,
  full_name : string,
  email : string,
  store_type : string,
  password : string,
  isPaid?:boolean,
  status?:string,
  role?:string
}