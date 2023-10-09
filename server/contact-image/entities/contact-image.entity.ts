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
import { Contact } from "../../contact/entities/contact.entity";

@Entity({ name: "contacts_images" })
export class ContactImage {
  save() {
    throw new Error("Method not implemented.");
  }
  @OneToOne(() => Contact, (contact: Contact) => contact.image)
  contact: Contact;

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  filename: string;

  @Column()
  originalName: string;

  @Column()
  mimeType: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
