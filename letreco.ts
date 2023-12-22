import { Word } from "@andsfonseca/palavras-pt-br";
import prompt from "prompt-sync";
let randomWord: string = Word.getRandomWord(5, true);

const Prompt = prompt();

const vidas = 6;
const palavra = randomWord;
const palavraArray = palavra.split("").map((e) => e.toUpperCase());

const checarLetra = (respostaUsuario: string[]) => {
    const newArray = respostaUsuario.map((letter, i) => {
        if (palavraArray[i] === letter) {
            return "🟩";
        } else if (palavraArray.includes(letter)) {
            return "🟧";
        } else {
            return "🟥";
        }
    });
    return newArray;
};

for (let i = 0; i < vidas; i++) {
    const palavraUsuario = Prompt("Digite uma palavra => ");
    if (palavraUsuario.length > palavra.length) {
        --i;
        console.log("Máximo de 5 Letras, tente novamente!");
        continue;
    }
    const arr = checarLetra(palavraUsuario.split("").map((e) => e.toUpperCase()));

    console.log(arr);

    if (arr.every((e) => e === "🟩")) {
        console.log("Você acertou!!!");
        break;
    }
}
