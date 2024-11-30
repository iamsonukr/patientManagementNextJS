import {ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser=async(user:CreateUserParams)=>{
    try {
        const newUser=await users.create(ID.unique(),  user.email, user.phone, undefined, user.name)
        console.log({newUser})
        return JSON.parse(JSON.stringify(newUser));
    } catch (error:any) {
        if(error && error?.code===409){
            const existingUser=await users.list ([
                Query.equal('email', [user.email])
            ])

            return existingUser?.users[0]
        }
    }
}

// import { ID, Query } from "node-appwrite";
// import { users } from "../appwrite.config";
// import { parseStringify } from "../utils";

// export const createUser = async (user: CreateUserParams) => {
//   try {
//     // Create a new user
//     const newUser = await users.create(ID.unique(), user.email, undefined, user.name);
//     console.log({ newUser });

//     // Return a sanitized user object
//     return JSON.parse(JSON.stringify(newUser));
//   } catch (error: any) {
//     if (error?.code === 409) {
//       // Handle conflict: user already exists
//       console.warn("User already exists. Fetching existing user...");
//       const existingUser = await users.list([Query.equal("email", [user.email])]);

//       if (existingUser?.users.length > 0) {
//         return existingUser.users[0];
//       } else {
//         throw new Error("No user found with the provided email.");
//       }
//     } else {
//       console.error("Unexpected error creating user:", error);
//       throw error; // Re-throw unexpected errors
//     }
//   }
// };
