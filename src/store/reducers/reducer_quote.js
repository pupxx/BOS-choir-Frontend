var quotes = [
  {
    quote:
      '"If thou art merry, praise the Lord with singing, with music, with dancing, and with a prayer of praise and thanksgiving."',
    reference: "~ D & C 136:28 ~"
  },
  {
    quote:
      '"Sing unto the Lord; for he hath done excellent things: this is known in all the earth."',
    reference: "~ Isaiah 12:5 ~"
  },
  {
    quote:
      '"Sing unto the Lord, O ye saints of his, and give thanks at the remembrance of his holiness."',
    reference: "~ Psalm 30:4 ~"
  }
];
function getQuote(arr) {
  var quote = arr[Math.floor(Math.random() * arr.length)];
  return quote;
}

export default (state = getQuote(quotes)) => {
  return state;
};
