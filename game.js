/* ─────────────────────────────────────────────
   Data Quality Duel
   game.js
───────────────────────────────────────────── */

'use strict';

// ─── SVG art generator ────────────────────────────────────────────────────────
// Each operator gets a unique orbital-mechanics SVG illustration

const CARD_ART = {
  value: `<svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="90" cy="45" rx="70" ry="30" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
    <ellipse cx="90" cy="45" rx="45" ry="18" fill="none" stroke="rgba(255,255,255,0.3)" stroke-width="1"/>
    <circle cx="90" cy="45" r="5" fill="#F59E0B"/>
    <circle cx="158" cy="43" r="4" fill="#10B981"/>
    <line x1="90" y1="15" x2="90" y2="75" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
    <line x1="20" y1="45" x2="160" y2="45" stroke="rgba(255,255,255,0.15)" stroke-width="0.5"/>
  </svg>`,

  column: `<svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="90" cy="45" rx="72" ry="32" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
    <ellipse cx="90" cy="45" rx="52" ry="22" fill="none" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
    <ellipse cx="90" cy="45" rx="32" ry="13" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1"/>
    <circle cx="90" cy="45" r="4" fill="#F59E0B"/>
    <circle cx="90" cy="13" r="3" fill="#10B981"/>
    <circle cx="90" cy="32" r="3" fill="#3B82F6"/>
    <circle cx="162" cy="44" r="3" fill="#8B5CF6"/>
  </svg>`,

  check: `<svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="90" cy="45" rx="70" ry="28" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1"/>
    <ellipse cx="90" cy="45" rx="70" ry="28" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1" transform="rotate(40 90 45)"/>
    <ellipse cx="90" cy="45" rx="70" ry="28" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1" transform="rotate(80 90 45)"/>
    <ellipse cx="90" cy="45" rx="70" ry="28" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="1" transform="rotate(120 90 45)"/>
    <circle cx="90" cy="45" r="4" fill="#F59E0B"/>
    <circle cx="160" cy="45" r="3" fill="#EF4444"/>
    <circle cx="45" cy="25" r="2.5" fill="#10B981"/>
    <circle cx="130" cy="20" r="2.5" fill="#3B82F6"/>
    <circle cx="60" cy="68" r="2.5" fill="#8B5CF6"/>
  </svg>`,

  threshold: `<svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="15" y1="25" x2="165" y2="25" stroke="#10B981" stroke-width="1.5" stroke-dasharray="4 3"/>
    <line x1="15" y1="65" x2="165" y2="65" stroke="#EF4444" stroke-width="1.5" stroke-dasharray="4 3"/>
    <rect x="15" y="25" width="150" height="40" fill="rgba(16,185,129,0.07)"/>
    <ellipse cx="90" cy="45" rx="60" ry="18" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
    <circle cx="90" cy="45" r="4" fill="#F59E0B"/>
    <circle cx="148" cy="42" r="3.5" fill="#F59E0B"/>
    <text x="170" y="29" fill="#10B981" font-size="8" font-family="monospace">MAX</text>
    <text x="170" y="69" fill="#EF4444" font-size="8" font-family="monospace">MIN</text>
  </svg>`,

  interval: `<svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="70" cy="45" rx="52" ry="26" fill="none" stroke="rgba(255,255,255,0.5)" stroke-width="1"/>
    <ellipse cx="115" cy="45" rx="52" ry="26" fill="none" stroke="rgba(139,92,246,0.6)" stroke-width="1" stroke-dasharray="5 3"/>
    <circle cx="20" cy="43" r="3.5" fill="#10B981"/>
    <circle cx="122" cy="19" r="3.5" fill="#8B5CF6"/>
    <line x1="90" y1="15" x2="90" y2="75" stroke="rgba(255,255,255,0.2)" stroke-width="1" stroke-dasharray="3 2"/>
    <text x="52" y="82" fill="rgba(255,255,255,0.5)" font-size="8" font-family="monospace">TODAY</text>
    <text x="92" y="82" fill="rgba(139,92,246,0.8)" font-size="8" font-family="monospace">-7d</text>
  </svg>`,

  table: `<svg viewBox="0 0 180 90" xmlns="http://www.w3.org/2000/svg">
    <line x1="30" y1="20" x2="30" y2="70" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    <line x1="90" y1="20" x2="90" y2="70" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    <line x1="150" y1="20" x2="150" y2="70" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    <line x1="20" y1="32" x2="160" y2="32" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    <line x1="20" y1="45" x2="160" y2="45" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    <line x1="20" y1="58" x2="160" y2="58" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
    <ellipse cx="90" cy="45" rx="72" ry="32" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
    <circle cx="90" cy="45" r="4" fill="#F59E0B"/>
    <circle cx="30" cy="32" r="2.5" fill="#10B981"/>
    <circle cx="150" cy="58" r="2.5" fill="#8B5CF6"/>
  </svg>`,
};

