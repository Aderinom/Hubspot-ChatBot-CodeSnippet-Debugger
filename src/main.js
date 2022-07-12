const ExampleSnippet = require("./snippets/ExampleSnippet");
const { run } = require("./utils/run");


async function main() {
    // Enable console STDIN
    await run("KDNRtoProductType",ExampleSnippet.main);
    

    process.exit(0);
}

main();