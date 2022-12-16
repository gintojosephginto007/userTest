import * as fs from "fs";
export { parse, decode, encode, safe, unsafe };

const parse = decode;
const eol = typeof process !== "undefined" &&
    process.platform === "win32" ? "\r\n" : "\n";

function isFileExists(filepath: string) {
    if (!fs.existsSync(filepath)) {
        // tslint:disable-next-line: no-console
        console.error("Invalid file path.");
        return false;
    }
    return true;
}

function encode(obj: { [x: string]: any; }, opt: { section?: any; whitespace?: any; }) {
    const children: string[] = [];
    let out = "";

    if (typeof opt === "string") {
        opt = {
            section: opt,
            whitespace: false,
        };
    } else {
        opt = opt || {};
        opt.whitespace = opt.whitespace === true;
    }

    const separator = opt.whitespace ? " = " : "=";

    Object.keys(obj).forEach((k, _, __) => {
        const val = obj[k];
        if (val && Array.isArray(val)) {
            val.forEach((item) => {
                out += safe(k + "[]") + separator + safe(item) + "\n";
            });
        } else if (val && typeof val === "object") {
            children.push(k);
        } else {
            out += safe(k) + separator + safe(val) + eol;
        }
    });

    if (opt.section && out.length) {
        out = "[" + safe(opt.section) + "]" + eol + out;
    }

    children.forEach((k, _, __) => {
        const nk = dotSplit(k).join("\\.");
        const section = (opt.section ? opt.section + "." : "") + nk;
        const child = encode(obj[k], {
            section,
            whitespace: opt.whitespace,
        });
        if (out.length && child.length) {
            out += eol;
        }
        out += child;
    });

    return out;
}

function dotSplit(str: string) {
    return str.replace(/\1/g, "\u0002LITERAL\\1LITERAL\u0002")
        .replace(/\\\./g, "\u0001")
        .split(/\./).map((part) => {
            return part.replace(/\1/g, "\\.")
                .replace(/\2LITERAL\\1LITERAL\2/g, "\u0001");
        });
}

function decode(filepath: string) {
    if (!isFileExists(filepath)) { return; }

    const str = fs.readFileSync(filepath, "utf-8");
    const out: { [key: string]: any } = {};
    let p = out;
    let section = null;
    //          section     |key      = value
    const re = /^\[([^\]]*)\]$|^([^=]+)(=(.*))?$/i;
    const lines = str.split(/[\r\n]+/g);

    lines.forEach((line, _, __) => {
        if (!line || line.match(/^\s*[;#]/)) { return; }
        const match = line.match(re);
        if (!match) { return; }
        if (match[1] !== undefined) {
            section = unsafe(match[1]);
            p = out[section] = out[section] || {};
            return;
        }
        let key = unsafe(match[2]);
        let value = match[3] ? unsafe(match[4]) : true;
        switch (value) {
            case "true":
            case "false":
            case "null": value = JSON.parse(value);
        }

        // Convert keys with '[]' suffix to an array
        if (key.length > 2 && key.slice(-2) === "[]") {
            key = key.substring(0, key.length - 2);
            if (!p[key]) {
                p[key] = [];
            } else if (!Array.isArray(p[key])) {
                p[key] = [p[key]];
            }
        }

        // safeguard against resetting a previously defined
        // array by accidentally forgetting the brackets
        if (Array.isArray(p[key])) {
            p[key].push(value);
        } else {
            p[key] = value;
        }
    });

    // {a:{y:1},"a.b":{x:2}} --> {a:{y:1,b:{x:2}}}
    // use a filter to return the keys that have to be deleted.
    Object.keys(out).filter((k, _, __) => {
        if (!out[k] ||
            typeof out[k] !== "object" ||
            Array.isArray(out[k])) {
            return false;
        }
        // see if the parent section is also an object.
        // if so, add it to that, and mark this one for deletion
        const parts = dotSplit(k);
        // tslint:disable-next-line: no-shadowed-variable
        let p = out;
        const l = parts.pop();
        const nl = l.replace(/\\\./g, ".");
        // tslint:disable-next-line: no-shadowed-variable
        parts.forEach((part, _, __) => {
            if (!p[part] || typeof p[part] !== "object") { p[part] = {}; }
            p = p[part];
        });
        if (p === out && nl === l) {
            return false;
        }
        p[nl] = out[k];
        return true;
    }).forEach((del, _, __) => {
        delete out[del];
    });

    return out;
}

function isQuoted(val: string) {
    return (val.charAt(0) === '"' && val.slice(-1) === '"') ||
        (val.charAt(0) === "'" && val.slice(-1) === "'");
}

function safe(val: string) {
    return (typeof val !== "string" ||
        val.match(/[=\r\n]/) ||
        val.match(/^\[/) ||
        (val.length > 1 &&
            isQuoted(val)) ||
        val !== val.trim())
        ? JSON.stringify(val)
        : val.replace(/;/g, "\\;").replace(/#/g, "\\#");
}

function unsafe(val: string, doUnesc?: undefined) {
    val = (val || "").trim();
    if (isQuoted(val)) {
        // remove the single quotes before calling JSON.parse
        if (val.charAt(0) === "'") {
            val = val.substr(1, val.length - 2);
        }
        // tslint:disable-next-line: no-empty
        try { val = JSON.parse(val); } catch (_) { }
    } else {
        // walk the val to find the first not-escaped ; character
        let esc = false;
        let unesc = "";
        for (let i = 0, l = val.length; i < l; i++) {
            // tslint:disable-next-line: prefer-const
            let c = val.charAt(i);
            if (esc) {
                if ("\\;#".indexOf(c) !== -1) {
                    unesc += c;
                } else {
                    unesc += "\\" + c;
                }
                esc = false;
            } else if (";#".indexOf(c) !== -1) {
                break;
            } else if (c === "\\") {
                esc = true;
            } else {
                unesc += c;
            }
        }
        if (esc) {
            unesc += "\\";
        }
        return unesc.trim();
    }
    return val;
}
