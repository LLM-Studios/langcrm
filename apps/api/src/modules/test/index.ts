import testExtractKeyValue from "./extract-key-value";
import testExtractKeys from "./extract-keys";
import testGenerateKey from "./generate-key";

async function run() {
  console.log("Running tests...");

  console.log("extractKeys");
  await testExtractKeys();

  console.log("generateKey");
  await testGenerateKey();

  console.log("extractKeyValue");
  await testExtractKeyValue();
}

run();
