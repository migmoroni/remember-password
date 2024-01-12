// Password Engine
// Motor de senhas

async function calcularHashSHA512(dados) {
  //const encoder = new TextEncoder();
  const dadosArrayBuffer = new TextEncoder().encode(dados);

  const hashBuffer = await crypto.subtle.digest('SHA-512', dadosArrayBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

async function calcularHashSHA384(dados) {
  //const encoder = new TextEncoder();
  const dadosArrayBuffer = new TextEncoder().encode(dados);

  const hashBuffer = await crypto.subtle.digest('SHA-384', dadosArrayBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

async function calcularHashSHA256(dados) {
  //const encoder = new TextEncoder();
  const dadosArrayBuffer = new TextEncoder().encode(dados);

  const hashBuffer = await crypto.subtle.digest('SHA-256', dadosArrayBuffer);

  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

  return hashHex;
}

async function reduzirStringExistente(str, comprimentoAlvo) {
  if (str.length > comprimentoAlvo) {
    return str.substring(0, comprimentoAlvo);
  }
  return str;
}

async function choiceEncode(encode, password){
  //Base decimal
  //Base 85 (maquina) - padrão
  //Base 85 (fixa)
  //Base 128 - ASCII
  //Base 65536 - Unicode
}

async function choiceSize(size, password){
  
}

async function readConfig(){
  
}

async function generate() {
  const password1 = document.getElementById('form1').elements[0].value;
  const password2 = document.getElementById('form2').elements[0].value;
  const password3 = document.getElementById('form3').elements[0].value;
  const passwordChar = 1;
  const passwordSize = document.getElementById('form5').elements[0].value;

  // Verifica se pelo menos o primeiro e o terceiro formulários têm mais de 1 caractere
  const isClickable = (password1.length > 0 && password2.length > 0 && password3.length > 0 && passwordSize.length > 0);

  // Seleciona o botão "generate"
  const generateButton = document.getElementById('generate-btn');

  if (isClickable) {
    // Adiciona a classe para tornar o botão clicável e com a cor azul
    generateButton.classList.add('active');

    // Lógica de geração de senha

    (async () => {
    //Etapa 1: Concatenar e mascarar as 3 senhas numa única variavel
    
    let resultA = await calcularHashSHA512(password1) + await calcularHashSHA512(password2) + await calcularHashSHA512(password3);

    //Etapa 2: Engrandecer o tamanho e ofuscar origem com hashes sequenciais - 12x
    
    const data = resultA;
    const resultB = await calcularHashSHA512(await calcularHashSHA384(await calcularHashSHA256(data)));
    const resultC = await calcularHashSHA512(await calcularHashSHA384(await calcularHashSHA256(resultB)));
    const resultD = await calcularHashSHA512(await calcularHashSHA384(await calcularHashSHA256(resultC)));

    //Etapa 3: Converção em base85, reduzindo tamanho e aumentando segurança
    const resultE = await encodeCustomBase85(resultD);

    //Etapa 4: Manter apenas os primeiros 20 caracteres
    const resultF = await reduzirStringExistente(resultE, passwordSize);

    console.log('Resultado Último:', resultF);
    document.getElementById('password').value = resultF;
    
    })();
    //11 + + 11 = !@""\"`"l?"f!^"l!t!<
  } else {
    // Remove a classe para tornar o botão não clicável e com a cor padrão
    generateButton.classList.remove('active');
  }
}

async function getUnicodePrintableChars() {
  // Retorna uma string contendo caracteres Unicode imprimíveis
  let unicodePrintableChars = '';
  for (let i = 0x20; i <= 0x7E; i++) {
    unicodePrintableChars += String.fromCodePoint(i);
  }
  return unicodePrintableChars;
}

async function encodeCustomBase85(data, chars) {
  // Obter caracteres Unicode imprimíveis
  const unicodeChars = await getUnicodePrintableChars();

  // Dicionário para base85
  const base85Chars = Array.from({ length: 85 }, (_, i) => unicodeChars.charAt(i));

  // Função para converter um número para base85
  async function numToBase85(num) {
    let result = '';
    for (let i = 0; i < 5; i++) {
      const remainder = num % 85;
      num = Math.floor(num / 85);
      result = base85Chars[remainder] + result;
    }
    return result;
  }

  // Converter cada grupo de 2 bytes para base85
  let base85String = '';
  for (let i = 0; i < data.length; i += 4) {
    const hexPair = data.slice(i, i + 2);
    const charCode = parseInt(hexPair, 16);
    const base = await numToBase85(charCode);
    base85String += base.replace(/\s/g, '');
  }

  return base85String;
}

async function encodeBase144(data) {
  // Dicionário para base144
  const base144Chars = Array.from({ length: 144 }, (_, i) => String.fromCodePoint(i));

  // Função para converter um número para base144
  async function numToBase144(num) {
    let result = '';
    for (let i = 0; i < 2; i++) {
      const remainder = num % 144;
      num = Math.floor(num / 144);
      result = base144Chars[remainder] + result;
    }
    return result;
  }

  // Converter cada par de caracteres hexadecimal para base144
  let base144String = '';
  for (let i = 0; i < data.length; i += 4) {
    const hexPair = data.slice(i, i + 2);
    const charCode = parseInt(hexPair, 16);
    const base = await numToBase144(charCode);
    base144String += base;
  }

  return base144String;
}

async function validarNumero(input) {
  let valor = input.value.trim();

  // Verifica se o valor é numérico e de 1 a 50
  if ((isNaN(valor)) || ((valor < 1) || (valor > 50))) {
      input.classList.add("error"); // Adiciona a classe de erro
  } else {
      input.classList.remove("error"); // Remove a classe de erro
  }
}

async function calcHashFromFile() {
  const fileInput = document.getElementById('fileInput');
  const hashOutput = document.getElementById('hashOutput');

  const file = fileInput.files[0];

  if (file) {
    try {
      const buffer = await readyFileAsBuffer(file);

      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);

      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

      // Exibe o hash
      hashOutput.value = await encodeCustomBase85(hashHex);
      validateOption(hashOutput);
    } catch (error) {
      console.error(error);
    }
  }
}

function readyFileAsBuffer(file) {
  return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function(e) {
          resolve(e.target.result);
      };

      reader.onerror = function(error) {
          reject(error);
      };

      reader.readAsArrayBuffer(file);
  });
}

async function readWordsFromFile() {
  const fileInput = document.getElementById('fileInput2');
  const wordsOutput = document.getElementById('wordsOutput');

  const file = fileInput.files[0];

  if (file) {
    try {
      // Crie uma cópia do objeto File para a operação de leitura
      const fileCopy = new File([file], file.name, { type: file.type });

      // Realiza a leitura do arquivo
      const content = await readContentFromFile(fileCopy);

      // Extrai as palavras do conteúdo
      const words = extractWords(content);

      // Exibe as palavras
      wordsOutput.value = words;
      validateOption(wordsOutput);
    } catch (error) {
      console.error(error);
    }
  }
}

function readContentFromFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      resolve(e.target.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };

    reader.readAsText(file);
  });
}

function extractWords(content) {
  var words = content.split(/[\s]+/);
  words = words.filter(function (word) {
    return word.length > 0;
  });
  return words.join(' ');
}

//770 linhas maximas
//3 idiomas
//-> PT-BR, EN-US e ESPA