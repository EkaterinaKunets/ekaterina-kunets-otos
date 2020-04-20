const getPath = (HTMLelement) => {

    const hasPreviousChild = (childNumber, element) => {
        if (element.previousElementSibling === null) {
            return childNumber;
        }
        childNumber += 1;
        return hasPreviousChild(childNumber, element.previousElementSibling);
    };

    const getChildNumber = (element) => {
        let childNumber = 1;
        return hasPreviousChild(childNumber, element);
    };

    const addPath = (element, startSelector) => {
        if (element.tagName === 'BODY') {
            return `${element.tagName} ${startSelector}`;
        }
        const childNumber = getChildNumber(element);
        startSelector = `> ${element.tagName}:nth-child(${childNumber}) ${startSelector}`;
        return addPath(element.parentElement, startSelector);
    };

    const tag = HTMLelement.tagName;
    return (tag === 'HTML' || tag === 'BODY') ? tag : addPath(HTMLelement, '').toLowerCase();
};

console.log(`${getPath(document.querySelector('.page-header'))} path for .page-header` );
console.log(`${getPath(document.querySelector('.features-text'))} path for .features-text` );
console.log(`${getPath(document.querySelector('.promo'))} path for .promo` );
