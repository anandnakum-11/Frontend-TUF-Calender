const monthImages = [
  'https://images.pexels.com/photos/618833/pexels-photo-618833.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1252814/pexels-photo-1252814.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/36717/amazing-animal-beautiful-beautifull.jpg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1438761/pexels-photo-1438761.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1323550/pexels-photo-1323550.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/34950/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/450062/pexels-photo-450062.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1619317/pexels-photo-1619317.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/1133957/pexels-photo-1133957.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/443383/pexels-photo-443383.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'https://images.pexels.com/photos/773594/pexels-photo-773594.jpeg?auto=compress&cs=tinysrgb&w=1200'
];

export const getMonthImage = (month: number): string => {
  return monthImages[month] || monthImages[0];
};

export type SeasonName = 'Winter' | 'Spring' | 'Summer' | 'Autumn';

export interface MonthTheme {
  season: SeasonName;
  mood: string;
  atmosphere: string;
  accentLabel: string;
  variables: Record<string, string>;
  effects: {
    glow: string;
    glowSoft: string;
    orbA: string;
    orbB: string;
    orbC: string;
    line: string;
    heroFrom: string;
    heroTo: string;
    badge: string;
  };
}

const seasonThemes: Record<SeasonName, Omit<MonthTheme, 'mood' | 'atmosphere' | 'accentLabel'>> = {
  Winter: {
    season: 'Winter',
    variables: {
      background: '214 39% 95%',
      foreground: '220 34% 12%',
      card: '0 0% 100%',
      'card-foreground': '220 34% 12%',
      popover: '0 0% 100%',
      'popover-foreground': '220 34% 12%',
      primary: '210 85% 58%',
      'primary-foreground': '0 0% 100%',
      secondary: '214 40% 92%',
      'secondary-foreground': '220 34% 14%',
      muted: '214 30% 92%',
      'muted-foreground': '216 16% 40%',
      accent: '204 100% 92%',
      'accent-foreground': '212 84% 30%',
      destructive: '0 78% 56%',
      'destructive-foreground': '0 0% 100%',
      success: '163 66% 40%',
      'success-foreground': '0 0% 100%',
      warning: '38 92% 50%',
      'warning-foreground': '0 0% 100%',
      holiday: '0 76% 58%',
      'holiday-foreground': '0 0% 100%',
      range: '204 100% 89%',
      'range-foreground': '212 84% 24%',
      border: '214 29% 84%',
      input: '214 29% 84%',
      ring: '210 85% 58%',
      'sidebar-background': '214 39% 97%',
      'sidebar-foreground': '220 34% 12%',
      'sidebar-primary': '210 85% 58%',
      'sidebar-primary-foreground': '0 0% 100%',
      'sidebar-accent': '204 100% 92%',
      'sidebar-accent-foreground': '212 84% 24%',
      'sidebar-border': '214 29% 84%',
      'sidebar-ring': '210 85% 58%',
      'priority-high': '0 76% 58%',
      'priority-medium': '38 92% 50%',
      'priority-low': '163 66% 40%',
    },
    effects: {
      glow: 'rgba(125, 176, 255, 0.32)',
      glowSoft: 'rgba(219, 237, 255, 0.75)',
      orbA: 'rgba(104, 173, 255, 0.22)',
      orbB: 'rgba(255, 255, 255, 0.72)',
      orbC: 'rgba(175, 213, 255, 0.28)',
      line: 'rgba(102, 157, 230, 0.16)',
      heroFrom: 'rgba(24, 86, 171, 0.9)',
      heroTo: 'rgba(117, 189, 255, 0.66)',
      badge: 'rgba(255, 255, 255, 0.22)',
    },
  },
  Spring: {
    season: 'Spring',
    variables: {
      background: '99 37% 95%',
      foreground: '137 25% 14%',
      card: '47 33% 99%',
      'card-foreground': '137 25% 14%',
      popover: '47 33% 99%',
      'popover-foreground': '137 25% 14%',
      primary: '142 52% 42%',
      'primary-foreground': '0 0% 100%',
      secondary: '95 34% 90%',
      'secondary-foreground': '137 25% 16%',
      muted: '95 30% 91%',
      'muted-foreground': '132 12% 39%',
      accent: '31 100% 93%',
      'accent-foreground': '143 45% 29%',
      destructive: '0 78% 56%',
      'destructive-foreground': '0 0% 100%',
      success: '142 52% 42%',
      'success-foreground': '0 0% 100%',
      warning: '36 95% 55%',
      'warning-foreground': '0 0% 100%',
      holiday: '346 80% 61%',
      'holiday-foreground': '0 0% 100%',
      range: '121 52% 88%',
      'range-foreground': '137 44% 26%',
      border: '101 24% 82%',
      input: '101 24% 82%',
      ring: '142 52% 42%',
      'sidebar-background': '48 40% 97%',
      'sidebar-foreground': '137 25% 14%',
      'sidebar-primary': '142 52% 42%',
      'sidebar-primary-foreground': '0 0% 100%',
      'sidebar-accent': '31 100% 93%',
      'sidebar-accent-foreground': '143 45% 29%',
      'sidebar-border': '101 24% 82%',
      'sidebar-ring': '142 52% 42%',
      'priority-high': '346 80% 61%',
      'priority-medium': '36 95% 55%',
      'priority-low': '142 52% 42%',
    },
    effects: {
      glow: 'rgba(122, 197, 111, 0.25)',
      glowSoft: 'rgba(255, 236, 207, 0.72)',
      orbA: 'rgba(147, 209, 123, 0.22)',
      orbB: 'rgba(255, 223, 185, 0.58)',
      orbC: 'rgba(255, 190, 208, 0.22)',
      line: 'rgba(113, 169, 93, 0.16)',
      heroFrom: 'rgba(46, 125, 72, 0.9)',
      heroTo: 'rgba(255, 181, 106, 0.58)',
      badge: 'rgba(255, 255, 255, 0.2)',
    },
  },
  Summer: {
    season: 'Summer',
    variables: {
      background: '44 70% 95%',
      foreground: '204 37% 14%',
      card: '45 43% 99%',
      'card-foreground': '204 37% 14%',
      popover: '45 43% 99%',
      'popover-foreground': '204 37% 14%',
      primary: '197 79% 45%',
      'primary-foreground': '0 0% 100%',
      secondary: '46 65% 89%',
      'secondary-foreground': '204 37% 14%',
      muted: '46 46% 90%',
      'muted-foreground': '205 14% 40%',
      accent: '27 100% 89%',
      'accent-foreground': '17 80% 34%',
      destructive: '2 84% 60%',
      'destructive-foreground': '0 0% 100%',
      success: '155 70% 36%',
      'success-foreground': '0 0% 100%',
      warning: '31 96% 52%',
      'warning-foreground': '0 0% 100%',
      holiday: '6 86% 61%',
      'holiday-foreground': '0 0% 100%',
      range: '193 90% 86%',
      'range-foreground': '203 77% 26%',
      border: '41 40% 81%',
      input: '41 40% 81%',
      ring: '197 79% 45%',
      'sidebar-background': '45 45% 97%',
      'sidebar-foreground': '204 37% 14%',
      'sidebar-primary': '197 79% 45%',
      'sidebar-primary-foreground': '0 0% 100%',
      'sidebar-accent': '27 100% 89%',
      'sidebar-accent-foreground': '17 80% 34%',
      'sidebar-border': '41 40% 81%',
      'sidebar-ring': '197 79% 45%',
      'priority-high': '6 86% 61%',
      'priority-medium': '31 96% 52%',
      'priority-low': '155 70% 36%',
    },
    effects: {
      glow: 'rgba(98, 187, 255, 0.22)',
      glowSoft: 'rgba(255, 219, 130, 0.55)',
      orbA: 'rgba(255, 178, 72, 0.22)',
      orbB: 'rgba(112, 198, 255, 0.22)',
      orbC: 'rgba(255, 237, 177, 0.52)',
      line: 'rgba(221, 147, 52, 0.16)',
      heroFrom: 'rgba(10, 120, 181, 0.88)',
      heroTo: 'rgba(255, 173, 77, 0.68)',
      badge: 'rgba(255, 255, 255, 0.22)',
    },
  },
  Autumn: {
    season: 'Autumn',
    variables: {
      background: '26 42% 94%',
      foreground: '15 32% 15%',
      card: '34 42% 98%',
      'card-foreground': '15 32% 15%',
      popover: '34 42% 98%',
      'popover-foreground': '15 32% 15%',
      primary: '21 74% 45%',
      'primary-foreground': '0 0% 100%',
      secondary: '31 37% 88%',
      'secondary-foreground': '15 32% 15%',
      muted: '31 28% 89%',
      'muted-foreground': '18 13% 40%',
      accent: '40 89% 88%',
      'accent-foreground': '23 65% 28%',
      destructive: '0 78% 56%',
      'destructive-foreground': '0 0% 100%',
      success: '89 45% 35%',
      'success-foreground': '0 0% 100%',
      warning: '35 90% 48%',
      'warning-foreground': '0 0% 100%',
      holiday: '7 70% 52%',
      'holiday-foreground': '0 0% 100%',
      range: '36 82% 84%',
      'range-foreground': '21 65% 26%',
      border: '28 25% 78%',
      input: '28 25% 78%',
      ring: '21 74% 45%',
      'sidebar-background': '35 39% 97%',
      'sidebar-foreground': '15 32% 15%',
      'sidebar-primary': '21 74% 45%',
      'sidebar-primary-foreground': '0 0% 100%',
      'sidebar-accent': '40 89% 88%',
      'sidebar-accent-foreground': '23 65% 28%',
      'sidebar-border': '28 25% 78%',
      'sidebar-ring': '21 74% 45%',
      'priority-high': '7 70% 52%',
      'priority-medium': '35 90% 48%',
      'priority-low': '89 45% 35%',
    },
    effects: {
      glow: 'rgba(206, 122, 68, 0.24)',
      glowSoft: 'rgba(255, 214, 146, 0.56)',
      orbA: 'rgba(201, 99, 44, 0.2)',
      orbB: 'rgba(255, 197, 95, 0.22)',
      orbC: 'rgba(139, 111, 61, 0.16)',
      line: 'rgba(164, 96, 47, 0.16)',
      heroFrom: 'rgba(142, 68, 25, 0.92)',
      heroTo: 'rgba(214, 158, 84, 0.62)',
      badge: 'rgba(255, 248, 239, 0.18)',
    },
  },
};

