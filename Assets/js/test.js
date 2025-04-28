function evaluateQuiz() {
    let score = 0;
    
    //1es feladat
    if (parseFloat(document.getElementById("q1").value) >= 62 && parseFloat(document.getElementById("q1").value) <= 63) score++;
    //2es feladat
    if (document.getElementById("q2").value.includes("200")) score++;
    //3as feladat
    const q3 = document.querySelector('input[name="q3"]:checked');
    if (q3 && q3.value == "b") score++;
    //4es feladat
    const q4 = document.querySelector('input[name="q4"]:checked');
    if (q4.value == "b") score++;
    //5os feladat
    const q5 = document.getElementById("q5").value;
    if (q5 == "b") score++;

    document.getElementById("result").innerText = `Eredményed: ${score}/5 helyes válasz.`;
  }