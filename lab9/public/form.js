


  (function () {
    

    function palindrome(str) {

      if(!str)
      {
        throw 'Enter string'
      }
      else if(!str.trim().length>0)
      {
        throw 'Enter string without just spaces'
      }
        let origStr = str.replace(/[^0-9a-z]/gi, '').toLowerCase();  // Remove all non-alphanumeric characters in the string and turn the string into the lower case
        let len = origStr.length - 1;
        for (let i=0; i<len/2; i++) {   // Check elements on both sides of the string, use a for loop to move closer to the center of the string to check all the elements
          if (origStr[i] !== origStr[len-i]) {
            return false;
          }
        } return true;
      } 
    
  
    const check = document.getElementById("palindrome-form");
  
    if (check) {
      const string = document.getElementById("string");
      const ol = document.getElementById("attempts");
      check.addEventListener("submit", event => {
        event.preventDefault();
        try {
        
          const pal = palindrome(string.value);

          const errors= document.getElementById('error-container');
          errors.innerHTML=""
          const li = document.createElement("li");
          if (pal) {
            li.appendChild(document.createTextNode(`${string.value} is palindrome`));
            li.setAttribute("class", "is-palindrome");
          }
          else {
            li.appendChild(document.createTextNode(`${string.value} is not palindrome`));
            li.setAttribute("class", "not-palindrome");
          }
          ol.appendChild(li);
          string.value = "";
        } catch (e) {
          const errors= document.getElementById('error-container');
          errors.innerHTML=e
        }
      });
    }
  })();