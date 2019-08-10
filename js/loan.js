//Variables
const loanForm = document.getElementById('loan-form');
const rateFigure = document.querySelector('#rate');
const rateOutput = document.querySelector('#rate-output');
const years = document.querySelector('#months');
const yearsOutput = document.querySelector('#months-output');
const loanAmount = document.querySelector('#amount');
const monthlyPayable = document.querySelector('#monthly-payable');
const totalPayable = document.querySelector('#total-payable');
const resultsDiv = document.querySelector('#results');
const resetBtn = document.querySelector('#reset');


//Event listeners
loanForm.addEventListener('submit', getvalues);
if(resetBtn) {
    resetBtn.addEventListener('click', resetForm);
}

//Functions

//display rate % beside slider
rateOutput.innerHTML = rateFigure.value + ' %';
rateFigure.oninput = function showRate() {
    rateOutput.textContent = this.value + ' %';    
}

//display year value beside slider
yearsOutput.innerHTML = years.value + ' years';
years.oninput = function showMonths() {
    yearsOutput.textContent = this.value + ' years';
}

function getvalues(event) {
    event.preventDefault();
    //get values from inputs
    let principal;
    if( isFinite(loanAmount.value) ) {
        principal = parseFloat(loanAmount.value);        
    } else {
        displayError();
    }
    let rate = parseFloat(rateOutput.innerHTML) / 100 / 12;
    let lendTime = parseFloat(yearsOutput.innerHTML) * 12;
    if(resultsDiv) {
        resultsDiv.style.display ='none';
        monthlyPayments(principal, rate, lendTime);
    }
    monthlyPayments(principal, rate, lendTime);
}

function monthlyPayments(principal, rate, lendTime) {
    const x = Math.pow(1 + rate, lendTime);
    const monthly = (principal*x*rate)/(x-1);
    
    if( isFinite(monthly) ) {
        displayGif();
        monthlyPayable.value = `$${monthly.toFixed(2)}`;
        totalPayable.value = `$${(monthly * lendTime).toFixed(2)}`;
        displayResults();
    } else {
        displayError();   
    }
}

displayError = () => {
    const errorDisplay = document.querySelector('#error-display');
    errorDisplay.textContent = 'Please enter a valid amount';
    errorDisplay.style.display = 'block';
    
    setTimeout(function() {
        errorDisplay.style.display = 'none';
    }, 2700);

    //loanAmount.value = '';
}

displayGif = () => {
    imgGif = document.querySelector('img');
    imgGif.style.display = 'block';
    
    setTimeout(function() {
        imgGif.style.display = 'none';
    }, 2700);
}

displayResults = () => {
    setTimeout(function() {
        resultsDiv.style.display = 'block';        
    }, 2700);
}

function resetForm(event) {
    loanAmount.value = '';
    monthlyPayable.value = '';
    totalPayable.value = '';
    resultsDiv.style.display = 'none';
}

