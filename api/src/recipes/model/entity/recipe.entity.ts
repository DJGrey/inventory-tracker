import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class RecipeEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  name: string;

  // Integer as price are stored in cents.
  @Column('integer')
  price: number;

  @Column({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    nullable: false,
  })
  createdAt?: Date;
}
