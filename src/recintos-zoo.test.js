import { RecintosZoo } from "./recintos-zoo.js";
import { Recinto } from "./domain/entities/Recinto.js"

describe('Recintos do Zoologico', () => {

    test('Deve rejeitar animal inválido', () => {
            const resultado = new RecintosZoo().analisaRecintos('UNICORNIO', 1);
            expect(resultado.erro).toBe("Animal inválido");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve rejeitar quantidade inválida', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 0);
            expect(resultado.erro).toBe("Quantidade inválida");
            expect(resultado.recintosViaveis).toBeFalsy();
    });

    test('Não deve encontrar recintos para 10 macacos', () => {
            const resultado = new RecintosZoo().analisaRecintos('MACACO', 10);
            expect(resultado.erro).toBe("Não há recinto viável");
            expect(resultado.recintosViaveis).toBeFalsy();
        });

    test('Deve encontrar recinto para 1 crocodilo', () => {
        const resultado = new RecintosZoo().analisaRecintos('CROCODILO', 1);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 4 (espaço livre: 5 total: 8)');
        expect(resultado.recintosViaveis.length).toBe(1);
    });

    test('Deve encontrar recintos para 2 macacos', () => {

        const resultado = new RecintosZoo().analisaRecintos('MACACO', 2);
        expect(resultado.erro).toBeFalsy();
        expect(resultado.recintosViaveis[0]).toBe('Recinto 1 (espaço livre: 5 total: 10)');
        expect(resultado.recintosViaveis[1]).toBe('Recinto 2 (espaço livre: 3 total: 5)');
        expect(resultado.recintosViaveis[2]).toBe('Recinto 3 (espaço livre: 2 total: 7)');
        expect(resultado.recintosViaveis.length).toBe(3);
    });

});

describe('Testes de viabilidade de recintos para macacos', () => {
    test('Recinto vazio não deve ser viável para apenas 1 macaco', () => {
      const recintoVazio = new Recinto(1, 'savana', 10, []);
      const macaco = { nome: 'MACACO', biomas: ['savana', 'floresta', 'savana e rio'], tamanho: 1 };
  
      const resultado = recintoVazio.isViavelPara(macaco, 1);
      expect(resultado).toBe(false);
    });
  
    test('Recinto vazio deve ser viável para 2 ou mais macacos', () => {
      const recintoVazio = new Recinto(2, 'savana', 10, []);
      const macaco = { nome: 'MACACO', biomas: ['savana', 'floresta', 'savana e rio'], tamanho: 1 };
  
      const resultado = recintoVazio.isViavelPara(macaco, 2);
      expect(resultado).toBe(true);
    });
  
    test('Recinto com outros animais não carnívoros deve ser viável para macacos', () => {
      const recintoComAnimais = new Recinto(3, 'savana', 10, [{ nome: 'GAZELA', tamanho: 2 }]);
      const macaco = { nome: 'MACACO', biomas: ['savana', 'floresta', 'savana e rio'], tamanho: 1 };
  
      const resultado = recintoComAnimais.isViavelPara(macaco, 2);
      expect(resultado).toBe(true);
    });
  
    test('Recinto com carnívoros não deve ser viável para macacos', () => {
      const recintoComCarnivoro = new Recinto(4, 'savana', 10, [{ nome: 'LEAO', tamanho: 3 }]);
      const macaco = { nome: 'MACACO', biomas: ['savana', 'floresta', 'savana e rio'], tamanho: 1 };
  
      const resultado = recintoComCarnivoro.isViavelPara(macaco, 2);
      expect(resultado).toBe(false);
    });
  });
