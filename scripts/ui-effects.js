// UI Effects
// Efeitos de UI

// Função que organiza os menus
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

function toggleDropdown() {
    const dropdown = document.querySelector('.dropdown');
    dropdown.classList.toggle('active');
}

// Função que fecha os menus
function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('settings-popup').style.display = 'none';
    document.body.classList.remove('modal-open');
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

// Função que copia o texto do input de senha final
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

// Função que permite visualizar o texto do input de senha final
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

// Função que permite abrir os menus Info, Config e Doação
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

// Função que calcula a barra de força de cada um dos 3 inputs
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

// Função que calcula a barra de força da senha final
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

function check(name, value) {
    const template = document.getElementsByTagName(name);
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