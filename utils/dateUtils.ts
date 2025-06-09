
export default function formatEventDate(dateString: string): string{
    const date = new Date(dateString);
    const month = date.toLocaleDateString("default", {month: '2-digit'});
    const day = date.getDate();
    const year = date.getFullYear();
    return `${day}/${month}/${year}`
}