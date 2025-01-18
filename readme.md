![digi-api](https://socialify.git.ci/andhkdwmln/digi-api/image?description=1&font=KoHo&forks=1&issues=1&language=1&name=1&owner=1&pattern=Circuit+Board&pulls=1&stargazers=1&theme=Dark)

<div align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/andhkdwmln/digi-api?style=for-the-badge">
  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/andhkdwmln/digi-api?style=for-the-badge">
</div>

<br>


## 🚀 Features

* Checking Balance
* Get Price List
* Make a Transaction
* Checing Transaction Status


## 🚀 Requirements

* [Git](https://git-scm.com/downloads)
* [NodeJS](https://nodejs.org/en/download/prebuilt-installer)


## 🚀 Quick Setup

- Install `Git` and `NodeJS`
- Clone Repository `git clone https://github.com/andhkdwmln/digi-api`
- Move to directory `cd digi-api`
- Install required module `npm install`
- Build `npm run build`
- Compiled code inside `lib` folder

OR

- Installation via NPM : `npm install digi-api`


## 🚀 Usage

``` Javascript
const { Topup } = require('digi-api');
const bot = new Topup('digiflazz-username', 'digiflazz-apikey');

(async () => {
    
    const saldo = await bot.Saldo();
    console.log(saldo);

})();
```