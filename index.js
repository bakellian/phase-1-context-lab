/* Your Code Here */

function createEmployeeRecord(array) {
    return { 
        firstName: array[0],
        familyName: array[1], 
        title: array[2], 
        payPerHour: array[3], 
        timeInEvents: [], 
        timeOutEvents: [], 
    }
}

function createEmployeeRecords(arrOfArrays) {
    return arrOfArrays.map(createEmployeeRecord)
}


function createTimeInEvent(dateStamp) {
    //short way:
    // const [date, hour] = dateStamp.split(" ")
    //long way
    const date = dateStamp.split(" ")[0];
    const time = dateStamp.split(" ")[1];
    const timeInEntry = {
      type: "TimeIn",
      hour: parseInt(time),
      date: date
    }
    this.timeInEvents.push(timeInEntry);
    return this;
  }

  function createTimeOutEvent(dateStamp) {
    const date = dateStamp.split(" ")[0];
    const time = dateStamp.split(" ")[1];
    const timeOutEntry = {
      type: "TimeOut",
      hour: parseInt(time),
      date: date
    }
    this.timeOutEvents.push(timeOutEntry);
    return this;
  }

  function hoursWorkedOnDate(targetDate) {
    const inEvent = this.timeInEvents.find(timeInEntry => timeInEntry.date === targetDate)
    const outEvent = this.timeOutEvents.find(timeOutEntry => timeOutEntry.date === targetDate)

    return(outEvent.hour - inEvent.hour) / 100
  }

  function wagesEarnedOnDate(targetDate) {
      return hoursWorkedOnDate.call(this, targetDate) * this.payPerHour
  }

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

 const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(empRecords => empRecords.firstName === firstName)
}

function calculatePayroll(empRecordsArray) {
    return empRecordsArray.reduce((total, rec) => {
        return total + allWagesFor.call(rec)
    }, 0)
}