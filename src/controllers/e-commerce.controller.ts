import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {ECommerce} from '../models';
import {ECommerceRepository} from '../repositories';

export class ECommerceController {
  constructor(
    @repository(ECommerceRepository)
    public eCommerceRepository : ECommerceRepository,
  ) {}

  @post('/Ecommerce')
  @response(200, {
    description: 'ECommerce model instance',
    content: {'application/json': {schema: getModelSchemaRef(ECommerce)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ECommerce, {
            title: 'NewECommerce',
            exclude: ['id'],
          }),
        },
      },
    })
    eCommerce: Omit<ECommerce, 'id'>,
  ): Promise<ECommerce> {
    return this.eCommerceRepository.create(eCommerce);
  }

  @get('/Ecommerce/count')
  @response(200, {
    description: 'ECommerce model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(ECommerce) where?: Where<ECommerce>,
  ): Promise<Count> {
    return this.eCommerceRepository.count(where);
  }

  @get('/Ecommerce')
  @response(200, {
    description: 'Array of ECommerce model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(ECommerce, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(ECommerce) filter?: Filter<ECommerce>,
  ): Promise<ECommerce[]> {
    return this.eCommerceRepository.find(filter);
  }

  @patch('/Ecommerce')
  @response(200, {
    description: 'ECommerce PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ECommerce, {partial: true}),
        },
      },
    })
    eCommerce: ECommerce,
    @param.where(ECommerce) where?: Where<ECommerce>,
  ): Promise<Count> {
    return this.eCommerceRepository.updateAll(eCommerce, where);
  }

  @get('/Ecommerce/{id}')
  @response(200, {
    description: 'ECommerce model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(ECommerce, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(ECommerce, {exclude: 'where'}) filter?: FilterExcludingWhere<ECommerce>
  ): Promise<ECommerce> {
    return this.eCommerceRepository.findById(id, filter);
  }

  @patch('/Ecommerce/{id}')
  @response(204, {
    description: 'ECommerce PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ECommerce, {partial: true}),
        },
      },
    })
    eCommerce: ECommerce,
  ): Promise<void> {
    await this.eCommerceRepository.updateById(id, eCommerce);
  }

  @put('/Ecommerce/{id}')
  @response(204, {
    description: 'ECommerce PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() eCommerce: ECommerce,
  ): Promise<void> {
    await this.eCommerceRepository.replaceById(id, eCommerce);
  }

  @del('/Ecommerce/{id}')
  @response(204, {
    description: 'ECommerce DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.eCommerceRepository.deleteById(id);
  }
}
