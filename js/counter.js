// Countup Code 
var counters = document.querySelectorAll('.counter');
counters.forEach(function(counter) {
  var delay = parseInt(counter.getAttribute('data-delay'));
  var time = parseInt(counter.getAttribute('data-time'));

  function animateValue() {
    var start = 0;
    var end = parseInt(counter.innerText);
    var duration = time / delay;
    var range = end - start;
    var current = start;
    var increment = end > start ? 1 : -1;
    var stepTime = Math.abs(Math.floor(duration / range));

    var timer = setInterval(function() {
      current += increment;
      counter.innerText = current;
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }

  animateValue();

  // Countup
  var counters = document.querySelectorAll('.counter');
  counters.forEach(function(counter) {
    var delay = parseInt(counter.getAttribute('data-delay'));
    var time = parseInt(counter.getAttribute('data-time'));

    function animateValue() {
      var start = 0;
      var end = parseInt(counter.innerText);
      var duration = time / delay;
      var range = end - start;
      var current = start;
      var increment = end > start ? 1 : -1;
      var stepTime = Math.abs(Math.floor(duration / range));

      var timer = setInterval(function() {
        current += increment;
        counter.innerText = current;
        if (current === end) {
          clearInterval(timer);
        }
      }, stepTime);
    }

    animateValue();
  });

  // Countdown
  var counters = document.querySelectorAll('.cu-countdown');
  for (const counter of counters) {
    var countDownDate = new Date(counter.innerText).getTime();
  
    
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
    
      counter.innerHTML = daysHTML + "<div class='countdown-bottom'>" + hoursHTML + minutesHTML + secondsHTML +"</div>";

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
    
      counter.innerHTML = daysHTML + "<div class='countdown-bottom'>" + hoursHTML + minutesHTML + secondsHTML +"</div>";

    
      if (distance < 0) {
        clearInterval(x);
        counter.innerHTML = "DONE";
      }
    }, 1000);
  }
});
