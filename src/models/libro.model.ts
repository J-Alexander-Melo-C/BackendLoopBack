import {Entity, model, property} from '@loopback/repository';

@model()
export class Libro extends Entity {
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
  genero: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'number',
    required: true,
  })
  precio: number;

  @property({
    type: 'string',
  })
  compraId?: string;

  @property({
    type: 'string',
  })
  eCommerceId?: string;

  constructor(data?: Partial<Libro>) {
    super(data);
  }
}

export interface LibroRelations {
  // describe navigational properties here
}

export type LibroWithRelations = Libro & LibroRelations;