const monthDetails = [
  { mood: 'Crystal clarity', atmosphere: 'Still skies, cool focus, polished mornings', accentLabel: 'Frosted calm' },
  { mood: 'Soft glow', atmosphere: 'Icy air with warmer light and gentle contrast', accentLabel: 'Silver bloom' },
  { mood: 'Fresh awakening', atmosphere: 'New leaves, brighter days, airy energy', accentLabel: 'Garden lift' },
  { mood: 'Botanical light', atmosphere: 'Floral warmth and clean green movement', accentLabel: 'Petal glow' },
  { mood: 'Golden renewal', atmosphere: 'Balanced sunshine, vivid greens, easy optimism', accentLabel: 'Meadow shine' },
  { mood: 'Sunlit rhythm', atmosphere: 'Long days, bright air, breezy blue accents', accentLabel: 'Coastal bright' },
  { mood: 'Radiant peak', atmosphere: 'Bold light, warm evenings, saturated skies', accentLabel: 'Summer flare' },
  { mood: 'Warm escape', atmosphere: 'Late-summer haze with glowing golden depth', accentLabel: 'Amber horizon' },
  { mood: 'Harvest breeze', atmosphere: 'Softening light, grounded tones, calm texture', accentLabel: 'Copper leaf' },
  { mood: 'Velvet transition', atmosphere: 'Rich earth hues with crisp evening contrast', accentLabel: 'Maple dusk' },
  { mood: 'Cozy depth', atmosphere: 'Muted gold, smoked cedar, quiet confidence', accentLabel: 'Spice warmth' },
  { mood: 'Festive glow', atmosphere: 'Deep winter tones, sparkling light, cozy air', accentLabel: 'Midnight shimmer' },
];

