import { RowDataPacket } from "mysql2";

interface userInfo extends RowDataPacket{
    username:string;
    email:string;
    password:string;
    // add in here like a pfp or other user info that isn't related to auth
}


export {
    userInfo
}