import WAWebJS from "npm:whatsapp-web.js@1.18.2";

import * as generate from "./generate.ts";
import * as ping from "./ping.ts";
import * as sticker from "./sticker.ts";

export function handle(message: WAWebJS.Message) {
    switch(message.body.split(" ")[0]) {
        case "#generate":
            generate.invoke(message);
            break;
        case "#ping":
            ping.invoke(message);
            break;
        case "#sticker":
            sticker.invoke(message);
            break;
        default:
            break;
    }
}