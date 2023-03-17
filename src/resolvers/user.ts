import { User } from "../entities/user";
import { MyContext } from "src/types";
import {Query,  Resolver, Mutation, Arg, InputType, Field, Ctx, ObjectType } from "type-graphql";
import  argon2 from "argon2";

@InputType()   // input type are to define argments of the resolvers
class UsernamePasswordInput {

    @Field()
    username: string

    @Field()
    password: string

    }

@ObjectType()
class FieldError {
    @Field()
    field : string;

    @Field()
    message: string;
}


@ObjectType()    // object type are used to define the return tupe of the resolver
class UserResponse{

    @Field(() => [FieldError], { nullable:true})
    errors?:FieldError[]  // ? means optional

    @Field(() => User, { nullable:true})
    user?:User
}


@Resolver()
export class UserResolver{

    @Query(() => User, { nullable: true})
    async me(
        @Ctx() {em,  req} : MyContext
    ) {
        if  (!req.session.userId){
            console.log(" couldn't find user")
            return null
        }
        const user =await  em.findOne(User, { id: req.session.userId})
        return user
    }

    @Mutation(() => UserResponse)
    async  register(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { em, req } : MyContext
    ) {
        //validations
        if (options.username.length <=2){
            return{
                errors:[
                    {field:"username", message: " length must be greater than 2"}
                ]
            }
        }
        if (options.password.length <=2){
            console.log( " in password")
            return{
                errors:[
                    {field:"password", message: " length must be greater than 2"}
                ]
            }
        }
        console.log( " after validation")
        // register 
        const hashedPassword =  await argon2.hash(options.password)
        const user = em.create(User, {
            username: options.username.toLowerCase(),
            createdAt: "",
            updatedAt: "",
            password: hashedPassword,
        })

        try{
            await em.persistAndFlush(user);
        }catch(err){
            console.log(err)
            if (err.code === '23505'){
                return { 
                    errors: [
                        {
                            field: " username",
                            message: "username already taken"
                        }
                    ]
                }
            }

        }
        // login in user after register
        req.session!.userId = user.id;

        return {user};
    }


    @Mutation(() => UserResponse)
    async  login(
        @Arg("options") options: UsernamePasswordInput,
        @Ctx() { em, req} : MyContext
    ): Promise<UserResponse> {
        const user = await  em.findOne(User, {
            username: options.username.toLowerCase(),  
        })

        if (!user) {
            return{
                errors:[{
                    field:'username', 
                    message:"user doesn't Exist",
                }]
            };
        }
        const valid =  await argon2.verify(  user.password, options.password);

        if (!valid){
            return{
                errors:[{
                    field:'Password', 
                    message:"Password doesn't Match",
                }]
            };
        }

        req.session!.userId = user.id;
        
        return {user};
    }
}