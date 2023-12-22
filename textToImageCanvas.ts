import { CanvasRenderingContext2D, createCanvas, loadImage } from "canvas";
import * as fs from "fs/promises";

const canvasSize = 512;
const maxWidth = 480;

async function drawBackground(backgroundImagePath?: string): Promise<CanvasRenderingContext2D> {
    const canvas = createCanvas(canvasSize, canvasSize);
    const ctx: CanvasRenderingContext2D = canvas.getContext("2d");
    if (backgroundImagePath) {
        try {
            const backgroundImage = await loadImage(backgroundImagePath);

            ctx.drawImage(backgroundImage, 0, 0, canvasSize, canvasSize);
        } catch (error) {
            console.warn("Imagem de fundo não encontrada.");
        }
    }
    if (!backgroundImagePath) {
        ctx.fillStyle = "rgba(0, 0, 0, 0)";
        ctx.fillRect(0, 0, canvasSize, canvasSize);
    }
    return ctx;
}

async function drawText(ctx: CanvasRenderingContext2D, text: string, fontSize: number): Promise<void> {
    const fontColor = "#ffffff";
    const strokeColor = "#000000";
    const strokeWidth = 8;
    ctx.fillStyle = fontColor;
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";

    function drawTextWithWrap(text: string, x: number, y: number, maxWidth: number, fontSize: number) {
        const words = text.split(" ");
        let line = "";
        let lineHeight = fontSize * 1.2;
        for (const word of words) {
            const testLine = line + word + " ";
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth) {
                ctx.strokeText(line.trim(), x, y);
                ctx.fillText(line.trim(), x, y);

                line = word + " ";
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.strokeText(line.trim(), x, y);
        ctx.fillText(line.trim(), x, y);
    }
    const textX = canvasSize / 2;
    let textY = canvasSize / 2.35;

    ctx.font = `${fontSize}px Bebas Neue`;

    const textHeight = text.split(" ").length * (fontSize * 1.2);
    const divide = text.length <= 40 ? 2 : text.length <= 60 ? 4 : 7;
    if (textHeight > canvasSize) {
        textY -= (textHeight - canvasSize) / divide;
    }
    drawTextWithWrap(text, textX, textY, maxWidth, fontSize);
}

async function main() {
    const backgroundImagePath = undefined;
    const ctx = await drawBackground(backgroundImagePath);
    await drawText(ctx, "NEM TUDO NA VIDA SÃO FLORES, OUTRAS COISAS SÃO BALAS, OUTRAS COISAS SÃO BALAS, OUTRAS COISAS SÃO BALAS, OUTRAS COISAS SÃO BALAS", 56);
    const outputBuffer: Buffer = ctx.canvas.toBuffer("image/png");
    await fs.writeFile("./temp/output.png", outputBuffer);
}

main();
