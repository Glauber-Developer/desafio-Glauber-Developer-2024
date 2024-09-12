class Animal {
  constructor(nome, tamanho, biomas) {
    this.nome = nome;
    this.tamanho = tamanho;
    this.biomas = biomas;
  }

  podeHabitar(bioma) {
    return this.biomas.includes(bioma);
  }
}

export { Animal };
