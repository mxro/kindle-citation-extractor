
const processItem = (item) => {
    const lines = item.trim().split('\n');
    if (lines.length < 3) {
        console.error('Not enought lines. Cannot parse:\n' + item);
        return undefined;
        //throw new Error('Cannot parse');
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

    let date;
    let page;
    let location;
    // details format 1
    if (details.length === 3) {

        page = details[0].split('- Your Highlight on ')[1];
        if (page) {
            page = page.trim();
        }
        location = details[1];
        if (location) {
            location = location.trim();
        }

        let dateStr = details[2].split('Added on ')[1];
        if (dateStr) {
            date = new Date(Date.parse(dateStr));
        }

    } else if (details.length === 2) {

        page = undefined;
        location = details[0].split('- Your Highlight on Location ')[1];

        let dateStr = details[1].split('Added on ')[1];
        if (dateStr) {
            date = new Date(Date.parse(dateStr));
        }
    } else {
        console.error('Unknown format. Cannot parse location: ', details);
        return undefined;
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
