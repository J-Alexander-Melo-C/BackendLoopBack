import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Cliente, ClienteRelations, Compra} from '../models';
import {CompraRepository} from './compra.repository';

export class ClienteRepository extends DefaultCrudRepository<
  Cliente,
  typeof Cliente.prototype.id,
  ClienteRelations
> {

  public readonly compra: HasOneRepositoryFactory<Compra, typeof Cliente.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CompraRepository') protected compraRepositoryGetter: Getter<CompraRepository>,
  ) {
    super(Cliente, dataSource);
    this.compra = this.createHasOneRepositoryFactoryFor('compra', compraRepositoryGetter);
    this.registerInclusionResolver('compra', this.compra.inclusionResolver);
  }
}
