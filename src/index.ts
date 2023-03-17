import 'reflect-metadata';
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/post";
import microConfig from "./mikro-orm.config";

import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";
import { UserResolver } from './resolvers/user';

const main = async () => {
  // setting up Express
  const app = Express();

  // app.get("/", (_ ,res)=>{
  //     res.send("hey");
  // })

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: () => ({ em: orm.em}) //acessible by all the resolver
  });
  // added this line
  await apolloServer.start();

  apolloServer.applyMiddleware({ 
    app
    // ,cors:false 
 });

  app.listen(4000, () => {
    console.log(" listing onport 4000");
  });

  // orm setup
  const orm = await MikroORM.init(microConfig);
  await orm.getMigrator().up();

  // Orm setup initial tests
  // const post = orm.em.create(Post, {
  //     title: "my first post",
  //     createdAt: "",
  //     updatedAt: ""
  // });

  // await orm.em.persistAndFlush(post);

  // const posts = await orm.em.find(Post, {});
  // console.log(posts)
};

main();
