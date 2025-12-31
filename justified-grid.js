function buildJustifiedGrid(container, albumId, imageCount) {
  const containerWidth = container.clientWidth;
  const targetRowHeight = 240;
  const margin = 8;

  let row = [];
  let rowAspectRatio = 0;

  for (let i = 1; i <= imageCount; i++) {
    const img = new Image();
    img.src = `images/${albumId}/${i}.jpg`;

    img.onload = () => {
      const aspectRatio = img.width / img.height;
      row.push({ img, aspectRatio, index: i });
      rowAspectRatio += aspectRatio;

      const rowWidth = targetRowHeight * rowAspectRatio + margin * (row.length - 1);

      if (rowWidth >= containerWidth) {
        renderRow(container, row, containerWidth, margin, albumId);
        row = [];
        rowAspectRatio = 0;
      }
    };
  }
}

function renderRow(container, row, containerWidth, margin, albumId) {
  const rowDiv = document.createElement("div");
  rowDiv.className = "justified-row";

  const totalAspectRatio = row.reduce((sum, img) => sum + img.aspectRatio, 0);
  const rowHeight =
    (containerWidth - margin * (row.length - 1)) / totalAspectRatio;

  row.forEach((item, idx) => {
    const link = document.createElement("a");
    link.href = `viewer.html?album=${albumId}&img=${item.index}`;

    const img = document.createElement("img");
    img.src = item.img.src;
    img.style.height = `${rowHeight}px`;
    img.style.width = `${rowHeight * item.aspectRatio}px`;

    link.appendChild(img);
    rowDiv.appendChild(link);
  });

  container.appendChild(rowDiv);
}