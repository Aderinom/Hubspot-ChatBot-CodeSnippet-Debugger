initEnv(); // Set up fake envoirement variables

const { initParams } = require("request");
const ExampleSnippet = require("./snippets/ExampleSnippet");
const { run } = require("./utils/run");

async function main() {

    // Register your main function here to test it.
    await run("ExampleSnippet",ExampleSnippet.main);

    process.exit(0);
}

// Set your secrets here;
function initEnv() {
    process.env['some_secret'] = 222324;
}


main();