import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Compra,
  Libro,
} from '../models';
import {CompraRepository} from '../repositories';

export class CompraLibroController {
  constructor(
    @repository(CompraRepository) protected compraRepository: CompraRepository,
  ) { }

  @get('/compras/{id}/libro', {
    responses: {
      '200': {
        description: 'Compra has one Libro',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Libro),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Libro>,
  ): Promise<Libro> {
    return this.compraRepository.libro(id).get(filter);
  }

  @post('/compras/{id}/libro', {
    responses: {
      '200': {
        description: 'Compra model instance',
        content: {'application/json': {schema: getModelSchemaRef(Libro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Compra.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Libro, {
            title: 'NewLibroInCompra',
            exclude: ['id'],
            optional: ['compraId']
          }),
        },
      },
    }) libro: Omit<Libro, 'id'>,
  ): Promise<Libro> {
    return this.compraRepository.libro(id).create(libro);
  }

  @patch('/compras/{id}/libro', {
    responses: {
      '200': {
        description: 'Compra.Libro PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Libro, {partial: true}),
        },
      },
    })
    libro: Partial<Libro>,
    @param.query.object('where', getWhereSchemaFor(Libro)) where?: Where<Libro>,
  ): Promise<Count> {
    return this.compraRepository.libro(id).patch(libro, where);
  }

  @del('/compras/{id}/libro', {
    responses: {
      '200': {
        description: 'Compra.Libro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Libro)) where?: Where<Libro>,
  ): Promise<Count> {
    return this.compraRepository.libro(id).delete(where);
  }
}
