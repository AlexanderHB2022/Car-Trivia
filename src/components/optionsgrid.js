export default function OptionsGrid(options, onSelect) {
  const grid = document.createElement('div');
  grid.className = 'options-grid';

  const buttons = [];

  options.forEach((option, index) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn give-up-btn';
    btn.style.margin = '0';
    btn.textContent = option;
    btn.addEventListener('click', () => onSelect(option, index));
    grid.appendChild(btn);
    buttons.push(btn);
  });

  const setState = (index, state) => {
    const btn = buttons[index];
    if (!btn) return;
    btn.style.backgroundColor =
      state === 'correct'
        ? 'var(--correct)'
        : state === 'incorrect'
        ? 'var(--absent)'
        : 'var(--color3)';
    btn.style.color = 'var(--text-color)';
  };

  return { element: grid, buttons, setState };
}
