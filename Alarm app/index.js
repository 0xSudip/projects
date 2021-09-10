console.log("Alarm Clock");

// Targeting Important tags 
TimerHours = document.getElementById('hours');
TimerMinutes = document.getElementById('minutes');

// Removing is-invalid from input tags
hoursClasses = TimerHours.classList;
minutesClasses = TimerMinutes.classList;
hoursClasses.remove("is-invalid");
minutesClasses.remove("is-invalid");
// console.log(hoursClasses,minutesClasses);

// Sound Function
playSound=()=>{
    audio = new Audio('Rick Astley Never Gonna Give You Up.mp3')
    audio.play();
}

// Start alarm
let start = document.getElementById('start')
let regex = /^[0-9]{1,2}/
TimerHours.addEventListener('blur',()=>{
if(regex.test(TimerHours.value) & TimerHours.value < 24){
    console.log("Right hour");
    hoursClasses.remove("is-invalid");
}
else{
    console.log("Wrong hour");
    hoursClasses.add("is-invalid");
}
})
TimerMinutes.addEventListener('blur',()=>{
if(regex.test(TimerMinutes.value) & TimerMinutes.value <= 60){
    console.log("Right Minute");
    hoursClasses.remove("is-invalid");
}
else{
    console.log("Wrong Minute");
    hoursClasses.add("is-invalid");
}
})
start.addEventListener('click',timer=()=>{
    //Setting Timer's date and time
    let currentTime = new Date();    
   
    //Timer's time
   let TimerSeconds = 0;
   let TimersTime = new Date();
   TimersTime.setHours(`${TimerHours.value}`);
   TimersTime.setMinutes(`${TimerMinutes.value}`);
   TimersTime.setSeconds(`${TimerSeconds}`);
   let milliseconds = TimersTime.getTime() - currentTime.getTime();
   console.log(TimersTime);
   console.log(currentTime);
   console.log(milliseconds);

   //Success message add and remove       
   successAlert = document.getElementById("successAlert");
   successAlertClasses = successAlert.classList;
   successAlertClasses.add("alert", "alert-success");
   successAlert.innerHTML = "Successfully alarm setted :)";
   setTimeout(()=>{
    successAlertClasses.remove("alert", "alert-success");
    successAlert.innerHTML = "";
   },3000)
   
   setTimeout(() => {
       playSound();
       alert("Wake up Bitch!!")   
   }, milliseconds);
});

// Stop alarm audio
let stop = document.getElementById('stop');
stop.addEventListener('click',pauseSound=()=>{
    audio.pause();
    audio.currentTime = 0;
})