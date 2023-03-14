import { MikroORM } from "@mikro-orm/postgresql"
import { __prod__ } from "./constants"
import { Post } from "./entities/post"

export default {
    entities: [Post],
    dbName: "redditdb",
    type: "postgresql",
    user:"postgres",
    password:"qazwsxedc",
    debug: !__prod__,
    migrations:{
        path: './migrations', // path to the folder with migrations
        glob: '!(*.d).{js,ts}'
    }
} as Parameters< typeof MikroORM.init>[0] ;
