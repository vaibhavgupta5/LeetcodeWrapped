const fs = require("fs");
const path = require("path");

const inputPath = path.join(__dirname, "sampleresponse.txt");
const outputPath = path.join(__dirname, "src", "lib", "mockData.js");

try {
  const data = fs.readFileSync(inputPath, "utf8");
  // Ensure the directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const content = `export const userData = ${data};`;
  fs.writeFileSync(outputPath, content);
  console.log("Successfully created mockData.js");
} catch (err) {
  console.error("Error creating mockData.js:", err);
}
