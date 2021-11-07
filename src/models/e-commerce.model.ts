import {Entity, model, property, hasMany} from '@loopback/repository';
import {Cliente} from './cliente.model';
import {Libro} from './libro.model';

@model()
export class ECommerce extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'array',
    itemType: 'string',
    required: true,
  })
  catalogo: string[];

  @property({
    type: 'number',
    required: true,
  })
  carritoCompra: number;

  @hasMany(() => Cliente)
  clientes: Cliente[];

  @hasMany(() => Libro)
  libros: Libro[];

  constructor(data?: Partial<ECommerce>) {
    super(data);
  }
}

export interface ECommerceRelations {
  // describe navigational properties here
}

export type ECommerceWithRelations = ECommerce & ECommerceRelations;
