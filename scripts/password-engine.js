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

async function getCharCode(option, value) {

  switch (option) {
    case 'charFixed' || 'start':
      return encodeFixedBase85(value);
    case 'keyboard':
      return encodeCustomChar(value);
    case 'numbers':
      return encodeFixedBase10(value);
    case 'unicode':
      return encodeBaseUnicode(value);
  }
  //20 teclados: Ingles, Portugues, Frances, Alemão, Espanhol, Russo, Islandês, Polonês, Ge-ez, Arabe, Urdu, Turco, Hebraico, Armenio, Georgiano, Coreano, Japonês, Chines Simplificado, Tamil e Hindi.
  //4 iniciais: Ingles, Portugues, Espanhol e Russo.
}

async function generate() {
  const password1 = document.getElementById('form1').elements[0].value;
  const password2 = document.getElementById('form2').elements[0].value;
  const password3 = document.getElementById('form3').elements[0].value;
  const passwordChar = document.getElementById('form4').value;
  const passwordSize = document.getElementById('form5').elements[0].value;
  const passValue = validateValue(passwordSize);

  // Verifica se pelo menos o primeiro e o terceiro formulários têm mais de 1 caractere
  const isClickable = (password1.length > 0 && password2.length > 0 && password3.length > 0 && !(passwordChar == 'start') && passValue);

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

    //Etapa 3: Converção em base de caracteres escolhida
    //const resultE = await encodeFixedBase85(resultD);
    const resultE = await getCharCode(passwordChar, resultD);

    //Etapa 4: Manter apenas o valor de caracteres escolhido
    const resultF = await reduzirStringExistente(resultE, passwordSize);

    console.log('Resultado Último:', resultF);
    document.getElementById('password').value = resultF;
    
    })();
    
  } else {
    // Remove a classe para tornar o botão não clicável e com a cor padrão
    generateButton.classList.remove('active');
  }
}

async function getDecimalChars() {
  // Retorna uma string contendo caracteres Unicode dos numerais decimais (0 a 9)
  let decimalNumerals = '';
  const startCodePoint = 0x30;  // Código Unicode para '0'
  const endCodePoint = 0x39;    // Código Unicode para '9'

  for (let i = startCodePoint; i <= endCodePoint; i++) {
    decimalNumerals += String.fromCodePoint(i);
  }

  return decimalNumerals;
}

async function getUnicodeChars() {
  // Retorna uma string contendo todos os caracteres Unicode imprimíveis
  let unicodePrintableChars = '';
  const startCodePoint = 0x20;  // Ponto de início desejado
  const endCodePoint = 0xFFFF;  // Ponto de término desejado (pode ser ajustado conforme necessário)

  for (let i = startCodePoint; i <= endCodePoint; i++) {
    unicodePrintableChars += String.fromCodePoint(i);
  }

  return unicodePrintableChars;
}

async function encodeFixedBase85(data) {
  // Obter caracteres Unicode imprimíveis
  const unicodeChars = await getUnicodeChars();

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
  for (let i = 0; i < data.length; i += 2) {
    const hexPair = data.slice(i, i + 4);
    const charCode = parseInt(hexPair, 16);
    const base = await numToBase85(charCode);
    base85String += base.replace(/\s/g, '');
  }

  return base85String;
}

async function encodeFixedBase10(data) {
  // Obter caracteres Unicode imprimíveis
  const base10Chars = await getDecimalChars()

  // Dicionário para base10
  //const base10Chars = Array.from({ length: 10 }, (_, i) => unicodeChars.charAt(i));

  // Função para converter um número para base10
  async function numToBase10(num) {
    let result = '';
    for (let i = 0; i < 5; i++) {
      const remainder = num % 10;
      num = Math.floor(num / 10);
      result = base10Chars[remainder] + result;
    }
    return result;
  }

  // Converter cada grupo de 2 bytes para base10
  let base10String = '';
  for (let i = 0; i < data.length; i += 1) {
    const hexPair = data.slice(i, i + 4);
    const charCode = parseInt(hexPair, 16);
    const base = await numToBase10(charCode);
    base10String += base.replace(/\s/g, '');
  }

  return base10String;
}

async function encodeBaseUnicode(data) {
  // Dicionário para base65536
  const base65536Chars = Array.from({ length: 65536 }, (_, i) => String.fromCodePoint(i));

  // Função para converter um número para base65536
  async function numToBase65536(num) {
    let result = '';
    for (let i = 0; i < 2; i++) {
      const remainder = num % 65536;
      num = Math.floor(num / 65536);
      result = base65536Chars[remainder] + result;
    }
    return result;
  }

  // Converter cada par de caracteres hexadecimal para base65536
  let base65536String = '';
  for (let i = 0; i < data.length; i += 4) {
    const hexPair = data.slice(i, i + 2);
    const charCode = parseInt(hexPair, 16);
    const base = await numToBase65536(charCode);
    base65536String += base;
  }

  return base65536String;
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

function validateValue(input){
  let valor = input;

  if ((isNaN(valor)) || ((valor < 1) || (valor > 50))) {
    return false;
  } else {
    return true;
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
      hashOutput.value = await encodeFixedBase85(hashHex);
      validateOption(hashOutput);
      calculatePasswordStrength(hashOutput, 'password-strength-bar-1');
      calculateCombinedStrength();
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

      // Extrai as palavras do conteúdo (limitado a 5000 palavras)
      const words = extractWords(content, 5000);

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

function extractWords(content, maxWords) {
  var words = content.split(/[\s]+/);
  words = words.filter(function (word) {
    return word.length > 0;
  });

  // Limita o número de palavras ao máximo especificado
  words = words.slice(0, maxWords);

  return words.join(' ');
}

function changeChar(selectElement) {
  let selectedOption = selectElement.options[selectElement.selectedIndex].value;
  let color = getCharCode(selectedOption);
  
  // Exemplo: Alterando a cor de fundo do elemento com o ID 'form4'
  document.getElementById('form4').style.backgroundColor = color;
}



//770 linhas maximas
//3 idiomas
//-> PT-BR, EN-US e ESPA