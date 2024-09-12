class Recinto {
  constructor(numero, bioma, tamanhoTotal, animais) {
    this.numero = numero;
    this.bioma = bioma;
    this.tamanhoTotal = tamanhoTotal;
    this.animais = animais;
  }

  isViavelPara(animal, quantidade) {
    console.log(`Verificando se o recinto ${this.numero} é viável para ${quantidade} ${animal.nome}(s)`);

    if (['LEAO', 'LEOPARDO', 'CROCODILO'].includes(animal.nome)) {
      if (!animal.biomas.includes(this.bioma)) {
        console.log(`Recinto ${this.numero} não é adequado devido ao bioma para ${animal.nome}`);
        return false;
      }
    } else {
      const temCarnivoros = this.animais.some(a => ['LEAO', 'LEOPARDO', 'CROCODILO'].includes(a.nome));
      if (temCarnivoros) {
        console.log(`Recinto ${this.numero} não é viável porque já contém animais carnívoros`);
        return false;
      }

      if (animal.nome === 'MACACO') {
        if (!['savana', 'floresta', 'savana e rio'].includes(this.bioma)) {
          console.log(`Recinto ${this.numero} não é adequado devido ao bioma para macacos`);
          return false;
        }
        if (this.animais.length === 0 && quantidade <= 1) {
          console.log(`Recinto ${this.numero} não é viável porque está vazio e a quantidade de macacos é ${quantidade}`);
          return false;
        }
      } else {
        if (!animal.biomas.includes(this.bioma)) {
          console.log(`Recinto ${this.numero} não é adequado devido ao bioma`);
          return false;
        }
      }
    }

    const espacoOcupadoExistente = this.animais.reduce((total, a) => total + a.tamanho, 0);
    const espacoOcupadoNovo = quantidade * animal.tamanho;
    let espacoOcupado = espacoOcupadoExistente + espacoOcupadoNovo;

    const especiesPresentes = new Set([...this.animais.map(a => a.nome), animal.nome]).size;
    if (especiesPresentes > 1) {
      espacoOcupado += 1;
    }

    const espacoDisponivel = this.tamanhoTotal - espacoOcupado;

    if (espacoDisponivel >= 0) {
      return true;
    }
    return false;
  }

  formatarResultado(animal, quantidade) {
    const espacoOcupadoExistente = this.animais.reduce((total, a) => total + a.tamanho, 0);
    const espacoOcupadoNovo = quantidade * animal.tamanho;
    let espacoOcupado = espacoOcupadoExistente + espacoOcupadoNovo;

    const especiesPresentes = new Set([...this.animais.map(a => a.nome), animal.nome]).size;
    if (especiesPresentes > 1) {
      espacoOcupado += 1;
    }

    const espacoLivre = this.tamanhoTotal - espacoOcupado;
    return `Recinto ${this.numero} (espaço livre: ${espacoLivre} total: ${this.tamanhoTotal})`;
  }
}

export { Recinto };
