import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { ObjectType, Field , Int}from "type-graphql"

@ObjectType()  
@Entity()
export class User {
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
  @Property({ type:"text", unique:true})
  username!: string;

  
  //   @Field()  by removing field  from here we  are creating column in DB but not exposing this field to graphql for fetching
  @Property({ type:"text"})
  password!: string;


}