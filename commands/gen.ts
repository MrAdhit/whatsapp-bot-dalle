export function gen() {
    const TOP = `export function handle(message: WAWebJS.Message) {\r\n    switch(message.body) {`;
    const BOTTOM = `        default:\n            break;\n    }\n}`;
    const COMMAND = `        case \"#{command}\":\n            {command}.invoke(message);\n            break;`;
    const IMPORT = `import * as {command} from \"./{command}.ts\";`;
    const MAIN_IMPORT = `import WAWebJS from "npm:whatsapp-web.js@1.18.2";`;

    const imports: string[] = [];
    const commands: string[] = [];

    for (const dirEntry of Deno.readDirSync("./commands")) {
        if(dirEntry.name == "gen.ts" || dirEntry.name.includes("handler")) continue;
        if(dirEntry.isDirectory) continue;

        const name = dirEntry.name.replace(".ts", "");

        const imp = IMPORT.replaceAll("{command}", name);
        const cmd = COMMAND.replaceAll("{command}", name);

        imports.push(imp);
        commands.push(cmd);
    }

    const imps = imports.join("\n");
    const cmds = commands.join("\n");

    const generated = `${MAIN_IMPORT}\n\n${imps}\n\n${TOP}\n${cmds}\n${BOTTOM}`;

    Deno.writeTextFileSync("./commands/handler.ts", generated);
}

export function commandTemplate(fileName: string) {
    const CONTENT = `import WAWebJS from \"npm:whatsapp-web.js@1.18.2\";\n\nexport async function invoke(message: WAWebJS.Message) {\n    \n}`;
    
    Deno.writeTextFileSync(`./commands/${fileName}.ts`, CONTENT);
}