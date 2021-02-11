import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Developer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 1 })
  gender: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  hobby: string;

  @Column()
  birthdate: Date;
}
