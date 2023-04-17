const KEY = "sk-urkey";

const image = class Image {
    prompt: string;
    requester: string;

    constructor(prompt: string, requester: string) {
        this.prompt = prompt;
        this.requester = requester;
    }

    generate(): Promise<string> {
        const prompt = {
            prompt: this.prompt,
            n: 1,
            size: "512x512",
            // response_format: "b64_json"
        }

        console.log({prompt});

        return new Promise((resolve, reject) => {
            fetch("https://api.openai.com/v1/images/generations", {
                headers: {
                    "Authorization": `Bearer ${KEY}`,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(prompt)
            }).then((response) => response.json()).then((json) => {
                console.log(json);
                resolve(json.data[0].url);
            }).catch((reason) => {
                console.log(reason);
                reject(reason);
            });
        });
    }
}

export class OpenAI {
    prompt: string;
    requester: string;

    constructor(prompt: string, requester: string) {
        this.prompt = prompt;
        this.requester = requester;
    }

    image() {
        return new image(this.prompt, this.requester);
    }
}

