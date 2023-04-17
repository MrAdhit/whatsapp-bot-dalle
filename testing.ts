import { Sha512 } from "https://deno.land/std@0.87.0/hash/sha512.ts"
import { Translate } from "./api/translate.ts";

let res = await new Translate("hi epriwan").start();

console.log(res);