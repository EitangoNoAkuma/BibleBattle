import type { BookInfo } from '../lib/types';

// Parsed from the Index file: maps book numbers to names and aliases
export const books: BookInfo[] = [
  { number: 1, name: 'Genesis', abbrev: 'Gen', aliases: ['ge', 'gn', 'genesis'] },
  { number: 2, name: 'Exodus', abbrev: 'Exo', aliases: ['ex', 'exod', 'exodus'] },
  { number: 3, name: 'Leviticus', abbrev: 'Lev', aliases: ['le', 'lv', 'leviticus'] },
  { number: 4, name: 'Numbers', abbrev: 'Num', aliases: ['nu', 'nm', 'nb', 'numbers'] },
  { number: 5, name: 'Deuteronomy', abbrev: 'Deut', aliases: ['dt', 'deuteronomy'] },
  { number: 6, name: 'Joshua', abbrev: 'Josh', aliases: ['jos', 'jsh', 'joshua'] },
  { number: 7, name: 'Judges', abbrev: 'Judg', aliases: ['jdg', 'jg', 'jdgs', 'judges'] },
  { number: 8, name: 'Ruth', abbrev: 'Rth', aliases: ['ru', 'ruth'] },
  { number: 9, name: '1 Samuel', abbrev: '1 Sam', aliases: ['1 sa', '1samuel', '1s', 'i sa', '1 sm', '1sa', 'i sam', '1sam', 'i samuel', '1st samuel', 'first samuel'] },
  { number: 10, name: '2 Samuel', abbrev: '2 Sam', aliases: ['2 sa', '2s', 'ii sa', '2 sm', '2sa', 'ii sam', '2sam', 'ii samuel', '2samuel', '2nd samuel', 'second samuel'] },
  { number: 11, name: '1 Kings', abbrev: '1 Kgs', aliases: ['1 ki', '1k', 'i kgs', '1kgs', 'i ki', '1ki', 'i kings', '1kings', '1st kgs', '1st kings', 'first kings', 'first kgs', '1kin'] },
  { number: 12, name: '2 Kings', abbrev: '2 Kgs', aliases: ['2 ki', '2k', 'ii kgs', '2kgs', 'ii ki', '2ki', 'ii kings', '2kings', '2nd kgs', '2nd kings', 'second kings', 'second kgs', '2kin'] },
  { number: 13, name: '1 Chronicles', abbrev: '1 Chron', aliases: ['1 ch', 'i ch', '1ch', '1 chr', 'i chr', '1chr', 'i chron', '1chron', 'i chronicles', '1chronicles', '1st chronicles', 'first chronicles'] },
  { number: 14, name: '2 Chronicles', abbrev: '2 Chron', aliases: ['2 ch', 'ii ch', '2ch', 'ii chr', '2chr', 'ii chron', '2chron', 'ii chronicles', '2chronicles', '2nd chronicles', 'second chronicles'] },
  { number: 15, name: 'Ezra', abbrev: 'Ezra', aliases: ['ezr'] },
  { number: 16, name: 'Nehemiah', abbrev: 'Neh', aliases: ['ne', 'nehemiah'] },
  { number: 17, name: 'Esther', abbrev: 'Esth', aliases: ['es', 'esther'] },
  { number: 18, name: 'Job', abbrev: 'Job', aliases: ['jb'] },
  { number: 19, name: 'Psalms', abbrev: 'Pslm', aliases: ['ps', 'psalms', 'psa', 'psm', 'pss', 'psalm'] },
  { number: 20, name: 'Proverbs', abbrev: 'Prov', aliases: ['pr', 'prv', 'proverbs'] },
  { number: 21, name: 'Ecclesiastes', abbrev: 'Eccles', aliases: ['ec', 'qoh', 'qoheleth', 'ecclesiastes'] },
  { number: 22, name: 'Song of Solomon', abbrev: 'Song', aliases: ['so', 'canticle of canticles', 'canticles', 'song of songs', 'sos', 'song of solomon'] },
  { number: 23, name: 'Isaiah', abbrev: 'Isa', aliases: ['is', 'isaiah'] },
  { number: 24, name: 'Jeremiah', abbrev: 'Jer', aliases: ['je', 'jr', 'jeremiah'] },
  { number: 25, name: 'Lamentations', abbrev: 'Lam', aliases: ['la', 'lamentations'] },
  { number: 26, name: 'Ezekiel', abbrev: 'Ezek', aliases: ['eze', 'ezk', 'ezekiel'] },
  { number: 27, name: 'Daniel', abbrev: 'Dan', aliases: ['da', 'dn', 'daniel'] },
  { number: 28, name: 'Hosea', abbrev: 'Hos', aliases: ['ho', 'hosea'] },
  { number: 29, name: 'Joel', abbrev: 'Joel', aliases: ['joe', 'jl'] },
  { number: 30, name: 'Amos', abbrev: 'Amos', aliases: ['am'] },
  { number: 31, name: 'Obadiah', abbrev: 'Obad', aliases: ['ob', 'obadiah'] },
  { number: 32, name: 'Jonah', abbrev: 'Jnh', aliases: ['jon', 'jonah'] },
  { number: 33, name: 'Micah', abbrev: 'Micah', aliases: ['mic'] },
  { number: 34, name: 'Nahum', abbrev: 'Nah', aliases: ['na', 'nahum'] },
  { number: 35, name: 'Habakkuk', abbrev: 'Hab', aliases: ['habakkuk'] },
  { number: 36, name: 'Zephaniah', abbrev: 'Zeph', aliases: ['zep', 'zp', 'zephaniah'] },
  { number: 37, name: 'Haggai', abbrev: 'Haggai', aliases: ['hag', 'hg'] },
  { number: 38, name: 'Zechariah', abbrev: 'Zech', aliases: ['zec', 'zc', 'zechariah'] },
  { number: 39, name: 'Malachi', abbrev: 'Mal', aliases: ['ml', 'malachi'] },
  { number: 40, name: 'Matthew', abbrev: 'Matt', aliases: ['mt', 'matthew'] },
  { number: 41, name: 'Mark', abbrev: 'Mrk', aliases: ['mk', 'mr', 'mark'] },
  { number: 42, name: 'Luke', abbrev: 'Luk', aliases: ['lk', 'luke'] },
  { number: 43, name: 'John', abbrev: 'John', aliases: ['jn', 'jhn'] },
  { number: 44, name: 'Acts', abbrev: 'Acts', aliases: ['ac'] },
  { number: 45, name: 'Romans', abbrev: 'Rom', aliases: ['ro', 'rm', 'romans'] },
  { number: 46, name: '1 Corinthians', abbrev: '1 Cor', aliases: ['1 co', 'i co', '1co', 'i cor', '1cor', 'i corinthians', '1corinthians', '1st corinthians', 'first corinthians'] },
  { number: 47, name: '2 Corinthians', abbrev: '2 Cor', aliases: ['2 co', 'ii co', '2co', 'ii cor', '2cor', 'ii corinthians', '2corinthians', '2nd corinthians', 'second corinthians'] },
  { number: 48, name: 'Galatians', abbrev: 'Gal', aliases: ['ga', 'galatians'] },
  { number: 49, name: 'Ephesians', abbrev: 'Ephes', aliases: ['eph', 'ephesians'] },
  { number: 50, name: 'Philippians', abbrev: 'Phil', aliases: ['php', 'philippians'] },
  { number: 51, name: 'Colossians', abbrev: 'Col', aliases: ['colossians'] },
  { number: 52, name: '1 Thessalonians', abbrev: '1 Thess', aliases: ['1 th', 'i th', '1th', 'i thes', '1thes', 'i thess', '1thess', 'i thessalonians', '1thessalonians', '1st thessalonians', 'first thessalonians'] },
  { number: 53, name: '2 Thessalonians', abbrev: '2 Thess', aliases: ['2 th', 'ii th', '2th', 'ii thes', '2thes', 'ii thess', '2thess', 'ii thessalonians', '2thessalonians', '2nd thessalonians', 'second thessalonians'] },
  { number: 54, name: '1 Timothy', abbrev: '1 Tim', aliases: ['1 ti', 'i ti', '1ti', 'i tim', '1tim', 'i timothy', '1timothy', '1st timothy', 'first timothy'] },
  { number: 55, name: '2 Timothy', abbrev: '2 Tim', aliases: ['2 ti', 'ii ti', '2ti', 'ii tim', '2tim', 'ii timothy', '2timothy', '2nd timothy', 'second timothy'] },
  { number: 56, name: 'Titus', abbrev: 'Titus', aliases: ['tit'] },
  { number: 57, name: 'Philemon', abbrev: 'Philem', aliases: ['phm', 'philemon'] },
  { number: 58, name: 'Hebrews', abbrev: 'Hebrews', aliases: ['heb'] },
  { number: 59, name: 'James', abbrev: 'James', aliases: ['jas', 'jm'] },
  { number: 60, name: '1 Peter', abbrev: '1 Pet', aliases: ['1 pe', 'i pe', '1pe', 'i pet', '1pet', 'i pt', '1 pt', '1pt', 'i peter', '1peter', '1st peter', 'first peter'] },
  { number: 61, name: '2 Peter', abbrev: '2 Pet', aliases: ['2 pe', 'ii pe', '2pe', 'ii pet', '2pet', 'ii pt', '2 pt', '2pt', 'ii peter', '2peter', '2nd peter', 'second peter'] },
  { number: 62, name: '1 John', abbrev: '1 John', aliases: ['1 jn', 'i jn', '1jn', 'i jo', '1jo', 'i joh', '1joh', 'i jhn', '1 jhn', '1jhn', 'i john', '1john', '1st john', 'first john'] },
  { number: 63, name: '2 John', abbrev: '2 John', aliases: ['2 jn', 'ii jn', '2jn', 'ii jo', '2jo', 'ii joh', '2joh', 'ii jhn', '2 jhn', '2jhn', 'ii john', '2john', '2nd john', 'second john'] },
  { number: 64, name: '3 John', abbrev: '3 John', aliases: ['3 jn', 'iii jn', '3jn', 'iii jo', '3jo', 'iii joh', '3joh', 'iii jhn', '3 jhn', '3jhn', 'iii john', '3john', '3rd john', 'third john'] },
  { number: 65, name: 'Jude', abbrev: 'Jude', aliases: ['jud'] },
  { number: 66, name: 'Revelation', abbrev: 'Rev', aliases: ['re', 'the revelation', 'revelation'] },
];

// Build lookup map: lowercase alias/name/abbrev -> book number
const _lookupMap = new Map<string, number>();
books.forEach(book => {
  _lookupMap.set(book.name.toLowerCase(), book.number);
  _lookupMap.set(book.abbrev.toLowerCase(), book.number);
  book.aliases.forEach(alias => _lookupMap.set(alias.toLowerCase(), book.number));
});

export const bookLookup = _lookupMap;
export const bookByNumber = new Map(books.map(b => [b.number, b]));
