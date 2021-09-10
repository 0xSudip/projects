console.log("Digital Clock");
updateTime=()=>{
    setInterval(() => {
    let clock = document.getElementById('clock');
    let date = new Date();

    // Extract hour,minutes and seconds from the dateS
    hour = date.getHours();
    minute = date.getMinutes();
    second = date.getSeconds();

    // Pad 0 if the minutes or seconds is less than 0
    minute = (minute < 10 ? '0' : "" )+ minute
    second = (second < 10 ? "0": "") + second; 
    
    // Convert railway clock to AM/PM Clock
    hour = (hour > 12) ? hour - 12 : hour;
    hour = (hour === 0) ? 12 : hour;

    timeofDay = (hour < 12) ? "AM" : "PM";
    clock.innerHTML = `${hour}:${minute}:${second} ${timeofDay}`;
    // time = date.toLocaleTimeString();
    // clock.innerHTML = time;
    // console.log(clock);
    },1000);
}
updateTime();