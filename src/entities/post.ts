import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Post {

  @PrimaryKey()
  id!: number;


  @Property({ nullable: true })
  createdAt: Date = new Date();


  @Property({ onUpdate: () => new Date(),  nullable: true })
  updatedAt: Date = new Date();

  @Property()
  title!: string;

//   constructor(name: string, email: string) {
//     this.name = name;
//     this.email = email;
//   }

}