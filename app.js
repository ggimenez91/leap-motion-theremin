var Leap = require('leapjs');

var context;
window.addEventListener('load', init, false);

function init() {
  // Init audio context
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();

  // Create oscillator, the sound generator
  var oscillatorNode = context.createOscillator();

  // Create volume node
  var gainNode = context.createGain();
  gainNode.gain.value = 1;

  // Oscillator -> Gain -> Destination
  oscillatorNode.connect(gainNode);
  oscillatorNode.start();

  gainNode.connect(context.destination);

  // Set the volume (left hand) and the oscillator's frequency
  var rightHand;
  var leftHand;
  Leap.loop(function(frame){
    if (frame.hands[0] && frame.hands[1]){
      if (frame.hands[0].type = 'right') {
        rightHand = frame.hands[0];
        leftHand = frame.hands[1];
      } else {
        rightHand = frame.hands[1];
        leftHand = frame.hands[0];
      }
      oscillatorNode.frequency.value = rightHand.palmPosition[1];
      gainNode.gain.value = leftHand.palmPosition[1]/200;
    }
  });
 }
