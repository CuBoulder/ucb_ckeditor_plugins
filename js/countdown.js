// Countdown
var hourglasses = document.querySelectorAll('.ucb-countdown');
for (const hourglass of hourglasses) {
  var countDownDate = new Date(hourglass.innerText).getTime();
  var endDate = new Date(countDownDate);

  
    var now = new Date().getTime();
    var distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var daysHTML = "<div class='countdown-days'><span class = 'countdown-value'>" + days + "</span><span class = 'countdown-label'> Days</span></div>";
    if( days == 1) {
      var daysHTML = "<div class='countdown-days'><span class = 'countdown-value'>" + days + "</span><span class = 'countdown-label'> Day</span></div>";
    } 
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var hoursHTML = "<div class='countdown-hours'><span class = 'countdown-value'>" + hours + "</span><span class = 'countdown-label'> Hours</span></div>";
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var minutesHTML = "<div class='countdown-minutes'><span class = 'countdown-value'>" + minutes + "</span><span class = 'countdown-label'> Minutes</span></div>";
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var secondsHTML = "<div class='countdown-seconds'><span class = 'countdown-value'>" + seconds + "</span><span class = 'countdown-label'> Seconds</span></div>";
    var srOnlyCountdown = document.createElement("div");
    srOnlyCountdown.classList.add('sr-only');
    srOnlyCountdown.innerHTML = "It is " + days + " days until " + endDate.toDateString();

    hourglass.innerHTML = daysHTML + "<div class='countdown-bottom'>" + hoursHTML + minutesHTML + secondsHTML + "</div>";
    hourglass.after(srOnlyCountdown);


  setInterval(function() {
    var now = new Date().getTime();
    var distance = countDownDate - now;
  
    // Time calculations for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var daysHTML = "<div class='countdown-days'><span class = 'countdown-value'>" + days + "</span><span class = 'countdown-label'> Days</span></div>";
    if( days == 1) {
      var daysHTML = "<div class='countdown-days'><span class = 'countdown-value'>" + days + "</span><span class = 'countdown-label'> Day</span></div>";
    } 
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var hoursHTML = "<div class='countdown-hours'><span class = 'countdown-value'>" + hours + "</span><span class = 'countdown-label'> Hours</span></div>";
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var minutesHTML = "<div class='countdown-minutes'><span class = 'countdown-value'>" + minutes + "</span><span class = 'countdown-label'> Minutes</span></div>";
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    var secondsHTML = "<div class='countdown-seconds'><span class = 'countdown-value'>" + seconds + "</span><span class = 'countdown-label'> Seconds</span></div>";
  
    hourglass.innerHTML = daysHTML + "<div class='countdown-bottom'>" + hoursHTML + minutesHTML + secondsHTML +"</div>";

  
    if (distance < 0) {
      clearInterval(x);
      hourglass.innerHTML = "DONE";
    }
  }, 1000);
}