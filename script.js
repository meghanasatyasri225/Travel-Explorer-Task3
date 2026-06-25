function showMessage()
{
    alert("Welcome! Your next adventure starts now!");
}


function addTask(){

    let input = document.getElementById("taskInput");

    if(input.value.trim() !== ""){

        let li = document.createElement("li");

        li.innerHTML =
        input.value +
        ' <button onclick="removeTask(this)">X</button>';

        document.getElementById("taskList").appendChild(li);

        input.value = "";
    }
}

function removeTask(button){
    button.parentElement.remove();
}

function validateForm(){

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;

    if(name === "" || email === ""){
        alert("Please fill all fields");
    }
    else{
        alert("Form Submitted Successfully!");
    }
}

const track = document.querySelector(".gallery-track");
const images = document.querySelectorAll(".gallery-track img");

let currentIndex = 0;

function getVisibleImages() {
    if (window.innerWidth <= 480) {
        return 1; // Mobile
    } else if (window.innerWidth <= 768) {
        return 2; // Tablet
    } else {
        return 3; // Desktop
    }
}

function nextSlide() {
    const visibleImages = getVisibleImages();

    if (currentIndex < images.length - visibleImages) {
        currentIndex++;
    } else {
        currentIndex = 0;
    }

    moveSlider();
}

function prevSlide() {
    const visibleImages = getVisibleImages();

    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = images.length - visibleImages;
    }

    moveSlider();
}

function moveSlider() {
    const imageWidth = images[0].offsetWidth + 15; // image width + gap
    track.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
}

window.addEventListener("resize", moveSlider);

async function getWeather() {

    const city = document.getElementById("city").value;

    const apiKey = "87033eaf2036dd4948dce25fb1aa3077";

    const url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        document.getElementById("weatherResult").innerHTML = `
            <h3>${data.name}</h3>
            <p>🌡 Temperature: ${data.main.temp} °C</p>
            <p>☁ Weather: ${data.weather[0].description}</p>
            <p>💧 Humidity: ${data.main.humidity}%</p>
        `;

    } catch(error) {

        document.getElementById("weatherResult").innerHTML =
        "City not found!";
    }
}

const quizData = [
{
    question: "Which country is famous for the Eiffel Tower?",
    options: ["India","France","Japan","Australia"],
    answer: "France"
},
{
    question: "Which Indian state is famous for Goa beaches?",
    options: ["Kerala","Goa","Tamil Nadu","Karnataka"],
    answer: "Goa"
},
{
    question: "Which destination is known as Paradise on Earth?",
    options: ["Delhi","Kashmir","Mumbai","Hyderabad"],
    answer: "Kashmir"
},
{
    question: "Which country is famous for Burj Khalifa?",
    options: ["USA","UAE","India","Singapore"],
    answer: "UAE"
},
{
    question: "Which country is famous for the Swiss Alps?",
    options: ["France","Italy","Switzerland","Germany"],
    answer: "Switzerland"
}
];

let currentQuestion = 0;
let score = 0;

const question = document.getElementById("question");
const options = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const message = document.getElementById("message");
const scoreText = document.getElementById("score");

function loadQuestion(){

    message.innerHTML="";

    const q = quizData[currentQuestion];

    question.textContent = q.question;

    options.innerHTML = "";

    q.options.forEach(option => {

        const btn = document.createElement("button");

        btn.textContent = option;

        btn.classList.add("option-btn");

        btn.onclick = () => checkAnswer(option);

        options.appendChild(btn);
    });
}

function checkAnswer(selected){

    const buttons =
    document.querySelectorAll(".option-btn");

    const correctAnswer =
    quizData[currentQuestion].answer;

    buttons.forEach(button => {

        if(button.textContent === correctAnswer){
            button.classList.add("correct");
        }

        if(
            button.textContent === selected &&
            selected !== correctAnswer
        ){
            button.classList.add("wrong");
        }

        button.disabled = true;
    });

    if(selected === correctAnswer){

        score++;

        message.innerHTML =
        "✅ Correct Answer!";
    }
    else{

        message.innerHTML =
        `❌ Wrong Answer! <br>
         Correct Answer: <b>${correctAnswer}</b>`;
    }
}

nextBtn.addEventListener("click", () => {

    currentQuestion++;

    if(currentQuestion < quizData.length){

        loadQuestion();
    }
    else{

        question.innerHTML =
        "🎉 Quiz Completed!";

        options.innerHTML = "";

        message.innerHTML = "";

        nextBtn.style.display = "none";

        scoreText.innerHTML = `
        <h3>Your Score: ${score}/${quizData.length}</h3>
        <p>Thank you for playing the Travel Quiz! 🌍✈️</p>
        `;
    }
});

loadQuestion();

async function getJoke(){

    try{

        const response = await fetch(
            "https://official-joke-api.appspot.com/random_joke"
        );

        const data = await response.json();

        document.getElementById("joke").innerHTML = `
            <p><strong>${data.setup}</strong></p>
            <p>${data.punchline}</p>
        `;

    }
    catch(error){

        document.getElementById("joke").innerHTML =
        "Unable to load joke. Please try again.";
    }
}