// ─── Card definitions ────────────────────────────────────────────────────────

const CARDS = [
  {
    id: 'value',
    name: 'SQLValueCheckOperator',
    image: 'images/SQLValueCheckOperator.webp',
    tagline: 'One query. One expected value.',
    range: 3, signal: 9, setup: 10,
    code: `sql="SELECT COUNT(*) FROM planets",\npass_value=3`,
    countersLabel: 'Best against: fixed reference tables',
    useCount: 0,
  },
  {
    id: 'column',
    name: 'SQLColumnCheckOperator',
    image: 'images/SQLColumnCheckOperator.webp',
    tagline: 'Null, unique, min/max. One task.',
    range: 7, signal: 9, setup: 7,
    code: `"booking_id": {\n  "null_check": {"equal_to": 0},\n  "unique_check": {"equal_to": 0}\n}`,
    countersLabel: 'Best against: structural field failures',
    useCount: 0,
  },
  {
    id: 'check',
    name: 'SQLCheckOperator',
    image: 'images/SQLCheckOperator.webp',
    tagline: 'Any SQL. If it\'s falsy, it fails.',
    range: 10, signal: 5, setup: 2,
    code: `sql="""\n  SELECT COUNT(*) = 0\n  FROM payments p\n  LEFT JOIN bookings b\n  ON p.booking_id = b.booking_id\n  WHERE b.booking_id IS NULL\n"""`,
    countersLabel: 'Flexible: handles cross-table logic',
    useCount: 0,
  },
  {
    id: 'threshold',
    name: 'SQLThresholdCheckOperator',
    image: 'images/SQLThresholdCheckOperator.webp',
    tagline: 'Value outside bounds? Check fails.',
    range: 4, signal: 8, setup: 9,
    code: `sql="SELECT AVG(amount_usd) FROM payments",\nmin_threshold=4000,\nmax_threshold=200000`,
    countersLabel: 'Best against: impossible numeric values',
    useCount: 0,
  },
  {
    id: 'interval',
    name: 'SQLIntervalCheckOperator',
    image: 'images/SQLIntervalCheckOperator.webp',
    tagline: 'Ratio check: today vs. N days ago.',
    range: 4, signal: 7, setup: 5,
    code: `days_back=-7,\nratio_formula="max_over_min",\nmetrics_thresholds={"SUM(...)": 3},\nignore_zero=False`,
    countersLabel: 'Best against: temporal drift and anomalies',
    useCount: 0,
  },
  {
    id: 'table',
    name: 'SQLTableCheckOperator',
    image: 'images/SQLTableCheckOperator.webp',
    tagline: 'Named business rules in plain SQL.',
    range: 8, signal: 9, setup: 6,
    code: `"net_fare_not_negative": {\n  "check_statement":\n    "total_net_fare_usd >= 0"\n}`,
    countersLabel: 'Best against: business rule violations',
    useCount: 0,
  },
];

// ─── Attack definitions ──────────────────────────────────────────────────────

