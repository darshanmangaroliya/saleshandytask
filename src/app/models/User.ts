import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Vaccinations } from "./Vaccination ";

@Entity()
@Unique(["AdharCardNumber"])
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public username!: string;

  @Column()
  public AdharCardNumber!: string;

  @OneToMany(() => Vaccinations, (vaccination) => vaccination.user)
  vaccinate: Vaccinations[];

  @Column({ nullable: false })
  public IpAddress!: string;

  @Column({ nullable: false })
  public State!: string;

}
