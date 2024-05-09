type ExpressRequest = import('express').Request


declare namespace BTypes {
    type Request = {
        user?:{id:string,email:string}
    } & ExpressRequest
}