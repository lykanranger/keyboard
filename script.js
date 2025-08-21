const $key = (key) => (
  document.querySelector(`kbd[data-key='${key}'], kbd[data-alt='${key}']`)
);

const typedTextElement = document.getElementById('typed-text');
let typedText = '';
let shiftOn = false;
let capsLockOn = false;

const codeToElement = {
  'CapsLock': $key('caps'),
  'Space': $key('space'),
  'Backslash': document.getElementById('backslash'),
  'Quote': document.getElementById('quote'),
  'ShiftLeft': $key('shift'),
  'ShiftRight': $key('shift'),
  'ControlLeft': $key('ctrl'),
  'ControlRight': $key('ctrl'),
  'AltLeft': $key('alt'),
  'AltRight': $key('alt'),
  'MetaLeft': $key('win'),
  'MetaRight': $key('win'),
  'Backspace': $key('backspace'),
  'Enter': $key('enter'),
}

document.querySelectorAll('kbd').forEach((key) => {
  key.addEventListener('click', () => {
    const keyValue = key.getAttribute('data-key');
    if (keyValue) {
      if (keyValue === 'backspace') {
        typedText = typedText.slice(0, -1);
      } else if (keyValue === 'enter') {
        typedText += '\n';
      } else if (keyValue === 'space') {
        typedText += ' ';
      } else if (keyValue === 'caps') {
        capsLockOn = !capsLockOn;
      } else if (keyValue === 'shift') {
        shiftOn = true;
        setTimeout(() => shiftOn = false, 200);
      } else if (!['tab', 'ctrl', 'win', 'alt'].includes(keyValue)) {
        let char = keyValue;
        if ((capsLockOn && !shiftOn) || (!capsLockOn && shiftOn)) {
          typedText += char.toUpperCase();
        } else {
          typedText += char.toLowerCase();
        }
      }
      typedTextElement.textContent = typedText;
    }
  });

  key.addEventListener('mousedown', () => {
    key.classList.add('pressed');
  });

  key.addEventListener('mouseup', () => {
    key.classList.remove('pressed');
  });
});

window.addEventListener('keydown', (e) => {
  const el = codeToElement[e.code] || $key(e.key.toLowerCase());
  if (el) { 
    el.classList.add('pressed');
  }

  if (e.key === 'Backspace') {
    typedText = typedText.slice(0, -1);
  } else if (e.key === 'Enter') {
    typedText += '\n';
  } else if (e.key === ' ') {
    typedText += ' ';
  } else if (e.key === 'CapsLock') {
    capsLockOn = !capsLockOn;
  } else if (e.key === 'Shift') {
    shiftOn = true;
  } else if (e.key.length === 1) {
    if ((capsLockOn && !e.shiftKey) || (!capsLockOn && e.shiftKey)) {
      typedText += e.key.toUpperCase();
    } else {
      typedText += e.key.toLowerCase();
    }
  }

  typedTextElement.textContent = typedText;
});

window.addEventListener('keyup', (e) => {
  const el = codeToElement[e.code] || $key(e.key.toLowerCase());
  if (el) {  
    el.classList.remove('pressed'); 
  }

  if (e.key === 'Shift') {
    shiftOn = false;
  }
});
