import { Animal } from '../../../domain/entities/Animal';
import { Recinto } from '../../../domain/entities/Recinto';

class Repository {
  constructor() {
    this.animais = [
      new Animal('LEAO', 3, ['savana']),
      new Animal('LEOPARDO', 2, ['savana']),
      new Animal('CROCODILO', 3, ['rio']),
      new Animal('MACACO', 1, ['savana', 'floresta']),
      new Animal('GAZELA', 2, ['savana']),
      new Animal('HIPOPOTAMO', 4, ['savana', 'rio']),
    ];

    this.recintos = [
      new Recinto(1, 'savana', 10, [
        new Animal('MACACO', 1, ['savana']),
        new Animal('MACACO', 1, ['savana']),
        new Animal('MACACO', 1, ['savana'])
      ]),
      new Recinto(2, 'floresta', 5, []),
      new Recinto(3, 'savana e rio', 7, [new Animal('GAZELA', 2, ['savana'])]),
      new Recinto(4, 'rio', 8, []),
      new Recinto(5, 'savana', 9, [new Animal('LEAO', 3, ['savana'])])
    ];    
  }

  getAnimal(nome) {
    return this.animais.find(animal => animal.nome === nome);
  }

  getAllRecintos() {
    return this.recintos;
  }
}

export { Repository };
