// imports
const fs = require('fs');
const crypto = require('crypto');

// deriva a chave (32 bytes) a partir de uma string e retorna em binário
function getKey(chave) {
  return crypto.createHash('sha256').update(chave).digest();
}

//
function cifrar(entrada, saida, chave) {
  const key = getKey(chave);
  const iv = crypto.randomBytes(16);

  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

  const input = fs.readFileSync(entrada);
  const dadosCifrados = Buffer.concat([cipher.update(input), cipher.final()]);

  // Salva IV + dados cifrados
  fs.writeFileSync(saida, Buffer.concat([iv, dadosCifrados]));
}

function decifrar(entrada, saida, chave) {
  const key = getKey(chave);

  const conteudo = fs.readFileSync(entrada);
  const iv = conteudo.slice(0, 16);
  const dadosCifrados = conteudo.slice(16);

  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  const dados = Buffer.concat([
    decipher.update(dadosCifrados),
    decipher.final(),
  ]);

  fs.writeFileSync(saida, dados);
}

// CLI
const args = process.argv.slice(2);
if (args.length < 4) {
  console.log(
    'Uso: node crypto_cbc.js <cifrar|decifrar> <entrada> <saida> <chave>'
  );
  process.exit(1);
}

const [operacao, entrada, saida, chave] = args;

if (operacao === 'cifrar') {
  cifrar(entrada, saida, chave);
} else if (operacao === 'decifrar') {
  decifrar(entrada, saida, chave);
} else {
  console.log("Operação inválida. Use 'cifrar' ou 'decifrar'.");
}

try {
  if (operacao === 'cifrar') {
    cifrar(entrada, saida, chave);
  } else if (operacao === 'decifrar') {
    decifrar(entrada, saida, chave);
  } else {
    console.log("Operação inválida. Use 'cifrar' ou 'decifrar'.");
  }
} catch (error) {
  if (error.code === 'ERR_OSSL_BAD_DECRYPT') {
    console.error('A chave está incorreta ou o arquivo está corrompido.');
  } else if (error.code === 'ENOENT') {
    console.error(`O arquivo de entrada "${entrada}" não foi encontrado.`);
  } else {
    console.error('Ocorreu um erro inesperado:', error.message);
  }
  process.exit(1);
}
