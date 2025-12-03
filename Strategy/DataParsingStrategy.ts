import { Animal } from '../entities/Animal'; 
import { IParsingStrategy } from '../Interfaces/ParsingInterface';

// --- ESTRATEGIA JSON ---
export class JsonParsingStrategy implements IParsingStrategy {

  tipo = "Json";

  parse(rawData: any): Animal[] {
    try {
      console.log("--> Usando Estrategia JSON");

      // 1) Si rawData es string → parsearlo
      const parsed =
        typeof rawData === "string" ? JSON.parse(rawData) : rawData;

      // 2) Tu JSON real tiene la propiedad "animales"
      const dataArray = parsed.animales;

      return dataArray.map((item: any): Animal => ({
        esp: item.esp ?? "Desconocida",
        peso_kg: Number(item.peso_kg) || 0,
        patas: Number(item.patas) || 0,
        tipo: item.tipo ?? "Indefinido",
        vida: Number(item.vida ?? "Desconocida")
      }));

    } catch (e) {
      console.log(e);
      throw new Error("El formato JSON es inválido.");
    }
  }
}

// // --- ESTRATEGIA XML ---
// export class XmlParsingStrategy implements ParsingStrategy {
//   parse(rawData: string): Animal[] {
//     console.log("--> Usando Estrategia XML");
//     const animals: Animal[] = [];
    
//     // Regex ajustados para buscar las etiquetas en español de tu interfaz Animal
//     const regex = /<animal>(.*?)<\/animal>/gs; 
    
//     // Helpers de regex para campos específicos
//     const getTag = (text: string, tag: string) => {
//       const match = text.match(new RegExp(`<${tag}>(.*?)<\/${tag}>`));
//       return match ? match[1] : null;
//     };

//     let match;
//     while ((match = regex.exec(rawData)) !== null) {
//       const content = match[1];

//       // Construimos el objeto Animal parseando los strings a números cuando hace falta
//       const animal: Animal = {
//         especie: getTag(content, 'especie') || "Desconocida",
//         peso_kg: parseFloat(getTag(content, 'peso_kg') || "0"),
//         n_patas: parseInt(getTag(content, 'n_patas') || "0", 10),
//         tipo: getTag(content, 'tipo') || "Indefinido",
//         esperanza_vida: getTag(content, 'esperanza_vida') || "Desconocida"
//       };

//       animals.push(animal);
//     }

//     if (animals.length === 0) {
//       throw new Error("XML válido pero sin animales o etiquetas incorrectas.");
//     }

//     return animals;
//   }
// }

// // --- ESTRATEGIA ERROR ---
// export class UnknownFormatStrategy implements ParsingStrategy {
//   parse(rawData: string): Animal[] {
//     throw new Error("Formato desconocido. No se pudo procesar como Animal.");
//   }
// }