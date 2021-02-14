import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Developer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 50 })
  name: string;

  @Column({ nullable: true, type: 'varchar', length: 20 })
  gender: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ nullable: true, type: 'varchar', length: 100 })
  hobby: string;

  @Column()
  birthdate: Date;
}
