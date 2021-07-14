'use strict';
var puppeteer = require('puppeteer');
var chalk = require('chalk')
var inquirer = require('inquirer');
var open_page = async function open_page(url){
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 800 })
  var url,
   retryCount
   var retryCount = 2;
   var t = 0;
   while (t < retryCount) {
     try {
       console.log(chalk.green("start " + t + " try"))
       var result
         await page.goto(url, { waitUntil: ['networkidle2'] })
         .then(success =>
               console.log(chalk.green(
                 "\n" + ' go to page: ' + url + ' [ok]'
         )));
       return result;
     } catch(Expection) {
       try {
         t++;
         continue;
       } catch (Exception) {
         t++;
         //Fehlerausgabe
         if (t === retryCount) {
           console.error(chalk.red(
               '\n try failed '));

                 ///Countdown
                 var countdown = 5;
                 function startTimer() {
                     var countdownTimer = setInterval(function() {
                         console.log(countdown);
                         countdown = countdown - 1;
                         if (countdown <= 0) {
                             clearInterval(countdownTimer);

                           }

                     }, 1000);
                 }

               startTimer();
               //Timer durchgelaufen ...
               inquirer.prompt([
                 {
                   type: 'expand',
                   message: 'Fehler aufgetreten',
                   name: 'pageconflict',
                   choices: [
                     {
                       key: 'y',
                       name: 'Neustarten?',
                       value: 'restart',
                     },
                     {
                       key: 'z',
                       name: 'Abbrechen!',
                       value: 'breakTry',
                     },
                     new inquirer.Separator(),
                     {
                       key: 'x',
                       name: 'Abort',
                       value: 'abort',
                     },
                   ],
                 },
               ])
               .then((answers) => {
                 console.log(JSON.stringify(answers, null, '  '));
                 process.exit(1)
               });

         }
       }
     }
   }
   return true;
}

exports.open_page = open_page;
