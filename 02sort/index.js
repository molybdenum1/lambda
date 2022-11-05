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
  //prompt: 'OHAI> '
});

//rl.prompt();
// rl1.on('line', (text) => {
//     console.log('MENU');
//     console.log('1 - sort word by abc');
//     console.log('2 - sort word by abc');
//     console.log('exit - to close program');
//     rl1.question('Enter want you need - ', (answer) => {
//         switch(answer.trim()){
//             case '1':
//                 let words = text.split(" ");
//                 let sortedWords = words.sort()
//                 console.log(sortedWords);
//                 break;
//             case 'exit':
//                 console.log('exit!');
//                 console.log('Have a great day!');
//                 process.exit(0);
//             default:
//                 console.log(`Say what? I might have heard '${answer.trim()}'`);
//                 break;
//         }
//       });
//   rl1.prompt();
// })

rl1.question("Entre yout text \n", text => {

    console.log('MENU');
    console.log('1 - sort word by abc');
    console.log('2 - sort word by abc');
    console.log('exit - to close program');
    rl1.on('line', line => {
        switch(line.trim()){
            case '1':
                let words = text.split(" ");
                let sortedWords = words.sort()
                console.log(sortedWords);
                break;
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