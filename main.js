// getting all elements
const budgetForm = document.getElementById("budgetForm");
const expenseForm = document.getElementById("expenseForm");
const budgetInput = document.getElementById("budgetInput");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
let totalBudget = document.getElementById("totalBudget");
let remainingBudget = document.getElementById("remainingBudget");
const expenseList = document.getElementById("expenseList");
const alert = document.getElementById("alert");

let budget = 0;
let remainig = 0;
let amount = 0;

const saveToLocal = () => {
  localStorage.setItem("budget", budget);
  localStorage.setItem("remaining", remainig);
  localStorage.setItem("expenses", expenseList.innerHTML);
};

budgetForm.addEventListener("submit", (event) => {
  event.preventDefault();

  budget = Number(budgetInput.value);
  remainig = budget;

  totalBudget.innerHTML = budget;
  remainingBudget.innerHTML = remainig;

  saveToLocal();
  budgetInput.value = "";
});

expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();

  expenseTitle = expenseName.value;
  amount = Number(expenseAmount.value);
  if (amount > remainig) {
    alert.classList.remove("hidden");
    return;
  }

  alert.classList.add("hidden");
  remainig -= amount;
  remainingBudget.innerHTML = remainig;

  let displayDiv = document.createElement("div");
  displayDiv.innerHTML = `
        <span> ${expenseTitle}</span>
        <span> ${amount} </span>
    `;
  displayDiv.className =
    "flex justify-between border border-red-300 bg-red-50 rounded-lg p-3";
  expenseList.appendChild(displayDiv);
  saveToLocal();
  expenseAmount.value = "";
  expenseName.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
  savedBudget = localStorage.getItem("budget");
  savedRemaining = localStorage.getItem("remaining");
  savedExpenses = localStorage.getItem("expenses");

  if (savedBudget) {
    totalBudget.innerHTML = savedBudget;
  }
  if (savedRemaining) {
    remainingBudget.innerHTML = savedRemaining;
  }
  if (savedExpenses) {
    expenseList.innerHTML = savedExpenses;
  }
});
