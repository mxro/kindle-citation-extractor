
const processItem = (item) => {
    const lines = item.trim().split('\r\n');
    if (lines.length < 3) {
        console.error('Not enought lines. Cannot parse:\n' + item);
        return undefined;
    }

    const firstLine = lines[0];

    const book = firstLine.split('(')[0].trim();

    var betweenBrackets = /\(([^)]+)\)/;
    let author = "";
    const authorMatch = betweenBrackets.exec(firstLine);
    if (authorMatch) {
        author = authorMatch[1];
    }

    const secondLine = lines[1];

    const details = secondLine.split('|');
    if (details.length < 3) {
        console.log(lines);
        console.error('Details not provided ['+details+']. Cannot parse:\n' + item);
        return undefined;
    }

    let page = details[0].split('- Your Highlight on ')[1];
    if (page) {
        page = page.trim();
    }
    let location = details[1];
    if (location) {
        location = location.trim();
    }

    let dateStr = details[2].split('Added on ')[1];
    let date;
    if (dateStr) {
        date = new Date(Date.parse(dateStr));
    }

    const remainder = lines.slice(3).join('\n').trim();

    const data = {
        book,
        author,
        quote: remainder,
        page,
        location,
        dateAdded: date,
    };

    return data;
}

exports.parser = (text) => {

    const items = text.split('==========');
    items.pop();

    return items.map((item) => processItem(item)).filter((data) => data !== undefined);

};
