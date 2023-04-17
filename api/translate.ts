import { Translator } from "https://deno.land/x/google_translator_api@v1.0.0/main.ts";

export class Translate {
    content: string;

    constructor(content: string) {
        this.content = content;
    }

    start(): Promise<string> {
        return new Promise((resolve, _reject) => {
            translate(this.content).then((result: { text: string; }) => {
                resolve(result.text);
            }).catch(console.log);
        });
    }
}