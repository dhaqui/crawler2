
function setup() {
  noCanvas();
  const ninetiesResidenceHTML = generateNinetiesResidenceHTML();
  displayGeneratedPage(ninetiesResidenceHTML);
  const parsedData = crawlNinetiesResidenceHTML(ninetiesResidenceHTML);
  displayCrawlResults(parsedData);
}

// 90年代風住居HTMLを生成
function generateNinetiesResidenceHTML() {
  const randomTitle = `90s Residence ${Math.floor(Math.random() * 1000)}`;
  const furnitureItems = [
    "Bean Bag", "Futon", "Boombox", "Lava Lamp", "CRT TV", 
    "VHS Player", "Neon Clock", "Retro Console", "Disco Ball", "Plastic Chair"
  ];
  const moods = ["Groovy", "Funky", "Neon", "Vibrant", "Radical", "Gnarly"];
  const randomWords = [
    "Tubular", "Radical", "Awesome", "Wicked", "Retro", 
    "Dude", "Far Out", "Chill", "Boom", "Zap"
  ];

  const randomRooms = Array.from({ length: 5 }, (_, i) =>
    `<div style="
      position: absolute;
      top: ${Math.random() * 80}vh;
      left: ${Math.random() * 80}vw;
      width: ${Math.random() * 20 + 10}vw;
      height: ${Math.random() * 20 + 10}vh;
      background: linear-gradient(${Math.random() * 360}deg, 
        rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}),
        rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}));
      border: ${Math.random() * 5 + 1}px solid rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255});
      color: rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255});
      padding: 10px;
      box-shadow: 4px 4px 15px rgba(0, 0, 0, 0.5);
      font-family: 'Comic Sans MS', cursive, sans-serif;
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
      color: rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255});
      text-shadow: 2px 2px rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7);
      font-family: 'Impact', Charcoal, sans-serif;
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
          font-family: 'Comic Sans MS', cursive, sans-serif;
          background: linear-gradient(45deg, #ff8a00, #e52e71, #9b51e0, #4ecca3);
          background-size: 400% 400%;
          animation: gradientBG 10s ease infinite;
          height: 100vh;
          margin: 0;
          padding: 0;
          color: #fff;
        }
        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      </style>
    </head>
    <body>
      <h1 style="position: absolute; top: 5%; left: 5%; font-size: 2.5em; color: #fff; text-shadow: 4px 4px 10px rgba(0, 0, 0, 0.5);">
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

// 90年代風住居HTMLを解析
function crawlNinetiesResidenceHTML(html) {
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
    A radical throwback emerges, bursting with ${data.roomsCount} vibrant rooms and 
    ${data.decorationsCount} gnarly words. The mood "${data.predominantMood}" dominates 
    this neon oasis, echoing the spirit of the 90s.
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
