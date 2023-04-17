import WAWebJS from "npm:whatsapp-web.js@1.18.2";

export async function invoke(message: WAWebJS.Message) {
    const COMMANDS = [
        {
            name: "sticker",
            description: "Buat sticker dari gambar yang dikirim"
        },
        {
            name: "generate",
            description: "Buat gambar dari teks input yang dikirim"
        },
        {
            name: "ping",
            description: "Pong!"
        }
    ]

    

}