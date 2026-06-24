import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    // Here we are using clerkId as the unique identifier for the user instead of the default _id provided by MongoDB. 
    // This is because we are using Clerk for authentication and authorization, and each user will have a 
    // unique clerkId assigned to them by Clerk.
    clerkId : {
        type : String ,
        required : true ,
        unique : true,
    } ,
    email : {
        type : String ,
        required : true ,
        unique : true,
    } ,
    fullName : {
        type : String ,
        required : true ,
    } , 
    profilePic : {
        type : String ,
        default : ""
    } , 

} , { timestamps: true });

const User = mongoose.model("User" , userSchema);
export default User;

