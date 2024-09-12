import { AnalisaRecintosUseCase } from './app/use_cases/AnalisaRecintoUseCase';
import { Repository } from './infrastructure/database/repositories/Repository';

class RecintosZoo {
  constructor() {
    this.repository = new Repository();
    this.analisaRecintosUseCase = new AnalisaRecintosUseCase(this.repository);
  }

  analisaRecintos(tipoAnimal, quantidade) {
    const resultado = this.analisaRecintosUseCase.execute(tipoAnimal, quantidade);
    return resultado;
  }
}

export { RecintosZoo as RecintosZoo };
