import WAWebJS from "npm:whatsapp-web.js@1.18.2";

// deno-lint-ignore require-await
export async function invoke(message: WAWebJS.Message) {
    message.reply("pong");
}