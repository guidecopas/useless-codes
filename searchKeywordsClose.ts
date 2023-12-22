import Fuse, { FuseResult, IFuseOptions } from "fuse.js";

const keywords = ["menuporn", "menu", "entretenimento", "meme", "memes", "mensal"];

const fuseOptions: IFuseOptions<string> = {
    threshold: 0.3,
    minMatchCharLength: 3,
    includeScore: true,
};

const isCommandValid = (command: string): boolean => {
    return keywords.includes(command);
};

const suggestCommands = (command: string): string[] => {
    const fuse = new Fuse(keywords, fuseOptions).search(command);
    return fuse.map((item: FuseResult<string>) => item.item);
};

const userInput = "menus";

if (isCommandValid(userInput)) {
    console.log("Comando válido:", userInput);
} else {
    console.log("Comando inválido. Sugerindo comandos próximos:", suggestCommands(userInput));
}
