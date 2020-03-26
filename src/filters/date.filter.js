export default function dateFilter(value,format = "date") {
    console.log(value)
    if (format.includes('date')){
        options.day = '2-digit';
        options.month = 'long';
        options.year = 'numeric'
    }
    if (format.includes('time')){
        options.hour = '2-digit';
        options.minutes = '2-digit';
        options.seconds = '2-digit'
    }
    const options = {};
    return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}