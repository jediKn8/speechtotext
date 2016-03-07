var recognition = new webkitSpeechRecognition();
var recognizing;
var interim_transcript = '';
var final_transcript = '';
recognition.continuous = true;
recognition.interimResults = true;

recognition.onresult = function(event) {
    
    for (var i = event.resultIndex; i < event.results.length; ++i)
    {
        if (event.results[i].isFinal) 
        {
            final_transcript += event.results[i][0].transcript;
        } 
        else{
            interim_transcript += event.results[i][0].transcript;
        }
    }
    
    var final_span = document.getElementById("final_span");
    var interim_span = document.getElementById("interim_span");
    
    final_transcript = capitalize(final_transcript);
    final_span.innerHTML = linebreak(final_transcript);
    interim_span.innerHTML = linebreak(interim_transcript);
    
}; 

function listen(event){ 
    recognition.lang = "en-IN";
    recognition.start();
    recognizing = true;
}

var two_line = /\n\n/g;
var one_line = /\n/g;

function linebreak(s) {
    return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}
                
var first_char = /\S/;
        
function capitalize(s) {
    return s.replace(first_char, function(m) { return m.toUpperCase(); });
}
        
function stopbutton(){
    if (recognizing) {
    recognizing = false;
    recognition.stop();
  }
}