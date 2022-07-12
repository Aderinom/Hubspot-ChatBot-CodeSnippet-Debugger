const ExampleSnippet = require("./snippets/ExampleSnippet");
const { run } = require("./utils/run");


async function main() {

    // Register your main function here to test it.
    await run("ExampleSnippet",ExampleSnippet.main);

    process.exit(0);
}

main();