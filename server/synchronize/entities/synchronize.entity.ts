import {
  Check,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "synchronize" })
export class ContactImage {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  lastDateSynchronize: Date;

  @Column()
  lastDateDatabase: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
