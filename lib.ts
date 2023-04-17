const lib = Deno.dlopen("./libs/whatsappbotlib.dll", {
    "qr": {
        parameters: ["buffer"],
        result: "void"
    }, 
    "close_window": {
        parameters: [],
        result: "void"
    }
});

export function qr(qrCode: string) {
    lib.symbols.qr(new TextEncoder().encode(qrCode + "\0"));
}

export function closeWindow() {
    lib.symbols.close_window();
}