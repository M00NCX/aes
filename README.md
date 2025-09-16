# 🔑 Criptografia de Arquivos com AES-CBC (Node.js)

Este programa permite **cifrar e decifrar** arquivos utilizando **AES no modo CBC** diretamente pelo terminal.

---

## 📌 Pré-requisitos

- [Node.js](https://nodejs.org/) instalado (versão 14 ou superior).  
  Para verificar se está instalado:
  ```bash
  node -v
  ```

````

---

## 📥 Instalação

1. Clone este repositório ou baixe o arquivo `crypto_cbc.js`:

   ```bash
   git clone https://github.com/seu-repo/crypto-cbc.git
   cd crypto-cbc
   ```

   *(ou apenas baixe `crypto_cbc.js` e coloque na sua pasta de trabalho)*

2. Não é necessário instalar bibliotecas extras, pois o programa usa apenas módulos nativos do Node.js.

https://nodejs.org/api/crypto.html
---

## 🚀 Uso

Formato geral:

```bash
node crypto_cbc.js <operacao> <arquivo_entrada> <arquivo_saida> <chave>
```

* `operacao`: `cifrar` ou `decifrar`
* `arquivo_entrada`: caminho do arquivo a ser processado
* `arquivo_saida`: caminho para salvar o arquivo resultante
* `chave`: string usada como chave (será derivada em SHA-256 para AES-256)

---

## 🔒 Exemplo de Cifragem

```bash
node crypto_cbc.js cifrar mensagem.txt mensagem.enc minha_chave_secreta
```

Isso vai gerar o arquivo `mensagem.enc` com o conteúdo criptografado.

---

## 🔓 Exemplo de Decifragem

```bash
node crypto_cbc.js decifrar mensagem.enc mensagem_decifrada.txt minha_chave_secreta
```

Se a chave usada for a mesma da cifragem, o arquivo `mensagem_decifrada.txt` terá o conteúdo original.

---

## ⚠️ Observações

* Se a chave informada na decifragem não for a mesma usada na cifragem, o programa exibirá erro.
* O IV (vetor de inicialização) é gerado automaticamente e salvo junto ao arquivo cifrado.
````
