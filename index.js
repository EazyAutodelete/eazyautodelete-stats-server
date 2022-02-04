(async () => {
    const [
        express,
        bodyParser,
        cors,
        config,
        router,
    ] = await Promise.all([
        require("express"),
        require("body-parser"),
        require("cors"),
        require("./config/config"),
        require("./middleware/router")(),
    ]);

    const app = express();
    
    app.use(cors({
        origin: "*",
    }));
    
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));
    
    app.use(express.json());
    app.use(express.urlencoded({
        extended: true
    }));
    
    app.set("view engine", "ejs");
    
    app.use("/", router);
    
    app.listen(config.port, () => console.log("eazyautodelete-stats-server running"));
})();