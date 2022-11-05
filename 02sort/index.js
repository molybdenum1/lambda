// **НЕ ИСПОЛЬЗУЯ** каких-либо сторонних библиотек, а силами «ванильного» JS напишите приложение, которое после запуска будет:

// - ждать от пользователя ввода нескольких слов и чисел ЧЕРЕЗ ПРОБЕЛ;
// - задавать вопрос, что бы пользователь хотел увидеть на выходе — какую операцию проделать со словами и числами, а именно:
//     - Отсортировать слова по алфавиту
//     - Отобразить числа от меньшего к большему
//     - Отобразить числа от большего к меньшему
//     - Отобразить слова в порядке возрастания по количеству букв в слове
//     - Показать только уникальные слова
//     - Показать только уникальные значения из всего введённого пользователем набора слов и чисел.
//     - Для выхода из программы пользователю достаточно ввести `exit` в противном случае программа будет
//       повторяться вновь и вновь, запрашивая новые данные и предлагая сортировку

const readline = require('node:readline');
const rl1 = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'What next??> '
});


rl1.question("Entre yout text \n", text => {

    console.log('MENU');
    console.log('1 - sort words by abc');
    console.log('2 - sort only numbers in text by abc');
    console.log('3 - sort words by it lenght');

    console.log('exit - to close program');
    rl1.on('line', line => {
        switch(line.trim()){
//     - Отсортировать слова по алфавиту
            case '1':
                let sortedWords = text.split(" ").filter(e => !+e).sort();
                console.log(sortedWords);
                break;
            case '2':
//     - Отобразить числа от большего к меньшему
                let numbers = text.split(" ").filter(e => +e).map(i => +i).sort(( a, b ) => b - a)
                console.log(numbers);
                rl1.prompt()
                break;
            case '3':
//     - Отобразить слова в порядке возрастания по количеству букв в слове
                let sortedByLengthWords = text.split(" ").filter(e => !+e).sort( (a, b) => a.length - b.length);
                console.log(sortedByLengthWords);
                break;
            case '4': 
//     - Показать только уникальные слова
                let uniqueWords = new Set(text.split(" ").filter(e => !+e));
                console.log(uniqueWords);
                break
            case 'exit':
                console.log('exit!');
                console.log('Have a great day!');
                process.exit(0);
            default:
                console.log(`Say what? I might have heard '${line.trim()}'`);
                break;
        }
    })
})