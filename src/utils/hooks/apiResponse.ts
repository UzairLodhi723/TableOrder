import { errorHandler } from "../helper/errorHandler";

export async function resAPI (create: any, payload: Object,onSucessCallBack:any) {
  try{
    const result = await create(payload).unwrap();
    console.log(result,"res")
    onSucessCallBack(result)
  }catch(error:any){
    console.log("error",error)

    errorHandler(error)
  }
}