export const getSeasonForMonth = (month: number): SeasonName => {
  if ([11, 0, 1].includes(month)) return 'Winter';
  if ([2, 3, 4].includes(month)) return 'Spring';
  if ([5, 6, 7].includes(month)) return 'Summer';
  return 'Autumn';
};

export const getMonthTheme = (month: number): MonthTheme => {
  const season = getSeasonForMonth(month);
  return {
    ...seasonThemes[season],
    ...monthDetails[month],
  };
};

export interface Holiday {
  date: string;
  name: string;
}

export const getHolidays = (year: number, month: number): Holiday[] => {
  const holidays: Record<string, Holiday[]> = {
    '0': [
      { date: `${year}-01-01`, name: "New Year's Day" },
      { date: `${year}-01-15`, name: "Martin Luther King Jr. Day" },
      { date: `${year}-01-26`, name: "Republic Day (India)" },
    ],
    '1': [
      { date: `${year}-02-14`, name: "Valentine's Day" },
      { date: `${year}-02-20`, name: "Presidents' Day" },
    ],
    '2': [
      { date: `${year}-03-08`, name: "International Women's Day" },
      { date: `${year}-03-17`, name: "St. Patrick's Day" },
    ],
    '3': [
      { date: `${year}-04-01`, name: "April Fools' Day" },
      { date: `${year}-04-22`, name: "Earth Day" },
    ],
    '4': [
      { date: `${year}-05-01`, name: "Labour Day" },
      { date: `${year}-05-12`, name: "Mother's Day" },
    ],
    '5': [
      { date: `${year}-06-16`, name: "Father's Day" },
      { date: `${year}-06-21`, name: "Summer Solstice" },
    ],
    '6': [
      { date: `${year}-07-04`, name: "Independence Day (US)" },
    ],
    '7': [
      { date: `${year}-08-15`, name: "Independence Day (India)" },
    ],
    '8': [
      { date: `${year}-09-02`, name: "Labour Day (US)" },
      { date: `${year}-09-05`, name: "Teachers' Day (India)" },
    ],
    '9': [
      { date: `${year}-10-02`, name: "Gandhi Jayanti" },
      { date: `${year}-10-31`, name: "Halloween" },
    ],
    '10': [
      { date: `${year}-11-11`, name: "Veterans Day" },
      { date: `${year}-11-28`, name: "Thanksgiving" },
    ],
    '11': [
      { date: `${year}-12-25`, name: "Christmas Day" },
      { date: `${year}-12-31`, name: "New Year's Eve" },
    ],
  };
  return holidays[month.toString()] || [];
};

