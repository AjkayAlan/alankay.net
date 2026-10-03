export interface InfluenceSection {
  heading: string;
  /** One paragraph, or several (each rendered as its own paragraph). */
  body: string | string[];
}

export interface InfluenceTab {
  id: string;
  label: string;
  sections: InfluenceSection[];
}

export interface Influence {
  id: string;
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
    letter: 'P',
    label: 'Personal',
    color: 'var(--color-personal)',
    intro:
      "The pursuits I've kept up off the clock aren't just hobbies. Each one fostered a skill I still lean on at work.",
    tabs: [
      {
        id: 'music',
        label: 'Music',
        sections: [
          {
            heading: 'Where it started',
            body: "I picked up my first instrument in fourth grade, in the school cafeteria, trying percussion, trumpet, and clarinet. The clarinet stuck, and before long I wanted a second challenge, so I took up the alto saxophone. Through middle and high school I played alto, tenor, and baritone in the top bands at my schools.",
          },
          {
            heading: 'What it taught me',
            body: "Playing in an ensemble taught me to listen before I act. I learned to hear whether my own part was in tune with everyone else's, a skill most people never have to practice. That habit carried straight into how I work with people: I pick up on someone's style, then adjust how I communicate to match it.",
          },
          {
            heading: 'Where it shows up',
            body: "In meetings I tune in to what isn't being said as much as what is. A group only sounds good when every part is genuinely heard, and the same is true of a team shipping a product.",
          },
        ],
      },
      {
        id: 'hockey',
        label: 'Hockey',
        sections: [
          {
            heading: 'Where it started',
            body: "Before college, hockey was the sport I always came back to. I'd organize pick-up games with the neighbors, my street against the street behind ours. I stuck with it through a coach whose approach nearly turned me off the sport entirely, and through the highlights, right up to a game at the Allstate Arena.",
          },
          {
            heading: 'What it taught me',
            body: "Hockey trained me for quick, reactive thinking. On the ice you're always reading your surroundings, collecting information and deciding where the puck goes next. That loop of gather, understand, act is the same one I run every day.",
          },
          {
            heading: 'Where it shows up',
            body: "The calmest person in a crisis is often the one who's been hit on open ice. Hockey gave me comfort with fast, imperfect decisions: act on what you know, correct as you go.",
          },
        ],
      },
      {
        id: 'outdoors',
        label: 'Outdoors',
        sections: [
          {
            heading: 'Where it started',
            body: "Camping and getting outside are how I reset. Away from screens and schedules, I'm reminded that a lot of what feels urgent simply isn't. The best plans leave room for weather.",
          },
          {
            heading: 'What it taught me',
            body: 'Time outdoors taught me to prepare for contingencies and still stay flexible when they arrive. Pack for the trip you might have, not just the one you expect.',
          },
          {
            heading: 'Where it shows up',
            body: 'I bring the same mindset to projects. I prepare thoroughly, then adapt without drama when conditions change. A plan is a starting point, not a promise.',
          },
        ],
      },
      {
        id: 'tinkering',
        label: 'Tinkering',
        sections: [
          {
            heading: 'Where it started',
            body: "I've always liked taking things apart to see how they work, computers especially, but really anything with moving parts. The old Dell I inherited became a lab where I broke things, swapped drives, and put them back better.",
          },
          {
            heading: 'What it taught me',
            body: "Tinkering taught me methodical problem solving and gave me permission to break things on purpose. A broken thing is just a problem with a fix I haven't found yet.",
          },
          {
            heading: 'Where it shows up',
            body: 'I treat new tools and systems the same way. I take them apart, understand the pieces, and adapt them to get the best out of them.',
          },
        ],
      },
    ],
  },
  {
    id: 'professional',
    letter: 'P',
    label: 'Professional',
    color: 'var(--color-professional)',
    intro:
      'My career is that same story, carried into my work. It is problems I care about, results I can point to, and projects I see all the way through.',
    tabs: [
      {
        id: 'experience',
        label: 'Experience',
        sections: [
          {
            heading: 'Where it started',
            body: 'Eleven years at one company, and a steady climb from intern to senior engineer. Along the way I moved through application development, lean engineering, cloud platform, developer experience, and now AI and productivity measurement.',
          },
          {
            heading: 'What it taught me',
            body: 'With every role, I reached for a bigger unit of work. I went from building a system, to building the platform it runs on, to building the tools that make every engineer faster. The through-line is ownership. Every step, I took more of the problem, not just more of the task.',
          },
          {
            heading: 'Where it shows up',
            body: 'Today I work on the systems that shape how four thousand contributors deliver software. That is a long way from a single application, and it is the same job: find the problem, build the fix, prove it worked.',
          },
        ],
      },
      {
        id: 'outcomes',
        label: 'Outcomes',
        sections: [
          {
            heading: 'Where it started',
            body: 'The first time I watched a number move because of something I built, I was hooked. From then on I wanted every project to end with a result I could point to, not just a launch I could announce.',
          },
          {
            heading: 'What it taught me',
            body: 'I measure success the way a hockey player reads the scoreboard: in results, not effort. What changed, for whom, by how much.',
          },
          {
            heading: 'Where it shows up',
            body: [
              'My strongest results come from empowering my customers. The DX platform returned a conservative $10M+ annual ROI across the organization, giving teams a data-driven way to surface their own wins and pain points.',
              'The engineer workstation utility I built cut new-engineer setup from multiple days to under an hour. About 5,700 people ran it in a year, recovering roughly 91,000 engineer hours, or $6.8M in productivity.',
              'Not every win is that large. Modernizing license management saved $150K a year. A time-to-first-commit program cut onboarding time by about 30%. The scale varies; the discipline does not.',
            ],
          },
        ],
      },
      {
        id: 'method',
        label: 'Method',
        sections: [
          {
            heading: 'Where it started',
            body: 'I learned to build for the user during my lean engineering years. Pairing and mobbing put me shoulder to shoulder with the people using what we built, and the lesson stuck: craft is a habit you build in, not a phase you add at the end.',
          },
          {
            heading: 'What it taught me',
            body: 'The best systems make the right thing the easy thing. When the guardrail is built into the tooling, nobody has to remember it, and quality stops depending on who is paying attention.',
          },
          {
            heading: 'Where it shows up',
            body: "I build with infrastructure as code and automation, so the result is repeatable and secure by default. The pre-deploy scanning solution I created is now required in Principal's production pipeline: about 2,700 runs a day across 4,000 repositories, checking 300 rules each time. It catches problems before they reach production.",
          },
        ],
      },
      {
        id: 'rollout',
        label: 'Rollout',
        sections: [
          {
            heading: 'Where it started',
            body: 'My first real lesson in adoption came with AWS. The platform was ready, but ready is not the same as used. I spent as much time removing barriers and shaping the culture as I did building the foundation.',
          },
          {
            heading: 'What it taught me',
            body: "I love seeing projects through to the end, and 'done' means adopted, not just delivered. I drive rollout across the organization, making sure a change actually changes how people work.",
          },
          {
            heading: 'Where it shows up',
            body: "The GitHub Copilot rollout is the fullest version of this. I took it from prototype to a 250-person trial, built the business case for senior leadership, and partnered with legal, security, and risk to clear Principal's first AI tool. Then I delivered the training, demos, and a conference session to more than 3,000 engineers. It now serves about 3,500 weekly users, returning roughly $26M a year. Adoption was the project, not the epilogue.",
          },
        ],
      },
      {
        id: 'mentoring',
        label: 'Mentoring',
        sections: [
          {
            heading: 'Where it started',
            body: "Teaching is how I deepen my own understanding. I genuinely enjoy presenting, educating, and guiding others, whether that's walking a teammate through a system or sharing what I've learned with a room.",
          },
          {
            heading: 'What it taught me',
            body: "Mentoring taught me that the fastest way to raise a team's quality is to raise the people in it. I've interviewed engineers through pair programming and coached teams through lean practices. A team gets better one person at a time.",
          },
          {
            heading: 'Where it shows up',
            body: "I'd rather leave people more capable than I found them. That's the kind of impact that compounds.",
          },
        ],
      },
    ],
  },
  {
    id: 'background',
    letter: 'B',
    label: 'Background',
    color: 'var(--color-background)',
    intro:
      'I had force multipliers early on. They pushed me further than I could have gone alone, and set the standard I hold my work to.',
    tabs: [
      {
        id: 'family',
        label: 'Family',
        sections: [
          {
            heading: 'Where it started',
            body: "My parents shaped me in two ways I didn't fully appreciate until later. When I struggled with reading, my mom pushed the school until I was placed in an assisted reading program, and I came out of it with strong reading and comprehension skills. My dad made sure I was never stuck in one room. I played baseball, hockey, and karate, sometimes finishing a game only to dash straight to the ice arena.",
          },
          {
            heading: 'What it taught me',
            body: "The lesson that stuck: someone in your corner who pushes for your best interest changes your trajectory. My parents kept me steady through the hard stretches, which is the only reason I got to flourish in college and beyond.",
          },
          {
            heading: 'Where it shows up',
            body: 'I try to be that person for others, the one who advocates, follows through, and keeps people on a path toward their best version.',
          },
        ],
      },
      {
        id: 'education',
        label: 'Education',
        sections: [
          {
            heading: 'Where it started',
            body: 'I studied Information Systems and Marketing as my majors, with Computer Science as a minor. A powerful combination: three disciplines covering how information works, how people use it, and how to build with it.',
          },
          {
            heading: 'What it taught me',
            body: 'Information Systems taught me to gather and structure data. Marketing taught me to understand the people who use it. Computer Science is where I learned to put both into practice. Together they became the loop I run on: gather, understand, act.',
          },
          {
            heading: 'Where it shows up',
            body: 'Every problem I take on runs through that loop. I gather the context, understand the problem, and define the outcomes that matter. Then I act: I build the solution, enable the people who need to use it, and measure whether it meets and exceeds what we set out to do.',
          },
        ],
      },
      {
        id: 'early-tech',
        label: 'Early tech',
        sections: [
          {
            heading: 'Where it started',
            body: "A Gateway running Windows 95 lived in the basement. When the family got a new Dell, the old one became mine. Then a virus took it down so badly that my mom's IT team had to wipe and rebuild it for me. That day I made a decision: I would understand these machines well enough to never need that rescue again.",
          },
          {
            heading: 'What it taught me',
            body: "So I taught myself the whole stack: reformatting, managing drivers, removing malware. And I learned something bigger than the steps. A mistake is just information I didn't have yet. When I fried a hard drive by running a power cable into the wrong slot, I didn't panic. I traced exactly what I had done, replaced the drive, and rebuilt it better than it was.",
          },
          {
            heading: 'Where it shows up',
            body: "That early self-teaching is why I treat every problem as learnable. When I meet something I don't understand, I don't wait for someone to hand me the answer. I dig until I understand it, and I own it through to the fix.",
          },
        ],
      },
    ],
  },
  {
    id: 'values',
    letter: 'V',
    label: 'Values',
    color: 'var(--color-values)',
    intro:
      'Some traits follow me into every project. They shape how I think, how I work, and how I treat the people around me.',
    tabs: [
      {
        id: 'how-i-think',
        label: 'How I think',
        sections: [
          {
            heading: 'Where it started',
            body: "I'm a problem solver and a deep thinker. I like to understand a thing down to its parts before I act on it. It's the same instinct that had me opening up computers as a kid.",
          },
          {
            heading: 'What it taught me',
            body: "Deep thinking, for me, doesn't mean slow. It means I've usually considered the second- and third-order effects before I commit to a direction.",
          },
          {
            heading: 'Where it shows up',
            body: [
              'One of the clearest examples came during a large project rollout. A component another team had built was going to become a bottleneck the moment we went live, and we needed a decision fast.',
              'I went deep on the problem, mapped what was actually slowing it down and what each fix would cost us, and landed on a rewrite in a language and architecture built for speed.',
              'I walked leadership through the problem and the options on a Friday, did the rewrite over the weekend, and by Tuesday our business partners were validating data from the new process.',
              'That process had been taking six-plus hours and sometimes failing outright. It now runs in about fifteen minutes.',
            ],
          },
        ],
      },
      {
        id: 'how-i-work',
        label: 'How I work',
        sections: [
          {
            heading: 'Where it started',
            body: "I'm results-driven and data-driven in equal measure. I define success metrics as I build the program, so there's never a gap between 'we shipped' and 'here's what it did.'",
          },
          {
            heading: 'What it taught me',
            body: 'Finishing is a discipline, and I practice it. Starting is easy; the work I care about is carrying a program through the friction to the point where people rely on it.',
          },
          {
            heading: 'Where it shows up',
            body: [
              "At work I've been championing an effort to help teams reach their best. It comes down to two things: insights they can visualize and act on, and optimizations like documentation and training that help a change stick.",
              'The approach is a sequence: Discovery, then Documentation, then Policy, then Measurement, then Enablement, then Enforcement. Each step earns the next. Nothing gets written down before the thinking is settled, nothing gets enforced before we can measure whether it works, and we never push a change until everything ahead of it holds up.',
              "That discipline keeps us honest. When a change lands, we can prove it. When it doesn't, we stop, and we understand why.",
            ],
          },
        ],
      },
      {
        id: 'how-i-lead',
        label: 'How I lead',
        sections: [
          {
            heading: 'Where it started',
            body: "I lead by mentoring: guiding, encouraging, teaching, and sharing what I know. I'd rather explain how something works than hoard the knowledge.",
          },
          {
            heading: 'What it taught me',
            body: "I'm collaborative and engaged. The best work I've been part of came from a group that was genuinely in sync, which goes straight back to what music taught me.",
          },
          {
            heading: 'Where it shows up',
            body: [
              "For about a decade I've served on the planning committee for our intern code jam. It's a five-day hackathon where more than a hundred interns pick a problem statement, or write their own, and race to a working solution.",
              'My role spans the whole arc. Before the jam I help them sharpen the problem: is it well scoped, who should they talk to, what questions they need answered. During the week I am on hand for the technical hurdles and the dead ends. Afterward I help each team decide what comes next with what they built.',
              "Being a force multiplier is what keeps me coming back. A hundred interns leave with a working product and skills they did not have a week earlier, and my part is to help that happen rather than do it for them.",
            ],
          },
        ],
      },
      {
        id: 'how-i-show-up',
        label: 'How I show up',
        sections: [
          {
            heading: 'Where it started',
            body: 'I bring genuine enthusiasm to this work. I like the building, the teaching, and the problem sitting in front of me.',
          },
          {
            heading: 'What it taught me',
            body: "Enthusiasm without substance is noise. Mine comes with a habit of follow-through: if I'm excited about it, I'm also going to finish it.",
          },
          {
            heading: 'Where it shows up',
            body: 'I think that energy is contagious, and I try to amplify it in the people around me.',
          },
        ],
      },
    ],
  },
];
