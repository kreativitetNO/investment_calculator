#include <chrono>
#include <cmath>
#include <iostream>
#include <thread>

double calculateFutureValue(double interest,
                            double monthlyPayment,
                            int periodCount);

int main()
{
    double const interest = 2.0/(100*12);
    double const target = 250'000.0;
    int const periodCount = 60;
    double const learningGradient = 1.5;

    double monthlyPayment = 2000;
    double calculatedValue = 0.0;
    double error = 0.0;
    
    do
    {
        calculatedValue = calculateFutureValue(interest, monthlyPayment, periodCount);
        error = std::abs(calculatedValue - target) / target;
        if (calculatedValue < target)
        {
            monthlyPayment += std::abs(monthlyPayment * error * learningGradient);
        }
        else
        {
            monthlyPayment -= std::abs(monthlyPayment * error * learningGradient);
        }
        std::cout << monthlyPayment << ": " << calculatedValue
                  << " (" << error << ")" << std::endl;
        
        using namespace std::chrono_literals;
        std::this_thread::sleep_for(500ms);
    } while (error > 0.0001);
}

double calculateFutureValue(double interest,
                            double monthlyPayment,
                            int periodCount)
{
    double futureValue = 0;
    for (int i = 0; i < periodCount; ++i)
    {
        futureValue += monthlyPayment;
        futureValue *= 1 + interest;
    }
    return futureValue;
}
