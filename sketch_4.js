
function setup() {
  noCanvas();
  const stoicResidenceHTML = generateStoicResidenceHTML();
  displayGeneratedPage(stoicResidenceHTML);
  const parsedData = crawlStoicResidenceHTML(stoicResidenceHTML);
  displayCrawlResults(parsedData);
}

// 住居風HTMLを生成（ストイックなスタイルとランダムな言葉を追加）
function generateStoicResidenceHTML() {
  const randomTitle = `Stoic Residence ${Math.floor(Math.random() * 1000)}`;
  const furnitureItems = [
    "Sofa", "Table", "Chair", "Lamp", "Bookshelf", 
    "Carpet", "Bed", "Wardrobe", "Mirror", "Plant"
  ];
  const moods = ["Calm", "Cozy", "Chaotic", "Minimal", "Bright", "Dark"];
  const randomWords = [
    "Existence", "Void", "Ephemeral", "Perception", "Solitude", 
    "Oblivion", "Form", "Flux", "Silence", "Edge"
  ];

  const randomRooms = Array.from({ length: 5 }, (_, i) =>
    `<div style="
      position: absolute;
      top: ${Math.random() * 80}vh;
      left: ${Math.random() * 80}vw;
      width: ${Math.random() * 20 + 10}vw;
      height: ${Math.random() * 20 + 10}vh;
      background: rgba(20, 20, 20, 0.9);
      border: ${Math.random() * 5 + 1}px solid rgba(255, 255, 255, 0.7);
      color: #fff;
      padding: 10px;
      box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.7);
    ">
      <h2>Room ${i + 1}</h2>
      <ul>
        ${Array.from({ length: Math.floor(Math.random() * 5 + 1) }, () =>
          `<li>${furnitureItems[Math.floor(Math.random() * furnitureItems.length)]}</li>`
        ).join("")}
      </ul>
      <p>Mood: ${moods[Math.floor(Math.random() * moods.length)]}</p>
    </div>`
  ).join("");

  const randomDecorations = Array.from({ length: 10 }, (_, i) =>
    `<span style="
      position: absolute;
      top: ${Math.random() * 90}vh;
      left: ${Math.random() * 90}vw;
      font-size: ${Math.random() * 1.5 + 1}em;
      color: rgba(255, 255, 255, 0.7);
      font-style: italic;
    ">
      ${randomWords[Math.floor(Math.random() * randomWords.length)]}
    </span>`
  ).join("");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <title>${randomTitle}</title>
      <style>
        body {
          position: relative;
          overflow: hidden;
          font-family: 'Courier New', Courier, monospace;
          background: linear-gradient(135deg, #2c3e50, #bdc3c7);
          height: 100vh;
          margin: 0;
          padding: 0;
          color: #fff;
        }
      </style>
    </head>
    <body>
      <h1 style="position: absolute; top: 5%; left: 5%; font-size: 2em; color: rgba(255, 255, 255, 0.8);">
        ${randomTitle}
      </h1>
      ${randomRooms}
      ${randomDecorations}
    </body>
    </html>
  `;
}

// 生成されたHTMLをiframeに表示
function displayGeneratedPage(html) {
  const iframe = document.getElementById("generated-page");
  iframe.srcdoc = html;
}

// ストイックな住居HTMLを解析
function crawlStoicResidenceHTML(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  const title = doc.querySelector("title")?.textContent || "No Title";
  const rooms = doc.querySelectorAll("div");
  const decorations = doc.querySelectorAll("span");
  const moods = Array.from(doc.querySelectorAll("p")).map(p => p.textContent.replace("Mood: ", "").trim());

  const moodCounts = moods.reduce((acc, mood) => {
    acc[mood] = (acc[mood] || 0) + 1;
    return acc;
  }, {});

  return {
    title,
    roomsCount: rooms.length,
    decorationsCount: decorations.length,
    moodCounts,
    predominantMood: Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0][0]
  };
}

// 解析結果を表示（住み心地と心境の評価を含む）
function displayCrawlResults(data) {
  const resultsDiv = document.getElementById("results");

  const poeticEvaluation = `
    A stoic dwelling emerges, defined by ${data.roomsCount} structured rooms 
    and ${data.decorationsCount} enigmatic words scattered like echoes.
    The predominant mood of "${data.predominantMood}" resonates 
    through the interplay of simplicity and profundity.
  `;

  resultsDiv.innerHTML = `
    <h2>Analysis Results:</h2>
    <p><strong>Title:</strong> ${data.title}</p>
    <p><strong>Room Count:</strong> ${data.roomsCount}</p>
    <p><strong>Decoration Count:</strong> ${data.decorationsCount}</p>
    <p><strong>Mood Breakdown:</strong> ${JSON.stringify(data.moodCounts)}</p>
    <p><strong>Predominant Mood:</strong> ${data.predominantMood}</p>
    <p><strong>Poetic Evaluation:</strong> ${poeticEvaluation}</p>
  `;
}
