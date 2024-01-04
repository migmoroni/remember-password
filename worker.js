// Arquivo: script.js

if ('serviceWorker' in navigator) {
    let refreshing;
  
    navigator.serviceWorker.register('service-worker.js')
      .then((registration) => {
        console.log('Service Worker registrado com sucesso:', registration);
  
        // Enviar mensagem para verificar versão
        registration.active.postMessage({ action: 'checkForUpdates' });
  
        // Escutar por mensagens de recarregamento
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data.action === 'reloadPage') {
            console.log('Recarregando página...');
            refreshing = true;
            window.location.reload(true);
          }
        });
      })
      .catch((error) => {
        console.error('Erro ao registrar Service Worker:', error);
      });
  
    // Verificar periodicamente se há uma nova versão disponível
    setInterval(() => {
      if (refreshing) {
        // Evitar verificação durante o processo de recarregamento
        return;
      }
  
      navigator.serviceWorker.controller.postMessage({ action: 'checkForUpdates' });
    }, 60000); // Verificar a cada 1 minuto (ajuste conforme necessário)
  
    // Mostrar um botão "Atualizar" quando uma nova versão estiver disponível
    window.addEventListener('beforeinstallprompt', (event) => {
      const updateButton = document.createElement('button');
      updateButton.textContent = 'Atualizar';
      updateButton.style.position = 'fixed';
      updateButton.style.bottom = '10px';
      updateButton.style.right = '10px';
      updateButton.style.padding = '10px';
      updateButton.style.fontSize = '16px';
      updateButton.style.cursor = 'pointer';
  
      updateButton.addEventListener('click', () => {
        event.prompt();
        event.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuário aceitou a atualização');
          } else {
            console.log('Usuário recusou a atualização');
          }
          updateButton.style.display = 'none';
        });
      });
  
      document.body.appendChild(updateButton);
    });
  }