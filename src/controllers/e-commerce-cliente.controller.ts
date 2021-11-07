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
  Cliente,
} from '../models';
import {ECommerceRepository} from '../repositories';

export class ECommerceClienteController {
  constructor(
    @repository(ECommerceRepository) protected eCommerceRepository: ECommerceRepository,
  ) { }

  @get('/e-commerces/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of ECommerce has many Cliente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cliente)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.eCommerceRepository.clientes(id).find(filter);
  }

  @post('/e-commerces/{id}/clientes', {
    responses: {
      '200': {
        description: 'ECommerce model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof ECommerce.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewClienteInECommerce',
            exclude: ['id'],
            optional: ['eCommerceId']
          }),
        },
      },
    }) cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    return this.eCommerceRepository.clientes(id).create(cliente);
  }

  @patch('/e-commerces/{id}/clientes', {
    responses: {
      '200': {
        description: 'ECommerce.Cliente PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Partial<Cliente>,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.eCommerceRepository.clientes(id).patch(cliente, where);
  }

  @del('/e-commerces/{id}/clientes', {
    responses: {
      '200': {
        description: 'ECommerce.Cliente DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cliente)) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.eCommerceRepository.clientes(id).delete(where);
  }
}
