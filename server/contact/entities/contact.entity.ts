/* eslint-disable import/prefer-default-export */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContactImage } from "../../contact-image/entities/contact-image.entity";

@Entity({ name: "contacts" })
export class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  phoneNumber: number;

  @OneToOne(
    () => ContactImage,
    (contactImage: ContactImage) => contactImage.contact,
    { onDelete: "CASCADE", onUpdate: "CASCADE" }
  )
  @JoinColumn({ name: "imageId" })
  image: ContactImage;

  @Column({ nullable: true })
  gender: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @Column()
  statusUpload: string;
}
