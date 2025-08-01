export interface UserData{
  id?: number,
  full_name : string,
  email : string,
  store_type : string,
  password : string,
  paymentStatus?:boolean,
  status?:string,
  role?:string
}