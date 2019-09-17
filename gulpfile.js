const gulp = require("gulp");
const spawn = require('child_process').spawn;
const nodemon = require("gulp-nodemon");



const stylusCompiler = {
    watch: (desk) => {
        require("./compile-stylus").createCompiler(desk).watch();
    },
    compile: (desk) => {
        return require("./compile-stylus").createCompiler(desk).compile();
    }
};

const startServer = async () => {
    return nodemon({
        script: './server/server.js',
        ext: 'js',
        ignore: [
            ".idea/",
            ".git/",
            "gulpfile.js",
            "client/*",
            "public/*",
            "webpack.config.js",
            "webpack.prod.config.js",
            "build/*",
            "dist/*",
            "uploads/*"
        ],
        env: {'NODE_ENV': 'development'},
        stdout: true,
        exec: "babel-node"
    })
};

gulp.task("dev", () => {
    return startServer().then(() => {
        stylusCompiler.watch(process.env.STATIC_DIR || "build");
        if (!/^win/.test(process.platform)) { // linux
            spawn("webpack", ["--watch"], {stdio: "inherit"});
        } else {
            spawn('cmd', ['/s', "/c", "webpack", "--w"], {stdio: "inherit"});
        }
    });

});

gulp.task("prod", () => {
    return startServer().then(() => stylusCompiler.compile(process.env.STATIC_DIR).then(() => {
        if (!/^win/.test(process.platform)) { // linux
            return spawn("webpack", ["--config ./webpack.prod.config.js"], {stdio: "inherit"});
        } else {
            return spawn('cmd', ['/s', "/c", "webpack", "--config ./webpack.prod.config.js"], {stdio: "inherit"});
        }
    }));
});

