export default function ResultModal(message, onRestart, onClose) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';

  const modal = document.createElement('div');
  modal.className = 'result-modal';
  overlay.appendChild(modal);

  const text = document.createElement('p');
  text.textContent = message;
  modal.appendChild(text);

  const restartBtn = document.createElement('button');
  restartBtn.className = 'restart-btn';
  restartBtn.textContent = 'Reiniciar';
  restartBtn.addEventListener('click', () => {
    if (onRestart) onRestart();
    close();
  });
  modal.appendChild(restartBtn);

  const close = () => {
    document.removeEventListener('keydown', handleKey);
    overlay.remove();
    if (onClose) onClose();
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      if (onRestart) onRestart();
      close();
    } else if (e.key === 'Escape') {
      close();
    }
  };

  document.addEventListener('keydown', handleKey);
  document.body.appendChild(overlay);
  requestAnimationFrame(() => restartBtn.focus());

  return { overlay, close };
}
