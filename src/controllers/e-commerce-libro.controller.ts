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
  ECommerce,
  Libro,
} from '../models';
import {ECommerceRepository} from '../repositories';

export class ECommerceLibroController {
  constructor(
    @repository(ECommerceRepository) protected eCommerceRepository: ECommerceRepository,
  ) { }

  @get('/e-commerces/{id}/libros', {
    responses: {
      '200': {
        description: 'Array of ECommerce has many Libro',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Libro)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Libro>,
  ): Promise<Libro[]> {
    return this.eCommerceRepository.libros(id).find(filter);
  }

  @post('/e-commerces/{id}/libros', {
    responses: {
      '200': {
        description: 'ECommerce model instance',
        content: {'application/json': {schema: getModelSchemaRef(Libro)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ECommerce.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Libro, {
            title: 'NewLibroInECommerce',
            exclude: ['id'],
            optional: ['eCommerceId']
          }),
        },
      },
    }) libro: Omit<Libro, 'id'>,
  ): Promise<Libro> {
    return this.eCommerceRepository.libros(id).create(libro);
  }

  @patch('/e-commerces/{id}/libros', {
    responses: {
      '200': {
        description: 'ECommerce.Libro PATCH success count',
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
    return this.eCommerceRepository.libros(id).patch(libro, where);
  }

  @del('/e-commerces/{id}/libros', {
    responses: {
      '200': {
        description: 'ECommerce.Libro DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Libro)) where?: Where<Libro>,
  ): Promise<Count> {
    return this.eCommerceRepository.libros(id).delete(where);
  }
}
