import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { User } from "./User";

@Entity()
export class Vaccinations {
  @PrimaryGeneratedColumn()
   id!: number;

   @ManyToOne(() => User, (user) => user.vaccinate)
   user!: User;
 
  @CreateDateColumn()
  vaccinatedAt: Date;

}
