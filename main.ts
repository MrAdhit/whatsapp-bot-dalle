import { Client } from "npm:whatsapp-web.js@1.18.2";
import puppeteer, { isString } from "https://deno.land/x/puppeteer@16.2.0/mod.ts";
import { parse } from "https://deno.land/std@0.119.0/flags/mod.ts";
import * as lib from "./lib.ts";
import { gen, commandTemplate } from "./commands/gen.ts";
import { handle } from "./commands/handler.ts";

if(isString(Deno.args[0])) {
  const flags = parse(Deno.args, {
    boolean: [ "gen" ],
    string: [ "cmd" ],
    default: {
      "cmd": ""
    }
  });

  if(flags["gen"]) {
    if(flags["cmd"].length > 0) {
      commandTemplate(flags["cmd"]);
    } else {
      gen();
    }
  }

  Deno.exit();
}

const client = new Client({
  puppeteer: { executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe" }
});

client.on("qr", (qr) => {
  console.log(qr);
  lib.qr(qr);
});

client.on("authenticated", (_session) => {
  
});

client.on("ready", () => {
  console.log("ready");
  lib.closeWindow();
})

client.on("message", (message) => {
  handle(message);

  // console.log(message);
});

addEventListener("unhandledrejection", (ev) => {
  console.log(ev);
});

client.initialize(puppeteer);
// while(true) {}