const Hapi = require("@hapi/hapi");

const scrapSpec = require("./app/models/spek");

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost"
    });

    server.route({
        method: "GET",
        path: "/spek",
        handler: async (request, h) => {
            const result = await scrapSpec();
            return result;
        }
    });

    await server.start();
    console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

init();