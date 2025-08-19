export default function TopBar(title, actionIcon = '❓', onAction) {
  const bar = document.createElement('div');
  bar.className = 'top-bar';
  bar.style.fontFamily = 'var(--font-main)';
  bar.style.backdropFilter = 'blur(4px)';
  bar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.3)';

  const leftSpacer = document.createElement('div');
  leftSpacer.className = 'top-bar-spacer';
  bar.appendChild(leftSpacer);

  const heading = document.createElement('h1');
  heading.textContent = title;
  bar.appendChild(heading);

  const actionBtn = document.createElement('button');
  actionBtn.className = 'give-up-btn';
  actionBtn.style.margin = '0';
  actionBtn.textContent = actionIcon;
  if (onAction) {
    actionBtn.addEventListener('click', onAction);
  }
  bar.appendChild(actionBtn);

  return bar;
}