const ATTACKS = [
  {
    id: 'value-attack',
    name: 'Reference Corruption',
    monsterSays: '"I added 44 fake planets to your reference table. You now have 47 planets. Every fare calculation is broken."',
    hint: 'The routes table must have an exact count. One extra row breaks everything downstream.',
    wrongHint: 'Think: which operator checks for an exact expected value?',
    bestCard: 'value',
    why: 'SQLValueCheckOperator: checks if SELECT COUNT(*) matches exactly 3. Any deviation fails the task immediately.',
    altCard: 'check',
    altWhy: 'SQLCheckOperator can do this too, but you have to write the boolean assertion logic yourself.',
  },
  {
    id: 'column-attack',
    name: 'Structural Breakdown',
    monsterSays: '"Null booking IDs everywhere. Duplicates in every column. Your primary key constraints are decorative now."',
    hint: 'Field-level failure: nulls, uniqueness, and value ranges in a single table.',
    wrongHint: 'Think: which card handles multiple column constraints in one task?',
    bestCard: 'column',
    why: 'SQLColumnCheckOperator: bundles null_check, unique_check, and min/max into one task. It tells you exactly which column failed.',
    altCard: 'check',
    altWhy: 'SQLCheckOperator works, but you would need a separate query for every single constraint.',
  },
  {
    id: 'check-attack',
    name: 'Referential Integrity Failure',
    monsterSays: '"Payments referencing bookings that don\'t exist. Orphaned records, drifting through your database with nowhere to go."',
    hint: 'Checking relationships between tables usually needs a JOIN.',
    wrongHint: 'Think: which operator is the "Swiss Army Knife" for custom SQL and joins?',
    bestCard: 'check',
    why: 'SQLCheckOperator: the best choice for cross-table joins. If the query returns any rows (orphans), the check fails.',
    altCard: 'table',
    altWhy: 'SQLTableCheckOperator supports custom SQL but it is designed for single-table rules, not complex joins.',
  },
  {
    id: 'threshold-attack',
    name: 'Impossible Values',
    monsterSays: '"Average payment: two cents. A Moon booking for $0.02. I corrupted your amounts and they still passed type validation."',
    hint: 'The SQL is valid, but the values are garbage. Too low, or way too high.',
    wrongHint: 'Think: which card checks if a value falls within a specific min/max range?',
    bestCard: 'threshold',
    why: 'SQLThresholdCheckOperator: great for keeping numbers in a plausible range. You just define the min and max bounds.',
    altCard: 'check',
    altWhy: 'SQLCheckOperator handles this if you write the BETWEEN logic manually in SQL.',
  },
  {
    id: 'interval-attack',
    name: 'Temporal Drift',
    monsterSays: '"Revenue is down 400% compared to last week. Either your pipeline broke, or interplanetary travel became free."',
    hint: 'Today\'s numbers look fine, but they are weird compared to last week.',
    wrongHint: 'Think: which card compares today\'s metrics against historical data?',
    bestCard: 'interval',
    why: 'SQLIntervalCheckOperator: automatically handles the date math to compare today vs 7 days ago. Perfect for spotting drift.',
    altCard: 'check',
    altWhy: 'SQLCheckOperator could do it, but you would have to write all that annoying date-offset logic yourself.',
  },
  {
    id: 'table-attack',
    name: 'Business Rule Violation',
    monsterSays: '"Net fares are negative. Discounts exceed gross fares. The laws of arithmetic no longer apply to your daily report."',
    hint: 'This needs logic that only your team understands. Simple schema checks won\'t catch this.',
    wrongHint: 'Think: which operator runs named business rules against a table?',
    bestCard: 'table',
    why: 'SQLTableCheckOperator: lets you name each business rule. When it fails, you know exactly which rule was broken.',
    altCard: 'check',
    altWhy: 'SQLCheckOperator can run these expressions, but failure messages won\'t be as clear as the named table checks.',
  },
];

// ─── Utility ─────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getCard(id) { return CARDS.find(c => c.id === id); }

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function flashCritical() {
  const el = document.createElement('div');
  el.className = 'critical-flash';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 600);
}

function showFloatingText(text, x, y, isCritical = false) {
  const div = document.createElement('div');
  div.className = `floating-text ${isCritical ? 'critical' : ''}`;
  div.textContent = text;
  div.style.left = `${x}px`;
  div.style.top = `${y}px`;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 800);
}

