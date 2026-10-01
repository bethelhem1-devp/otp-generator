const { useState, useEffect, useRef } = React;

export const OTPGenerator = () => {

const [otp, setOtp] = useState("");
const [timeLeft, setTimeleft]= useState(0);
const [isActive, setActivity] = useState(false);

function otpHandler() {
  
  setOtp(Math.floor(100000 + Math.random() * 900000)); //  generates 6-digit OTP
  
  setTimeleft(5);  //resets countdown                                  
  
  setActivity(true);       //disables button
}


useEffect(() => {
  let timer;
  if (isActive && timeLeft > 0) {
    timer = setInterval(() => {
      setTimeleft(prev => prev - 1);
    }, 1000);
  }

  if (timeLeft === 0 && isActive) {
    setActivity(false); // re-enable button
  }

  return () => clearInterval(timer); // cleanup
}, [isActive, timeLeft]);

  return ( 
  <div className="container">
  <h1 id="otp-title">OTP Generator</h1>
 <h2 id="otp-display">
  {otp ? otp : "Click 'Generate OTP' to get a code"}
</h2>

<p id="otp-timer" aria-live="polite">
  {timeLeft > 0 
    ? `Expires in: ${timeLeft} seconds` 
    : (otp ? "OTP expired. Click the button to generate a new OTP." : "")
  }
</p>

<button 
  id="generate-otp-button" 
  onClick={otpHandler} 
  disabled={isActive}>
  Generate OTP
</button>

  
  </div> 
  
  );
};
