import WAWebJS from "npm:whatsapp-web.js@1.18.2";

export async function invoke(message: WAWebJS.Message) {
    if(!message.type.includes("image")) return;

    const sticker = await message.downloadMedia();
    message.reply(sticker, undefined, { sendMediaAsSticker: true });
}