function shakeScreen() {
  document.body.classList.add('shake-screen');
  setTimeout(() => document.body.classList.remove('shake-screen'), 400);
}

function el(id) { return document.getElementById(id); }

// ─── Game state ───────────────────────────────────────────────────────────────

let state = {
  attackOrder: [],
  round: 0,
  score: 0,
  hp: 6,
  roundTriedCards: [],   // card IDs tried this round that were wrong
  roundResolved: false,  // whether the current round has been resolved (correct/alt played)
  roundLog: [],
};

// ─── Init ─────────────────────────────────────────────────────────────────────

function init() {
  el('btn-open-booster').addEventListener('click', showBooster);
  el('btn-start-game').addEventListener('click', startGame);
  el('btn-next').addEventListener('click', nextAttack);
  el('css-pack-container').addEventListener('click', openBooster);
  el('btn-twist').addEventListener('click', showTwist);
  el('btn-observe').addEventListener('click', showObserveFight);
  el('btn-deploy').addEventListener('click', deployObserve);
  el('btn-true-restart').addEventListener('click', restart);
}

// ─── Intro → Booster ─────────────────────────────────────────────────────────

function showBooster() {
  showScreen('screen-booster');
}

function openBooster() {
  const container = el('css-pack-container');
  if (container.classList.contains('opened')) return;

  // Step 1: jiggle the pack
  el('css-pack').classList.add('jiggle');
  el('booster-hint').textContent = '';

  setTimeout(() => {
    // Step 2: pack tears : CSS transition fires on both halves
    container.classList.add('opened');

    // Step 3: flash at tear line
    setTimeout(() => el('pack-flash').classList.add('active'), 80);

    // Step 4: fade out the booster-wrap while halves are flying
    setTimeout(() => {
      el('booster-wrap').classList.add('fading');

      // Step 5: once faded, hide it and cross-fade in the clean card grid
      setTimeout(() => {
        el('booster-wrap').style.display = 'none';
        showReveal();
      }, 420);
    }, 550);
  }, 340);
}

function showReveal() {
  const revealWrap = el('reveal-wrap');
  revealWrap.classList.add('visible');

  const container = el('reveal-cards');
  container.innerHTML = '';
  CARDS.forEach((card, i) => {
    const div = document.createElement('div');
    div.className = 'reveal-card';
    div.style.animationDelay = `${i * 0.09}s`;
    div.innerHTML = `<img src="${card.image}" alt="${card.name}">`;
    div.addEventListener('mouseenter', () => showCardPreview(card));
    div.addEventListener('mouseleave', hideCardPreview);
    container.appendChild(div);
  });
}

// ─── Start game ───────────────────────────────────────────────────────────────

function startGame() {
  state = {
    attackOrder: shuffle(ATTACKS),
    round: 0,
    score: 0,
    hp: 6,
    roundTriedCards: [],
    roundResolved: false,
    roundLog: [],
  };
  CARDS.forEach(c => {
    c.useCount = 0;
  });
  hideCardPreview();
  showScreen('screen-game');
  renderHP();
  renderHand();
  renderAttack();
}

// ─── Render HP ────────────────────────────────────────────────────────────────

function renderHP() {
  const container = el('monster-hp');
  container.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    const span = document.createElement('span');
    span.className = `heart ${i < state.hp ? 'full' : 'empty'}`;
    span.textContent = '♥';
    span.dataset.idx = i;
    container.appendChild(span);
  }
}

// ─── Render current attack ────────────────────────────────────────────────────

function renderAttack() {
  const attack = state.attackOrder[state.round];
  el('round-num').textContent = state.round + 1;
  el('attack-name').textContent = attack.name;
  el('monster-speech').textContent = attack.monsterSays;
  el('hint-text').textContent = attack.hint;

  const attackBox = el('attack-box');
  attackBox.style.display = 'block';
  attackBox.classList.remove('glitch-in');
  void attackBox.offsetWidth; // trigger reflow
  attackBox.classList.add('glitch-in');

  el('wrong-hint-box').classList.remove('visible');
  el('result-box').classList.remove('visible');

  state.roundTriedCards = [];
  state.roundResolved = false;

  updateScoreDisplay();
  renderHand();
  updateHandLabel();
}

