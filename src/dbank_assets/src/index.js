import { Float64 } from "@dfinity/candid/lib/cjs/idl";
import {dbank} from "../../declarations/dbank";

window.addEventListener("load", async function () {
  updateBalance();
});

document.querySelector("form").addEventListener("submit", async function(event) {
  event.preventDefault();
  const button = event.target.querySelector("#submit-btn");

  const inputAmount = parseFloat(document.getElementById("input-amount").value);
  const withdrawAmount = parseFloat(document.getElementById("withdrawal-amount").value);

  if (document.getElementById("input-amount").value.length !=0) {
    button.setAttribute("disabled", true);

    await dbank.topUp(inputAmount);

    document.getElementById("input-amount").value = "";
    button.removeAttribute("disabled");
  }


  if (document.getElementById("withdrawal-amount").value.length != 0) {
    button.setAttribute("disabled", true);

    await dbank.withdraw(withdrawAmount);

    document.getElementById("withdrawal-amount").value = "";
    button.removeAttribute("disabled");
  }

  updateBalance();
});

document.querySelector("#compound").addEventListener("click", async function (event) {
  const button = document.querySelector("#compound");

  button.setAttribute("disabled", true);
  await dbank.compound();
  button.removeAttribute("disabled");

  updateBalance();
});

async function updateBalance() {
  const currentAmount = (await dbank.checkBalance()).toFixed(2);
  document.getElementById("value").innerText = currentAmount;
}