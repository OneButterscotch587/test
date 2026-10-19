// All the quiz content lives here, so you can edit it without touching the logic.
//
// Positions use these numbers:
//    1 = agrees with the statement
//    0 = neutral
//   -1 = disagrees with the statement
//
// IMPORTANT: every party's "positions" list must have exactly one entry
// per question, in the same order as the questions below.
//
// The parties and positions below are made-up placeholders so the quiz runs.
// Replace them with real parties and positions taken from their manifestos.

const questions = [
  "Taxes on high incomes should be raised to fund public services.",
  "Public transport should be free for everyone.",
  "The country should reduce the number of immigrants it admits.",
  "Strong action on climate change is worth some economic cost.",
  "Private companies should play a larger role in healthcare.",
  "The country should deepen its cooperation with international organisations.",
  "Schools should get more state funding, even if it means higher public debt.",
  "Traditional values should be protected by law."
];

const parties = [
  { name: "Party A (placeholder)", positions: [1, 1, -1, 1, -1, 1, 1, -1] },
  { name: "Party B (placeholder)", positions: [-1, -1, 1, -1, 1, -1, 0, 1] },
  { name: "Party C (placeholder)", positions: [0, 0, 0, 1, 0, 0, -1, 0] }
];