// ─── Render hand ─────────────────────────────────────────────────────────────

function renderHand() {
  const container = el('hand-cards');
  container.innerHTML = '';

  CARDS.forEach(card => {
    const isTried = state.roundTriedCards.includes(card.id);
    const isPlayable = !isTried && !state.roundResolved;

    const div = document.createElement('div');
    div.className = [
      'hand-card',
      isTried ? 'tried' : '',
      !isPlayable && !isTried ? 'disabled' : '',
    ].filter(Boolean).join(' ');
    div.dataset.id = card.id;

    let labelHtml = '';
    if (card.useCount > 0) {
      labelHtml = `<div class="card-use-counter">USES: ${card.useCount}</div>`;
    }
    if (isTried) {
      labelHtml += '<div class="card-state-label miss">✗</div>';
    }

    div.innerHTML = `<img src="${card.image}" alt="${card.name}">${labelHtml}`;

    // Hover → show CSS card preview
    div.addEventListener('mouseenter', () => showCardPreview(card));
    div.addEventListener('mouseleave', hideCardPreview);

    // Click → play card (only if playable)
    if (isPlayable) {
      div.addEventListener('click', (e) => playCard(card.id, div, e));
    }

    container.appendChild(div);
  });
}

function updateHandLabel() {
  const tried = state.roundTriedCards.length;
  if (tried === 0) {
    el('hand-label').textContent = 'YOUR HAND : hover to inspect, click to play';
  } else if (tried <= 2) {
    el('hand-label').textContent = `${tried} wrong so far. Keep looking.`;
  } else {
    el('hand-label').textContent = 'Getting closer. Think about the type of failure.';
  }
}

// ─── CSS Card Preview ─────────────────────────────────────────────────────────

function showCardPreview(card) {
  const preview = el('card-preview');

  el('cp-name').textContent = card.name;
  el('cp-art').innerHTML = CARD_ART[card.id] || '';
  el('cp-tagline').textContent = card.tagline.toUpperCase();
  el('cp-code').textContent = card.code;
  el('cp-counters').textContent = card.countersLabel;

  // Stat bars
  const statsEl = el('cp-stats');
  statsEl.innerHTML = ['range', 'signal', 'setup'].map(stat => {
    const val = card[stat];
    const pct = (val / 10) * 100;
    return `<div class="cp-stat">
      <span class="cp-stat-label">${stat.toUpperCase()}</span>
      <div class="cp-stat-bar"><div class="cp-stat-fill" style="width:${pct}%"></div></div>
      <span class="cp-stat-num">${val}</span>
    </div>`;
  }).join('');

  preview.classList.add('visible');
}

function hideCardPreview() {
  el('card-preview').classList.remove('visible');
}

// ─── Play a card ──────────────────────────────────────────────────────────────

