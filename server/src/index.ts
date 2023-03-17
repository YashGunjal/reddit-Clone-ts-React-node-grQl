import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
// import { Post } from "./entities/post";
import microConfig from "./mikro-orm.config";
import cors from 'cors';

import Express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/posts";
import { UserResolver } from "./resolvers/user";

// redissetup

import RedisStore from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import { MyContext } from "./types";

const main = async () => {
  // setting up Express
  const app = Express();

  // app.get("/", (_, res) => {
  //   res.send("hey");
  // });

  // Initialize sesssion storage.
  // Initialize client.
  let redisClient = createClient();
  redisClient.connect().catch(console.error);

  // Initialize store.
  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "myapp:reditClone",
    disableTouch: true,
    // disableTTL: true,
  });

  app.set("trust proxy", 1);
  app.use(
    cors({
      origin:   process.env.CORS_ORIGIN || "http://localhost:3000",
      credentials: true,
    })
  );

  

  app.use(
    session({
      name: "qid",
      store: redisStore,
      resave: false, // required: force lightweight session keep alive (touch)
      saveUninitialized: false, // recommended: only save session when data exists
      secret: "somerandom strin gin environemnt variables",
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
        httpOnly: true, // you can not access cookie in javascript on frontend   this is to make it secure
        secure: __prod__, // cookie only works in https
        sameSite: 'lax',  // csrf
      },
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    context: ({ req, res }): MyContext => ({ em: orm.em, req, res }), //acessible by all the resolver
  });
  // added this line
  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    cors:false
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


// app.set("trust proxy", process.env.NODE_ENV !== "production");

  //if you access it from localhost uncomment below lines
  // const whitelist = [
  //   "http://localhost:3000",
  //   "https://studio.apollographql.com",
  // ];
  // let corsOptions = {
  //   origin: function (origin: string, callback: (arg0: Error | null, arg1: boolean | undefined) => void) {
  //     if (whitelist.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error("Not allowed by CORS"), true);
  //     }
  //   },
  // };
  // app.use(cors({ credentials: true, origin: corsOptions }));