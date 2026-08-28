export interface Influence {
  id: string;
  /** Zero-padded channel number shown in the UI (e.g. "01"). */
  number: string;
  /** Single-letter "base" code used in the DNA sequence (e.g. "H"). */
  letter: string;
  label: string;
  /** Named accent color from the design tokens. */
  color: string;
  paragraphs: string[];
}

export const influences: Influence[] = [
  {
    id: 'hockey',
    number: '01',
    letter: 'H',
    label: 'Hockey',
    color: 'var(--color-hockey)',
    paragraphs: [
      'Before college, I always played hockey whenever possible. I remember always going out and trying to get pick-up games with my neighbors. It would always end up being my street against the street behind my house. Hockey has been a large influence in my life, shaping my morals and character. Hockey had its rough times (such as having a bad coach, which affected my outlook at the sport) and its great times (playing a game at the Allstate Arena). Through hockey\u2019s struggles and gains I learned how to handle each diverse situation through quick, reactive thinking.',
      'Hockey really relates to my majors in college. In hockey, one must always be aware of their surroundings. For information systems, one must know how to collect information and also store that information, which is the first part of hockey. Being aware of their surroundings is the same as collecting information and storing information because being aware of surroundings means collecting surrounding information and remembering what is there. In hockey, all players must always know where to put the puck. In that same sense, marketing majors must know how to take collected information, and apply it to their customers.',
    ],
  },
  {
    id: 'band',
    number: '02',
    letter: 'B',
    label: 'Band',
    color: 'var(--color-band)',
    paragraphs: [
      'Band was also something which truly influenced the person that I am now. I still remember in fourth grade when I was deciding what instrument I wanted to play. I went down to the cafeteria with my class and we all were allowed to try three instruments. I chose percussion, the trumpet, and the clarinet. First was percussion, which I was instructed to play twinkle twinkle little star from the top of my head. After percussion, I was instructed to play the trumpet, and I couldn\u2019t even buzz my lips to get a good sound. Finally, I was handed a clarinet which I loved. From then on, I practiced that clarinet so much that I wanted to have a second challenge, the alto saxophone.',
      'Through middle school and high school, I played the saxophones (alto, tenor, and baritone) in the best bands for my respective schools. Band really taught me how to listen and observe other people. I always would listen to hear if my instrument was out of tune or not working correctly. Listening really is not a skill that is taught well in schools today, so it must be learned. Listening brought me to where I am today because it has allowed me to understand people and adjust my speaking and actions to better fit their style of listening.',
    ],
  },
  {
    id: 'computers',
    number: '03',
    letter: 'C',
    label: 'Computers',
    color: 'var(--color-computers)',
    paragraphs: [
      'Computers played another large influence towards where I am today. I started using a computer when I was a young child. We had recently got a brand new Dell 98, so our old gateway computer running Windows 95 was placed in the basement. I would always play with that computer, and play games on it. Once we got another new computer (Dell Pentium 4 with Windows XP), I took the old Dell 98 and used it in my room as a personal computer. I still remember one time when it got a virus, it was in such bad shape that my mom brought it into her work had had the IT technicians reformat it. That really inspired me to learn more about computers so I would not have an experience like that again. I learned how to reformat a computer, learned how to manage and handle drivers, and how to remove malware and viruses.',
      'Computers taught me how to think methodically and how to problem solve, which is a big part of what forms me as a person today. Through learning how to fix computers, I broke a few on the way. I fried my hard drive on my second computer while reinstalling it because I had to move it to place a video card in my computer. I ended up plugging in a power cable into the RAID adapter spot on the hard drive. As James Joyce once said, \u201CA man\u2019s mistakes are his portals of discovery\u201D. Through my mistakes in my life (including with computers and technology) I have learned how to appropriately diagnose situations and handle them.',
    ],
  },
  {
    id: 'parents',
    number: '04',
    letter: 'P',
    label: 'Parents',
    color: 'var(--color-parents)',
    paragraphs: [
      'Finally, my parents have made a large influence in my life. When I was younger, I struggled with reading a lot. I remember my mom pushing and pushing the school to get me into a reading program which would better assist me in developing my reading skills. Eventually, the school did listen and put me into an assisted reading program, in which I developed incredibly good reading and comprehension skills. In that same looking-out-for-me sense, my Dad always wanted to get me involved in more social groups. I remember at one point in my childhood, I was involved in baseball, hockey, and karate. I would finish a baseball game only to dash in the car and suit up while on my way to the ice arena.',
      'Having my parents always looking out for my best interest really formed my morals towards who I am today. My parents always kept the \u201Cno smoking, no drinking\u201D attitude. Even if at times I felt their punishments for bad actions where unfair, it taught me that every unfavorable action leads to punishment down the road. I had some rough times growing up, but my parents kept me on a straight path which really allowed me to flourish and develop in college.',
    ],
  },
];
