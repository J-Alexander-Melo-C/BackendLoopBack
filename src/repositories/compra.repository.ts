import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Compra, CompraRelations, Libro} from '../models';
import {LibroRepository} from './libro.repository';

export class CompraRepository extends DefaultCrudRepository<
  Compra,
  typeof Compra.prototype.id,
  CompraRelations
> {

  public readonly libro: HasOneRepositoryFactory<Libro, typeof Compra.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('LibroRepository') protected libroRepositoryGetter: Getter<LibroRepository>,
  ) {
    super(Compra, dataSource);
    this.libro = this.createHasOneRepositoryFactoryFor('libro', libroRepositoryGetter);
    this.registerInclusionResolver('libro', this.libro.inclusionResolver);
  }
}
