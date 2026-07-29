const calculatorForm = document.querySelector("#calculator-form");
const priceInputs = [...document.querySelectorAll("input[data-multiplier]")];
const clearButton = document.querySelector("#clear-button");

const currencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function calculateField(input) {
  const output = document.querySelector(`#${input.dataset.output}`);
  const error = document.querySelector(`#error-${input.id.split("-").pop()}`);
  const rawValue = input.value.trim();

  if (rawValue === "") {
    error.textContent = "";
    output.value = currencyFormatter.format(0);
    output.textContent = output.value;
    return;
  }

  const price = Number(rawValue);
  const multiplier = Number(input.dataset.multiplier);

  if (!Number.isFinite(price) || price < 0) {
    error.textContent = "Enter a valid price of $0 or more.";
    output.value = currencyFormatter.format(0);
    output.textContent = output.value;
    return;
  }

  error.textContent = "";
  output.value = currencyFormatter.format(price * multiplier);
  output.textContent = output.value;
}

function clearCalculator() {
  priceInputs.forEach((input) => {
    input.value = "";
    calculateField(input);
  });
  priceInputs[0].focus();
}

priceInputs.forEach((input) => {
  input.addEventListener("input", () => calculateField(input));
});

calculatorForm.addEventListener("submit", (event) => event.preventDefault());
clearButton.addEventListener("click", clearCalculator);
