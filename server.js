const Hapi = require("@hapi/hapi");
// const scrapBackground = require("./app/models/background")
const scrapGeneral = require("./app/models/general");
const scrapSpec = require("./app/models/specCar");
const scrapReview = require("./app/models/review");
const scrapImg = require("./app/models/carImg");



const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: "localhost"
    });
  
    // server.route({
    //     method: "GET",
    //     path: "/general",
    //     handler: async (request, h) => {
    //         const result = await scrapGeneral({
                
    //         });
    //         return result;
    //     }
    // });

    async () => {
        await scrapGeneral({
            
        });
        
    }
    async () => {
        await scrapSpec({
            
        });
        
    }
    async () => {
        await scrapReview({
            
        });
        
    }
    async () => {
        await scrapImg({
            
        });
        
    }
    
 
    // server.route({
    //     method: "GET",
    //     path: "/spek",
    //     handler: async (request, h) => {
    //         const result = await scrapSpec();
    //         return result;
    //     }
    // });

    // server.route({
    //     method: "GET",
    //     path: "/review",
    //     handler: async (request, h) => {
    //         const result = await scrapReview();
    //         return result;
    //     }
    // });

   

    // server.route({
    //     method: "GET",
    //     path: "/img",
    //     handler: async (request, h) => {
    //         const result = await scrapImg();
    //         return result;
    //     }

    // });



 


    // server.route({
    //     method: "GET",
    //     path: "/background",
    //     handler: async (request, h) => {
    //         const result = await scrapBackground();
    //         return result;
    //     }
    // });



    server.start();
    console.log("Server running on %s", server.info.uri);
   
};

process.on("unhandledRejection", err => {
    console.log(err);
    process.exit(1);
});

init();