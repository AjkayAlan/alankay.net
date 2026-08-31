export interface InfluenceTab {
  id: string;
  label: string;
  paragraphs: string[];
}

export interface Influence {
  id: string;
  /** Zero-padded strand number shown in the UI (e.g. "01"). */
  number: string;
  /** Single-letter "base" code used in the DNA sequence (e.g. "P"). */
  letter: string;
  label: string;
  /** Named accent color from the design tokens. */
  color: string;
  /** One-sentence intro shown above the tabs. */
  intro: string;
  tabs: InfluenceTab[];
}

export const influences: Influence[] = [
  {
    id: 'personal',
    number: '01',
    letter: 'P',
    label: 'Personal',
    color: 'var(--color-personal)',
    intro:
      "The pursuits I've kept up off the clock aren't just hobbies. Each one fostered a skill I still lean on at work.",
    tabs: [
      {
        id: 'music',
        label: 'Music',
        paragraphs: [
          "I picked up my first instrument in fourth grade, in the school cafeteria, trying percussion, trumpet, and clarinet. The clarinet stuck, and before long I wanted a second challenge, so I took up the alto saxophone. Through middle and high school I played alto, tenor, and baritone in the top bands at my schools.",
          "Playing in an ensemble taught me to listen before I act. I learned to hear whether my own part was in tune with everyone else's, a surprisingly rare skill that carried straight into how I work with people. Listening is how I pick up on someone's style, then adjust how I communicate to match it.",
          "Where it shows up: in meetings I listen for what isn't being said as much as what is. A group only sounds good when everyone is actually hearing each other, and the same is true of a team shipping a product.",
        ],
      },
      {
        id: 'hockey',
        label: 'Hockey',
        paragraphs: [
          "Before college, hockey was the sport I always came back to. I'd organize pick-up games with the neighbors, my street against the street behind ours, and I stuck with it through the rough patches (a coach whose approach nearly turned me off the sport entirely) and the highlights (a game at the Allstate Arena).",
          "Hockey trained me for quick, reactive thinking. On the ice you're always reading your surroundings, collecting information and deciding where the puck goes next. That loop of observe, decide, act is the same one I run every day: gather the data, understand the situation, then move.",
          "Where it shows up: the calmest person in a crisis is often the one who's been hit on open ice. Hockey gave me comfort with fast, imperfect decisions: act on what you know, correct as you go.",
        ],
      },
      {
        id: 'outdoors',
        label: 'Outdoors',
        paragraphs: [
          "Camping and getting outside are how I reset. Away from screens and schedules, I'm reminded that a lot of what feels urgent simply isn't. The best plans leave room for weather.",
          "Time outdoors taught me to plan for contingencies and still stay flexible when the plan breaks. Pack for the trip you might have, not just the one you expect.",
          "Where it shows up: I bring the same mindset to projects. I prepare thoroughly, then adapt without drama when conditions change. A plan is a starting point, not a promise.",
        ],
      },
      {
        id: 'tinkering',
        label: 'Tinkering',
        paragraphs: [
          "I've always liked taking things apart to see how they work, computers especially, but really anything with moving parts. The old Dell I inherited became a lab where I reformatted, swapped drives, broke things, and put them back better.",
          "Tinkering taught me methodical problem solving and gave me permission to break things on purpose. A broken thing is just a problem with a fix I haven't found yet.",
          "Where it shows up: I treat new tools and systems the same way. I take them apart, understand the pieces, and only then trust them in production.",
        ],
      },
    ],
  },
  {
    id: 'professional',
    number: '02',
    letter: 'C',
    label: 'Professional',
    color: 'var(--color-professional)',
    intro:
      'This is where the building blocks turn into outcomes: the work I do, the results I seek, and the habits that get a project from idea to adopted.',
    tabs: [
      {
        id: 'experience',
        label: 'Experience',
        paragraphs: [
          '[TODO: summarize roles, companies, and years. Pull from the resume.]',
          "Across roles I've kept one through-line: I take ownership of the outcome, not just the task.",
        ],
      },
      {
        id: 'outcomes',
        label: 'Outcomes',
        paragraphs: [
          '[TODO: concrete results. Metrics, launches, programs shipped. Add numbers where possible.]',
          'I measure success the way a hockey player reads the scoreboard: in results, not effort. What changed, for whom, by how much.',
        ],
      },
      {
        id: 'method',
        label: 'Method',
        paragraphs: [
          "I build success metrics alongside the program, not after it. Defining what good looks like up front is the difference between shipping and shipping something that matters.",
          "I'm data-driven, but I don't hide behind spreadsheets. Data tells you where you are; judgment tells you what to do about it. I use both.",
        ],
      },
      {
        id: 'rollout',
        label: 'Rollout',
        paragraphs: [
          "I love seeing projects through to the end, and 'done' means adopted, not just delivered. I drive rollout across the organization, making sure a change actually changes how people work.",
          "A shipped feature nobody uses is unfinished work. I treat adoption as part of the build, not a follow-up.",
        ],
      },
      {
        id: 'mentoring',
        label: 'Mentoring',
        paragraphs: [
          "Teaching is how I deepen my own understanding. I genuinely enjoy presenting, educating, and guiding others, whether that's walking a teammate through a system or sharing what I've learned with a room.",
          "Where it shows up: I'd rather leave people more capable than I found them. That's the kind of impact that compounds.",
        ],
      },
    ],
  },
  {
    id: 'background',
    number: '03',
    letter: 'B',
    label: 'Background',
    color: 'var(--color-background)',
    intro:
      'The people and early experiences that set my defaults, the foundations I still build on.',
    tabs: [
      {
        id: 'family',
        label: 'Family',
        paragraphs: [
          "My parents shaped me in two ways I didn't fully appreciate until later. When I struggled with reading, my mom pushed the school until I was placed in an assisted reading program, and I came out of it with strong reading and comprehension skills. My dad made sure I was never stuck in one room. I played baseball, hockey, and karate, sometimes finishing a game only to dash straight to the ice arena in the car.",
          "The lesson that stuck: someone in your corner who pushes for your best interest changes your trajectory. My parents kept me on a straight path through the rough patches, which is the only reason I got to flourish in college and beyond.",
          "Where it shows up: I try to be that person for others, the one who advocates, shows up, and keeps people on a path toward their best version.",
        ],
      },
      {
        id: 'education',
        label: 'Education',
        paragraphs: [
          'I studied Information Systems and Marketing, a combination that turned out to be exactly how I think: understand the system, then understand the people using it.',
          "Information systems taught me how information is collected, stored, and moved. Marketing taught me what to do with it once I have it. Together they're the loop I still run: gather, understand, act.",
        ],
      },
      {
        id: 'early-tech',
        label: 'Early tech',
        paragraphs: [
          "It started in the basement with a Gateway running Windows 95. When the family got a new Dell, the old one became mine. Then a virus wrecked it so badly that the IT team at my mom's work had to reformat it for me, and I decided I'd never be in that position again.",
          "So I learned how to reformat a computer, manage drivers, and remove malware. I fried a hard drive along the way (I plugged a power cable into the RAID slot by mistake) and learned firsthand that James Joyce was right: a man's mistakes are his portals of discovery.",
          "Where it shows up: that early self-teaching is why I treat every problem as learnable. If I don't know how something works, I go find out.",
        ],
      },
    ],
  },
  {
    id: 'values',
    number: '04',
    letter: 'V',
    label: 'Values',
    color: 'var(--color-values)',
    intro:
      'The traits that show up regardless of the project: how I think, how I work, and how I show up for the people around me.',
    tabs: [
      {
        id: 'how-i-think',
        label: 'How I think',
        paragraphs: [
          "I'm a problem solver and a deep thinker. I like to understand a thing down to its parts before I act on it. It's the same instinct that had me opening up computers as a kid.",
          "Deep thinking, for me, doesn't mean slow. It means I've usually considered the second- and third-order effects before I commit to a direction.",
        ],
      },
      {
        id: 'how-i-work',
        label: 'How I work',
        paragraphs: [
          "I'm results-driven and data-driven in equal measure. I define success metrics as I build the program, so there's never a gap between 'we shipped' and 'here's what it did.'",
          "I love seeing projects through to fruition and driving rollout across the organization. Finishing is a discipline, and I practice it.",
        ],
      },
      {
        id: 'how-i-lead',
        label: 'How I lead',
        paragraphs: [
          "I lead by mentoring: guiding, encouraging, teaching, and sharing what I know. I'd rather explain how something works than hoard the knowledge.",
          "I'm collaborative and engaged. The best work I've been part of came from a group that was actually hearing each other, which goes straight back to what music taught me.",
        ],
      },
      {
        id: 'how-i-show-up',
        label: 'How I show up',
        paragraphs: [
          "I show up enthusiastic. I genuinely like this work: the building, the teaching, the problem sitting in front of me. I think that energy is contagious, and amplify it.",
          "Enthusiasm without substance is noise, though. Mine comes with a habit of follow-through: if I'm excited about it, I'm also going to finish it.",
        ],
      },
    ],
  },
];
