function luhnChk(luhn) {
    var len = luhn.length,
        mul = 0,
        prodArr = [[0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [0, 2, 4, 6, 8, 1, 3, 5, 7, 9]],
        sum = 0;
 
    while (len--) {
        sum += prodArr[mul][parseInt(luhn.charAt(len), 10)];
        mul ^= 1;
    }
 
    return sum % 10 === 0 && sum > 0;
};

 function getCreditCardType(accountNumber)
      {

        //start without knowing the credit card type
        var result = "unknown";

        //first check for MasterCard
        if (/^(?:5[1-5][0-9]{14})$/.test(accountNumber))
        {
          result = "mastercard";
        }

        //then check for Visa
        //else if (/^4/.test(accountNumber))
        else if (/^(?:4[0-9]{12}(?:[0-9]{3})?)$/.test(accountNumber))
        {
          result = "visa";
        }

        //then check for AmEx
        else if (/^(?:3[47][0-9]{13})$/.test(accountNumber))
        {
          result = "amex";
        }

         //then check for Discover
        else if (/^(?:6(?:011|5[0-9][0-9])[0-9]{12})$/.test(accountNumber))
        {
          result = "discover";
        }

           //then check for Dinners
        else if (/^(?:3(?:0[0-5]|[68][0-9])[0-9]{11})$/.test(accountNumber))
        {
          result = "dinner";
        }

           //then check for JCB
        else if (/^(?:(?:2131|1800|35\d{3})\d{11})$/.test(accountNumber))
        {
          result = "jcb";
        }

        return result;
      }

      function handleEvent(event)
        {
          var value   = event.target.value, 
              y,   
              type    = getCreditCardType(value),
              check    = luhnChk(value);

           if(check == true)
           {
             console.log(check);
                switch (type)
          {
            case "mastercard":
                y = 'master';
                break;

            case "visa":
                //show Visa icon
                y = 'visa';
                break;

            case "amex":
                //show American Express icon
                y = 'american';
                break;

            case "discover":
                //show American Express icon
                y = 'discover';
                break;

           case "dinner":
                //show American Express icon
                y = 'dinner';
                break;

           case "jcb":
                //show American Express icon
                y = 'jcb';
                break;

            default:
                //clear all icons?
                //show error?
                var clear = document.getElementsByClassName('card');

                  for (var i = 0; i < clear.length; i ++) {
                      clear[i].style.display = 'none';
                  }

          }
          document.getElementById(y).style.display = 'block';
           }else{
              var clear = document.getElementsByClassName('card');

                  for (var i = 0; i < clear.length; i ++) {
                      clear[i].style.display = 'none';
                  }
           }
       
        }

        // or window.onload
        document.addEventListener("DOMContentLoaded", function(){
          var textbox = document.getElementById("card_number");
          textbox.addEventListener("keyup", handleEvent, false);
          textbox.addEventListener("blur", handleEvent, false);
        }, false);