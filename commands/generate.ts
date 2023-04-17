import WAWebJS, { MessageMedia } from "npm:whatsapp-web.js@1.18.2";
import { OpenAI } from "../api/openai.ts";
import { Sha512 } from "https://deno.land/std@0.87.0/hash/sha512.ts"
import { Translator } from "https://deno.land/x/google_translator_api@v1.0.0/main.ts";

export async function invoke(message: WAWebJS.Message) {
    const content = message.body.split(" ");

    if(content.length < 1) return;

    content.shift();
    let prompt = content.join(" ");
    prompt = (await new Translator().translate(prompt)).text;

    console.log({content, prompt});

    const openai = new OpenAI(prompt, new Sha512().update((await message.getChat()).id._serialized).toString());
    const image = await openai.image().generate();

    const media = await MessageMedia.fromUrl(image);
    message.reply(media);
}
