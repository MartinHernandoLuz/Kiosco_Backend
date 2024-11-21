export default {
    setupFilesAfterEnv: ["./src/test/setupTests.js"], // Archivo para configuraciones después del entorno
    testEnvironment: "node", // Indica que estás probando un entorno Node.js
    coverageDirectory: "coverage", // Carpeta para informes de cobertura
    verbose: true, // Muestra detalles en la salida de pruebas
  };
  