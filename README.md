# KD-XG5JKV-Szakdolgozat

A project issue tracking website with capabilities of much more than that

> - Készítette: Klepe Dominik
> - Neptun: XG5JKV
> - Fiókok: KDMashy, Dominik-Klepe (mindkettő saját)

## MAGYAR

### telepítési lépések:

#### Virtuális gépews tesztelés:

- Töltse le a [Oracle VM VirtualBox-ot](https://www.virtualbox.org/wiki/Downloads)
  > Az oldalon válassza a maga rendszerének megfelelő telepítőt (windows esetén windows hosts)
- Töltse le a [Virtuális Gáp képfájlját](https://drive.google.com/file/d/1xqBCnrHyFAnMESGdOFQx7FeFZvaNZHk3/view?usp=share_link)
- Telepítse az Oracle VM VirtualBox-ot
- A telepítés befejezése után indítsa el a programot, kattintson az eszközök fülre, és válassza az importálás opciót

1. Válassza ki a letöltött Virtuális Gép Képfájljt, majd kattintson arra, hogy következő
2. A Név mezőbe adja meg a nevét a Virtuális számítógép számára, alapból ez openSuse
3. Processzor mezőben adja meg mennyi magot szeretne szánni a virtuális gép számára (A laptopom 8 maggal rendelkezik, ezért 4-et adtam alapvetően, 2 ajánlott a felhasználói élmény legalább minimum mértéke miatt, de mehet 1 maggal is)
4. RAM-nak adjon meg tetszőleges mennyiségű memóriát (A laptopom 16 GB rammal rendelkezik, ezért adtam meg neki 4096 MB-t alapvetően, 2048 MB ajánlott a felhasználói élmény miatt, lehet 1024 MB is, de lassú lesz)
5. Kattintson a befejezés gombra

- Amikor az importálás befejeződött, ez kis időt vesz igénybe, el tudja indítani azzal, hogy a listából kiválasztja a virtuális gépet, majd rányom az indítás gombra
- A virtuális gépen ahhoz, hogy elindítsa a környezetet a lépéseket az asztalon egy README nevű txt fájlban találja meg

> - felhasználó: user
> - felhasználó jelszava: thesis123
> - gyökér jelszava (máshol nemhasznált): Shiron03

#### Környezet telepítése esetén

- telepítse a [NodeJS LTS verziót](https://nodejs.org/en)
- telepítse a [XAMPP-ot](https://www.apachefriends.org/hu/index.html)
- telepítse a [GitHub Desktop-ot](https://desktop.github.com/)
- klónozza le a [repository-t](https://github.com/KDMashy/KD-XG5JKV-Szakdolgozat)

1. Nyissa meg a linket
2. kattintson a zöld "<>Code" gombra
3. Másolja a https://... linket
4. Nyissa meg a GitHub Desktopot
5. Kattintson a hozzáadásra ("add"), majd klónozásra ("clone")
6. Kattintson az url fülre, illessze be az urlt amit másolt, és klónozza le a fájlt ahova tallózza

- Nyisson meg két terminált, majd lépjen be az alap mappába: KD-XG5JKV-SZAKDOLGOZAT
- az egyikben írja be:

1. cd ./backend/
2. npm i
3. (nem a terminálban) adja hozzá az információkat az .env fájlhoz
4. npm run start:dev

- a másikban:

1. cd ./frontend/
2. npm i
3. (nem a terminálban) adja hozzá az információkat az .env fájlhoz
4. npm run dev

- Miután végzett a lépésekkel, elérhető lesz az oldal a localhost:3000 porton a böngészőben
  > A .env fájlhoz a példákat megtalálja a .env-example nevű fájlokban

## ENGLISH

### installation steps:

#### For VM testing:

- download [Oracle VM VirtualBox](https://www.virtualbox.org/wiki/Downloads)
  > On the page Chose the correct installer for your system (for windows its the Windows hosts)
- download [Virual Machine Image](https://drive.google.com/file/d/1xqBCnrHyFAnMESGdOFQx7FeFZvaNZHk3/view?usp=share_link)
- install Oracle VM VirtualBox
- when it is installed, start it, and in the tools tab choose import

1. select the downloaded virtual machine image and click on next
2. in the name field enter the name what you want to give to the virtual machine
3. for processor enter your preferred core number (My laptop has an 8 core processor, i gave it 4 by default, 2 recommended at least for the experience)
4. for RAM enter your preferred amount of RAM (2048 MB recommended, for my laptop it was 4096 MB as it has 16 GB RAM)
5. click on finish

- when the import is finished, it may take a little time, you can start it by selecting the virtual machine and clicking on start
- you will find the steps for starting the project in the README file on the desktop

  > - user: user
  > - user password: thesis123
  > - root password (not used anywhere else): Shiron03

#### For installing the environment:

- install [NodeJS LTS version](https://nodejs.org/en)
- install [XAMPP](https://www.apachefriends.org/hu/index.html)
- install [GitHub Desktop](https://desktop.github.com/)
- clone [repository](https://github.com/KDMashy/KD-XG5JKV-Szakdolgozat)

1. open the link
2. click on green "<>Code"
3. copy https://... link
4. open github desktop
5. click on add, and clone repository
6. click on url tab, and paste the url, then start cloning where you choose

- open 2 terminal and enter the base folder KD-XG5JKV-SZAKDOLGOZAT
- in one enter:

1. cd ./backend/
2. npm i
3. (not in terminal) add informations for .env
4. npm run start:dev

- in other enter:

1. cd ./frontend/
2. npm i
3. (not in terminal) add informations for .env
4. npm run dev

- after you've done this you will be able to see the website on localhost:3000 in a browser
  > for .env you will find an example in .env-example
