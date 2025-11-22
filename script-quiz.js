$(document).ready(function() {
  // Sample 20 questions
  const questions = [
    { q: "What is the capital of France?", options: ["Paris","London","Berlin","Madrid"], answer: 0 },
    { q: "2 + 2 equals?", options: ["3","4","5","6"], answer: 1 },
    { q: "Which planet is known as the Red Planet?", options: ["Earth","Mars","Venus","Jupiter"], answer: 1 },
    { q: "What is the chemical symbol for water?", options: ["O2","H2O","CO2","HO"], answer: 1 },
    { q: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare","Hemingway","Tolkien","Orwell"], answer: 0 },
    { q: "What is 10 * 5?", options: ["50","25","100","45"], answer: 0 },
    { q: "Which ocean is the largest?", options: ["Atlantic","Pacific","Indian","Arctic"], answer: 1 },
    { q: "Which continent is Egypt in?", options: ["Asia","Africa","Europe","South America"], answer: 1 },
    { q: "What color do you get by mixing red and white?", options: ["Pink","Purple","Orange","Brown"], answer: 0 },
    { q: "Which gas do humans exhale?", options: ["Oxygen","Carbon Dioxide","Nitrogen","Hydrogen"], answer: 1 },
    { q: "Which animal is known as the king of the jungle?", options: ["Tiger","Lion","Elephant","Bear"], answer: 1 },
    { q: "What is 15 / 3?", options: ["3","5","6","4"], answer: 1 },
    { q: "How many days are in a leap year?", options: ["365","366","364","360"], answer: 1 },
    { q: "What is the boiling point of water (°C)?", options: ["100","90","80","70"], answer: 0 },
    { q: "Which is the largest planet?", options: ["Earth","Mars","Jupiter","Saturn"], answer: 2 },
    { q: "Which language is primarily spoken in Brazil?", options: ["Spanish","Portuguese","French","English"], answer: 1 },
    { q: "What is the hardest natural substance?", options: ["Gold","Iron","Diamond","Silver"], answer: 2 },
    { q: "Which organ pumps blood in the body?", options: ["Liver","Heart","Kidney","Lungs"], answer: 1 },
    { q: "What is the first element on the periodic table?", options: ["Hydrogen","Oxygen","Helium","Carbon"], answer: 0 },
    { q: "Which is a mammal?", options: ["Shark","Dolphin","Octopus","Frog"], answer: 1 }
  ];

  const cardsContainer = $("#cards-container");
  const quizDiv = $("#quiz");
  const nextBtn = $("#nextBtn");
  const resultDiv = $("#result");
  let currentQuestion = null;
  let score = 0;
  let answered = {};

  // Create flashcards
  questions.forEach((q, index) => {
    const card = $(`<div class="flashcard" data-index="${index}">Card ${index + 1}</div>`);
    cardsContainer.append(card);
  });

  // Flashcard click event
  $(".flashcard").click(function() {
    const idx = $(this).data("index");

    // Highlight current card, blur others
    $(".flashcard").not(this).addClass("blur");
    $(this).removeClass("blur");

    currentQuestion = idx;
    showQuestion(idx);
  });

  function showQuestion(index) {
    const q = questions[index];
    let html = `<div class="quiz-question">${q.q}</div><div class="quiz-options">`;

    q.options.forEach((opt, i) => {
      const checked = answered[index] === i ? "checked" : "";
      html += `<label><input type="radio" name="option" value="${i}" ${checked}> ${opt}</label>`;
    });

    html += "</div>";
    quizDiv.html(html).show();
    nextBtn.show();
  }

  // Next button click
  nextBtn.click(function() {
    const selected = $('input[name="option"]:checked').val();
    if (selected === undefined) {
      alert("Select an answer!");
      return;
    }

    // Save answer
    answered[currentQuestion] = parseInt(selected);

    // Increase score if correct
    if (parseInt(selected) === questions[currentQuestion].answer) {
      score++;
    }

    // Mark card as answered
    $(`.flashcard[data-index="${currentQuestion}"]`).addClass("answered");

    // Hide quiz, reset blur for other cards
    quizDiv.hide();
    $(".flashcard").removeClass("blur");

    // Check if all questions answered
    if (Object.keys(answered).length === questions.length) {
      showResult();
    }
  });

  function showResult() {
    let html = `<h2>Your Score: ${score} / ${questions.length}</h2><p>Click any card to review answers.</p>`;
    resultDiv.html(html).show();

    $(".flashcard").click(function() {
      const idx = $(this).data("index");
      const q = questions[idx];
      let reviewHtml = `<div class="quiz-question">${q.q}</div><div class="quiz-options">`;
      q.options.forEach((opt, i) => {
        const isCorrect = i === q.answer;
        const isSelected = answered[idx] === i;
        const style = isCorrect ? "color:green;font-weight:bold;" : isSelected ? "color:red;" : "";
        reviewHtml += `<label style="${style}">${opt}</label>`;
      });
      reviewHtml += "</div>";
      quizDiv.html(reviewHtml).show();
    });
  }
});