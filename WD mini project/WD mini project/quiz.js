const quizData = [
    {
      question: "Which Indian athlete won a gold medal in javelin throw at the 2020 Tokyo Olympics?",
      options: ["Neeraj Chopra", "Hima Das", "PT Usha", "Milkha Singh"],
      answer: "Neeraj Chopra"
    },
    {
      question: "Which Indian cricketer has scored the most runs in international cricket?",
      options: ["Sachin Tendulkar", "Virat Kohli", "Rahul Dravid", "MS Dhoni"],
      answer: "Sachin Tendulkar"
    },
    {
      question: "Which Indian badminton player is known as the 'Golden Girl'?",
      options: ["PV Sindhu", "Saina Nehwal", "Jwala Gutta", "Ashwini Ponnappa"],
      answer: "PV Sindhu"
    },
    {
      question: "Which Indian boxer won a bronze medal at the 2020 Tokyo Olympics?",
      options: ["Mary Kom", "Vijender Singh", "Lovlina Borgohain", "Amit Panghal"],
      answer: "Lovlina Borgohain"
    },
    {
      question: "Which Indian tennis player won a Grand Slam title in 2021?",
      options: ["Sania Mirza", "Leander Paes", "Rohan Bopanna", "Sumit Nagal"],
      answer: "Sania Mirza"
    },
    {
      question: "Which Indian athlete is known as the 'Flying Sikh'?",
      options: ["Milkha Singh", "Usain Bolt", "PT Usha", "Anju Bobby George"],
      answer: "Milkha Singh"
    },
    {
      question: "Which Indian shuttler won the bronze medal at the 2020 Tokyo Olympics?",
      options: ["PV Sindhu", "Saina Nehwal", "Kidambi Srikanth", "HS Prannoy"],
      answer: "PV Sindhu"
    },
    {
      question: "Which Indian wrestler won a silver medal at the 2016 Rio Olympics?",
      options: ["Sushil Kumar", "Yogeshwar Dutt", "Sakshi Malik", "Bajrang Punia"],
      answer: "Sakshi Malik"
    },
    {
      question: "Which Indian cricketer has the highest individual score in Test cricket?",
      options: ["Virender Sehwag", "Sachin Tendulkar", "Virat Kohli", "Rohit Sharma"],
      answer: "Virender Sehwag"
    },
    {
      question: "Which Indian athlete won a gold medal in the 1500m at the 2018 Asian Games?",
      options: ["Hima Das", "Dutee Chand", "PT Usha", "Jinson Johnson"],
      answer: "Jinson Johnson"
    }
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let timer;
  let timeLeft = 20;
  let username = "";
  let selectedOption = null;
  
  const usernameSection = document.getElementById("username-section");
  const quizContainer = document.getElementById("quiz-container");
  const resultsSection = document.getElementById("results-section");
  const questionNumber = document.getElementById("question-number");
  const questionText = document.getElementById("question-text");
  const optionsList = document.getElementById("options-list");
  const timerDisplay = document.getElementById("timer");
  const nextButton = document.getElementById("next-button");
  const resultsHeading = document.getElementById("results-heading");
  const resultsFeedback = document.getElementById("results-feedback");
  
  document.getElementById("start-quiz").addEventListener("click", () => {
    username = document.getElementById("username").value.trim();
    if (username === "") {
      alert("Please enter a username!");
      return;
    }
    usernameSection.classList.add("hidden");
    quizContainer.classList.remove("hidden");
    loadQuestion();
    startTimer();
  });
  
  function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionNumber.textContent = `Question ${currentQuestion + 1}`;
    questionText.textContent = currentQuizData.question;
    optionsList.innerHTML = "";
    selectedOption = null;
    currentQuizData.options.forEach((option, index) => {
      const li = document.createElement("li");
      li.textContent = option;
      li.addEventListener("click", () => selectOption(li, option));
      optionsList.appendChild(li);
    });
  }
  
  function selectOption(li, option) {
    if (selectedOption !== null) return; // Prevent multiple selections
    selectedOption = option;
    // Highlight the selected option
    Array.from(optionsList.children).forEach(child => {
      child.style.backgroundColor = "#f4f4f4"; // Reset all options
    });
    li.style.backgroundColor = "#ddd"; // Highlight the selected option
    nextButton.disabled = false;
  }
  
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
      if (timeLeft <= 0) {
        clearInterval(timer);
        nextQuestion();
      }
    }, 1000);
  }
  
  function nextQuestion() {
    clearInterval(timer);
    if (selectedOption === quizData[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      timeLeft = 20;
      timerDisplay.textContent = `Time left: ${timeLeft} seconds`;
      nextButton.disabled = true;
      loadQuestion();
      startTimer();
    } else {
      showResults();
    }
  }
  
  nextButton.addEventListener("click", () => {
    if (selectedOption === null) {
      alert("Please choose an option first!");
      return;
    }
    nextQuestion();
  });
  
  function showResults() {
    quizContainer.classList.add("hidden");
    resultsSection.classList.remove("hidden");
    resultsHeading.textContent = `${username}, you scored ${score}/${quizData.length}!`;
    if (score <= 5) {
      resultsFeedback.textContent = "Better luck next time!";
    } else {
      resultsFeedback.textContent = "Good job!";
    }
  }
  
  document.getElementById("restart-quiz").addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    timeLeft = 20;
    resultsSection.classList.add("hidden");
    usernameSection.classList.remove("hidden");
  });