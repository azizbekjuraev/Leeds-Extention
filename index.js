// chrome://extensions/
`use strict`;
let myLeads = [];
let oldLeads = [];
const collectedLinks = document.querySelector(`#collected-links`);
const inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem(`myLeads`));
const tabBtn = document.getElementById("tab-btn");
//const inputName = document.getElementById("input-name");

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

function render(leads) {
  let listItems = "";
  let countNum = 0;

  for (let i = 0; i < leads.length; i++) {
    listItems += `
        <li>
        ${(countNum += 1)} <a target='_blank' href='${leads[i]}'>${leads[i]}
        </a>
        </li>
        `;
  }

  if (countNum === 1) {
    collectedLinks.textContent = `You have collected: ${countNum} link!`;
  } else if (countNum > 1) {
    collectedLinks.textContent = `You have collected: ${countNum} links!`;
  }
  ulEl.innerHTML = listItems;
}

// disabling and enabling buttons
function disableBtn() {
  document.getElementById("input-btn").disabled = true;
}
function enableBtn() {
  document.getElementById("input-btn").disabled = false;
}
disableBtn();
inputEl.addEventListener(`keyup`, () => {
  enableBtn();
});

// save btn
inputBtn.addEventListener("click", function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  if (inputEl.value === "") {
    disableBtn();
  }
  localStorage.setItem(`myLeads`, JSON.stringify(myLeads));
  render(myLeads);
});

// tab btn
tabBtn.addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

// render() <----!
//Delete btn
deleteBtn.addEventListener("click", () => {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
  collectedLinks.textContent = `You have collected:`;
  document.getElementById("input-btn").disabled = true;
});
