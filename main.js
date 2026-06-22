const cardsData = [
    { id: 1, image: "1.png" },
    { id: 2, image: "2.png" },
    { id: 3, image: "3.png" },
    { id: 4, image: "4.png" },
    { id: 5, image: "5.png" },
    { id: 6, image: "6.png" },

    {
        id: 7,
        image: "coin.png",
        name: "999,999,999 Coins",
        reward: true
    },

    {
        id: 8,
        image: "gp.png",
        name: "999,999,999 GP",
        reward: true
    }
];
const cardsContainer = document.getElementById("cardsContainer");

let selectedRewards = [];

/* GENERAR TARJETAS CON FOREACH */

cardsData.forEach(card => {

    const div = document.createElement("div");

    div.classList.add("card");

    div.innerHTML = `
  <img
    src="${card.image}"
    class="${card.reward ? 'reward-img' : ''}"
  >

  ${card.name ? `<h3>${card.name}</h3>` : ""}
`;

    div.addEventListener("click", () => {

        div.classList.toggle("selected");

        if (selectedRewards.includes(card)) {
            selectedRewards =
                selectedRewards.filter(item => item.id !== card.id);
        } else {
            selectedRewards.push(card);
        }

    });

    cardsContainer.appendChild(div);

});

/* SECTION 1 -> SECTION 2 */

document
    .getElementById("goSection2")
    .addEventListener("click", () => {

        if (selectedRewards.length === 0) {
            alert("Select at least one reward.");
            return;
        }

        showSection("section2");

    });

/* SECTION 2 -> SECTION 3 */

document
    .getElementById("goSection3")
    .addEventListener("click", () => {

        const user =
            document.getElementById("userId").value.trim();

        if (user === "") {
            alert("Enter Your ID");
            return;
        }

        showSection("section3");

        startLoading(user);

    });

/* LOADING */

function startLoading(user) {

    const fill =
        document.getElementById("loaderFill");

    const text =
        document.getElementById("loaderText");

    let progress = 1;

    const interval = setInterval(() => {

        progress++;

        fill.style.width = progress + "%";
        text.textContent = progress + "%";

        if (progress >= 100) {

            clearInterval(interval);

            setTimeout(() => {

                renderFinal(user);

            }, 200);

        }

    }, 15);

}

/* FINAL */

function renderFinal(user) {

    showSection("section4");

    document.getElementById("finalUser").innerHTML =
        `User ID: <span style="color:#00f0ff">${user}</span>`;

    const finalRewards =
        document.getElementById("finalRewards");

    finalRewards.innerHTML = "";

    selectedRewards.forEach(item => {

        const div = document.createElement("div");

        div.classList.add("card");

        div.innerHTML = `
  <img
    src="${item.image}"
    class="${item.reward ? 'reward-img' : ''}"
    alt="${item.name || ''}"
  >
  ${item.name ? `<h3>${item.name}</h3>` : ""}
`;
        finalRewards.appendChild(div);

    });

    startConfetti();

}

/* HOME */

document
    .getElementById("homeBtn")
    .addEventListener("click", () => {

        location.reload();

    });

/* CHANGE SECTION */

function showSection(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen =>
            screen.classList.remove("active")
        );

    document
        .getElementById(id)
        .classList.add("active");

}

/* CONFETTI */

function startConfetti() {

    const duration = 5000;

    const end = Date.now() + duration;

    (function frame() {

        confetti({
            particleCount: 5,
            spread: 360,
            startVelocity: 30,
            origin: {
                x: Math.random(),
                y: Math.random() - 0.2
            }
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }

    })();

}