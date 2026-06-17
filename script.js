const questions = [
  { q: "次の数列に入る数は？ 2, 4, 8, 16, ?", a: ["20", "24", "32", "36"], c: 2, v: ["2", "4", "8", "16", "?"] },
  { q: "仲間はずれはどれ？", a: ["円", "三角形", "正方形", "赤"], c: 3, v: ["circle", "triangle", "diamond", "stripes"] },
  { q: "3人が握手を1回ずつすると、握手は全部で何回？", a: ["2回", "3回", "4回", "6回"], c: 1, v: ["A-B", "A-C", "B-C"] },
  { q: "時計が3時15分のとき、長針と短針の角度に最も近いものは？", a: ["0度", "7.5度", "30度", "45度"], c: 1, v: ["3:15"] },
  { q: "次の文字列の規則に合うものは？ A, C, F, J, O, ?", a: ["S", "T", "U", "V"], c: 2, v: ["A", "C", "F", "J", "O", "?"] },
  { q: "すべてのネコは動物です。ミケはネコです。正しい結論は？", a: ["ミケは動物", "動物はすべてネコ", "ミケは鳥", "結論は出ない"], c: 0, v: ["猫", "→", "動物"] },
  { q: "1, 1, 2, 3, 5, 8, ? に入る数は？", a: ["11", "12", "13", "15"], c: 2, v: ["1", "1", "2", "3", "5", "8"] },
  { q: "正方形を対角線で2つに切ると、できる図形は？", a: ["円", "三角形", "五角形", "長方形"], c: 1, v: ["diamond"] },
  { q: "「本」が「読む」なら、「音楽」は？", a: ["見る", "聞く", "書く", "走る"], c: 1, v: ["本→読む", "音楽→?"] },
  { q: "9, 18, 36, 72, ? に入る数は？", a: ["96", "108", "126", "144"], c: 3, v: ["9", "18", "36", "72", "?"] },
  { q: "次のうち、面が最も多い立体は？", a: ["三角柱", "立方体", "四角錐", "円柱"], c: 1, v: ["立体"] },
  { q: "5個のリンゴを2人で同じ数ずつ分けると、1人あたり何個？", a: ["2個", "2.5個", "3個", "5個"], c: 1, v: ["5", "÷", "2"] },
  { q: "次の順番で90度ずつ回転する図形。次に来る向きは？", a: ["上", "右", "下", "左"], c: 0, v: ["↑", "→", "↓", "←", "?"] },
  { q: "暗号で CAT = DBU なら、DOG は？", a: ["EPH", "EQH", "FPI", "CNE"], c: 0, v: ["C→D", "A→B", "T→U"] },
  { q: "25の平方根として正しいものは？", a: ["3", "4", "5", "10"], c: 2, v: ["√25"] },
  { q: "4つの箱に3個ずつ玉があります。玉は全部で何個？", a: ["7個", "9個", "12個", "16個"], c: 2, v: ["3", "3", "3", "3"] },
  { q: "「昨日の明日」はいつ？", a: ["昨日", "今日", "明日", "明後日"], c: 1, v: ["昨日", "+", "1日"] },
  { q: "次の数列に入る数は？ 100, 90, 81, 73, ?", a: ["64", "66", "67", "70"], c: 1, v: ["-10", "-9", "-8", "-7"] },
  { q: "図形の角の数が増える順として正しいものは？", a: ["円→三角→四角", "三角→四角→五角", "四角→三角→五角", "五角→四角→三角"], c: 1, v: ["triangle", "diamond", "5"] },
  { q: "AさんはBさんより背が高く、BさんはCさんより背が高い。最も背が高いのは？", a: ["Aさん", "Bさん", "Cさん", "同じ"], c: 0, v: ["A", ">", "B", ">", "C"] }
];

let current = 0;
let selectedAnswers = [];

