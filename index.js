// chrome://extensions/
`use strict`;
let myLeads = [];
let oldLeads = [];
const collectedLinks = document.querySelector(`#collected-links`);
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const leadsFromLocalStorage = JSON.parse(localStorage.getItem(`myLeads`));
// const tabBtn = document.getElementById("tab-btn");
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
    <div class="list-div">
        <li class="link-li-el">
        ${(countNum += 1)}) <a target='_blank' href='${leads[i]}'>${leads[i]}
        </a>
        </li>
        <button>DELETE</button>
        </div>
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
$("#input-btn").click(function () {
  myLeads.push(inputEl.value);
  inputEl.value = "";
  if (inputEl.value === "") {
    disableBtn();
  }
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
});

// tab btn
// tabBtn.addEventListener("click", () => {
//   chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//     myLeads.push(tabs[0].url);
//     localStorage.setItem("myLeads", JSON.stringify(myLeads));
//     render(myLeads);
//   });
// });
$("#tab-btn").click(function () {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
  });
});

//Delete btn
$("#delete-btn").click(function () {
  localStorage.clear();
  myLeads = [];
  render(myLeads);
  collectedLinks.textContent = `You have no collected links yet:`;
  document.getElementById("input-btn").disabled = true;
});
