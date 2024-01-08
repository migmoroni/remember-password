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
    
    let resultA = await calcularHashSHA256(password1) + await calcularHashSHA256(password2) + await calcularHashSHA256(password3);

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

  // Converter cada grupo de 4 bytes para base85
  let base85String = '';
  for (let i = 0; i < data.length; i += 4) {
    const hexPair = data.slice(i, i + 2);
    const charCode = parseInt(hexPair, 16);
    const base = await numToBase85(charCode);
    base85String += base.replace(/\s/g, '');
  }

  return base85String;
}

async function encodeBase100(data) {
  // Dicionário para base100
  const base100Chars = Array.from({ length: 100 }, (_, i) => String.fromCodePoint(i));

  // Função para converter um número para base100
  async function numToBase100(num) {
    let result = '';
    for (let i = 0; i < 2; i++) {
      const remainder = num % 100;
      num = Math.floor(num / 100);
      result = base100Chars[remainder] + result;
    }
    return result;
  }

  // Converter cada par de caracteres hexadecimal para base100
  let base100String = '';
  for (let i = 0; i < data.length; i += 4) {
    const hexPair = data.slice(i, i + 2);
    const charCode = parseInt(hexPair, 16);
    const base = await numToBase100(charCode);
    base100String += base;
  }

  return base100String;
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



//770 linhas maximas
//3 idiomas
//-> PT-BR, EN-US e ESPA