function playCard(cardId, cardEl, event) {
  if (state.roundResolved) return;

  const card = getCard(cardId);
  const attack = state.attackOrder[state.round];
  const isPerfect = cardId === attack.bestCard;
  const isAlt = cardId === attack.altCard;

  hideCardPreview();

  if (!isPerfect && !isAlt) {
    // Wrong card : show hint, mark as tried, don't advance
    state.roundTriedCards.push(cardId);
    cardEl.classList.add('tried');
    cardEl.querySelector('img').classList.add('shaking');
    setTimeout(() => cardEl.querySelector('img')?.classList.remove('shaking'), 400);

    // Show floating MISS
    showFloatingText('MISS', event.clientX, event.clientY);

    // Show wrong-card hint
    const triedCount = state.roundTriedCards.length;
    let hintMsg = attack.wrongHint;
    if (triedCount >= 3) {
      const bestCard = getCard(attack.bestCard);
      hintMsg = `Hint: look for the operator that handles "${bestCard.countersLabel.replace('Best against: ', '')}".`;
    }
    const wrongBox = el('wrong-hint-box');
    el('wrong-hint-text').textContent = hintMsg;
    wrongBox.classList.add('visible');
    wrongBox.classList.add('shake');
    setTimeout(() => wrongBox.classList.remove('shake'), 400);

    renderHand();
    updateHandLabel();
    return; // don't advance round
  }

  // Correct or alt card : resolve round
  state.roundResolved = true;
  card.useCount++; 
  state.hp = Math.max(0, state.hp - 1);
  if (isPerfect) {
    state.score++;
    setTimeout(flashCritical, 200);
    showFloatingText('CRITICAL!', event.clientX, event.clientY, true);
    shakeScreen();
  } else {
    showFloatingText('OK!', event.clientX, event.clientY);
  }

  // Animate card played
  cardEl.classList.add('playing');

  state.roundLog.push({
    attackName: attack.name,
    cardId,
    isPerfect,
    isAlt,
    triedCount: state.roundTriedCards.length,
  });

  setTimeout(() => {
    renderHP();
    animateMonster(isPerfect);
    showResult(isPerfect, isAlt, card, attack);
    updateScoreDisplay();
    renderHand();
    updateHandLabel();
  }, 320);
}

// ─── Monster animation ────────────────────────────────────────────────────────

function animateMonster(isPerfect, monsterEl = el('game-monster')) {
  if (!monsterEl) return;
  monsterEl.classList.remove('hit', 'hit-critical');
  void monsterEl.offsetWidth;
  monsterEl.classList.add(isPerfect ? 'hit-critical' : 'hit');
  setTimeout(() => monsterEl.classList.remove('hit', 'hit-critical'), 700);

  // If normal game, heart loses its fill
  if (monsterEl.id === 'game-monster') {
    const hearts = document.querySelectorAll('#monster-hp .heart');
    const lostHeart = hearts[state.hp];
    if (lostHeart) {
      lostHeart.classList.add('lost');
      setTimeout(() => lostHeart.classList.remove('lost'), 400);
    }
  }
}

// ─── Show result ──────────────────────────────────────────────────────────────

function showResult(isPerfect, isAlt, card, attack) {
  const badge = el('result-badge');
  const cardNameEl = el('result-card-name');
  const textEl = el('result-text');
  const whyEl = el('result-why');
  const resultBox = el('result-box');

  el('attack-box').style.display = 'none';
  el('wrong-hint-box').classList.remove('visible');

  cardNameEl.textContent = card.name;

  if (isPerfect) {
    badge.textContent = '⚡ CRITICAL CHECK!';
    badge.className = 'result-badge critical';
    const prefix = state.roundLog.at(-1).triedCount > 0
      ? `Found it after ${state.roundLog.at(-1).triedCount} wrong attempt${state.roundLog.at(-1).triedCount > 1 ? 's' : ''}. `
      : 'Perfect match on first try. ';
    textEl.textContent = prefix + 'This is exactly the right operator for this attack.';
    whyEl.textContent = attack.why;
  } else {
    badge.textContent = '✓ Acceptable : not optimal';
    badge.className = 'result-badge alt';
    const bestCard = getCard(attack.bestCard);
    textEl.textContent = `${card.name} can handle this, but ${bestCard.name} is the sharper tool here.`;
    whyEl.textContent = attack.altWhy;
  }

  resultBox.classList.add('visible');
}

// ─── Next attack ──────────────────────────────────────────────────────────────

function nextAttack() {
  state.round++;
  if (state.round >= state.attackOrder.length) {
    showWin();
  } else {
    renderAttack();
  }
}

// ─── Score display ────────────────────────────────────────────────────────────

function updateScoreDisplay() {
  const played = state.roundLog.length;
  el('score-display').textContent = `${state.score} / ${played}`;
}

// ─── Win screen ───────────────────────────────────────────────────────────────

