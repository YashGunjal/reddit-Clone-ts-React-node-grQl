import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field , Int}from "type-graphql"

@ObjectType()  
@Entity()
export class Post {
  @Field(() => Int)
  @PrimaryKey()
  id!: number;

  @Field(() => String) 
  @Property({ nullable: true })
  createdAt: Date = new Date();

  @Field(() => String)
  @Property({ onUpdate: () => new Date(),  nullable: true })
  updatedAt: Date = new Date();

  @Field()
  @Property()
  title!: string;

//   constructor(name: string, email: string) {
//     this.name = name;
//     this.email = email;
//   }

}