const quotes: string[] = [
  "The only way to do great work is to love what you do. - Steve Jobs",
  "In the middle of every difficulty lies opportunity. - Albert Einstein",
  "The future belongs to those who believe in the beauty of their dreams. - Eleanor Roosevelt",
  "It is during our darkest moments that we must focus to see the light. - Aristotle",
  "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
  "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill",
  "Believe you can and you're halfway there. - Theodore Roosevelt",
  "Your time is limited, don't waste it living someone else's life. - Steve Jobs",
  "The only impossible journey is the one you never begin. - Tony Robbins",
  "Life is what happens when you're busy making other plans. - John Lennon",
  "Be yourself; everyone else is already taken. - Oscar Wilde",
  "Two things are infinite: the universe and human stupidity. - Albert Einstein",
  "In three words I can sum up everything I've learned about life: it goes on. - Robert Frost",
  "You miss 100% of the shots you don't take. - Wayne Gretzky",
  "The purpose of our lives is to be happy. - Dalai Lama",
  "Life is really simple, but we insist on making it complicated. - Confucius",
  "The mind is everything. What you think you become. - Buddha",
  "Strive not to be a success, but rather to be of value. - Albert Einstein",
  "The best revenge is massive success. - Frank Sinatra",
  "I have not failed. I've just found 10,000 ways that won't work. - Thomas Edison",
  "A person who never made a mistake never tried anything new. - Albert Einstein",
  "It does not matter how slowly you go as long as you do not stop. - Confucius",
  "Everything you've ever wanted is on the other side of fear. - George Addair",
  "Dream big and dare to fail. - Norman Vaughan",
  "What you get by achieving your goals is not as important as what you become. - Zig Ziglar",
  "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
  "Creativity is intelligence having fun. - Albert Einstein",
  "Do what you can, with what you have, where you are. - Theodore Roosevelt",
  "Act as if what you do makes a difference. It does. - William James",
  "Happiness is not something readymade. It comes from your own actions. - Dalai Lama",
  "Well done is better than well said. - Benjamin Franklin",
];

