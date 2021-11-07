import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ECommerce, ECommerceRelations, Cliente, Libro} from '../models';
import {ClienteRepository} from './cliente.repository';
import {LibroRepository} from './libro.repository';

export class ECommerceRepository extends DefaultCrudRepository<
  ECommerce,
  typeof ECommerce.prototype.id,
  ECommerceRelations
> {

  public readonly clientes: HasManyRepositoryFactory<Cliente, typeof ECommerce.prototype.id>;

  public readonly libros: HasManyRepositoryFactory<Libro, typeof ECommerce.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>, @repository.getter('LibroRepository') protected libroRepositoryGetter: Getter<LibroRepository>,
  ) {
    super(ECommerce, dataSource);
    this.libros = this.createHasManyRepositoryFactoryFor('libros', libroRepositoryGetter,);
    this.registerInclusionResolver('libros', this.libros.inclusionResolver);
    this.clientes = this.createHasManyRepositoryFactoryFor('clientes', clienteRepositoryGetter,);
    this.registerInclusionResolver('clientes', this.clientes.inclusionResolver);
  }
}
