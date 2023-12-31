/*
function togglePopup(text) {
  const popup = document.getElementById('popup');
  const popupContent = document.getElementById('popup-content');
  popupContent.innerHTML = '';
  const tabs = ['Apresentação', 'Form 1', 'Form 2', 'Form 3'];
  const tabsContainer = document.createElement('div');
  tabsContainer.className = 'tabs-container';
  tabs.forEach((tab, index) => {
    const tabElement = document.createElement('div');
    tabElement.className = 'tab';
    tabElement.innerText = tab;
    tabElement.onclick = function () {
      changeTab(index);
    };
    tabsContainer.appendChild(tabElement);
  });
  popupContent.appendChild(tabsContainer);
  changeTab(0);
  const okButton = document.getElementById('ok-btn');
  okButton.onclick = function () {
    popup.style.display = 'none';
  };
  popup.style.display = 'block';
}

function changeTab(tabIndex) {
  const tabContents = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec odio ac turpis cursus euismod.',
    'Explanation for Senha Geral: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec odio ac turpis cursus euismod.',
    'Explanation for Form 1: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec odio ac turpis cursus euismod.',
    'Explanation for Form 2: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec odio ac turpis cursus euismod.',
    'Explanation for Form 3: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec odio ac turpis cursus euismod.'
  ];
  const popupContent = document.getElementById('popup-content');
  popupContent.innerHTML = `<div class="tab-content">${tabContents[tabIndex]}</div>`;
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

function generate() {
  // Add your password generation logic here
  const password = 'GeneratedPassword123';
  document.getElementById('password').value = password;
}

function copyToClipboard() {
  const passwordField = document.getElementById('password');
  passwordField.select();
  document.execCommand('copy');
}







*/
function togglePopup(text) {
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-content');
    popupContent.innerText = text;
    const okButton = document.getElementById('ok-btn');

    // Configura o texto e exibe o popupContent
    popupContent.style.display = 'block';

    // Posiciona o popupContent abaixo dos botões
    okButton.style.order = '1';
    popupContent.style.order = '2';
    okButton.onclick = function () {
      popup.style.display = 'none';
      popupContent.order = '1';
    };
    popup.style.display = 'block';
  }


  function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('settings-popup').style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  async function calcularHashSHA512(dados) {
    //const encoder = new TextEncoder();
    const dadosArrayBuffer = new TextEncoder().encode(dados);

    const hashBuffer = await crypto.subtle.digest('SHA-512', dadosArrayBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');

    return hashHex;
  }

  async function calcularHashSHA256(dados) {
    //const encoder = new TextEncoder();
    const dadosArrayBuffer = new TextEncoder().encode(dados);

    const hashBuffer = await crypto.subtle.digest('SHA-256', dadosArrayBuffer);

    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(byte => byte.toString(36).padStart(2, '0')).join('');

    return hashHex;
  }

  //var resultB = 0;

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

  async function generate() {
    const password1 = btoa(document.getElementById('form1').elements[0].value);
    const password2 = btoa(document.getElementById('form2').elements[0].value);
    const password3 = btoa(document.getElementById('form3').elements[0].value);
    const passwordSize = btoa(20);

    // Verifica se pelo menos o primeiro e o terceiro formulários têm mais de 1 caractere
    const isClickable = password1.length > 1 && password3.length > 1;

    // Seleciona o botão "generate"
    const generateButton = document.getElementById('generate-btn');

    if (isClickable) {
      // Adiciona a classe para tornar o botão clicável e com a cor azul
      generateButton.classList.add('active');

      // Lógica de geração de senha
      (async () => {
      //Etapa 1: Concatenar e mascarar as 3 senhas numa única variavel
      
      const resultA = await calcularHashSHA256(password1) + await calcularHashSHA256(password2) + await calcularHashSHA256(password3);

      //Etapa 2: Engrandecer o tamanho e ofuscar origem com hashes sequenciais - 12x
      
      const data = resultA;
      const resultB = await calcularHashSHA512(await calcularHashSHA512(await calcularHashSHA512(data)));
      const resultC = await calcularHashSHA512(await calcularHashSHA512(await calcularHashSHA512(resultB)));
      const resultD = await calcularHashSHA512(await calcularHashSHA512(await calcularHashSHA512(resultC)));

      //Etapa 3: Converção em base85, reduzindo tamanho e aumentando segurança
      const resultE = await encodeCustomBase85(resultD);

      //Etapa 4: Manter apenas os primeiros 20 caracteres
      const resultF = await reduzirStringExistente(resultE, atob(passwordSize));

      console.log('Resultado Último:', resultF);
      document.getElementById('password').value = resultF;
      
      })();
      //11 + 11 = ",X"f!=!-!T"B^!/"^W" / "a"7L"r!*"]Y"L!"*!\g / "G"8!I!RM!7A"h5!!."R
    } else {
      // Remove a classe para tornar o botão não clicável e com a cor padrão
      generateButton.classList.remove('active');
    }
  }



  // Função que verifica a condição e atualiza o estado do botão
  function checkConditionAndEnableButton() {
    const password1 = document.getElementById('form1').elements[0].value;
    const password3 = document.getElementById('form3').elements[0].value;

    // Verifica se pelo menos o primeiro e o terceiro formulários têm mais de 1 caractere
    const isClickable = password1.length > 1 && password3.length > 1;

    // Seleciona o botão "generate"
    const generateButton = document.getElementById('generate-btn');

    if (isClickable) {
      // Adiciona a classe para tornar o botão clicável e com a cor azul
      generateButton.classList.add('active');
    } else {
      // Remove a classe para tornar o botão não clicável e com a cor padrão
      generateButton.classList.remove('active');
    }

    // Chama a função novamente após um intervalo de tempo (por exemplo, 500 ms)
    setTimeout(checkConditionAndEnableButton, 500);
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
  }//

  // Chama a função pela primeira vez
  checkConditionAndEnableButton();

  function copyToClipboard() {
    const passwordField = document.getElementById('password');
    const button = document.getElementById('copy-btn');
    const password = passwordField.value;

    // Cria um elemento de área de transferência temporário
    const tempInput = document.createElement('textarea');
    tempInput.value = password;
    document.body.appendChild(tempInput);

    // Seleciona e copia o conteúdo do campo de texto temporário
    tempInput.select();
    document.execCommand('copy');

    // Remove o campo de texto temporário
    document.body.removeChild(tempInput);
   
    console.log('Senha copiada para a área de transferência.');
  }

  function revealPassword() {
    const passwordField = document.getElementById('password');
    const button = document.getElementById('reveal-btn');

    if (passwordField.type === 'password') {
      // Adiciona a classe para tornar o botão clicável e com a cor azul
      passwordField.type = 'text';
      button.innerText = 'Ocultar';
    } else {
      // Remove a classe para tornar o botão não clicável e com a cor padrão
      passwordField.type = 'password';
      button.innerText = 'Revelar';
    }
  }

  function showInfo(contentTemplateId, window) {
    const template = document.getElementById(contentTemplateId);
    const content = template.innerHTML;
    
    if (window === '1'){ //Menu Info
      document.getElementById('popup-content').innerHTML = content;
      document.getElementById('popup').style.display = 'block';
      document.body.classList.add('modal-open');
    } if (window === '2'){ //Menu Config
      document.getElementById('settings-popup-content').innerHTML = content;
      document.getElementById('settings-popup').style.display = 'block';
      document.body.classList.add('modal-open');
    } else { //Menu Donate
      document.getElementById('donation-popup-content').innerHTML = content;
      document.getElementById('donation-popup').style.display = 'block';
      document.body.classList.add('modal-open');
    }
  }

  function calculatePasswordStrength(password, barId) {
    const strengthBar = document.getElementById(barId);
    const passwordField = document.getElementById(`form${barId.slice(-1)}`).querySelector('.password-input');
    const fieldWidth = passwordField.offsetWidth; // Largura do campo de senha

    let strength = 6;

    // Lógica específica para cada formulário
    switch (barId) {
      case 'password-strength-bar-1':
      // Senha Geral

      const lowercaseCount = (password.match(/[a-z]/g) || []).length;
      const uppercaseCount = (password.match(/[A-Z]/g) || []).length;
      const symbolCount = (password.match(/[!@#$%^&*()_+<>,.?":{}|<>]/g) || []).length;
      const digitCount = (password.match(/\d/g) || []).length;
      
      // A senha precisa atender a todos os critérios para ser considerada forte
      if (password.length >= 4) {
          strength = 10;
      } if (password.length >= 6 && lowercaseCount >= 1 && uppercaseCount >= 0 && symbolCount >= 0 && digitCount >= 1) {
          strength = 20;
      } if (password.length >= 8 && lowercaseCount >= 1 && uppercaseCount >= 1 && symbolCount >= 0 && digitCount >= 1) {
          strength = 30;
      } if (password.length >= 10 && lowercaseCount >= 1 && uppercaseCount >= 1 && symbolCount >= 1 && digitCount >= 1) {
          strength = 40;
      } if (password.length >= 10 && lowercaseCount >= 2 && uppercaseCount >= 2 && symbolCount >= 1 && digitCount >= 1) {
          strength = 60;
      } if (password.length >= 15 && lowercaseCount >= 3 && uppercaseCount >= 2 && symbolCount >= 1 && digitCount >= 2) {
          strength = 80;
      } if (password.length >= 15 && lowercaseCount >= 4 && uppercaseCount >= 3 && symbolCount >= 2 && digitCount >= 3) {
          strength = 85;
      } if (password.length >= 20 && lowercaseCount >= 4 && uppercaseCount >= 4 && symbolCount >= 3 && digitCount >= 3) {
          strength = 90;
      } if (password.length >= 20 && lowercaseCount >= 5 && uppercaseCount >= 5 && symbolCount >= 4 && digitCount >= 3) {
          strength = 95;
      } if (password.length >= 25 && lowercaseCount >= 5 && uppercaseCount >= 5 && symbolCount >= 5 && digitCount >= 5) {
          strength = 100;
      }
      break;

      case 'password-strength-bar-2':
      // Senha de palavras

      // Adiciona pontos de força com base na quantidade de palavras
      const words = (password.trim().split(/\s+/)).length;
      
      // A senha precisa atender a todos os critérios para ser considerada forte
      if (password.length >= 3 && words >= 1) {
          strength = 10;
      } if (password.length >= 5 && words >= 1) {
          strength = 20;
      } if (password.length >= 7 && words >= 2) {
          strength = 30;
      } if (password.length >= 8 && words >= 3) {
          strength = 40;
      } if (password.length >= 10 && words >= 4) {
          strength = 60;
      } if (password.length >= 14 && words >= 6) {
          strength = 80;
      } if (password.length >= 18 && words >= 8) {
          strength = 85;
      } if (password.length >= 24 && words >= 12) {
          strength = 90;
      } if (password.length >= 36 && words >= 18) {
          strength = 95;
      } if (password.length >= 48 && words >= 24) {
          strength = 100;
      }
      break;

      case 'password-strength-bar-3':
      // Senha Específica

      // A senha precisa atender a todos os critérios para ser considerada forte
      if (password.length >= 1) {
          strength = 10;
      } if (password.length >= 2) {
          strength = 25;
      } if (password.length >= 3) {
          strength = 50;
      } if (password.length >= 4) {
          strength = 80;
      } if (password.length >= 5) {
          strength = 100;
      }
      break;
  }

  // Atualiza a largura da barra de força com base na pontuação
  const percentage = (strength / 200) * 100;
  strengthBar.style.width = `${percentage}%`;
  }

  function calculateCombinedStrength() {
    const strengthBar1 = document.getElementById('password-strength-bar-1').style.width;
    const strengthBar2 = document.getElementById('password-strength-bar-2').style.width;
    const strengthBar3 = document.getElementById('password-strength-bar-3').style.width;

    const strength1 = parseFloat(strengthBar1 || 0);
    const strength2 = parseFloat(strengthBar2 || 0);
    const strength3 = parseFloat(strengthBar3 || 0);

    
    // Calcula a força combinada
    const combinedStrength = 0.9 * strength1 + 0.9 * strength2 + 0.2 * strength3;

    // Atualiza a largura da barra de força combinada
    const combinedStrengthBar = document.getElementById('combined-strength-bar');
    combinedStrengthBar.style.width = `${combinedStrength}%`;

  }

  // Atualiza a força combinada sempre que as barras individuais são atualizadas
  document.getElementById('form1').addEventListener('input', function () {
  const password = this.querySelector('.password-input').value;
  calculatePasswordStrength(password, 'password-strength-bar-1');
  calculateCombinedStrength();
  });

  document.getElementById('form2').addEventListener('input', function () {
  const password = this.querySelector('.password-input').value;
  calculatePasswordStrength(password, 'password-strength-bar-2');
  calculateCombinedStrength();
  });

  document.getElementById('form3').addEventListener('input', function () {
  const password = this.querySelector('.password-input').value;
  calculatePasswordStrength(password, 'password-strength-bar-3');
  calculateCombinedStrength();
  });

  document.getElementById('form1').querySelector('.password-input').addEventListener('input', function() {
  const password = this.value;
  calculatePasswordStrength(password, 'password-strength-bar-1');
  });

  document.getElementById('form2').querySelector('.password-input').addEventListener('input', function() {
  const password = this.value;
  calculatePasswordStrength(password, 'password-strength-bar-2');
  });

  document.getElementById('form3').querySelector('.password-input').addEventListener('input', function() {
  const password = this.value;
  calculatePasswordStrength(password, 'password-strength-bar-3');
  });

  document.getElementById('form1').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  const password = this.querySelector('.password-input').value;
  calculatePasswordStrength(password, 'password-strength-bar-1');
  });

  document.getElementById('form2').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  const password = this.querySelector('.password-input').value;
  calculatePasswordStrength(password, 'password-strength-bar-2');
  });

  document.getElementById('form3').addEventListener('submit', function (event) {
  event.preventDefault(); // Impede o envio padrão do formulário
  const password = this.querySelector('.password-input').value;
  calculatePasswordStrength(password, 'password-strength-bar-3');
  });

  //770 linhas maximas
  //4 idiomas
  //-> PT-BR, EN-US, ESPA, FRAN