const startView = document.querySelector("#startView");
const quizView = document.querySelector("#quizView");
const resultView = document.querySelector("#resultView");
const startButton = document.querySelector("#startButton");
const retryButton = document.querySelector("#retryButton");
const backButton = document.querySelector("#backButton");
const questionCount = document.querySelector("#questionCount");
const progressFill = document.querySelector("#progressFill");
const questionText = document.querySelector("#questionText");
const answers = document.querySelector("#answers");
const visual = document.querySelector("#visual");
const iqScore = document.querySelector("#iqScore");
const resultTitle = document.querySelector("#resultTitle");
const resultCopy = document.querySelector("#resultCopy");
const nativeShare = document.querySelector("#nativeShare");
const xShare = document.querySelector("#xShare");
const lineShare = document.querySelector("#lineShare");

function show(view) {
  [startView, quizView, resultView].forEach(item => item.classList.add("hidden"));
  view.classList.remove("hidden");
}

function makeVisual(item) {
  if (["circle", "triangle", "diamond", "stripes"].includes(item)) {
    return `<div class="visual-card"><span class="visual-shape shape-${item}"></span></div>`;
  }
  return `<div class="visual-card">${item}</div>`;
}

function renderQuestion() {
  const item = questions[current];
  questionCount.textContent = `${current + 1} / ${questions.length}`;
  progressFill.style.width = `${(current / questions.length) * 100}%`;
  backButton.disabled = current === 0;
  questionText.textContent = item.q;
  visual.innerHTML = item.v.map(makeVisual).join("");
  answers.innerHTML = "";
  item.a.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = answer;
    if (selectedAnswers[current] === index) {
      button.classList.add("selected");
    }
    button.addEventListener("click", () => chooseAnswer(index));
    answers.appendChild(button);
  });
}

function chooseAnswer(index) {
  selectedAnswers[current] = index;
  current += 1;
  if (current >= questions.length) {
    renderResult();
  } else {
    renderQuestion();
  }
}

function goBack() {
  if (current === 0) return;
  current -= 1;
  renderQuestion();
}

function resultLevel(score) {
  if (score >= 130) return ["天才肌のひらめきタイプ", "抽象化と規則発見がかなり得意です。短時間で本質をつかむ力が目立ちました。"];
  if (score >= 115) return ["高い推理力のバランスタイプ", "数列、言語、図形のどれも安定しています。落ち着いて考えるほど強さが出るタイプです。"];
  if (score >= 100) return ["平均以上の着実タイプ", "基本的な論理処理がしっかりしています。焦らず整理すればさらに伸びそうです。"];
  return ["直感重視の感覚タイプ", "スピード感のある判断が持ち味です。図に書き出すと論理問題の正答率が上がりそうです。"];
}

function renderResult() {
  const correct = selectedAnswers.reduce((total, answer, index) => {
    return total + (answer === questions[index].c ? 1 : 0);
  }, 0);
  const ratio = correct / questions.length;
  const score = Math.round(82 + ratio * 58);
  const [title, copy] = resultLevel(score);
  const shareText = `IQテスト 5分でできる完全無料IQ診断で、私の推定IQは${score}でした！`;
  const shareUrl = window.location.href;
  const encodedText = encodeURIComponent(shareText);
  const encodedUrl = encodeURIComponent(shareUrl);

  progressFill.style.width = "100%";
  iqScore.textContent = score;
  resultTitle.textContent = title;
  resultCopy.textContent = `${copy} 正解数は${questions.length}問中${correct}問でした。`;
  xShare.href = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
  lineShare.href = `https://social-plugins.line.me/lineit/share?url=${encodedUrl}&text=${encodedText}`;
  nativeShare.onclick = async () => {
    if (navigator.share) {
      await navigator.share({ title: document.title, text: shareText, url: shareUrl });
    } else {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      nativeShare.textContent = "結果をコピーしました";
      setTimeout(() => nativeShare.textContent = "SNSでシェア", 1800);
    }
  };

  show(resultView);
}

startButton.addEventListener("click", () => {
  current = 0;
  selectedAnswers = [];
  renderQuestion();
  show(quizView);
});

backButton.addEventListener("click", goBack);

retryButton.addEventListener("click", () => {
  current = 0;
  selectedAnswers = [];
  renderQuestion();
  show(quizView);
});
