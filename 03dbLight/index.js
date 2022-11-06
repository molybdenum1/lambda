import inquirer from 'inquirer';
import fs from 'fs'
// **Алгоритм работы приложения:**

// - после запуска выводится сообщение с просьбой указать имя;
// - затем предлагается выбрать пол из списка;
// - указать возраст;
// - затем цикл с добавлением пользователя повторяется. Таким образом можно добавить ещё одного пользователя.
// - Для **прекращения процедуры добавления пользователей** достаточно вместо ввода имени **нажать ENTER**.
// - После отказа на дальнейшее добавление пользователя приложение предлагает найти пользователя по имени в базе данных.
//      На выбор два ответа: Y/N. При выборе N — выходим, при выборе Y — осуществляем поиск и сообщаем о результатах: 
//      если пользователь найден в базе данных — выводим всю информацию о нём, если нет — указываем, что такого юзера нет.

// **Моменты и нюансы:**

// - ваша база данных — это текстовый файл, в который постоянно добавляются новые пользователи без перезаписи предыдущих.
// - организуйте хранение данных в вашей базе таким образом, чтобы каждого пользователя можно было легко превратить
//      в объект, т.е. вы мыслите таким образом, что перед вами праобраз нереляционной базы данных, 
//      а в txt-файле практически готовый JSON (методы parse и stringify должны работать на ура).
// - обратите внимание на алгоритм поиска. Вспомните, что возвращает вам Google, когда вы вводите запрос,
//      наверняка вы получаете не одну ссылку в качестве релевантного результата.
// - учтите вариант, что юзер может любит писать КАПСЛОКОМ, но все равно хочет получить валидные результаты

// inquirer.registerPrompt("loop", require("inquirer-loop")(inquirer));
// inquirer
//   .prompt({
//     type: "loop",
//     name: "data",
//     message: "Add one more?",
//     questions: 
//   }
//   )
//   .then((answers) => {
//     console.log(answers);
//   });

const collectInputs = async (inputs = []) => {
    const prompts = [        
        {
            type: "input",
            name: "your_name",
            message: "What is your name?",
            validate: (ans) => {
                if(ans == '') {
                    return 'Please Enter a valid name';
                }
                return true;
            }
        },
        {
            type: "list",
            name: "sex",
            message: "What is your sex?",
            choices: ['Male', 'Female', 'Non binary']
        },
        {
            type: "number",
            name: "age",
            message: "How old are you?"
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another input? ',
            default: true
        }
    ];
  
    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? collectInputs(newInputs) : newInputs;
  };
  
  const main = async () => {
    const inputs = await collectInputs();
    fs.appendFile('message.txt', JSON.stringify(inputs), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });
  };
  
  main();
