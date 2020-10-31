var NumarkDJ2Go2Touch = {};

// The button that enables/disables scratching
NumarkDJ2Go2Touch.wheelTouch = function (channel, control, value, status, group) {
    var deckNumber = script.deckFromGroup(group);
    if ((status & 0xF0) === 0x90) {    // If button down
  //if (value === 0x7F) {  // Some wheels send 0x90 on press and release, so you need to check the value
        var alpha = 1.0/8;
        var beta = alpha/32;
        engine.scratchEnable(deckNumber, 128, 33+1/3, alpha, beta);
    } else {    // If button up
        engine.scratchDisable(deckNumber);
    }
}
 
// The wheel that actually controls the scratching
NumarkDJ2Go2Touch.wheelTurn = function (channel, control, value, status, group) {
    // --- Choose only one of the following!
 
    // A: For a control that centers on 0:
    var newValue;
    if (value < 64) {
        newValue = value;
    } else {
        newValue = value - 128;
    }
 
    // B: For a control that centers on 0x40 (64):
    //var newValue = value - 64;
 
    // --- End choice
 
    // In either case, register the movement
    var deckNumber = script.deckFromGroup(group);
    if (engine.isScratching(deckNumber)) {
        engine.scratchTick(deckNumber, newValue); // Scratch!
    } else {
        engine.setValue(group, 'jog', newValue); // Pitch bend
    }
}
