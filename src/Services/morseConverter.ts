
export function convertTextToMorse(text: string) {
    // convert the text into morse code and return it. Also take into account, that the text can contain numbers as well. Also the text can be in slovenian language, so the š translation is equal to s translation, č translation is equal to c translation, ž translation is equal to z translation and the same goes for the capital letters.
    const morseCode: {[key: string]: string} = {
        'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--', 'Z': '--..',
        '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.',
        'Š': '...', 'Č': '-.-.', 'Ž': '--..',
        ' ': '/'
    };

    let morseText = '';
    for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        if (morseCode[char]) {
            morseText += morseCode[char] + ' ';
        }
    }

    return morseText.trim();
}