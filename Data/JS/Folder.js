// Fetch dữ liệu từ tệp JSON
fetch('./File/Files.json')
    .then(response => response.json())
    .then(jsonData => {
        // Convert JSON to HTML
        const htmlString = convertJSONtoHTML(jsonData);
        const containerElement = document.getElementById("Folder");
        containerElement.innerHTML = htmlString;
    })
    .catch(error => {
        console.error('Lỗi khi tải dữ liệu từ tệp JSON:', error);
    });

// Function to convert JSON to HTML
function convertJSONtoHTML(jsonData) {
    const folderData = {};

    jsonData.forEach(item => {
        const folderName = item["Tên Folder"];

        if (!folderData[folderName]) {
            folderData[folderName] = [];
        }

        folderData[folderName].push(item);
    });

    const container = document.createElement("div");

    for (const folderName in folderData) {
        const folderItems = folderData[folderName];

        const folderDiv = document.createElement("div");
        folderDiv.className = "Folders";

        const h1 = document.createElement("h1");
        h1.textContent = folderName;

        folderDiv.appendChild(h1);

        folderItems.forEach(item => {
            if (item["Type"] === "Link") {
                const linkA = document.createElement("a");
                linkA.href = item["Link"];

                const linkButton = document.createElement("button");
                linkButton.textContent = item["Tên"];

                const span = document.createElement("span");
                span.textContent = item["Tên Phụ"];

                linkButton.appendChild(span);
                linkA.appendChild(linkButton);
                folderDiv.appendChild(linkA);
            } else if (item["Type"] === "Copy") {
                const copyButton = document.createElement("button");
                copyButton.setAttribute("onclick", `Copy('${item["Link"]}')`);

                const span = document.createElement("span");
                span.textContent = item["Tên Phụ"];

                const buttonContent = document.createTextNode(`${item["Tên"]} `);
                copyButton.appendChild(buttonContent);
                copyButton.appendChild(span);
                folderDiv.appendChild(copyButton);
            }
        });

        container.appendChild(folderDiv);
    }

    return container.innerHTML;
}
