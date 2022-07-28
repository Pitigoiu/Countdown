const inputContainer=document.getElementById('input-container');
const countdownForm=document.getElementById('countdownForm');
const dateEl=document.getElementById('date-picker');

const countdownEl=document.getElementById('countdown');
const countdownElTitle=document.getElementById('countdown-title');
const countdownBtn=document.getElementById('countdown-button');
const timeElement=document.querySelectorAll('span');

const completeEl=document.getElementById('complete');
const completeElInfo=document.querySelector('.complete-info');
const completeBtn=document.getElementById('complete-button');

let countdownTitle='';
let countdowndate='';
let countdownValue=Date;
let countdownActive;

const second=1000;
const minute=second*60;
const hour=minute*60;
const day=hour*24;

// Set Date Input
const today=new Date().toISOString().split("T")[0];
dateEl.setAttribute('min',today);

function updateDOM(){
    countdownActive=setInterval((()=>{
        const now=new Date().getTime();
        const distance=countdownValue-now;
        const days=Math.floor(distance/day);
        const hours=Math.floor((distance%day)/hour);
        const minutes=Math.floor((distance%hour)/minute);
        const seconds=Math.floor((distance%minute)/second);

        inputContainer.hidden=true;
        countdownEl.hidden=false;
        
        if(distance<0){
            countdownEl.hidden=true;
            clearInterval(countdownActive);
            completeElInfo.textContent=`${countdownTitle} finished on ${countdowndate}`;
            completeEl.hidden=false;
        }else{
        countdownElTitle.textContent=`${countdownTitle}`;
        timeElement[0].textContent=`${days}`;  
        timeElement[1].textContent=`${hours}`;  
        timeElement[2].textContent=`${minutes}`;  
        timeElement[3].textContent=`${seconds}`;   
        completeEl.hidden=true;
        countdownEl.hidden=false;
    }   
    }
    ),second);

}

function updateCountdown(e){
    e.preventDefault();
    countdownTitle=e.srcElement[0].value;
    countdowndate=e.srcElement[1].value;
    let savedCountdown={
        title:countdownTitle,
        date:countdowndate,
    };
    localStorage.setItem('countdown',JSON.stringify(savedCountdown));
    // Get number version
    countdownValue=new Date(countdowndate).getTime();
    updateDOM();
}

function reset(){
    countdownEl.hidden=true;
    completeEl.hidden=true;
    inputContainer.hidden=false;
    clearInterval(countdownActive);
    countdownTitle='';
    countdowndate='';
    localStorage.removeItem('countdown');
}
function restorePreviousCountdown(){
    // Get countdown from localStodage
    if(localStorage.getItem('countdown')){
        inputContainer.hidden=true;
        savedCountdown=JSON.parse(localStorage.getItem('countdown'));
        countdownTitle=savedCountdown.title;
        countdowndate=savedCountdown.date;
        countdownValue=new Date(countdowndate).getTime();
        updateDOM();
    }
}

countdownForm.addEventListener('submit',updateCountdown);
countdownBtn.addEventListener('click',reset);
completeBtn.addEventListener('click',reset);

restorePreviousCountdown();