function showWin() {
  showScreen('screen-win');
  el('win-score-num').textContent = `${state.score} / 6`;

  const messages = {
    6: "Perfect game. You know these operators inside out. Your pipelines are bulletproof.",
    5: "Five critical checks. Just one minor slip: your data is in great hands.",
    4: "Solid deck-building. A few more runs and you will have this locked down.",
    3: "Halfway there. The patterns are starting to click.",
    2: "Two critical hits. Keep at it: these operators will be second nature soon.",
    1: 'Only one? <a href="https://www.astronomer.io/docs/learn/data-quality" target="_blank" style="color: var(--purple-light); text-decoration: underline;">Read the guide</a> for the full breakdown and try again.',
    0: 'Even the monster is surprised. <a href="https://www.astronomer.io/docs/learn/data-quality" target="_blank" style="color: var(--purple-light); text-decoration: underline;">Check the guide</a> and run it back!',
  };
  el('win-message').innerHTML = messages[state.score];

  const recapEl = el('win-recap');
  recapEl.innerHTML = '';
  state.roundLog.forEach(entry => {
    const card = getCard(entry.cardId);
    const row = document.createElement('div');
    row.className = `recap-row ${entry.isPerfect ? 'hit' : 'miss'}`;
    const icon = entry.isPerfect ? '⚡' : entry.isAlt ? '✓' : '~';
    const triedNote = entry.triedCount > 0 ? ` <span class="recap-tries">(${entry.triedCount} wrong first)</span>` : '';
    row.innerHTML = `
      <span class="recap-attack">${entry.attackName}</span>
      <span class="recap-card">${card.name}${triedNote}</span>
      <span class="recap-icon">${icon}</span>
    `;
    recapEl.appendChild(row);
  });
}

// ─── Restart ──────────────────────────────────────────────────────────────────

function restart() {
  // Reset CSS pack
  el('css-pack-container').classList.remove('opened');
  el('css-pack').classList.remove('jiggle');
  el('pack-flash').classList.remove('active');
  el('pack-cards-burst').innerHTML = '';
  el('booster-hint').textContent = 'Click the pack to open';
  hideCardPreview();

  const bw = el('booster-wrap');
  bw.classList.remove('fading');
  bw.style.display = '';

  el('reveal-wrap').classList.remove('visible');
  showScreen('screen-intro');
}

// ─── PLOT TWIST: Airflow being eaten ─────────────────────────────────────────

const TERMINAL_LINES = [
  { text: '$ airflow scheduler status', delay: 200,  cls: 'term-cmd' },
  { text: '> Connecting...', delay: 900,  cls: 'term-info' },
  { text: '> ERROR: Scheduler not responding', delay: 1800, cls: 'term-error' },
  { text: '> Retrying... (1/3)', delay: 2600, cls: 'term-warn' },
  { text: '> Retrying... (2/3)', delay: 3200, cls: 'term-warn' },
  { text: '> SCHEDULER DOWN', delay: 3900, cls: 'term-error blink' },
  { text: '> WORKER UNREACHABLE', delay: 4500, cls: 'term-error' },
  { text: '> DQ Dag: task_runner : NOT RUNNING', delay: 5100, cls: 'term-error' },
  { text: '> Your SQL operators cannot reach the battlefield.', delay: 5900, cls: 'term-dim' },
];

function showTwist() {
  showScreen('screen-twist');
  el('twist-speech').style.opacity = '0';
  el('twist-cta').style.opacity = '0';
  el('twist-cta').style.pointerEvents = 'none';

  // Monster slides in after a beat
  setTimeout(() => {
    el('twist-monster').classList.add('slide-in');
  }, 500);

  // Airflow logo glitches and gets eaten
  setTimeout(() => {
    el('airflow-logo').classList.add('glitching');
  }, 3600);

  setTimeout(() => {
    el('airflow-logo').classList.add('eating');
    el('twist-monster').classList.add('chomping');
  }, 4200);

  setTimeout(() => {
    el('airflow-logo').classList.add('eaten');
    el('twist-monster').classList.remove('chomping');
  }, 5000);

  // Terminal lines type in
  const termBody = el('term-body');
  termBody.innerHTML = '';
  TERMINAL_LINES.forEach(({ text, delay, cls }) => {
    setTimeout(() => {
      const line = document.createElement('div');
      line.className = `term-line ${cls}`;
      line.textContent = text;
      termBody.appendChild(line);
      termBody.scrollTop = termBody.scrollHeight;
    }, delay);
  });

  // Monster taunts
  setTimeout(() => {
    el('twist-bubble').textContent = '"Your operators can\'t run if I eat the scheduler."';
    el('twist-speech').style.opacity = '1';
  }, 6200);

  // CTA appears
  setTimeout(() => {
    el('twist-cta').style.opacity = '1';
    el('twist-cta').style.pointerEvents = '';
  }, 7200);
}