export const getDailyQuote = (day: number, month: number): string => {
  const index = (day + month * 7) % quotes.length;
  return quotes[index];
};

const monthFacts: Record<number, string[]> = {
  0: ["January is named after Janus, the Roman god of beginnings.", "Garnet is the birthstone of January.", "January's birth flower is the carnation."],
  1: ["February is the only month that can pass without a single full moon.", "Amethyst is February's birthstone.", "The word February comes from the Latin 'februum' meaning purification."],
  2: ["March is named after Mars, the Roman god of war.", "Aquamarine is March's birthstone.", "The first day of spring usually falls in March."],
  3: ["April comes from the Latin 'aperire' meaning to open.", "Diamond is April's birthstone.", "April showers bring May flowers."],
  4: ["May is named after Maia, the Greek goddess of fertility.", "Emerald is May's birthstone.", "May Day has been celebrated since ancient times."],
  5: ["June is named after Juno, the Roman goddess of marriage.", "Pearl and Alexandrite are June's birthstones.", "The longest day of the year falls in June."],
  6: ["July is named after Julius Caesar.", "Ruby is July's birthstone.", "July was originally called Quintilis in the Roman calendar."],
  7: ["August is named after Augustus Caesar.", "Peridot is August's birthstone.", "August was originally the sixth month in the Roman calendar."],
  8: ["September comes from the Latin 'septem' meaning seven.", "Sapphire is September's birthstone.", "Fall equinox occurs in September."],
  9: ["October comes from the Latin 'octo' meaning eight.", "Opal and Tourmaline are October's birthstones.", "October was the eighth month in the old Roman calendar."],
  10: ["November comes from the Latin 'novem' meaning nine.", "Topaz and Citrine are November's birthstones.", "November marks the transition from autumn to winter."],
  11: ["December comes from the Latin 'decem' meaning ten.", "Tanzanite, Zircon, and Turquoise are December's birthstones.", "Winter solstice occurs in December."],
};

export const getMonthFact = (month: number): string => {
  const facts = monthFacts[month] || [];
  const day = new Date().getDate();
  return facts[day % facts.length] || '';
};

export interface ScheduleEvent {
  id: string;
  date: string;
  hour: number;
  title: string;
  priority: 'high' | 'medium' | 'low';
  description?: string;
}

export interface Reminder {
  id: string;
  date: string;
  time: string;
  title: string;
  recurring: 'none' | 'daily' | 'weekly' | 'monthly';
  completed: boolean;
}
