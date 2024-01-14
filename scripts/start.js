// Chama a função pela primeira vez
checkConditionAndEnableButton();



// Função para verificar a existência de um mouse
function hasMouse() {
    return ('maxTouchPoints' in navigator && navigator.maxTouchPoints > 0);
}

// Função para ativar ou desativar a folha de estilos
function toggleStylesheet(enable) {
    var link = document.getElementById('style-link');
    if (enable) {
        link.setAttribute('href', 'styles/mouse.css');
    } else {
        link.setAttribute('href', 'styles/touch.css');
    }
}

// Verifica se há um mouse e, em seguida, ativa a folha de estilos apropriada
if (hasMouse()) {
    toggleStylesheet(true); // Ativa a folha de estilos específica para dispositivos com mouse
} else {
    toggleStylesheet(false); // Ativa a folha de estilos específica para touchscreen
}