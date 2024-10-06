function checkSpam(str) {
  let lowerStr = str.toLowerCase();
  const spamWords = ['1xBet', 'XXX'];
  let result = false;
  spamWords.forEach((spamWord) => {
    if (lowerStr.includes(spamWord.toLowerCase())) {
      result = true;
    }
  });
  return result;  
}