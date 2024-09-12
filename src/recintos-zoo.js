class RecintosZoo {
    constructor() {
    
    this.recintos = [
      { numero: 1, bioma: 'savana', tamanho: 10, animais: { macaco: 3 }, espacoDisponivel: 7 },
      { numero: 2, bioma: 'floresta', tamanho: 5, animais: {}, espaçoLivre: 5 },
      { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: { gazela: 1 }, espacoDisponivel: 6 },
      { numero: 4, bioma: 'rio', tamanho: 8, animais: {}, espacoDisponivel: 8},
      { numero: 5, bioma: 'savana', tamanho: 9, animais: { leao: 1 }, espacoDisponivel:8 }
    ];

    
    this.animais = {
      leao: { tamanho: 3, bioma: 'savana', carnívoro: true },
      leopardo: { tamanho: 2, bioma: 'savana', carnívoro: true },
      crocodilo: { tamanho: 3, bioma: 'rio', carnívoro: true },
      macaco: { tamanho: 1, bioma: 'savana ou floresta', carnívoro: false },
      gazela: { tamanho: 2, bioma: 'savana', carnívoro: false },
      hipopotamo: { tamanho: 4, bioma: 'savana ou rio', carnívoro: false }
    };
  }

    analisaRecintos(animal, quantidade) {
        if (!this.animais[animal.toLowerCase()]) {
            return { erro: 'Animal inválido' };
          }
          if (isNaN(quantidade) || quantidade <= 0) {
            return { erro: 'Quantidade inválida' };
          }
      
          const animalInfo = this.animais[animal.toLowerCase()];
          const resultados = [];
      
        
          this.recintos.forEach((recinto) => {
            const biomas = recinto.bioma.split(' e ');
            const espacoNecessario = quantidade * animalInfo.tamanho;
            const espacoDisponivel = recinto.tamanho - this.calcularEspacoOcupado(recinto, animalInfo);
      
        
            if (biomas.includes(animalInfo.bioma) || animalInfo.bioma === 'savana ou rio') {
              if (animalInfo.carnívoro) {
                if (this.podeAlocarCarnivoro(recinto, animal)) {
                  if (espacoDisponivel >= espacoNecessario) {
                    resultados.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanho})`);
                  }
                }
              } else {
                if (animal === 'macaco' && this.necessitaCompanhia(recinto)) {
                  if (espacoDisponivel >= espacoNecessario + 1) {
                    resultados.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario - 1} total: ${recinto.tamanho})`);
                  }
                } else if (espacoDisponivel >= espacoNecessario) {
                  resultados.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanho})`);
                }
              }
            }
          });
          if (resultados.length === 0) {
            return { erro: 'Não há recinto viável' };
          }
      
          return { recintosViaveis: resultados };
        }
      
        calcularEspacoOcupado(recinto, animalInfo) {
          let espacoOcupado = 0;
          for (const especie in recinto.animais) {
            const quantidade = recinto.animais[especie];
            const info = this.animais[especie];
            espacoOcupado += quantidade * info.tamanho;
            if (info.carnívoro) {
              espacoOcupado += quantidade - 1; // Espaço extra se houver mais de uma espécie
            }
          }
          return espacoOcupado;
        }
      
        podeAlocarCarnivoro(recinto, animal) {
          const animaisRecinto = Object.keys(recinto.animais);
          if (animaisRecinto.length === 0) {
            return true; // Se o recinto estiver vazio, qualquer carnívoro pode ser alocado
          }
          return animaisRecinto.length === 1 && animaisRecinto[0] === animal.toLowerCase();
        }
      
        necessitaCompanhia(recinto) {
          const macacos = recinto.animais['macaco'] || 0;
          return macacos === 0;
        }
    }


export { RecintosZoo as RecintosZoo };
