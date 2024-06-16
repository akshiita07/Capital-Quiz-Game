//npm init
//npm i express body-parser ejs axios
//npm i pg
import express from 'express';
import bodyParser from 'body-parser';
import ejs from 'ejs';
//npm pg:
import pg from 'pg';

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));

//to render static css and images pages
app.use(express.static('public'));

let totalScore = 0;        //to maintain score

//my quiz questions:
// let quiz = [
//     { country: "France", capital: "Paris" },
//     { country: "United Kingdom", capital: "London" },
//     { country: "United States of America", capital: "New York" },
// ];
let quiz=[];

//object to maintain current question:
let currentQuestion={};

//database:
const db = new pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'world',      //my db is named 'world'
    password: 'password',   //my password
    port: 5432
});

db.connect();   //start connection to db

//give ques from db and compare capitals from here
db.query("SELECT * FROM capitals",function(err,res){
    if(err){
        console.error("Some error occurred: ",err.stack);
    }else{
        // console.log(res.rows);      //returns all rows in capitals table
        quiz=res.rows;
    }
    //close connection:
    db.end();
});

//get any random question from quiz
function getQues(){
    const randomQues=quiz[Math.floor(Math.random()*quiz.length)];
    currentQuestion=randomQues;
}

app.get('/', (req, res) => {
    totalScore = 0; 
    //generate a random question from quiz
    getQues();
    res.render('index.ejs', {
        countryName: currentQuestion.country,
    })
});

//form is submitted using post /submit
app.post('/submit', function (req, res) {
    //trim() any spaces that user added
    let userAnswer = req.body.answer;
    userAnswer = userAnswer.trim();

    //to check if ans is correct
    let isCorrect = false;

    //convert whole ans to lowercase
    if (userAnswer.toLowerCase() === currentQuestion.capital.toLowerCase()) {
        //if correct capital enetered: increase total score by 1 and show checkmark next to button
        //correct ans
        totalScore++;
        isCorrect = true;
        console.log(`Correct capital name with score: ${totalScore}`);
        
        //generate next ques
        getQues();
        //send total score n country name of next ques
        res.render('index.ejs',{
            countryName: currentQuestion.country,
            score:totalScore,
            correctAns:isCorrect,
        })
    }
    else{
        //if wrong: alert: Game over! Final best score: -> then show restart button
        console.log(`Incorrect with score: ${totalScore}`);
        isCorrect = false;
        // window.alert(`Game over! Final best score: ${totalScore}`)
        res.render('index.ejs',{
            countryName: currentQuestion.country,
            score:totalScore,
            correctAns:isCorrect,
        })
    }
});


app.listen(port, () => {
    console.log(`Server running on  http://localhost:${port}/`)
})