function calculateSalary() {
    const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
    let totalSalary = 0;

    days.forEach(day => {
        const startHour = parseInt(document.querySelector(`input[name="${day}_start_hour"]`).value);
        const startMinute = parseInt(document.querySelector(`input[name="${day}_start_minute"]`).value) || 0;
        const startAmPm = document.querySelector(`select[name="${day}_start_am_pm"]`).value;

        const endHour = parseInt(document.querySelector(`input[name="${day}_end_hour"]`).value);
        const endMinute = parseInt(document.querySelector(`input[name="${day}_end_minute"]`).value) || 0;
        const endAmPm = document.querySelector(`select[name="${day}_end_am_pm"]`).value;

        if (isNaN(startHour) || isNaN(endHour)) return; // Skip if the user left inputs empty

        const startTime = convertTo24Hour(startHour, startMinute, startAmPm);
        const endTime = convertTo24Hour(endHour, endMinute, endAmPm);

        const isSunday = (day === "sunday");
        totalSalary += calculateDailyWage(startTime, endTime, isSunday);
    });

    document.getElementById('result').innerText = `Total Weekly Salary: €${totalSalary.toFixed(2)}`;
}

function convertTo24Hour(hour, minute, amPm) {
    if (amPm === "PM" && hour !== 12) hour += 12;
    if (amPm === "AM" && hour === 12) hour = 0;
    return hour * 60 + minute;
}

function calculateDailyWage(startTime, endTime, isSunday) {
    let salary = 0;
    const hourlyRate = 6;
    const after10pmRate = 7.5;
    const sundayRate = hourlyRate * 1.5;

    // Handle shifts that go past midnight
    if (endTime <= startTime) endTime += 24 * 60;

    for (let time = startTime; time < endTime; time += 60) {
        let currentHour = Math.floor((time / 60) % 24);

        // After 10 PM
        if (currentHour >= 22 || currentHour < 6) {
            salary += after10pmRate;
        } else {
            salary += (isSunday) ? sundayRate : hourlyRate;
        }
    }

    return salary;
}
