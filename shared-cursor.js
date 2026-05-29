/* ============================================================
   Purple Peregrine — shared-cursor.js
   Handles the animated scissors cursor and confetti trail.
   Each page sets window.PP_CURSOR_COLOR and window.PP_CONFETTI
   before this script runs.
   ============================================================ */

(function() {
  const cursorEl = document.getElementById('site-cursor');
  const cursorSvg = document.getElementById('cursor-svg');
  const cursorG = document.getElementById('cursor-g');
  const cursorPath = document.getElementById('cursor-path');

  // Set cursor color from page config
  if (cursorPath && window.PP_CURSOR_COLOR) {
    cursorPath.setAttribute('fill', window.PP_CURSOR_COLOR);
  }

  const scPaths = [
    "M 214.8832,392.88124 C 213.6487,351.10144 192.4188,306.81849 151.2133,291.74442 124.2378,282.5742 92.4685,287.92207 90.4575,251.91109 76.6948,192.36961 65.7318,132.18954 51.8127,72.695 39.4648,46.6078 40.535,-51.7047 0.6983,-207.75 c -13.621,14.7397 -17.7326,200.0063 -14.5164,272.5398 -15.3032,28.0798 -8.258,113.55982 -23.3492,210.0048 -3.8938,32.71461 -41.7477,20.43878 -60.3525,38.15255 -44.0113,30.71139 -50.5531,94.37019 -31.2324,141.02386 15.9428,35.27857 61.4503,59.15221 97.5362,38.36748 42.9756,-20.06987 52.4825,-72.48508 48.4413,-115.16713 -6.9013,-28.59832 -13.7438,-57.36829 -2.6276,-86.26001 5.1649,-16.25131 7.8294,-48.82214 12.8467,-56.27239 9.0186,33.08779 25.5753,64.20235 30.8527,98.13343 -4.7972,28.88996 -5.2245,58.6576 4.0555,86.86484 9.033,45.57671 62.0423,81.53294 106.4604,60.54992 32.0848,-15.61392 48.4238,-52.77583 46.0702,-87.30591 z m -25.1994,-0.44041 c 4.4186,32.42715 -21.4514,71.62555 -57.0411,66.05268 -42.6586,-7.91717 -59.2413,-60.62059 -48.5494,-98.33732 6.7516,-31.15254 45.5418,-51.65329 73.1732,-32.52716 21.8624,13.61616 31.4284,40.10025 32.4173,64.8118 z m -196.3326,5.06143 c 2.3117,33.0479 -17.5032,75.09011 -55.1263,74.94116 -35.1936,-1.49618 -55.2632,-38.63037 -53.0197,-70.72062 -1.8119,-33.53315 23.1599,-73.03612 60.4974,-68.62124 29.8497,4.9459 47.8069,35.91883 47.6486,64.4007 z",
    "m 529.824,-194.4682 c -17.6322,49.3031 -31.3609,95.0692 -42.3559,135.3984 -12.5535,-39.8712 -28.05,-85.0692 -47.584,-133.6494 -13.059,21.6365 20.1677,233.7133 17.5599,244.3381 l -2.1688,-0.065 c -6.415,45.0751 -8.7411,130.39903 -20.0537,202.10009 -3.8938,32.71461 -41.7482,20.43955 -60.353,38.15332 -44.0113,30.71139 -50.5526,94.36977 -31.232,141.02344 15.9429,35.27857 61.4493,59.15192 97.5352,38.36719 42.9756,-20.06987 52.4836,-72.48543 48.4424,-115.16748 -6.9013,-28.59832 -13.7443,-57.36854 -2.628,-86.26026 5.1649,-16.25131 7.8294,-48.82172 12.8467,-56.27197 9.0186,33.08779 25.5751,64.2032 30.8526,98.13428 -4.7972,28.88996 -5.2254,58.65653 4.0547,86.86377 9.0329,45.57671 62.0423,81.5338 106.4604,60.55078 32.0849,-15.61392 48.4245,-52.77607 46.0708,-87.30615 C 686.0368,329.96111 664.8074,285.67777 623.6019,270.6037 596.6263,261.43348 564.857,266.78118 562.846,230.7702 550.3633,176.76565 542.0498,127.84736 524.2005,51.5539 l -2.8633,-0.092 c -3.7862,-13.1651 22.6072,-224.4661 8.4868,-245.9298 z m 77.6895,493.58934 c 7.6278,0.28091 15.2333,2.58516 22.1411,7.3667 21.8625,13.61616 31.4281,40.10046 32.417,64.81201 4.4186,32.42715 -21.4513,71.6256 -57.041,66.05273 -42.6586,-7.91717 -59.2412,-60.61969 -48.5493,-98.33642 5.0637,-23.36441 28.149,-40.73775 51.0322,-39.89502 z M 411.2376,311.6353 c 2.2335,-0.055 4.519,0.0493 6.8526,0.32519 29.8497,4.9459 47.8082,35.91852 47.6499,64.40039 2.3117,33.0479 -17.5034,75.09036 -55.1265,74.94141 -35.1937,-1.49618 -55.2635,-38.62948 -53.02,-70.71973 -1.6986,-31.43733 20.1421,-68.12228 53.644,-68.94726 z",
    "m 825.2696,-105.6028 c 42.5938,136.6978 109.032,240.77678 177.9844,341.95604 -7.281,11.34069 -14.7863,22.74225 -22.9454,34.41503 -15.3189,32.65217 -42.79,15.8232 -71.2382,14.25147 -43.8535,-1.41165 -80.0899,31.73348 -96.8438,70.02685 -15.0835,31.15051 -13.8105,71.72571 10.1177,98.19581 53.3309,57.63959 151.3208,3.7576 166.4619,-84.01319 17.0346,-26.47357 34.5056,-52.29964 52.0635,-77.96631 17.5578,25.66667 35.0288,51.49274 52.0635,77.96631 15.1411,87.77079 113.131,141.65278 166.4619,84.01319 23.9282,-26.4701 25.2011,-67.0453 10.1176,-98.19581 -16.7539,-38.29337 -52.9902,-71.4385 -96.8437,-70.02685 -28.4482,1.57173 -55.9194,18.4007 -71.2383,-14.25147 -8.159,-11.67278 -15.6643,-23.07434 -22.9453,-34.41503 68.9523,-101.17926 135.3891,-205.25824 177.9829,-341.95604 -101.4546,127.3477 -158.2275,200.579 -173.3584,224.56931 -16.4678,20.80195 -29.9878,40.053 -42.2402,58.56885 -12.2525,-18.51585 -25.7724,-37.7669 -42.2403,-58.56885 C 983.4985,94.9762 926.7242,21.7449 825.2696,-105.6028 Z m 76.8047,420.70018 c 27.305,1.87359 48.4015,30.96425 43.6977,58.45605 -4.1731,38.98017 -39.2445,81.67279 -81.772,73.07959 -35.0947,-8.12684 -44.4482,-54.1522 -28.2348,-82.58057 10.1494,-22.55277 28.9179,-43.54627 54.2842,-48.00878 4.097,-0.92728 8.1241,-1.21395 12.0249,-0.94629 z m 277.5908,0 c 3.9007,-0.26766 7.9279,0.019 12.0249,0.94629 25.3663,4.46251 44.1333,25.45601 54.2827,48.00878 16.2134,28.42837 6.8613,74.45373 -28.2334,82.58057 -42.5275,8.5932 -77.5989,-34.09942 -81.772,-73.07959 -4.7038,-27.4918 16.3928,-56.58246 43.6978,-58.45605 z",
    "m 529.824,-194.4682 c -17.6322,49.3031 -31.3609,95.0692 -42.3559,135.3984 -12.5535,-39.8712 -28.05,-85.0692 -47.584,-133.6494 -13.059,21.6365 20.1677,233.7133 17.5599,244.3381 l -2.1688,-0.065 c -6.415,45.0751 -8.7411,130.39903 -20.0537,202.10009 -3.8938,32.71461 -41.7482,20.43955 -60.353,38.15332 -44.0113,30.71139 -50.5526,94.36977 -31.232,141.02344 15.9429,35.27857 61.4493,59.15192 97.5352,38.36719 42.9756,-20.06987 52.4836,-72.48543 48.4424,-115.16748 -6.9013,-28.59832 -13.7443,-57.36854 -2.628,-86.26026 5.1649,-16.25131 7.8294,-48.82172 12.8467,-56.27197 9.0186,33.08779 25.5751,64.2032 30.8526,98.13428 -4.7972,28.88996 -5.2254,58.65653 4.0547,86.86377 9.0329,45.57671 62.0423,81.5338 106.4604,60.55078 32.0849,-15.61392 48.4245,-52.77607 46.0708,-87.30615 C 686.0368,329.96111 664.8074,285.67777 623.6019,270.6037 596.6263,261.43348 564.857,266.78118 562.846,230.7702 550.3633,176.76565 542.0498,127.84736 524.2005,51.5539 l -2.8633,-0.092 c -3.7862,-13.1651 22.6072,-224.4661 8.4868,-245.9298 z m 77.6895,493.58934 c 7.6278,0.28091 15.2333,2.58516 22.1411,7.3667 21.8625,13.61616 31.4281,40.10046 32.417,64.81201 4.4186,32.42715 -21.4513,71.6256 -57.041,66.05273 -42.6586,-7.91717 -59.2412,-60.61969 -48.5493,-98.33642 5.0637,-23.36441 28.149,-40.73775 51.0322,-39.89502 z M 411.2376,311.6353 c 2.2335,-0.055 4.519,0.0493 6.8526,0.32519 29.8497,4.9459 47.8082,35.91852 47.6499,64.40039 2.3117,33.0479 -17.5034,75.09036 -55.1265,74.94141 -35.1937,-1.49618 -55.2635,-38.62948 -53.02,-70.71973 -1.6986,-31.43733 20.1421,-68.12228 53.644,-68.94726 z"
  ];
  const scViewboxes = ["0 0 354.14407 707.8291","0 0 354.14355 673.4068","0 0 477.05582 582.75037","0 0 354.14355 673.4068"];
  const scTransforms = ["translate(139.03787,207.75)","translate(-333.35076,194.4682)","translate(-802.34177,105.6028)","translate(-333.35076,194.4682)"];

  let scIdx = 0, mouseMoving = false;
  let mouseMoveTimer = null, snipInterval = null;
  let lastX = null, lastY = null, currentAngle = 0;

  function updateCursor(x, y) {
    if (lastX !== null) {
      const dx = x - lastX, dy = y - lastY;
      if (Math.sqrt(dx*dx+dy*dy) > 3) {
        currentAngle = Math.atan2(dy, dx) * (180/Math.PI) + 90;
      }
    }
    lastX = x; lastY = y;
    cursorEl.style.left = x + 'px';
    cursorEl.style.top = y + 'px';
    cursorEl.style.transform = `translate(-12px,-8px) rotate(${currentAngle}deg)`;
  }

  document.addEventListener('mousemove', function(e) {
    updateCursor(e.clientX, e.clientY);
    cursorEl.style.opacity = '1';
    if (mouseMoving && Math.random() < 0.4) spawnSnippet(e.clientX, e.clientY);
    if (!mouseMoving) {
      mouseMoving = true;
      snipInterval = setInterval(() => {
        scIdx = (scIdx+1) % scPaths.length;
        cursorSvg.setAttribute('viewBox', scViewboxes[scIdx]);
        cursorG.setAttribute('transform', scTransforms[scIdx]);
        cursorPath.setAttribute('d', scPaths[scIdx]);
      }, 200);
    }
    clearTimeout(mouseMoveTimer);
    mouseMoveTimer = setTimeout(() => {
      mouseMoving = false;
      clearInterval(snipInterval);
      snipInterval = null;
      scIdx = 0;
      cursorSvg.setAttribute('viewBox', scViewboxes[0]);
      cursorG.setAttribute('transform', scTransforms[0]);
      cursorPath.setAttribute('d', scPaths[0]);
    }, 150);
  });

  document.addEventListener('mouseleave', () => { cursorEl.style.opacity = '0'; lastX = null; lastY = null; });
  document.addEventListener('mouseenter', () => { cursorEl.style.opacity = '1'; });

  // Flip cards open Etsy link on click
  document.querySelectorAll('.flip-card').forEach(card => {
    card.addEventListener('click', function(e) {
      if (!e.target.closest('.flip-back-link')) {
        const link = this.querySelector('.flip-back-link');
        if (link) window.open(link.href, '_blank');
      }
    });
  });

  // Mouse click confetti
  document.addEventListener('mousedown', e => {
    if (!e.target.closest('a') && !e.target.closest('button') && !e.target.closest('.flip-card'))
      spawnConfetti(e.clientX, e.clientY);
  });

  // Touch confetti (mobile)
  document.addEventListener('touchend', e => {
    if (!e.target.closest('a') && !e.target.closest('button')) {
      const touch = e.changedTouches[0];
      spawnConfetti(touch.clientX, touch.clientY);
    }
  });

  // Spawn a single confetti piece — shape defined per-page in PP_CONFETTI
  function makeConfettiEl(x, y) {
    const conf = window.PP_CONFETTI || {};
    const colors = conf.colors || ['#ffffff','#cccccc','#aaaaaa'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = conf.size || 28;
    const actualSize = size + Math.random() * (conf.sizeVariance || 18);
    const el = document.createElement('div');
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;pointer-events:none;z-index:9998;`;
    el.innerHTML = (conf.makeSvg || defaultConfettiSvg)(actualSize, color);
    return el;
  }

  function defaultConfettiSvg(size, color) {
    return `<svg width="${size}" height="${size}" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" fill="${color}" opacity="0.9"/></svg>`;
  }

  function spawnSnippet(x, y) {
    const el = makeConfettiEl(x, y);
    document.body.appendChild(el);
    const angle = Math.random() * Math.PI * 2;
    const dist = 40 + Math.random() * 100;
    el.animate([
      {transform:'translate(0,0) rotate(0deg)', opacity:1},
      {transform:`translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) rotate(${Math.random()*360}deg)`, opacity:0}
    ], {duration:1000+Math.random()*600, easing:'ease-out'}).onfinish = () => el.remove();
  }

  function spawnConfetti(x, y) {
    const count = window.PP_CONFETTI && window.PP_CONFETTI.burstCount || 6;
    for (let i = 0; i < count; i++) {
      const el = makeConfettiEl(x, y);
      document.body.appendChild(el);
      const angle = Math.random() * Math.PI * 2;
      const dist = 60 + Math.random() * 130;
      el.animate([
        {transform:'translate(0,0) rotate(0deg)', opacity:1},
        {transform:`translate(${Math.cos(angle)*dist}px,${Math.sin(angle)*dist}px) rotate(${Math.random()*360}deg)`, opacity:0}
      ], {duration:900+Math.random()*500, easing:'ease-out'}).onfinish = () => el.remove();
    }
  }

  // Fade-up on scroll
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); } });
  }, {threshold: 0.05});
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

})();
