import { MikroORM } from "@mikro-orm/postgresql"
import { __prod__ } from "./constants"
import { Post } from "./entities/post"
import path  from "path";
import { User } from "./entities/user";

export default {
    entities: [Post, User],
    dbName: "redditdb",
    type: "postgresql",
    user:"postgres",
    password:"qazwsxedc",
    allowGlobalContext:true,
    debug: !__prod__,
    migrations:{
        path: path.join(__dirname,"./migrations"), // path to the folder with migrations
        glob: '!(*.d).{js,ts}'
    }
} as Parameters< typeof MikroORM.init>[0] ;
