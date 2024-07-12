 let Questions=[];
  async function fetchQuestions(){
    try{
    const resp = await fetch("https://opentdb.com/api.php?amount=10");
    if(!resp.ok){
        throw new Error("Couldn't fetch question!!!!")
    }
    const data=await resp.json();
    Questions = data.results;
}
catch(err){
    console.error(err);
    ques.innerHTML=`<h5 style="background-color:"red"">${err}</h5>`;
}
}

let currentQuestion = 0;
let score = 0;

if(Questions.length === 0){
    ques.innerHTML=`<h5>Please wait! <br> Questions Loading...</h5>`;
}

function loadQues(){
    const opt = document.getElementById('opt');
    
    let currQuesText = Questions[currentQuestion].question;
    console.log(currQuesText);
    ques.innerTxt = currQuesText;

    opt.innerHTML = currQuesText;

    const correctAnswer = Questions[currentQuestion].correct_answer;
    const incorrectAnswer = Questions[currentQuestion].incorrect_answers;

    const options = [correctAnswer, ... incorrectAnswer];
    options.sort((a,b)=> Math.random() < 0.5); 

    options.forEach((option)=>{
        const optDiv =document.createElement('div');
        const optionTag = document.createElement('input');
        const labelTag = document.createElement('label');
        optionTag.type = 'radio';
        optionTag.name = 'answer';
        optionTag.value = option;
        labelTag.textContent = option;
        optDiv.appendChild(optionTag);
        optDiv.appendChild(labelTag);
        opt.appendChild(optDiv);
    })}


function nextQuestion(){
    if(currentQuestion < Questions.length-1){
        currentQuestion++;
        loadQues();
    }
    else{
        document.getElementById("opt").remove();
        document.getElementById("ques").remove();
        document.getElementById("btn").remove();
        showTotal();
    }
}
function checkAnswer(){
    const selectedAns = document.querySelector('input[name="answer"]:checked').value;
    if(selectedAns===Questions[
        currentQuestion
    ].correct_answer){
        score++;
    }
    nextQuestion();

}
function showTotal(){
    const totalScore = document.querySelector('#score');
    totalScore.innerHTML =`<h3>Your Score:${score}/10</h3>`;
    Questions.forEach((ques,idx)=>{
        totalScore.innerHTML +=`
        <p>
        ${idx + 1}: ${ques.correct_answer}
        </p>`;
    })
}
setTimeout(()=>{
    loadQues();
    if(Questions.length === 0){
        ques.innerHTML = `<h5 style='color:red>Unable to fetch data,Please try again!!</j5>`;
    }
},2000)
 


fetchQuestions();