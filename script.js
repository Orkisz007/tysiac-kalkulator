const body = document.querySelector("body");
const modeToggle = document.getElementById("Toggle");
const keyboard = document.querySelectorAll("#Keyboard button");
const output = document.getElementById("Output");
let plus = true;
let values = [];
const signIndicator = document.getElementsByClassName("signIndicator");
const plusButtonIndicator = signIndicator.item(0);
const minusButtonIndicator = signIndicator.item(1);

modeToggle.addEventListener("click", () => {
    body.classList.toggle("lightMode");
    body.classList.toggle("darkMode");
})

for (let button of keyboard) {
    button.addEventListener("click", () => {
        keyboardPress(button);
    });
}

function keyboardPress(button) {
    if (button.value) {
        if (output.value === "") {
            if (plus) output.value += button.value;
            else output.value += `- ${button.value}`;
        }
        else {
            if (plus) output.value += ` + ${button.value}`;
            else output.value += ` - ${button.value}`;
        }
        values.push(plus ? button.value : button.value * -1);
    }
    else if (button.id === "Plus") {
        signChange(true);
    }
    else if (button.id === "Minus")
        signChange(false);
    else if (button.id === "Clear") {
        values = [];
        output.value = "";
    }
    else if (button.id === "Backspace") {
        values.pop();
        const regExp = /\s\W\s\d+$/;
        output.value = output.value.replace(regExp, "");
    }
    else if (button.id === "Calculate") {
        let score = 0;
        for (let value of values) {
            score += parseInt(value);
        }
        output.value = (score < 0) ? `- ${score * -1}` : score;
    }
    output.scrollLeft = output.scrollWidth;
}

function signChange(toPlus) {
    if (toPlus) {
        plusButtonIndicator.classList.toggle("inactive", false);
        minusButtonIndicator.classList.toggle("inactive", true);
    }
    else {
        plusButtonIndicator.classList.toggle("inactive", true);
        minusButtonIndicator.classList.toggle("inactive", false);
    }
    plus = toPlus;
}