const fs = require('fs');
const crypto = require('crypto'); // lib de cripto

// deriva chave com PBKDF2 - Password-Based Key Derivation Function 2
const getKey = (chave, salt) =>
  crypto.pbkdf2Sync(chave, salt, 1e5, 32, 'sha256');

function processar(entrada, saida, chave, modo) {
  const conteudo = fs.readFileSync(entrada); //lendo arquivo

  if (modo === 'cifrar') {
    const salt = crypto.randomBytes(16); //16 bytes random
    const iv = crypto.randomBytes(16);
    const key = getKey(chave, salt); //deriva a key da senha e do salt

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    const dados = Buffer.concat([cipher.update(conteudo), cipher.final()]); //concatena o dado criptografado com o padding, caso tenha

    // grava salt + iv + dados
    fs.writeFileSync(saida, Buffer.concat([salt, iv, dados]));
  } else if (modo === 'decifrar') {
    //op de decifrar o arquivo
    const salt = conteudo.subarray(0, 16); //extraindo bits
    const iv = conteudo.subarray(16, 32);
    const dadosCifrados = conteudo.subarray(32);

    const key = getKey(chave, salt);
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    const dados = Buffer.concat([
      decipher.update(dadosCifrados),
      decipher.final(),
    ]);

    fs.writeFileSync(saida, dados);
  } else {
    throw new Error("Operação inválida. Use 'cifrar' ou 'decifrar'.");
  }
}

// CLI
const [operacao, entrada, saida, chave] = process.argv.slice(2);

if (!operacao || !entrada || !saida || !chave) {
  console.log(
    'Uso: node crypto_cbc.js <cifrar|decifrar> <entrada> <saida> <chave>'
  );
  process.exit(1);
}

try {
  processar(entrada, saida, chave, operacao);
} catch (e) {
  console.error('Erro:', e.message);
  process.exit(1);
}
