const tree = document.getElementById('DOMTree');
const style = document.createElement('style');
const dateTree = tree.getAttribute('dateTree');

customElements.define('my-tree',
    class extends HTMLElement {
    constructor() {
        super();
    }
});

customElements.define('my-leaf',
    class extends HTMLElement {
    constructor() {
        super();
    }
});

tree.attachShadow({
    mode: 'open'
});

const createTreeElem = (tree, parent) => {
    const ul = document.createElement('my-tree');
    const li = document.createElement('my-leaf');
    li.appendChild(document.createTextNode(tree.id));
    ul.appendChild(li);
    parent.appendChild(ul);

    if (tree.items) {
        li.classList.add('parent');
        for (let i = 0; i < tree.items.length; i++) {
            createTreeElem(tree.items[i], li);
        }
    }
    li.classList.add('element');
    return parent;
};

const createTree = (dateTree) => createTreeElem(JSON.parse(dateTree), new DocumentFragment);

style.textContent = `my-tree {
                      display: block;
                      margin-left: 16px;
                    }
                    .parent,
                    .element{
                       display: list-item;
                    }`;
tree.shadowRoot.appendChild(style);
tree.shadowRoot.appendChild(createTree(dateTree));