// ─── OBSERVE BOSS FIGHT ───────────────────────────────────────────────────────

let obsHp = 3;

function showObserveFight() {
  obsHp = 3;
  showScreen('screen-observe');
  renderObsHP();
  el('monitor-log').classList.remove('visible');
  el('btn-deploy').disabled = false;
  el('btn-deploy').textContent = '★ DEPLOY OBSERVABILITY';
  el('ml-body').innerHTML = '';
  el('observe-card').classList.remove('deployed');
  el('obs-intro-box').style.display = 'block';
}

function renderObsHP() {
  el('obs-hp').textContent = Array.from({ length: 3 }, (_, i) => i < obsHp ? '♥' : '♡').join(' ');
}

const MONITOR_ALERTS = [
  {
    label: 'ROW VOLUME CHANGE',
    msg: 'daily_planet_report: row count dropped 94% vs. last run.',
    delay: 0,
    severity: 'critical',
  },
  {
    label: 'NULL PERCENTAGE',
    msg: 'bookings.booking_id: null rate is 38%. Expected 0%.',
    delay: 900,
    severity: 'critical',
  },
  {
    label: 'SCHEMA DRIFT',
    msg: 'payments.amount_usd: column type changed from FLOAT to VARCHAR.',
    delay: 1800,
    severity: 'critical',
  },
  {
    label: 'LINEAGE IMPACT',
    msg: 'daily_planet_report affected. 3 downstream assets are now at risk.',
    delay: 2600,
    severity: 'info',
  },
  {
    label: 'CUSTOM SQL MONITOR',
    msg: 'check_avg_payment: AVG(amount_usd) is $0.02. Way below threshold.',
    delay: 3300,
    severity: 'critical',
  },
];

function deployObserve() {
  el('btn-deploy').disabled = true;
  el('btn-deploy').textContent = 'MONITORING ACTIVE...';
  el('observe-card').classList.add('deployed');
  el('obs-intro-box').style.display = 'none';

  const logEl = el('monitor-log');
  logEl.classList.add('visible');
  const body = el('ml-body');
  body.innerHTML = '';

  let hitsLanded = 0;

  MONITOR_ALERTS.forEach(({ label, msg, delay, severity }) => {
    setTimeout(() => {
      // Add alert to log
      const row = document.createElement('div');
      row.className = `ml-row ml-${severity}`;
      row.innerHTML = `<span class="ml-label">${label}</span><span class="ml-msg">${msg}</span>`;
      body.appendChild(row);
      body.scrollTop = body.scrollHeight;

      // Hit monster every 2 alerts (at indices 0, 2, 4)
      if (hitsLanded < 3 && severity === 'critical') {
        const monster = el('obs-monster');
        animateMonster(true, monster);

        obsHp = Math.max(0, obsHp - 1);
        hitsLanded++;
        renderObsHP();

        // Flash & Shake
        setTimeout(flashCritical, 80);
        shakeScreen();
        showFloatingText('OBSERVE HIT!', window.innerWidth / 2, window.innerHeight / 2, true);
      }
    }, delay + 400); // offset so card glow starts first
  });

  // Victory after last alert
  setTimeout(() => {
    el('obs-monster').classList.add('obs-defeated');
    setTimeout(showTrueWin, 1200);
  }, MONITOR_ALERTS.at(-1).delay + 1600);
}

// ─── True win screen ──────────────────────────────────────────────────────────

function showTrueWin() {
  showScreen('screen-true-win');
}

// ─── Boot ─────────────────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', init);
