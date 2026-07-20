let selectedCards = [];

// Ir a sección 2
function goToCards() {
    document.getElementById("section1").classList.remove("active");
    document.getElementById("section2").classList.add("active");

    const cardsContainer = document.getElementById("cardsContainer");
    cardsContainer.innerHTML = "";
    selectedCards = [];

    // Cartas normales (1-6)
    for (let i = 1; i <= 6; i++) {
        let card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `<img src="${i}.png" alt="card ${i}">`;
        card.onclick = () => toggleSelect(card, `card${i}`);
        cardsContainer.appendChild(card);
    }

    // ✨ Últimas 3 cartas: FC Point → Coin → Gem
    const specialCards = [
        { img: "coin.png", amount: 100000, label: "Coins" },
        { img: "gp.png", amount: 100000, label: "GP" },
/*         { img: "epoints.png", amount: 100000, label: "ePoints" } */
    ];

    specialCards.forEach(item => {
        let card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
    <img src="${item.img}" alt="${item.label}">
    <div style="color: #ffff00;font-size:18px;margin-top:6px;font-weight:bold;">
      ${item.amount} ${item.label}
    </div>
  `;

        // Guardamos tipo + imagen
        card.onclick = () =>
            toggleSelect(card, `${item.amount} ${item.label}|${item.img}`);

        cardsContainer.appendChild(card);
    });

}

// Selección múltiple
function toggleSelect(card, cardName) {
    if (card.classList.contains("selected")) {
        card.classList.remove("selected");
        selectedCards = selectedCards.filter(c => c !== cardName);
    } else {
        card.classList.add("selected");
        selectedCards.push(cardName);
    }
}

// Ir a sección 3
function goToSearching() {
    if (selectedCards.length === 0) {
        alert("Please select at least one card.");
        return;
    }

    document.getElementById("section2").classList.remove("active");
    document.getElementById("section3").classList.add("active");

    const playerID = document.getElementById("playerID").value;
    document.getElementById("searchingPlayer").innerText = "ID: " + playerID;

    let dots = 0;
    const loadingText = document.getElementById("loadingText");
    const interval = setInterval(() => {
        dots = (dots + 1) % 4;
        loadingText.innerText = "Loading" + ".".repeat(dots);
    }, 400);

    setTimeout(() => {
        clearInterval(interval);
        document.getElementById("section3").classList.remove("active");
        document.getElementById("section4").classList.add("active");

        const finalCards = document.getElementById("finalCards");
        finalCards.innerHTML = "";

        selectedCards.forEach(c => {
            let cardDiv = document.createElement("div");
            cardDiv.classList.add("card", "selected");

            // 🔥 Recompensas especiales: Coins / GP / ePoints
            if (c.includes("|")) {

                const [amountText, imgName] = c.split("|");

                cardDiv.innerHTML = `
      <img src="${imgName}" alt="reward">
      <div style="color: #ffff00;font-size:18px;margin-top:6px;font-weight:bold;">
        ${amountText}
      </div>
    `;

            } else {
                // Cartas normales
                let num = c.replace("card", "");
                cardDiv.innerHTML = `<img src="${num}.png" alt="${c}">`;
            }

            finalCards.appendChild(cardDiv);
        });


        launchConfetti();
    }, 1500);
}

// Reinicio
function restart() {
    document.getElementById("section4").classList.remove("active");
    document.getElementById("section1").classList.add("active");
    document.getElementById("playerID").value = "";
}

// 🎉 Confetti
function launchConfetti() {
    const duration = 2000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);
        const particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}
