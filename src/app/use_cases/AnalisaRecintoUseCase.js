class AnalisaRecintosUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  execute(tipoAnimal, quantidade) {
    const animal = this.repository.getAnimal(tipoAnimal);
    if (!animal) {
      return { erro: 'Animal inválido' };
    }

    if (quantidade <= 0 || !Number.isInteger(quantidade)) {
      return { erro: 'Quantidade inválida' };
    }

    const recintos = this.repository.getAllRecintos();
    const recintosViaveis = recintos
      .filter(recinto => recinto.isViavelPara(animal, quantidade))
      .sort((a, b) => a.numero - b.numero)
      .map(recinto => recinto.formatarResultado(animal, quantidade));

    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recinto viável' };
    }

    return { recintosViaveis };
  }
}

export { AnalisaRecintosUseCase };
