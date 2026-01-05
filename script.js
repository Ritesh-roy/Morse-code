      
      
      const DICT = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
        'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
        'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
        'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
        'Y': '-.--', 'Z': '--..', '1': '.----', '2': '..---', '3': '...--',
        '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
        '9': '----.', '0': '-----', '.': '.-.-.-', ',': '--..--', '?': '..--..',
        '!': '-.-.--', '/': '-..-.', '-': '-....-', '(': '-.--.', ')': '-.--.-',
        ' ': '/'
    };

    const REV_DICT = Object.fromEntries(Object.entries(DICT).map(([k, v]) => [v, k]));

    const switcher = document.getElementById('modeSwitcher');
    const p_t2m = document.getElementById('panel-t2m');
    const p_m2t = document.getElementById('panel-m2t');
    const lbl_t2m = document.getElementById('lbl-t2m');
    const lbl_m2t = document.getElementById('lbl-m2t');

    switcher.addEventListener('click', () => {
        const current = switcher.getAttribute('data-active');
        if(current === 't2m') {
            switcher.setAttribute('data-active', 'm2t');
            p_t2m.classList.remove('active');
            p_m2t.classList.add('active');
            lbl_t2m.classList.remove('active');
            lbl_m2t.classList.add('active');
        } else {
            switcher.setAttribute('data-active', 't2m');
            p_m2t.classList.remove('active');
            p_t2m.classList.add('active');
            lbl_m2t.classList.remove('active');
            lbl_t2m.classList.add('active');
        }
    });

    document.getElementById('t2m-input').addEventListener('input', (e) => {
        const text = e.target.value.toUpperCase();
        const result = text.split('').map(c => {
            if (c === ' ') return '/';
            return DICT[c] || '';
        }).filter(x => x !== '').join(' ');
        document.getElementById('t2m-output').textContent = result;
    });

    document.getElementById('m2t-input').addEventListener('input', (e) => {
        const morse = e.target.value.trim();
        const result = morse.split(/\s+/).map(c => {
            if (c === '/') return ' ';
            return REV_DICT[c] || '';
        }).join('');
        document.getElementById('m2t-output').textContent = result;
    });

    function copyResult(id) {
        const text = document.getElementById(id).textContent;
        if(!text) return;
        navigator.clipboard.writeText(text);
        const btn = event.target;
        const original = btn.textContent;
        btn.textContent = "DONE";
        setTimeout(() => btn.textContent = original, 1000);
    }