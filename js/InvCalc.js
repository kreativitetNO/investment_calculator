(() => {

    function calculateFutureValue(interest,
                                 monthlyPayment,
                                 periodCount)
    {
        var futureValue = 0
        for (var i = 0; i < periodCount; ++i)
        {
            futureValue += monthlyPayment
            futureValue *= 1 + interest
        }
        return futureValue
    }

    function iterateCalculations()
    {
        const learningGradient = 1.5
        var interest = parseFloat(document.querySelector('#fldInterest').value)
        var periodCount = parseInt(document.querySelector('#fldPeriodCount').value)
        var target = parseFloat(document.querySelector('#fldTarget').value)
        var outputDiv = document.querySelector('#output')
        var monthlyPayment = 2000
        var calculatedValue = 0
        var error = 0

        do
        {
            calculatedValue = calculateFutureValue(interest, monthlyPayment, periodCount)
            error = Math.abs(calculatedValue - target) / target
            if (calculatedValue < target)
            {
                monthlyPayment += Math.abs(monthlyPayment * error * learningGradient)
            }
            else
            {
                monthlyPayment -= Math.abs(monthlyPayment * error * learningGradient)
            }
            outputDiv.innerHTML += "Monthly payment <i>" + monthlyPayment.toFixed(2) + "</i> will result in <i>" + calculatedValue.toFixed(2) + "</i> after <em>" + periodCount + "</em><br>"
        } while (error > 0.001)
    }

    
    var btnCalc = document.querySelector('#btnCalc')
    btnCalc.addEventListener('click', iterateCalculations)
})();