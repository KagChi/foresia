export function timeSince(dateString: string | Date) {
    // Create a Date object from the input string
    const then = new Date(dateString);

    // Get the current time in milliseconds
    const now = new Date().getTime();

    // Calculate the difference in milliseconds
    const delta = now - then.getTime();

    // Handle invalid date input
    if (isNaN(delta)) {
        return "Invalid date";
    }

    // Calculate seconds, minutes, hours, days, etc.
    const seconds = Math.floor(delta / 1000) % 60;
    const minutes = Math.floor(delta / (1000 * 60)) % 60;
    const hours = Math.floor(delta / (1000 * 60 * 60)) % 24;
    const days = Math.floor(delta / (1000 * 60 * 60 * 24));

    // Choose the most appropriate unit based on the time difference
    let unit;
    let value;
    if (days > 0) {
        unit = "d";
        value = days;
    } else if (hours > 0) {
        unit = "hr";
        value = hours;
    } else if (minutes > 0) {
        unit = "min";
        value = minutes;
    } else {
        unit = "sec";
        value = seconds;
    }

    // Format the output with the bullet point and appropriate unit
    return `${value} ${unit} ago`;
}
