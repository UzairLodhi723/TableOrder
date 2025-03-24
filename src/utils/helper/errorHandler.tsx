import { toast } from 'react-toastify'

export function errorHandler(error:any) {
    if(error?.data?.errors){
        toast(error?.data?.errors[0].msg)
    }else if(error?.data?.message){
        toast(error.data.message)
    }else{
        toast(error)
    }
} 
    
