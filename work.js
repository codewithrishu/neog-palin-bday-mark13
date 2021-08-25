var bday = document.querySelector('#birthday')
var palinBtn = document.querySelector('#bday-check')
var outputBox = document.querySelector('#output-box')


//function to reverse the string
function reverseString(str) {

    return str.split('').reverse().join('')

    
}

//function to check palindrom
function checkPlaindrom(str) {

    var reversedStr = reverseString(str)
     return str === reversedStr
    
}

//function to change to string | adding '0' or tostring
function numberToString(date) {


    var datestr = {day:'',month:'',year:''}
    if(date.day<10){
        datestr.day = '0' + date.day
    }else{
        datestr.day = date.day.toString()
    }
     if(date.month<10){
        datestr.month = '0' + date.month
    }else{
        datestr.month = date.month.toString()
    }

    datestr.year = date.year.toString()

    return datestr



    
}

//function to get all formates of date
function giveVariations(str) {

    var datestry = numberToString(str)
    var ddmmyyyy = datestry.day + datestry.month + datestry.year;
    var mmddyyyy = datestry.month + datestry.day + datestry.year ;
    var yyyymmdd = datestry.year + datestry.month + datestry.day ;
    var ddmmyy = datestry.day + datestry.month +  datestry.year.slice(-2);
    var mmddyy = datestry.month + datestry.day + datestry.year.slice(-2);
    var yymmdd = datestry.year.slice(-2)+datestry.month + datestry.day ;
    return [ddmmyyyy,mmddyyyy,yyyymmdd,ddmmyy,mmddyy,yymmdd]
    


    
}

//to check palindrom for all formates
function checkPalindromeForAllDateFormats(str){
   // console.log(str)
       
      var flag = false;
        var getallformateslist = giveVariations(str)

        for(var i=0;i<getallformateslist.length;i++){
            if(checkPlaindrom(getallformateslist[i])){
                flag = true;
                break;
            }
        
        }

       return flag;
}

//check leap year used to get next date
function leapyear(year) {
    if(year % 400 === 0){
    return true;
  }
  if(year % 100 === 0){
    return false;
  }
  if(year % 4 === 0){
    return true;
  }
  return false;
}

//to get next date
function nextDate(str) {
    if(str.month === 12){
        if(str.day === 31){
            str.day = 1
            str.month =1
            str.year = str.year + 1
        }else{
           str.day = str.day + 1 
        }
    }
    else if(str.month === 02){
                if(leapyear(str.year)){
                    if(str.day === 29){
                        str.day = 1
                        str.month = str.month +1
                    }
                    else{
                        str.day = str.day + 1
                    }
                }
                else{
                    if(str.day === 28){
                       str.day = 1
                        str.month = str.month +1 
                    }else{
                         str.day = str.day + 1
                    }
                    
                }

    }
    else{
        if(str.month === 01 || 03 || 05 || 07 || 08 || 10 ){
        if(str.day === 31){
            str.day = 1
            str.month = str.month + 1
        }
        else{
           
            str.day = str.day + 1
        }
     }

    }
   
return str
    
}

//find  nearest palin date
function checkForOtherPalinDates(str1) {
    
    var otherDate = nextDate(str1)
    
    
    var count = 0
    while(1){
        count = count+1;
        //console.log(count)
        var nextPalinDate = checkPalindromeForAllDateFormats(otherDate)
        if(nextPalinDate){
            break;
        }
        else{
            otherDate = nextDate(otherDate)
        }
    }
   
    return[count,otherDate]
    
}


function  clickHandler() 
{   
    var bdayDate = bday.value
    if(bdayDate == ""){
         outputBox.innerText = "please enter  date"
    }
  else{
      //outputBox.innerText = ""
    var dateList = bdayDate.split('-')
    date={
            day:Number(dateList[2]),
            month:Number(dateList[1]),
            year :Number(dateList[0])
        }
        
    if(checkPalindromeForAllDateFormats(date)){
         outputBox.innerText = "processing.."
         setTimeout(() => {
                  outputBox.innerText = "yupee...your birthday is palindrom !"
           },2000);
        
    }
    else{
        
       var[ctr,otherclosedate]  = checkForOtherPalinDates(date)
       outputBox.innerText = "processing.."
       if(ctr > 1){
           
           setTimeout(() => {
                 outputBox.innerText = `you missed it by ${ctr} days, nearest date is ${otherclosedate.day}/${otherclosedate.month}/${otherclosedate.year}`
           },2000);
         
       }else{
            setTimeout(() => {
                   outputBox.innerText = `you missed it by ${ctr} day, nearest date is ${otherclosedate.day}/${otherclosedate.month}/${otherclosedate.year}`
           },2000);
         
       }
        
    }
  }
}

palinBtn.addEventListener('click',clickHandler )

