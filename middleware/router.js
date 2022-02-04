module.exports = async () => {
    const { Router } = require("express");
    const router = Router();
    const { readdir, lstat } = require("fs/promises");

    async function read(dir = "routes") {
        const files = await readdir(dir);
        for(const file of files) {
            const stat = await lstat(`${dir}/${file}`);
            if(stat.isDirectory()) read(`${dir}/${file}`);
            if(file.endsWith('.js')) {
                const endpoint = require(`../${dir}/${file}`);
                let props = `${dir}/${file.replace(".js","")}`.split("/").slice(1);
                router[props[0]]("/"+props.slice(1).join("/")+(endpoint.config?.params||""), (req, res) => endpoint.run(req, res));
            };
        };
    };

    await read();

    return router;
}