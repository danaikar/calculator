// Helper function to convert 12-hour format to 24-hour format
function convertTo24Hour(hour, minute, am_pm) {
    if (am_pm === "PM" && hour !== 12) {
        hour += 12;
    } else if (am_pm === "AM" && hour === 12) {
        hour = 0; // Midnight case
    }
    return { hour, minute };
}

// Calculate hourly wage based on day and time
function calculateHourlyWage(day, hour) {
    let baseRate = 6.0;
    if (day === "Sunday") {
        baseRate *= 1.5; // 50% raise for Sunday
    }
    if (hour >= 22) {
        baseRate *= 1.25; // 25% raise for after 10 PM
    }
    return baseRate;
}

// Function to calculate the salary for a given day
function calculateDaySalary(day, startHour, startMinute, endHour, endMinute) {
    let totalEarnings = 0;
    while (startHour < endHour || (startHour === endHour && startMinute < endMinute)) {
        totalEarnings += calculateHourlyWage(day, startHour);
        startHour++; // Increment the hour
    }
    return totalEarnings;
}

function calculateSalary() {
    const form = document.getElementById("salary-form");
    const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    let totalSalary = 0;

    daysOfWeek.forEach(day => {
        const startHour = parseInt(form[`${day.toLowerCase()}_start_hour`].value) || 0;
        const startMinute = parseInt(form[`${day.toLowerCase()}_start_minute`].value) || 0;
        const startAMPM = form[`${day.toLowerCase()}_start_am_pm`].value;
        const endHour = parseInt(form[`${day.toLowerCase()}_end_hour`].value) || 0;
        const endMinute = parseInt(form[`${day.toLowerCase()}_end_minute`].value) || 0;
        const endAMPM = form[`${day.toLowerCase()}_end_am_pm`].value;

        const startTime = convertTo24Hour(startHour, startMinute, startAMPM);
        const endTime = convertTo24Hour(endHour, endMinute, endAMPM);

        if (startTime.hour !== 0 && endTime.hour !== 0) {
            totalSalary += calculateDaySalary(day, startTime.hour, startTime.minute, endTime.hour, endTime.minute);
        }
    });

    document.getElementById("result").innerHTML = `Total Salary for the week: ${totalSalary.toFixed(2)} euros`;
}
