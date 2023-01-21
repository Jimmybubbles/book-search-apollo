//import destructured user from models
import { attachConnectorsToContext, AuthenticationError } from "apollo-server-express";
import { User } from "../models";

const resolvers = {
    Query: {
        
        // get a user by username
        me: async (parent, args, context) => {

            if(context.user) {
                const userData = await User.findOne({})
                .select('__v -password')
                .populate('books')

                return userData
            }

            throw new AuthenticationError('Not logged in')
        }
    }
}


module.exports = resolvers