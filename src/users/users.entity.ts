import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  BeforeRemove,
  Column,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log('inserted user with id: ' + this.id);
  }
  @AfterUpdate()
  logUpdate() {
    console.log('updated user with id: ' + this.id);
  }
  @BeforeRemove()
  logRemove() {
    console.log('deleted user with id: ' + this.id);
  }
}
