export class DateUtils {

    static formatDate(date) {
        const formattedDate = new Date(date);
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
        return formattedDate.toLocaleDateString('en-GB', options);
    }
}