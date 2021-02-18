# Assignment3 Documentation
ID Assignment 3 : Covid information website for kids
Group members: Tang Ming Feng, Josiah Low
Note:
* derpsnow == Tang Ming Feng

## Contributions
### Tang Ming Feng
* The Home page (index.html) and Stats page (stats.html), along with all css and js involved.
### Josiah Low
* The Learn page (learn.html) and Quiz page (quiz.html), along with all css and js involved.

## Table of Contents
- [1] Purpose
- [2] Design Process
- [3] Features
- [4] Testing
- [5] Technologies used
- [6] Credits

      
## [1] Purpose

### User audience: 
Young kids and parents.


### Intent:
Make young kids more aware and knowledgable of the virus, and take up good practices and habits to avoid contracting the virus.


### Purpose:
Make kids take up good practices and habits to avoid contracting the virus and staying safe.


### Who the website is catering for and value it provides for users:
Kids: Fun interactive experience that is also educational.
Parents: Help their child be more aware of the situation, while having fun.


### What is the website catering for?
The website caters for kids to have a fun, interactive and educational experience learning about world issues like covid, making them more aware.


## [2] Design Process

Colors used are targeted at children. Color scheme is taken from https://color.adobe.com/Kids-Website-Color-Scheme--color-theme-8124669/

Lotties are used to provide more dynamism to the website, especially because the website is targeted at children.


### Link to Github Pages
[Github page](https://tangmf.github.io/Assignment3/index.html)
### Link to wireframe
[Wireframe](https://xd.adobe.com/view/e48bed14-6759-4774-a639-ef4d500fa037-b1d8/?fullscreen)
### Link to Google Drive Pitch Video
[Pitch Video](https://drive.google.com/file/d/15bp6Cbh0dqc8DDNETJmgZk3EJSwR7VTV/view?usp=sharing)

### User stories
* As a kid, I want to learn more about about covid-19. I would need to navigate to the learn page via the navbar or the homepage menu. As there are simple instructions at the homepage menu, I know which buttons will lead to the learn page, as well as get an idea of what the website offers (quiz and stats). After clicking on the learn option in the homepage menu, I will be redirected to the learn page, where I can scroll through the different sections of content. I can also click the fun fact boxes to learn more about covid-19. After reading through, when I feel like I have learnt something, I can go to the quiz page via the navbar, the homepage menu, or the button below the learn page. At the quiz page, I can test my knowledge through the 10 questions, and try my best to get all the questions correct to beat the covid-19 enemy and get a highscore. I can then save my highscore with my name on it. After that, if I want to explore more, I can go to the stats page and play around with the interactive map, or learn more about the global statistics or even learn about my own country's statistics via the search by country section.


## [3] Features

### All pages
* All pages have a responsive navigation bar made using bootstrap that is set to the top of the screen.
* All pages are responsive.
### Home page
* Interactive menu that the user can interact with
* Introduction to what the website offers, from the learning points about covid, to the quiz, to the stats page.
### Learn page
* Learning points about covid-19, good practices to prevent contracting the disease.
* Infographics and images
* Interactive fun fact boxes that users can click on to learn extra facts about covid
### Quiz page
* Interactive quiz game
* Highscore system, where top 5 scores will be displayed on the leaderboards page using local storage
* Goal of quiz game is to defeat the enemy covid, which weakens in HP everytime the user gets a correct answer.
* Gamification feel due to needing to defeat an enemy
### Stats page
* Global statistics (confirmed cases, deaths and recovered)
* Search statistics by Country
* Interactive map, where the user can change the map settings

## [4] Testing

### 1) Search by country feature
* i) Go to stats page via navbar or homepage menu
* ii) Scroll down to search by country section
* iii) Input the country name in the textbox (not case sensitive) and click search
* iv) Loading text and lottie appears, and once the page has taken the info from the api, it displays the country stats below.
* v) If there are, related countries will appear above.

### 2) Interactive Map
* i) Go to stats page via navbar or homepage menu
* ii) Scroll down to the map
* iii) Change the settings according to your liking
* iv) Click Apply changes 
* v) The map updates according to the settings
* vi) The user can interact with the map, and navigate through the different countries

### 3) Quiz game
* i) Go to quiz page via navbar or homepage menu
* ii) Click on "Play" to start game or "Highscores" to view the leaderboard.
* iii) After clicking "Play", the game starts and an enemy covid will spawn, and you will be prompted to answer a question with 4 choices.
* iv) Clicking on the right answer adds 100 points and hits the covid enemy for 2hp, and you progress to the next question (total 10 questions).
* v) Defeating the covid enemy (getting all questions correct) will have a special ending screen saying that you defeated the virus
* vi) You will be prompted to save your highscore. If you want to, just enter in your name and click save.
* vii) The highscore will appear on the leaderboards.


## [5] Technologies used
* html 
* css
* javascript
* jquery
* bootstrap
* postman
* postman covid19 API
* json
* mapbox API
* lotties

## [6] Credits
### Content
* The info for the learn.html was copied and paraphrased from [Johns Hopkins Medicine's](https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus) website, another page from [Johns Hopkins Medicine's](https://www.hopkinsmedicine.org/health/conditions-and-diseases/coronavirus/how-can-i-protect-myself-from-coronavirus) website and [World Health Organization's](https://www.who.int/news-room/q-a-detail/coronavirus-disease-covid-19) website.
* The info for the learn.html section "What happens if I get it?" was taken from [Kids National Geographic's](https://kids.nationalgeographic.com/explore/science/facts-about-coronavirus/) website.
### Images
* The cough.jpg image was taken from https://depositphotos.com/88981330/stock-illustration-coughing-woman-cartoon-vector-illustration.html
* The sneeze.jpg image was taken from https://depositphotos.com/vector-images/sneeze.html?qview=54165171
* The fever.jpg image was taken from https://depositphotos.com/vector-images/fever.html?qview=63306837
* The fatigue.jpg image was taken from https://www.samatters.com/tired-brains-and-situational-awareness/
* The rest.png image was taken from https://www.vecteezy.com/vector-art/1133007-stay-home-quarantine-with-boy-sick-in-bed
* The vaccine.jpg image was taken from https://www.todayonline.com/singapore/covid-19-vaccines-what-happening-right-now-their-progress
### Acknowledgements
* Bootstrap: https://repl.it/@mingfeng/wk08-simple-bootstrap#index.html
* Country coordinate and code json file is taken from [eesur's github repo](https://github.com/eesur/country-codes-lat-long)
* Quiz Youtube Tutorial by: [brain design](https://www.youtube.com/watch?v=f4fB9Xg2JEY)
* All Lotties taken from [Lottie Files](https://lottiefiles.com/)


