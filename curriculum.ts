import { Curriculum, Grade, Topic } from './types';

// Helper to convert old simple string arrays to new Topic objects for backwards compatibility
const gradeToTopic = (topics: string[], gradeNumber: string, subject: string): Topic[] => {
    const subjectPrefix = subject.slice(0, 2).toLowerCase().replace(/[^a-z0-9]+/g, '');
    return topics.map(topic => ({
        id: `g${gradeNumber}-${subjectPrefix}-${topic.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        title: topic,
        description: `This is a topic about ${topic} for ${subject} in Grade ${gradeNumber}.`,
    }));
};

// The full, detailed curriculum data provided by the user is now the source of truth.
export const curriculumData: Curriculum = {
  primary: [
  {
    "grade": "1",
    "subjects": [
      {
        "name": "Integrated Studies",
        "topics": [
          {
            "id": "g1-is-about-myself",
            "title": "About Myself",
            "description": "Learners develop self-awareness by exploring their personal identity, physical characteristics, family roles, and basic self-care practices within the context of Basotho culture.",
            "curriculumStandards": [
              "Awareness of Self and Others",
              "Health and Healthy Living",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Describe themselves (name, age, boy/girl, clan)",
              "Identify external parts of the body",
              "Understand the importance of grooming and demonstrate ways of grooming",
              "State their roles and responsibilities in the family or group",
              "Throw, catch and jump correctly",
              "Draw doodles holding a stick or pencil using comfortable and efficient pencil grip",
              "Sort themselves by age, height, gender, clan",
              "Sort objects by size, colour and shape",
              "Match sets in terms of one to one correspondence",
              "Introduce themselves in English",
              "Identify people according to gender and family relationship in English",
              "Name external parts of the body in English",
              "Count from 1 to 20",
              "Read numerals from 1 to 20",
              "Cite days of the week in order",
              "Write numerals from 1 to 20",
              "Arrange numerals from 1 to 20 in sequence",
              "Order by size and shape",
              "Identify sets of up to five members",
              "Colour pictures of objects neatly using appropriate colours",
              "Add numbers within the range 1 to 10",
              "Identify and use correctly the signs plus (+) and equal (=)",
              "Perform basic sewing and crochet stitches"
            ],
            "keyVocabulary": [
              "name",
              "surname",
              "age",
              "gender",
              "clan",
              "body parts",
              "grooming",
              "responsibilities",
              "sorting",
              "sets",
              "counting"
            ],
            "exampleActivities": [
              "Learners say their names and surnames",
              "Learners draw themselves and teacher writes their names",
              "Learners sort themselves by age, height, gender, clan",
              "Learners identify external parts of the body using dolls",
              "Learners role-play ways of grooming",
              "Playing lead-up games: throwing, catching, jumping",
              "Learners sort classroom objects by size, colour and shape",
              "Learners match similar objects into one to one correspondence",
              "Learners practice pencil handling and hand movement",
              "Learners make doodles on paper using pencils"
            ],
            "assessmentFocus": [
              "State their names and surnames",
              "Say their ages correctly",
              "Introduce themselves (name, age, boy/girl, clan)",
              "Name external parts of the body",
              "Come to school correctly groomed",
              "State their roles and responsibilities",
              "Sort themselves according to age, height, gender, clans",
              "Sort objects correctly by size, colour and shape",
              "Match similar objects in one to one correspondence",
              "Handle a pencil appropriately",
              "Make doodles"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g1-sl-greetings-and-respect",
                "description": "Using appropriate greetings and showing respect in speech"
              },
              {
                "subject": "English Literacy",
                "topicId": "g1-el-greetings-and-introductions",
                "description": "Introducing themselves in English"
              },
              {
                "subject": "Numeracy",
                "topicId": "g1-num-counting-1-20",
                "description": "Counting age and days of the week"
              },
              {
                "subject": "Numeracy",
                "topicId": "g1-num-sorting-and-sets",
                "description": "Sorting and making sets"
              }
            ]
          },
          {
            "id": "g1-is-relating-to-others",
            "title": "How I Relate to Others",
            "description": "Learners explore their relationships with family, friends, and community, learning appropriate social behaviors, kinship terms, and the importance of giving, receiving, and sharing.",
            "curriculumStandards": [
              "Awareness of Self and Others",
              "Effective Communication",
              "Production and Work-related Competencies"
            ],
            "learningObjectives": [
              "Greet and respond correctly",
              "Identify the time of day in relation to the events of the day",
              "Greet and respond correctly in English",
              "Name their parents, siblings, friends, teachers, school and village or community",
              "Use correct kinship terms and titles to address people",
              "Use correct kinship terms to address people in English",
              "Correctly use vocabulary of jobs/work to state what family members do to earn a living",
              "Show respect in speech and behaviour",
              "Identify and take care of their personal possessions (property)",
              "Take care of school property",
              "Demonstrate the correct use of telephones and cell phones",
              "Demonstrate an understanding of the importance of giving, receiving and sharing",
              "Recite a number of short thematic poems relating to giving, receiving and sharing",
              "Sing and dance to thematic folk songs fluently and rhythmically",
              "Identify several traditional dishes",
              "Identify Lesotho and RSA coins in circulation",
              "Measure length using arbitrary units such as body measurements",
              "Measure mass using arbitrary units",
              "Measure volume using arbitrary units",
              "Identify 2-dimensional shapes (triangle, rectangle, square and circle)",
              "Sketch 2-dimensional shapes (triangle, rectangle, square and circle)",
              "Paint given shapes, managing to stay within the lines",
              "Make prints of simple designs",
              "Subtract numbers within the range 1-10",
              "Identify and use correctly the sign minus (-)",
              "Mention various names of the Supreme Being",
              "Identify different attributes associated with the Supreme Being",
              "Play and sing selected cultural games and songs fluently"
            ],
            "keyVocabulary": [
              "mother",
              "father",
              "brother",
              "sister",
              "grandmother",
              "grandfather",
              "teacher",
              "doctor",
              "nurse",
              "respect",
              "property",
              "sharing",
              "giving",
              "receiving",
              "traditional dishes",
              "coins",
              "measurement",
              "shapes"
            ],
            "exampleActivities": [
              "Learners role-play greetings when they meet and part",
              "Learners draw their parents and identify friends",
              "Learners role-play different jobs and work",
              "Learners mark their personal possessions",
              "Taking a tour to identify school property",
              "Role-playing traits of giving, receiving and sharing",
              "Singing and dancing to folk songs",
              "Playing cultural games: mokhibo, mohobelo",
              "Learners measure heights using hand-spans and strides",
              "Learners compare weights using bean bags and sand bags",
              "Learners compare volumes of different containers",
              "Learners identify, trace, sketch and paint 2D shapes"
            ],
            "assessmentFocus": [
              "Greet and respond according to cultural practice",
              "Use kinship terms and titles appropriately",
              "Demonstrate respect in different situations",
              "Take care of school property",
              "Use phone correctly with proper etiquette",
              "Sing cultural songs fluently",
              "Play cultural games cooperatively",
              "Identify Lesotho and RSA coins by colour, size, pictures and value",
              "Measure using arbitrary units",
              "Identify 2-dimensional shapes by name",
              "Sketch 2-dimensional shapes",
              "Paint within the lines",
              "Subtract within the range 1-10 using concrete objects"
            ],
            "prerequisiteTopicIds": [
              "g1-is-about-myself"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g1-sl-kinship-and-jobs",
                "description": "Using correct kinship terms and job titles in Sesotho"
              },
              {
                "subject": "English Literacy",
                "topicId": "g1-el-family-and-relationships",
                "description": "Greeting and identifying family members in English"
              },
              {
                "subject": "Numeracy",
                "topicId": "g1-num-money-and-measurement",
                "description": "Identifying coins and measuring"
              },
              {
                "subject": "Numeracy",
                "topicId": "g1-num-2d-shapes",
                "description": "Identifying and sketching 2D shapes"
              },
              {
                "subject": "Numeracy",
                "topicId": "g1-num-subtraction",
                "description": "Subtracting numbers within the range 1-10"
              }
            ]
          },
          {
            "id": "g1-is-world-around-me",
            "title": "The World Around Me",
            "description": "Learners discover the natural world including plants, animals, weather, time, and seasons, while learning to interact responsibly with their environment and understand national symbols.",
            "curriculumStandards": [
              "Environmental Adaptation and Sustainable Development",
              "Scientific and Technological",
              "Health and Healthy Living"
            ],
            "learningObjectives": [
              "Identify things (plants, animals, insects, soil, water) in their immediate environment",
              "Identify at least three uses of soil",
              "Identify plants in terms of colour, structure of leaves, odour, name and places of origin",
              "Identify domestic animals and livestock by name",
              "Distinguish various sounds from the environment",
              "Encode and decode the first triad in music",
              "Demonstrate proper basic exercising movements",
              "Identify and name sets of up to five objects in their environment",
              "Identify shapes (triangle, rectangle, square and circle) in their environment",
              "Do tessellation using squares, rectangles and triangles",
              "Identify different weather conditions (windy, sunny, rainy, cold, hot, cloudy, snowy)",
              "Identify different times of the day (morning, noon, afternoon, evening, night)",
              "Cite months of the year in order",
              "Cite seasons of the year (Spring, Summer, Autumn, Winter)",
              "Use the calendar to identify months of the year and days of the week",
              "Demonstrate ways of caring for the natural environment",
              "Demonstrate ways to making use of agricultural waste",
              "Demonstrate reuse of materials for sustainable development",
              "State signs and symbols found at home and at school",
              "State national symbols used in Lesotho (national flag, anthem, coat of arms)",
              "Demonstrate appreciation of national anthem",
              "Make signs and symbols for road safety",
              "Find the missing numbers in addition number facts within the range 1-10",
              "Find the missing numbers in subtraction number facts within the range 1-10"
            ],
            "keyVocabulary": [
              "plants",
              "animals",
              "insects",
              "soil",
              "water",
              "weather",
              "morning",
              "afternoon",
              "evening",
              "night",
              "months",
              "seasons",
              "calendar",
              "conservation",
              "recycling",
              "national flag",
              "national anthem",
              "coat of arms",
              "road safety"
            ],
            "exampleActivities": [
              "Observing and exploring natural environment at home and school",
              "Collecting and sorting plants by colour, shape and smell",
              "Imitating sounds made by different animals",
              "Observing and recording weather conditions for a week",
              "Singing songs about different times of day",
              "Sequencing months of the year written on cards",
              "Carrying out activities to conserve water or soil",
              "Drawing and colouring national flag",
              "Making signs and symbols for road safety",
              "Collecting dung to prepare fuel (mapharoa)",
              "Reusing materials to make craft items",
              "Singing hand signs for first triad (doh, me, soh)",
              "Performing non-locomotor exercises"
            ],
            "assessmentFocus": [
              "Identify things in immediate environment",
              "List three uses of soil",
              "Name recorded plant specimens",
              "Read names of animals correctly",
              "Identify and name weather conditions",
              "Cite months of the year in order",
              "Use calendar to identify days and months",
              "Carry out conservation activities",
              "Sing national anthem appropriately",
              "Recycle agricultural waste",
              "Make craft items using reusable materials",
              "Sing and sign the first triad",
              "Demonstrate proper basic exercising movements",
              "Find missing numbers in addition and subtraction facts"
            ],
            "prerequisiteTopicIds": [
              "g1-is-about-myself"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g1-sl-time-and-calendar",
                "description": "Learning days, months and seasons in Sesotho"
              },
              {
                "subject": "English Literacy",
                "topicId": "g1-el-time-and-seasons",
                "description": "Naming days, months and seasons in English"
              },
              {
                "subject": "Numeracy",
                "topicId": "g1-num-shapes-in-environment",
                "description": "Identifying shapes in the environment"
              },
              {
                "subject": "Numeracy",
                "topicId": "g1-num-number-facts",
                "description": "Finding missing numbers in number facts"
              }
            ]
          },
          {
            "id": "g1-is-looking-after-myself",
            "title": "Looking After Myself",
            "description": "Learners are introduced to principles of health, nutrition, safety, hygiene, and disaster preparedness appropriate for young children in Lesotho.",
            "curriculumStandards": [
              "Health and Healthy Living",
              "Environmental Adaptation and Sustainable Development",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "Promote cleanliness at home and school",
              "Identify basic human needs",
              "Express the link between rights and responsibilities of children",
              "Identify and play indigenous games that promote healthy living",
              "Identify mathematical concepts found in indigenous games",
              "Identify domestic uses of some plants (as food, medicine and dye)",
              "Identify at least eight common food crops: cabbage, beans, maize, wheat, pumpkins, beetroot, potatoes, carrots",
              "Identify four types of seeds: beans, peas, pumpkin and maize",
              "Identify five fruits: peach, pear, apricot, apple and plum",
              "Apply addition and subtraction to solve real-life problems",
              "Identify the components of a balanced diet",
              "Identify how traditional dishes can be part of a balanced diet",
              "Identify methods of preserving food",
              "Demonstrate drying of leafy vegetables",
              "Identify two indigenous vegetables that promote healthy living",
              "Identify two indigenous medicinal herbs (mohalakane, lengana)",
              "Recognise infectious diseases and their signs",
              "Discuss precautions against infectious diseases (measles and chicken pox)",
              "Identify proper ways of controlling litter",
              "Use tally marks to record litter in the environment",
              "Use pictograms to give information about real-life contexts",
              "Interpret pictograms that represent health, environment and cultural issues",
              "Identify warning signs to help to prevent injuries and diseases",
              "Demonstrate a preparedness plan for snowfall",
              "Identify different ways of protecting people and their property during snowfall",
              "Dramatise appropriate behaviour after snowfall",
              "Demonstrate a preparedness plan for fire",
              "Demonstrate proper behaviour and precautions during fire",
              "Demonstrate proper use of the First Aid Kit"
            ],
            "keyVocabulary": [
              "cleanliness",
              "needs",
              "wants",
              "rights",
              "responsibilities",
              "balanced diet",
              "food preservation",
              "infectious diseases",
              "measles",
              "chicken pox",
              "litter",
              "tally marks",
              "pictogram",
              "snowfall",
              "fire safety",
              "first aid"
            ],
            "exampleActivities": [
              "Cleaning classroom under supervision",
              "Classifying pictures according to needs and wants",
              "Matching rights with corresponding responsibilities",
              "Playing indigenous games: ho kalla, lesokoana, moraba-raba, cheko, liketoana, khati",
              "Collecting and sorting plants according to uses",
              "Sorting food stuffs into components of balanced diet",
              "Drying leafy vegetables",
              "Collecting indigenous vegetables and medicinal herbs",
              "Drawing pictures of patients with measles/chicken pox",
              "Simulating safe behaviour during epidemic",
              "Using tally marks to record litter",
              "Creating pictograms of collected objects",
              "Role-playing preparedness for snowfall and fire",
              "Simulating use of First Aid Kit"
            ],
            "assessmentFocus": [
              "Contribute to keeping classroom and school clean",
              "List basic human needs",
              "Match rights and responsibilities",
              "Play indigenous games",
              "Sort plants according to uses",
              "Sort foods into balanced diet components",
              "Dry and store leafy vegetables",
              "Identify medicinal herbs",
              "Mention signs of infectious diseases",
              "Simulate safe behaviour during disease outbreak",
              "Use tally marks to record litter",
              "Interpret pictograms",
              "Role-play preparedness plans",
              "Demonstrate proper use of First Aid Kit"
            ],
            "prerequisiteTopicIds": [
              "g1-is-about-myself",
              "g1-is-world-around-me"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g1-num-data-handling",
                "description": "Using tally marks and pictograms to record data about health and environment"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g1-sl-health-and-safety",
                "description": "Learning vocabulary related to health, food and safety"
              },
              {
                "subject": "Numeracy",
                "topicId": "g1-num-addition-subtraction-applications",
                "description": "Applying addition and subtraction to solve real-life problems"
              }
            ]
          }
        ]
      },
      {
        "name": "Sesotho Literacy",
        "topics": [
          {
            "id": "g1-sl-greetings-and-respect",
            "title": "Greetings and Respect",
            "description": "Learners acquire basic literacy skills while learning to greet appropriately and show respect according to Basotho cultural practices.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "Greet and respond to greetings correctly and respectfully",
              "Show respect in behaviour and speech",
              "Request, thank and apologise appropriately",
              "Follow cultural practice when greeting",
              "Write their names correctly"
            ],
            "keyVocabulary": [
              "lumela",
              "lumelang",
              "ke a leboha",
              "ntÅ¡oarele",
              "tlhompho",
              "lebitso",
              "fane"
            ],
            "exampleActivities": [
              "Role-playing greetings in different situations",
              "Practising greeting in pairs and groups",
              "Discussing importance of greetings and respect",
              "Role-playing situations showing respect",
              "Writing and tracing their names"
            ],
            "assessmentFocus": [
              "Greet and respond appropriately with teacher guidance",
              "Greet and respond unprompted",
              "Request and thank appropriately",
              "Apologise when appropriate",
              "Write name correctly starting with capital letter"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-about-myself",
                "description": "Introducing oneself in cultural context"
              },
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-relating-to-others",
                "description": "Showing respect when relating to others"
              }
            ]
          },
          {
            "id": "g1-sl-letter-sounds-single",
            "title": "Single Letter Sounds",
            "description": "Learners are introduced to recognition and formation of single letter sounds in Sesotho, laying foundation for reading and writing.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Distinguish sounds formed by single letters (a, e, i, o, u, b, f, h, j, k, l, m, n, p, q, r, s, t)",
              "Form words with single letter sounds",
              "Write letters correctly",
              "Read words with learned sounds"
            ],
            "keyVocabulary": [
              "molumo",
              "tlhaku",
              "lentsoe",
              "bala",
              "ngola"
            ],
            "exampleActivities": [
              "Making sentences based on pictures",
              "Forming words with focus sound",
              "Imitating teacher when reading sounds",
              "Writing letters in sand and on ground",
              "Reading sounds to teacher",
              "Reading sounds to parents who sign to confirm"
            ],
            "assessmentFocus": [
              "Form sentences from pictures",
              "Form words with chosen sound",
              "Imitate teacher reading sounds",
              "Read sounds independently",
              "Write sounds correctly",
              "Identify sound within a word"
            ],
            "prerequisiteTopicIds": [
              "g1-sl-greetings-and-respect"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g1-sl-word-formation",
            "title": "Word Formation",
            "description": "Learners develop ability to form and read simple four-letter words using single letter sounds they have learned.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Form four-letter words with single letter sounds correctly",
              "Pronounce words correctly",
              "Write words correctly on the line",
              "Work cooperatively in groups"
            ],
            "keyVocabulary": [
              "bana",
              "lema",
              "sila",
              "bolo",
              "fofa"
            ],
            "exampleActivities": [
              "Teacher writes words for copying",
              "Filling in missing letters in words",
              "Forming words starting with given sound",
              "Copying words in groups",
              "Reading words by calling each sound then whole word",
              "Reading words to parents who sign"
            ],
            "assessmentFocus": [
              "Form words correctly",
              "Pronounce words correctly",
              "Write each letter on the line",
              "Copy correctly",
              "Work well with others in groups"
            ],
            "prerequisiteTopicIds": [
              "g1-sl-letter-sounds-single"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g1-sl-listening-and-stories",
            "title": "Listening and Stories",
            "description": "Learners develop listening comprehension skills by listening to short stories and responding to questions.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Listen to short stories for comprehension",
              "Answer questions: what, who, where, when, why",
              "Retell story briefly",
              "Act out parts of story",
              "Identify lesson from story"
            ],
            "keyVocabulary": [
              "pale",
              "mamela",
              "eng",
              "mang",
              "kae",
              "neng",
              "hobane'ng",
              "thuto"
            ],
            "exampleActivities": [
              "Discussing importance of not interrupting",
              "Listening to short story",
              "Answering comprehension questions",
              "Acting out parts of the story",
              "Discussing lesson from story"
            ],
            "assessmentFocus": [
              "Listen without interrupting",
              "Answer questions correctly",
              "Show emotional response to story",
              "Act out story parts correctly",
              "Retell part of story",
              "State lesson from story",
              "Not laugh at others when speaking"
            ],
            "prerequisiteTopicIds": [
              "g1-sl-greetings-and-respect"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-relating-to-others",
                "description": "Understanding cultural stories and their lessons"
              }
            ]
          },
          {
            "id": "g1-sl-kinship-and-jobs",
            "title": "Kinship Terms and Jobs",
            "description": "Learners learn to correctly use kinship terms and identify people according to their jobs.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Awareness of Self and Others",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Use correct kinship terms ('mÃ¨, ntate, ausi, abuti, nkhono, ntate-moholo)",
              "Name people according to their jobs (tichere, ngaka, mooki)",
              "Write and read kinship terms and job titles",
              "Distinguish people by their work"
            ],
            "keyVocabulary": [
              "'mÃ¨",
              "ntate",
              "ausi",
              "abuti",
              "nkhono",
              "ntate-moholo",
              "tichere",
              "ngaka",
              "mooki"
            ],
            "exampleActivities": [
              "Discussing relatives learners don't know",
              "Role-playing situations using kinship terms",
              "Matching pictures with describing words",
              "Writing and reading kinship terms",
              "Finding out about jobs of teacher, doctor, nurse",
              "Role-playing different jobs"
            ],
            "assessmentFocus": [
              "Name people correctly according to relationship",
              "Write and read kinship terms",
              "Name people according to their jobs",
              "Distinguish people by their work",
              "Act out different jobs"
            ],
            "prerequisiteTopicIds": [
              "g1-sl-greetings-and-respect",
              "g1-sl-word-formation"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-relating-to-others",
                "description": "Naming family members and understanding their roles"
              }
            ]
          },
          {
            "id": "g1-sl-diagraphs",
            "title": "Diagraphs and Complex Sounds",
            "description": "Learners are introduced to sounds formed by two letters (diagraphs) and sounds with apostrophe in Sesotho.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Distinguish diagraphs: ea, oa, oe, ch, nk, nt, ng, ph, sh, th, tl, ts, ue, hl, ll, mp",
              "Distinguish sounds with apostrophe: 'm, 'n, Ã¨",
              "Form words with these sounds",
              "Write and read words with complex sounds"
            ],
            "keyVocabulary": [
              "sehonyetso",
              "melumo e bopiloeng ka tlhaku tse peli"
            ],
            "exampleActivities": [
              "Making sentences from pictures",
              "Forming words with focus diagraph",
              "Imitating teacher reading sounds",
              "Writing letters in sand and on ground",
              "Reading sounds to teacher and parents",
              "Writing words with diagraphs"
            ],
            "assessmentFocus": [
              "Form sentences from pictures",
              "Form words with chosen sound",
              "Imitate teacher reading sounds",
              "Read sounds independently",
              "Write sounds correctly",
              "Identify sound within word"
            ],
            "prerequisiteTopicIds": [
              "g1-sl-letter-sounds-single",
              "g1-sl-word-formation"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g1-sl-time-and-calendar",
            "title": "Time and Calendar",
            "description": "Learners learn vocabulary related to time of day, days of week, months and seasons in Sesotho.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Scientific and Technological"
            ],
            "learningObjectives": [
              "Name times of day (hoseng, motÅ¡eare, mantsiboea, bosiu)",
              "Recite days of week in order",
              "Recite months of year in order",
              "Name seasons of year (selemo, hlabula, hoetla, mariha)",
              "Sequence times, days, months and seasons"
            ],
            "keyVocabulary": [
              "hoseng",
              "motÅ¡eare",
              "mantsiboea",
              "bosiu",
              "matsatsi a beke",
              "likhoeli tsa selemo",
              "linako tsa selemo"
            ],
            "exampleActivities": [
              "Discussing differences between times of day",
              "Mentioning things seen at different times",
              "Singing songs about days and months",
              "Copying days and months from chart",
              "Sequencing cards with days/months",
              "Identifying times using shadows"
            ],
            "assessmentFocus": [
              "Name times of day using prompts",
              "Name times of day unprompted",
              "Cite days of week in order",
              "Cite months of year in order",
              "Copy days and months correctly",
              "Sequence time periods correctly"
            ],
            "prerequisiteTopicIds": [
              "g1-sl-word-formation"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-world-around-me",
                "description": "Learning about time, calendar, and seasons"
              },
              {
                "subject": "Numeracy",
                "topicId": "g1-num-counting-1-20",
                "description": "Counting days and understanding number of days/months"
              }
            ]
          },
          {
            "id": "g1-sl-opposites-and-directions",
            "title": "Opposites and Directions",
            "description": "Learners learn to use opposite words and directional vocabulary in sentences.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Use opposite words in sentences (chesa-bata, koala-bula, ema-lula)",
              "Give and follow directions (lehojeng, leqeleng, hare, tlas'a, holim'a)",
              "Match opposites correctly",
              "Describe location using directional words"
            ],
            "keyVocabulary": [
              "chesa",
              "bata",
              "koala",
              "bula",
              "ema",
              "lula",
              "lehojeng",
              "leqeleng",
              "hare",
              "tlas'a",
              "holim'a"
            ],
            "exampleActivities": [
              "Demonstrating opposite actions",
              "Role-playing using opposite words",
              "Following directional instructions",
              "Giving directions to classmates",
              "Matching opposite word pairs",
              "Describing positions of objects"
            ],
            "assessmentFocus": [
              "Use opposite words correctly in context",
              "Follow simple directional instructions",
              "Give clear directions to others",
              "Match opposite pairs correctly",
              "Describe locations accurately"
            ],
            "prerequisiteTopicIds": [
              "g1-sl-word-formation"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g1-sl-sentence-structure",
            "title": "Basic Sentence Structure",
            "description": "Learners are introduced to basic sentence structure and grammar, including nouns, adjectives, and adverbs.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Identify nouns in sentences",
              "Use adjectives of colour correctly",
              "Use adverbs of time appropriately",
              "Form simple sentences",
              "Recognize sentence structure"
            ],
            "keyVocabulary": [
              "lebitso",
              "mmala",
              "nako",
              "polelo"
            ],
            "exampleActivities": [
              "Identifying objects (nouns) in the classroom",
              "Describing objects using colours",
              "Using time words in sentences",
              "Constructing simple sentences",
              "Matching words with pictures"
            ],
            "assessmentFocus": [
              "Identify nouns correctly",
              "Use colour adjectives appropriately",
              "Use time adverbs correctly",
              "Form simple grammatical sentences",
              "Show understanding of word order"
            ],
            "prerequisiteTopicIds": [
              "g1-sl-word-formation",
              "g1-sl-diagraphs"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g1-sl-health-and-safety",
            "title": "Health and Safety Vocabulary",
            "description": "Learners acquire vocabulary related to health, food, and safety in Sesotho.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Health and Healthy Living"
            ],
            "learningObjectives": [
              "Name common food items in Sesotho",
              "Identify vocabulary related to cleanliness",
              "Learn safety-related words",
              "Use health and safety vocabulary in context"
            ],
            "keyVocabulary": [
              "lijo",
              "bohlokoa",
              "polokeho",
              "bophelo",
              "hlwekileng"
            ],
            "exampleActivities": [
              "Naming traditional dishes",
              "Discussing importance of cleanliness",
              "Learning safety vocabulary through role-play",
              "Reading simple texts about health",
              "Drawing and labeling healthy foods"
            ],
            "assessmentFocus": [
              "Name food items correctly",
              "Use cleanliness vocabulary appropriately",
              "Demonstrate understanding of safety terms",
              "Apply vocabulary in context",
              "Read simple health-related texts"
            ],
            "prerequisiteTopicIds": [
              "g1-sl-word-formation",
              "g1-sl-diagraphs"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-looking-after-myself",
                "description": "Learning about health, nutrition and safety"
              }
            ]
          }
        ]
      },
      {
        "name": "English Literacy",
        "topics": [
          {
            "id": "g1-el-greetings-and-introductions",
            "title": "Greetings and Introductions",
            "description": "Learners acquire initial basic oral skills in English with a focus on greetings and simple introductions.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "Greet and respond correctly in English (Good morning, Good day, Good evening)",
              "Introduce themselves in English (name, surname, age, gender)",
              "Use classroom requests appropriately (Please Madam/Sir, may I...)",
              "Speak with clear pronunciation"
            ],
            "keyVocabulary": [
              "Good morning",
              "Good day",
              "Good evening",
              "Hello",
              "name",
              "surname",
              "age",
              "boy",
              "girl",
              "please",
              "thank you"
            ],
            "exampleActivities": [
              "Teacher teaches greetings used at different times of day",
              "Learners act out greeting each other at different times",
              "Learners introduce themselves individually under guidance",
              "Learners practice in pairs and small groups",
              "Role-playing classroom request scenarios",
              "Listening to greetings on the radio"
            ],
            "assessmentFocus": [
              "Recite correct greeting and response when guided by teacher",
              "Use correct response when given greeting as prompt",
              "Use correct greeting unprompted",
              "Say name correctly in response to prompt",
              "Say age correctly in response to prompt",
              "Introduce themselves unprompted stating name, age and gender",
              "Request to go out using proper English"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-about-myself",
                "description": "Introducing themselves in different languages"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g1-sl-greetings-and-respect",
                "description": "Comparing greetings in Sesotho and English"
              }
            ]
          },
          {
            "id": "g1-el-body-parts",
            "title": "Parts of the Body",
            "description": "Learners learn to identify and name different parts of the body in English through songs and activities.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Health and Healthy Living"
            ],
            "learningObjectives": [
              "Identify different parts of the body in English",
              "Name parts of the body: head, ear, eye, mouth, tooth, nose, hand, finger, shoulders, knees, tongue, toes",
              "Sing and perform actions to body parts songs",
              "Pronounce body part words correctly"
            ],
            "keyVocabulary": [
              "head",
              "ear",
              "eye",
              "mouth",
              "tooth",
              "nose",
              "hand",
              "finger",
              "shoulders",
              "knees",
              "tongue",
              "toes"
            ],
            "exampleActivities": [
              "Teacher teaches names of different parts of the body",
              "Learners point at body parts and name them in pairs",
              "Looking at pictures of body parts and naming them",
              "Drawing pictures and teacher labels parts",
              "Singing 'Head, shoulders, knees and toes' with actions",
              "Learning and performing other body parts rhymes"
            ],
            "assessmentFocus": [
              "Identify parts of their bodies in response to prompts",
              "Point at different parts of bodies and name them correctly unprompted",
              "Sing given rhymes performing appropriate actions",
              "Pronounce words correctly whilst singing"
            ],
            "prerequisiteTopicIds": [
              "g1-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-about-myself",
                "description": "Identifying external parts of the body"
              }
            ]
          },
          {
            "id": "g1-el-days-of-week",
            "title": "Days of the Week",
            "description": "Learners learn to name and sequence the days of the week in English through songs and chants.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Scientific and Technological"
            ],
            "learningObjectives": [
              "Name the days of the week in order in English",
              "Recite days of the week with correct pronunciation",
              "Sing songs about days of the week"
            ],
            "keyVocabulary": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
              "week",
              "day"
            ],
            "exampleActivities": [
              "Learners brainstorm days they already know",
              "Chanting days in order with correct pronunciation",
              "Learning and singing songs about days of the week",
              "Copying days from chart",
              "Sequencing day cards"
            ],
            "assessmentFocus": [
              "Recite days of the week in order when prompted",
              "Recite days of the week in order unprompted",
              "Pronounce day names correctly"
            ],
            "prerequisiteTopicIds": [
              "g1-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g1-num-counting-1-20",
                "description": "Counting days and understanding weekly sequence"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g1-sl-time-and-calendar",
                "description": "Learning days in both languages"
              }
            ]
          },
          {
            "id": "g1-el-gender-identification",
            "title": "Gender Identification",
            "description": "Learners learn to identify and name people according to gender and age in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "Identify people as boys, girls, men and women",
              "Use correct gender terms when describing people",
              "Match words with pictures of people",
              "Draw and label people by gender"
            ],
            "keyVocabulary": [
              "boy",
              "girl",
              "man",
              "woman",
              "he",
              "she"
            ],
            "exampleActivities": [
              "Teacher introduces vocabulary using pictures",
              "Learners match words with pictures",
              "Drawing pictures of boy, girl, man and woman",
              "Teacher labels learner drawings",
              "Identifying variety of pictures with correct words"
            ],
            "assessmentFocus": [
              "Identify people as boy, girl, man or woman when prompted",
              "Differentiate between genders independently",
              "Use appropriate pronouns"
            ],
            "prerequisiteTopicIds": [
              "g1-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-about-myself",
                "description": "Understanding personal identity and gender"
              }
            ]
          },
          {
            "id": "g1-el-family-and-relationships",
            "title": "Family and Relationships",
            "description": "Learners learn vocabulary related to family members and relationships in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "Name family members in English (mother, father, sister, brother, grandmother, grandfather)",
              "Use kinship terms correctly in English",
              "Identify relationships between people",
              "Describe their family in simple English"
            ],
            "keyVocabulary": [
              "mother",
              "father",
              "sister",
              "brother",
              "grandmother",
              "grandfather",
              "family",
              "parent"
            ],
            "exampleActivities": [
              "Introducing family members using pictures or drawings",
              "Role-playing family relationships",
              "Drawing family and labeling in English",
              "Singing songs about family",
              "Matching relationship words to pictures"
            ],
            "assessmentFocus": [
              "Name family members correctly",
              "Use kinship terms appropriately",
              "Describe family members in simple sentences",
              "Identify relationships in pictures"
            ],
            "prerequisiteTopicIds": [
              "g1-el-greetings-and-introductions",
              "g1-el-gender-identification"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-relating-to-others",
                "description": "Understanding family relationships and roles"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g1-sl-kinship-and-jobs",
                "description": "Learning kinship terms in both languages"
              }
            ]
          },
          {
            "id": "g1-el-classroom-language",
            "title": "Classroom Language and Instructions",
            "description": "Learners learn to understand and respond to simple classroom instructions in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Understand simple classroom instructions",
              "Follow basic commands (stand up, sit down, come here, be quiet)",
              "Respond appropriately to teacher's requests",
              "Use polite classroom language"
            ],
            "keyVocabulary": [
              "stand up",
              "sit down",
              "come here",
              "be quiet",
              "listen",
              "look",
              "open",
              "close",
              "stop",
              "start"
            ],
            "exampleActivities": [
              "Teacher demonstrates actions with commands",
              "Simon Says game using classroom instructions",
              "Following multi-step instructions",
              "Role-playing being the teacher",
              "Practicing polite requests"
            ],
            "assessmentFocus": [
              "Follow simple one-step instructions",
              "Follow two-step instructions",
              "Respond appropriately without translation",
              "Use polite language when requesting"
            ],
            "prerequisiteTopicIds": [
              "g1-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g1-el-numbers-and-counting",
            "title": "Numbers and Counting in English",
            "description": "Learners learn to count and recognize numbers from 1 to 20 in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Numerical and Mathematical",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Count from 1 to 20 in English",
              "Recognize and name numerals 1-20 in English",
              "Pronounce number words correctly",
              "Use numbers in simple contexts"
            ],
            "keyVocabulary": [
              "one",
              "two",
              "three",
              "four",
              "five",
              "six",
              "seven",
              "eight",
              "nine",
              "ten",
              "eleven",
              "twelve",
              "thirteen",
              "fourteen",
              "fifteen",
              "sixteen",
              "seventeen",
              "eighteen",
              "nineteen",
              "twenty"
            ],
            "exampleActivities": [
              "Counting objects in English",
              "Singing counting songs",
              "Playing counting games",
              "Matching numerals with English words",
              "Counting classroom objects"
            ],
            "assessmentFocus": [
              "Count from 1 to 20 correctly",
              "Name numerals in English",
              "Pronounce numbers correctly",
              "Use numbers to describe quantities"
            ],
            "prerequisiteTopicIds": [
              "g1-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g1-num-counting-1-20",
                "description": "Counting in English and understanding numerals"
              }
            ]
          },
          {
            "id": "g1-el-colours-and-shapes",
            "title": "Colours and Shapes",
            "description": "Learners learn to name and identify colours and basic shapes in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Creativity and Entrepreneurial"
            ],
            "learningObjectives": [
              "Name basic colours in English (red, blue, yellow, green, black, white, brown)",
              "Identify and name basic shapes (circle, square, triangle, rectangle)",
              "Describe objects using colour and shape words",
              "Match colour and shape words with objects"
            ],
            "keyVocabulary": [
              "red",
              "blue",
              "yellow",
              "green",
              "black",
              "white",
              "brown",
              "orange",
              "circle",
              "square",
              "triangle",
              "rectangle"
            ],
            "exampleActivities": [
              "Identifying colours in the classroom",
              "Sorting objects by colour",
              "Drawing and colouring shapes",
              "Playing colour and shape matching games",
              "Describing objects using colour and shape"
            ],
            "assessmentFocus": [
              "Name colours correctly",
              "Identify shapes correctly",
              "Describe objects using colour and shape",
              "Sort objects by colour and shape"
            ],
            "prerequisiteTopicIds": [
              "g1-el-classroom-language"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g1-num-2d-shapes",
                "description": "Learning about shapes in mathematics"
              }
            ]
          },
          {
            "id": "g1-el-time-and-seasons",
            "title": "Time of Day and Seasons",
            "description": "Learners learn to identify times of day, months, and seasons in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Scientific and Technological",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Identify times of day (morning, afternoon, evening, night)",
              "Name months of the year in English",
              "Name seasons (Spring, Summer, Autumn, Winter)",
              "Associate activities with times of day"
            ],
            "keyVocabulary": [
              "morning",
              "afternoon",
              "evening",
              "night",
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
              "Spring",
              "Summer",
              "Autumn",
              "Winter"
            ],
            "exampleActivities": [
              "Discussing activities done at different times of day",
              "Singing songs about months and seasons",
              "Matching pictures to times of day",
              "Learning about seasonal changes",
              "Creating a class calendar"
            ],
            "assessmentFocus": [
              "Identify times of day correctly",
              "Name months in order",
              "Name the four seasons",
              "Describe activities associated with different times"
            ],
            "prerequisiteTopicIds": [
              "g1-el-days-of-week"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-world-around-me",
                "description": "Learning about time, calendar and seasons"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g1-sl-time-and-calendar",
                "description": "Understanding time concepts in both languages"
              }
            ]
          },
          {
            "id": "g1-el-common-objects",
            "title": "Common Objects and Vocabulary",
            "description": "Learners build vocabulary of common objects found at home and school.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Name common classroom objects",
              "Name common household items",
              "Use simple adjectives to describe objects",
              "Identify objects from descriptions"
            ],
            "keyVocabulary": [
              "book",
              "pencil",
              "pen",
              "desk",
              "chair",
              "bag",
              "ruler",
              "door",
              "window",
              "table",
              "cup",
              "plate"
            ],
            "exampleActivities": [
              "Identifying and naming classroom objects",
              "Describing objects using adjectives",
              "Playing 'I spy' game with objects",
              "Drawing and labeling common items",
              "Matching words with pictures"
            ],
            "assessmentFocus": [
              "Name common objects correctly",
              "Describe objects using simple adjectives",
              "Identify objects from oral descriptions",
              "Use vocabulary in context"
            ],
            "prerequisiteTopicIds": [
              "g1-el-classroom-language",
              "g1-el-colours-and-shapes"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g1-el-action-verbs",
            "title": "Basic Action Verbs",
            "description": "Learners learn common action verbs and use them in simple sentences.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Identify and perform basic actions (run, jump, walk, sit, stand, eat, drink, sleep)",
              "Use action words in simple sentences",
              "Respond to action commands",
              "Demonstrate understanding through actions"
            ],
            "keyVocabulary": [
              "run",
              "jump",
              "walk",
              "sit",
              "stand",
              "eat",
              "drink",
              "sleep",
              "play",
              "read",
              "write",
              "draw"
            ],
            "exampleActivities": [
              "Acting out different actions",
              "Playing action games (Simon Says)",
              "Matching action words to pictures",
              "Making simple sentences with actions",
              "Drawing pictures of people doing actions"
            ],
            "assessmentFocus": [
              "Perform actions when named",
              "Name actions being performed",
              "Use action words in simple sentences",
              "Follow action commands correctly"
            ],
            "prerequisiteTopicIds": [
              "g1-el-classroom-language"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g1-el-simple-sentences",
            "title": "Simple Sentences and Communication",
            "description": "Learners begin to form and use simple sentences in English for basic communication.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Form simple sentences using subject and verb",
              "Use 'I can' and 'I like' structures",
              "Respond to simple questions in English",
              "Express basic needs and preferences"
            ],
            "keyVocabulary": [
              "I can",
              "I like",
              "I want",
              "I have",
              "I am",
              "yes",
              "no"
            ],
            "exampleActivities": [
              "Practicing 'I can' sentences with actions",
              "Expressing likes and dislikes",
              "Answering yes/no questions",
              "Role-playing simple conversations",
              "Making sentences about themselves"
            ],
            "assessmentFocus": [
              "Form simple grammatical sentences",
              "Use sentence structures correctly",
              "Respond appropriately to questions",
              "Express basic needs in English"
            ],
            "prerequisiteTopicIds": [
              "g1-el-action-verbs",
              "g1-el-common-objects"
            ],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Numeracy",
        "topics": [
          {
            "id": "g1-num-sorting-and-sets",
            "title": "Sorting and Making Sets",
            "description": "Learners develop fundamental mathematical thinking by sorting objects and forming sets based on common properties.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Sort objects by colour, size and shape",
              "Form sets using concrete objects",
              "Compare sets using numbers of members/elements",
              "Make sets by number of elements",
              "Use the word 'set' when referring to a group of objects",
              "Match sets into one-to-one correspondence"
            ],
            "keyVocabulary": [
              "set",
              "sorting",
              "members",
              "elements",
              "colour",
              "size",
              "shape",
              "same",
              "different",
              "group"
            ],
            "exampleActivities": [
              "Sort concrete objects by colour",
              "Sort concrete objects by size",
              "Sort concrete objects by shape",
              "Form sets using concrete objects (members 1 to 5)",
              "Describe formed sets by common property",
              "Compare numbers of elements of two sets",
              "Match sets into one-to-one correspondence"
            ],
            "assessmentFocus": [
              "Sort objects by colour, size and shape",
              "Form sets using concrete objects",
              "Compare sets using numbers of members/elements",
              "Make sets by number of elements",
              "Use the word set when referring to a group of objects"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-about-myself",
                "description": "Sorting themselves and objects"
              }
            ]
          },
          {
            "id": "g1-num-counting-1-20",
            "title": "Counting and Number Recognition 1-20",
            "description": "Learners develop number sense by learning to count, recognize, read and write numbers from 1 to 20.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Recognize numbers and their relationship within the range 1-20",
              "Count numbers 1-20",
              "Compare two numbers and say which is greater",
              "Identify cardinal and ordinal numbers (first, second, third)",
              "Recognize that arrangement does not affect quantity (conservation of number)",
              "Read and write numerals representing number of concrete objects",
              "Identify place value of 2 digit numbers",
              "Recognize numerals in a sequence 1-20",
              "Fill missing numbers in a sequence",
              "Arrange mixed numerals in a sequence"
            ],
            "keyVocabulary": [
              "numbers 1-20",
              "count",
              "numeral",
              "first",
              "second",
              "third",
              "more",
              "less",
              "greater",
              "sequence",
              "order"
            ],
            "exampleActivities": [
              "Recite poems depicting numbers 1-20",
              "Count numbers 1-20",
              "Read and write numbers 1-20",
              "Play games to compare two numbers",
              "Identify cardinal and ordinal numbers",
              "Identify next numbers in a sequence",
              "Fill missing numbers in a sequence",
              "Arrange mixed numerals in a sequence",
              "Change order of objects to show conservation"
            ],
            "assessmentFocus": [
              "Recognize numbers and their relationship within the range 1-20",
              "Count numbers 1-20",
              "Compare two numbers and say which is greater",
              "Identify cardinal and ordinal numbers",
              "Recognize that arrangement does not affect quantity",
              "Read and write numerals representing number of concrete objects"
            ],
            "prerequisiteTopicIds": [
              "g1-num-sorting-and-sets"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-about-myself",
                "description": "Counting age and days of the week"
              },
              {
                "subject": "English Literacy",
                "topicId": "g1-el-numbers-and-counting",
                "description": "Learning number names in English"
              }
            ]
          },
          {
            "id": "g1-num-place-value",
            "title": "Place Value - Tens and Units",
            "description": "Learners begin to understand place value by grouping objects into tens and units.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving"
            ],
            "learningObjectives": [
              "Identify place value of 2 digit numbers",
              "Group objects in tens and units",
              "Write numbers showing tens and units (T and U)",
              "Use abacus to identify place value",
              "Represent numbers by strokes/bundles of tens and units"
            ],
            "keyVocabulary": [
              "tens",
              "units",
              "place value",
              "bundle",
              "abacus",
              "digit"
            ],
            "exampleActivities": [
              "Group objects in tens and units and write T and U",
              "Use abacus to identify place value of 2 digit numbers",
              "Represent numbers by strokes/bundles of tens and units",
              "Practice with linking blocks and counters",
              "Use beans and peas for grouping"
            ],
            "assessmentFocus": [
              "Identify place value of 2 digit numbers",
              "Group objects correctly into tens and units",
              "Write numbers in tens and units format",
              "Use abacus to show place value"
            ],
            "prerequisiteTopicIds": [
              "g1-num-counting-1-20"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g1-num-addition",
            "title": "Addition within 1-10",
            "description": "Learners develop addition skills using concrete objects and number facts within the range 1-10.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving"
            ],
            "learningObjectives": [
              "Form families of numbers in the range 1 to 10",
              "Generate number bonds in the range 1-10",
              "Use the sign + (plus) and = (equal) correctly",
              "Use number names in various real-life contexts",
              "Use own problem-solving strategies to solve addition problems",
              "Add numbers within the range 1 to 10",
              "Use number line to model addition",
              "Recall addition facts of numbers 1-10"
            ],
            "keyVocabulary": [
              "add",
              "addition",
              "plus",
              "equal",
              "sum",
              "total",
              "number bond",
              "number family",
              "altogether"
            ],
            "exampleActivities": [
              "Form families of numbers in the range 1-10",
              "Manipulate numbers to identify number bonds",
              "Use number line to model addition",
              "Recall addition facts of numbers 1-10",
              "Read telephone and cell phone numbers",
              "Solve real-life addition problems"
            ],
            "assessmentFocus": [
              "Form families of numbers in the range 1 to 10",
              "Generate number bonds in the range 1-10",
              "Use the sign + (plus) and = (equal) correctly to solve real-life problems",
              "Use number names in various real-life contexts",
              "Use own problem-solving strategies to solve addition problems"
            ],
            "prerequisiteTopicIds": [
              "g1-num-counting-1-20"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-about-myself",
                "description": "Adding numbers in daily contexts"
              }
            ]
          },
          {
            "id": "g1-num-subtraction",
            "title": "Subtraction within 1-10",
            "description": "Learners develop subtraction skills using concrete objects within the range 1-10.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving"
            ],
            "learningObjectives": [
              "Subtract numbers within the range 1-10",
              "Identify and use correctly the sign minus (-)",
              "Use subtraction to solve real-life problems",
              "Understand subtraction as taking away",
              "Use concrete objects to demonstrate subtraction"
            ],
            "keyVocabulary": [
              "subtract",
              "subtraction",
              "minus",
              "take away",
              "difference",
              "less",
              "remain",
              "left"
            ],
            "exampleActivities": [
              "Subtract using concrete objects",
              "Practice taking away from groups",
              "Use number line for subtraction",
              "Solve simple subtraction problems",
              "Apply subtraction to real-life situations"
            ],
            "assessmentFocus": [
              "Subtract within the range 1-10 using concrete objects",
              "Use the minus sign correctly",
              "Solve simple subtraction problems",
              "Apply subtraction to real situations"
            ],
            "prerequisiteTopicIds": [
              "g1-num-addition"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-relating-to-others",
                "description": "Using subtraction in daily contexts"
              }
            ]
          },
          {
            "id": "g1-num-2d-shapes",
            "title": "2-Dimensional Shapes",
            "description": "Learners identify, name, and sketch basic 2D shapes found in their environment.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Scientific and Technological",
              "Creativity and Entrepreneurial"
            ],
            "learningObjectives": [
              "Identify 2-dimensional shapes (triangle, rectangle, square and circle)",
              "Sketch 2-dimensional shapes",
              "Paint given shapes, managing to stay within the lines",
              "Make prints of simple designs",
              "Identify shapes in the environment",
              "Do tessellation using squares, rectangles and triangles"
            ],
            "keyVocabulary": [
              "shape",
              "circle",
              "square",
              "rectangle",
              "triangle",
              "sides",
              "corners",
              "round",
              "flat"
            ],
            "exampleActivities": [
              "Identify, trace, sketch and paint 2D shapes",
              "Find shapes in the classroom and environment",
              "Create tessellation patterns",
              "Make shape prints",
              "Sort objects by shape"
            ],
            "assessmentFocus": [
              "Identify 2-dimensional shapes by name",
              "Sketch 2-dimensional shapes",
              "Paint within the lines",
              "Create tessellation patterns",
              "Identify shapes in environment"
            ],
            "prerequisiteTopicIds": [
              "g1-num-sorting-and-sets"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-relating-to-others",
                "description": "Identifying and sketching shapes"
              },
              {
                "subject": "English Literacy",
                "topicId": "g1-el-colours-and-shapes",
                "description": "Learning shape names in English"
              }
            ]
          },
          {
            "id": "g1-num-money-and-measurement",
            "title": "Money and Measurement",
            "description": "Learners are introduced to coins and basic measurement using arbitrary units.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Production and Work-related Competencies"
            ],
            "learningObjectives": [
              "Identify Lesotho and RSA coins in circulation",
              "Measure length using arbitrary units such as body measurements",
              "Measure mass using arbitrary units",
              "Measure volume using arbitrary units",
              "Compare measurements",
              "Use appropriate vocabulary for measurement"
            ],
            "keyVocabulary": [
              "coin",
              "money",
              "measure",
              "length",
              "height",
              "weight",
              "mass",
              "volume",
              "capacity",
              "hand-span",
              "stride",
              "heavier",
              "lighter",
              "longer",
              "shorter"
            ],
            "exampleActivities": [
              "Identify Lesotho and RSA coins by colour, size, pictures and value",
              "Measure heights using hand-spans and strides",
              "Compare weights using bean bags and sand bags",
              "Compare volumes of different containers",
              "Practice measuring classroom objects"
            ],
            "assessmentFocus": [
              "Identify Lesotho and RSA coins by colour, size, pictures and value",
              "Measure using arbitrary units",
              "Compare measurements correctly",
              "Use measurement vocabulary appropriately"
            ],
            "prerequisiteTopicIds": [
              "g1-num-counting-1-20"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-relating-to-others",
                "description": "Identifying coins and measuring"
              }
            ]
          },
          {
            "id": "g1-num-shapes-in-environment",
            "title": "Shapes in the Environment",
            "description": "Learners apply their knowledge of shapes by identifying them in their natural and built environment.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Environmental Adaptation and Sustainable Development"
            ],
            "learningObjectives": [
              "Identify shapes in their environment",
              "Identify and name sets of up to five objects in their environment",
              "Recognize patterns in the environment",
              "Create patterns using shapes"
            ],
            "keyVocabulary": [
              "environment",
              "pattern",
              "design",
              "nature",
              "building"
            ],
            "exampleActivities": [
              "Identify shapes in classroom and school",
              "Find shapes in nature",
              "Look for shapes in buildings",
              "Create shape collections from environment",
              "Make patterns using environmental materials"
            ],
            "assessmentFocus": [
              "Identify shapes in their environment",
              "Name sets of objects in environment",
              "Recognize and describe patterns",
              "Create patterns using shapes"
            ],
            "prerequisiteTopicIds": [
              "g1-num-2d-shapes"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-world-around-me",
                "description": "Identifying shapes in the natural world"
              }
            ]
          },
          {
            "id": "g1-num-number-facts",
            "title": "Number Facts and Missing Numbers",
            "description": "Learners find missing numbers in addition and subtraction facts within the range 1-10.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Find the missing numbers in addition number facts within the range 1-10",
              "Find the missing numbers in subtraction number facts within the range 1-10",
              "Complete number sentences",
              "Understand inverse relationship between addition and subtraction"
            ],
            "keyVocabulary": [
              "missing number",
              "number fact",
              "number sentence",
              "complete",
              "solve"
            ],
            "exampleActivities": [
              "Complete number sentences with missing addends",
              "Find missing numbers in subtraction facts",
              "Use concrete objects to find missing numbers",
              "Practice with number families",
              "Solve problems with missing numbers"
            ],
            "assessmentFocus": [
              "Find missing numbers in addition facts within the range 1-10",
              "Find missing numbers in subtraction facts within the range 1-10",
              "Complete number sentences correctly",
              "Show understanding of number relationships"
            ],
            "prerequisiteTopicIds": [
              "g1-num-addition",
              "g1-num-subtraction"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-world-around-me",
                "description": "Finding missing numbers in number facts"
              }
            ]
          },
          {
            "id": "g1-num-data-handling",
            "title": "Data Handling - Tally Marks and Pictograms",
            "description": "Learners learn to collect, record and interpret simple data using tally marks and pictograms.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Scientific and Technological",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Use tally marks to record litter in the environment",
              "Use pictograms to give information about real-life contexts",
              "Interpret pictograms that represent health, environment and cultural issues",
              "Collect and organize simple data",
              "Read information from simple graphs"
            ],
            "keyVocabulary": [
              "tally marks",
              "pictogram",
              "data",
              "collect",
              "record",
              "count",
              "information",
              "graph"
            ],
            "exampleActivities": [
              "Use tally marks to record litter",
              "Create pictograms of collected objects",
              "Interpret simple pictograms",
              "Collect data about classroom",
              "Make pictograms about health topics"
            ],
            "assessmentFocus": [
              "Use tally marks to record litter",
              "Interpret pictograms",
              "Create simple pictograms",
              "Read information from pictograms",
              "Organize collected data"
            ],
            "prerequisiteTopicIds": [
              "g1-num-counting-1-20"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-looking-after-myself",
                "description": "Using tally marks and pictograms to record health and environmental data"
              }
            ]
          },
          {
            "id": "g1-num-addition-subtraction-applications",
            "title": "Application of Addition and Subtraction",
            "description": "Learners apply addition and subtraction skills to solve real-life problems.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Apply addition and subtraction to solve real-life problems",
              "Use problem-solving strategies",
              "Explain solution methods",
              "Check answers for reasonableness"
            ],
            "keyVocabulary": [
              "problem",
              "solve",
              "strategy",
              "real-life",
              "application",
              "answer",
              "check"
            ],
            "exampleActivities": [
              "Solve word problems involving addition",
              "Solve word problems involving subtraction",
              "Create own problem scenarios",
              "Use objects to model problems",
              "Explain problem-solving steps"
            ],
            "assessmentFocus": [
              "Solve real-life problems using addition and subtraction",
              "Use appropriate problem-solving strategies",
              "Explain how they solved problems",
              "Check if answers make sense"
            ],
            "prerequisiteTopicIds": [
              "g1-num-addition",
              "g1-num-subtraction"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g1-is-looking-after-myself",
                "description": "Applying addition and subtraction to real-life situations"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "grade": "2",
    "subjects": [
      {
        "name": "Integrated Studies",
        "topics": [
          {
            "id": "g2-is-about-myself",
            "title": "About Myself",
            "description": "Learners deepen their self-awareness by exploring the meanings of their names, their roles and responsibilities, the functions of body parts, personal hygiene, and expressing kindness and love.",
            "curriculumStandards": [
              "Awareness of Self and Others",
              "Health and Healthy Living",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Describe the meanings of their names",
              "Describe their roles and responsibilities in class and at school",
              "Demonstrate the importance of kindness and love",
              "Recite thematic poems about kindness and love",
              "Describe functions of external parts of the body",
              "Make freehand sketches of the human body",
              "Understand the basic principles of personal hygiene and sanitation",
              "Identify basic household utensils and tools",
              "Identify sets of up to ten members",
              "Count numbers from 1 to 100",
              "Read numerals from 1 to 100",
              "Write numerals from 1 to 100",
              "Arrange numerals from 1 to 100 in a sequence",
              "Identify different music genres (mokopu, mohobelo, ndlamo, mokhibo, moqoqopelo)",
              "Compose short performances of dance, music, recitals and drama",
              "Perform basic knitting and sewing"
            ],
            "keyVocabulary": [
              "name",
              "surname",
              "age",
              "gender",
              "clan",
              "body parts",
              "grooming",
              "responsibilities",
              "sorting",
              "sets",
              "counting"
            ],
            "exampleActivities": [
              "Learners say their names and surnames",
              "Learners draw themselves and teacher writes their names",
              "Learners sort themselves by age, height, gender, clan",
              "Learners identify external parts of the body using dolls",
              "Learners role-play ways of grooming",
              "Playing lead-up games: throwing, catching, jumping",
              "Learners sort classroom objects by size, colour and shape",
              "Learners match similar objects into one to one correspondence",
              "Learners practice pencil handling and hand movement",
              "Learners make doodles on paper using pencils"
            ],
            "assessmentFocus": [
              "State their names and surnames",
              "Say their ages correctly",
              "Introduce themselves (name, age, boy/girl, clan)",
              "Name external parts of the body",
              "Come to school correctly groomed",
              "State their roles and responsibilities",
              "Sort themselves according to age, height, gender, clans",
              "Sort objects correctly by size, colour and shape",
              "Match similar objects in one to one correspondence",
              "Handle a pencil appropriately",
              "Make doodles"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g2-sl-greetings-and-respect",
                "description": "Using appropriate greetings and showing respect in speech"
              },
              {
                "subject": "English Literacy",
                "topicId": "g2-el-greetings-and-introductions",
                "description": "Introducing themselves in English"
              },
              {
                "subject": "Numeracy",
                "topicId": "g2-num-counting-1-20",
                "description": "Counting age and days of the week"
              },
              {
                "subject": "Numeracy",
                "topicId": "g2-num-sorting-and-sets",
                "description": "Sorting and making sets"
              }
            ]
          },
          {
            "id": "g2-is-relating-to-others",
            "title": "How I Relate to Others",
            "description": "Learners explore relationships with family, community members, and religious contexts while understanding different roles, jobs, and the concept of a Supreme Being.",
            "curriculumStandards": [
              "Awareness of Self and Others",
              "Effective Communication",
              "Production and Work-related Competencies"
            ],
            "learningObjectives": [
              "Identify family members and relatives",
              "Identify different people's roles at school",
              "Add numbers without carrying, the sum not exceeding 20",
              "Identify place value of 2 digit numbers",
              "Use appropriate movements when catching, throwing, jumping, targeting, kicking and passing",
              "Subtract numbers in the range 1 to 20 without borrowing",
              "Perform simple addition and subtraction using Lesotho and RSA coins and notes in circulation (up to M100/R100)",
              "Identify the jobs that people do to earn a living",
              "Identify different places of work",
              "Identify prominent people in their village or community",
              "State the names of religious denominations in Lesotho",
              "State the names of the Supreme Being in different beliefs and religions",
              "State the attributes of a Supreme Being",
              "Dramatise short stories",
              "Make scraffito paintings",
              "Demonstrate understanding of multiplication as repeated addition",
              "Demonstrate understanding of division as repeated subtraction",
              "Help to prepare two Basotho traditional dishes",
              "Make mono-prints"
            ],
            "keyVocabulary": [
              "family members",
              "relatives",
              "roles",
              "jobs",
              "workplace",
              "religious denominations",
              "Supreme Being",
              "attributes",
              "traditional dishes",
              "coins",
              "notes"
            ],
            "exampleActivities": [
              "Learners role-play greetings when they meet and part",
              "Learners draw their parents and identify friends",
              "Learners role-play different jobs and work",
              "Learners mark their personal possessions",
              "Taking a tour to identify school property",
              "Role-playing traits of giving, receiving and sharing",
              "Singing and dancing to folk songs",
              "Playing cultural games: mokhibo, mohobelo",
              "Learners measure heights using hand-spans and strides",
              "Learners compare weights using bean bags and sand bags",
              "Learners compare volumes of different containers",
              "Learners identify, trace, sketch and paint 2D shapes"
            ],
            "assessmentFocus": [
              "Greet and respond according to cultural practice",
              "Use kinship terms and titles appropriately",
              "Demonstrate respect in different situations",
              "Take care of school property",
              "Use phone correctly with proper etiquette",
              "Sing cultural songs fluently",
              "Play cultural games cooperatively",
              "Identify Lesotho and RSA coins by colour, size, pictures and value",
              "Measure using arbitrary units",
              "Identify 2-dimensional shapes by name",
              "Sketch 2-dimensional shapes",
              "Paint within the lines",
              "Subtract within the range 1-10 using concrete objects"
            ],
            "prerequisiteTopicIds": [
              "g2-is-about-myself"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g2-sl-kinship-and-jobs",
                "description": "Using correct kinship terms and job titles in Sesotho"
              },
              {
                "subject": "English Literacy",
                "topicId": "g2-el-family-and-relationships",
                "description": "Greeting and identifying family members in English"
              },
              {
                "subject": "Numeracy",
                "topicId": "g2-num-money-and-measurement",
                "description": "Identifying coins and measuring"
              },
              {
                "subject": "Numeracy",
                "topicId": "g2-num-2d-shapes",
                "description": "Identifying and sketching 2D shapes"
              },
              {
                "subject": "Numeracy",
                "topicId": "g2-num-subtraction",
                "description": "Subtracting numbers within the range 1-10"
              }
            ]
          },
          {
            "id": "g2-is-world-around-me",
            "title": "The World Around Me",
            "description": "Learners explore their environment including maps, natural resources, weather, living and non-living things, animals, and environmental protection.",
            "curriculumStandards": [
              "Environmental Adaptation and Sustainable Development",
              "Scientific and Technological",
              "Health and Healthy Living"
            ],
            "learningObjectives": [
              "Identify selected locations using symbols on a map of their village or community",
              "Interpret the colours of the national flag",
              "Identify locally available resources which satisfy basic needs",
              "Identify different types of soil",
              "Demonstrate proper ways of controlling water pollution",
              "Identify combined weather conditions",
              "Demonstrate proper basic exercise movements",
              "Distinguish various sounds from the environment to make music",
              "Use non-verbal sounds to communicate different messages",
              "Identify living and non-living things in the immediate environment",
              "Add 2-digit numbers with carrying, the sum being within the range 1-100",
              "Subtract 2-digit numbers with borrowing, the difference being less than 50",
              "Demonstrate two ways of protecting living and non-living things",
              "Identify several different types of animals",
              "Compare animals by body covering, movement, body parts and limbs",
              "Sort animals by colour, size, body parts, habitat and feeding habits",
              "Keep a record of at least three animals observed",
              "Demonstrate methods of keeping and caring for animals",
              "Demonstrate use of kitchen waste as animal feed",
              "Demonstrate use of agricultural waste as manure and compost",
              "Identify 2-dimensional shapes",
              "Draw and label 2-dimensional shapes from environment",
              "Use 2-dimensional shapes to form patterns",
              "Identify properties of 2-dimensional shapes",
              "Use shapes to identify fractions (halves and quarters)",
              "Recycle materials to make craft works"
            ],
            "keyVocabulary": [
              "plants",
              "animals",
              "insects",
              "soil",
              "water",
              "weather",
              "morning",
              "afternoon",
              "evening",
              "night",
              "months",
              "seasons",
              "calendar",
              "conservation",
              "recycling",
              "national flag",
              "national anthem",
              "coat of arms",
              "road safety"
            ],
            "exampleActivities": [
              "Observing and exploring natural environment at home and school",
              "Collecting and sorting plants by colour, shape and smell",
              "Imitating sounds made by different animals",
              "Observing and recording weather conditions for a week",
              "Singing songs about different times of day",
              "Sequencing months of the year written on cards",
              "Carrying out activities to conserve water or soil",
              "Drawing and colouring national flag",
              "Making signs and symbols for road safety",
              "Collecting dung to prepare fuel (mapharoa)",
              "Reusing materials to make craft items",
              "Singing hand signs for first triad (doh, me, soh)",
              "Performing non-locomotor exercises"
            ],
            "assessmentFocus": [
              "Identify things in immediate environment",
              "List three uses of soil",
              "Name recorded plant specimens",
              "Read names of animals correctly",
              "Identify and name weather conditions",
              "Cite months of the year in order",
              "Use calendar to identify days and months",
              "Carry out conservation activities",
              "Sing national anthem appropriately",
              "Recycle agricultural waste",
              "Make craft items using reusable materials",
              "Sing and sign the first triad",
              "Demonstrate proper basic exercising movements",
              "Find missing numbers in addition and subtraction facts"
            ],
            "prerequisiteTopicIds": [
              "g2-is-about-myself"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g2-sl-time-and-calendar",
                "description": "Learning days, months and seasons in Sesotho"
              },
              {
                "subject": "English Literacy",
                "topicId": "g2-el-time-and-seasons",
                "description": "Naming days, months and seasons in English"
              },
              {
                "subject": "Numeracy",
                "topicId": "g2-num-shapes-in-environment",
                "description": "Identifying shapes in the environment"
              },
              {
                "subject": "Numeracy",
                "topicId": "g2-num-number-facts",
                "description": "Finding missing numbers in number facts"
              }
            ]
          },
          {
            "id": "g2-is-looking-after-myself",
            "title": "Looking After Myself",
            "description": "Learners learn about human rights and responsibilities, healthy living, nutrition, safety, disease prevention, disaster preparedness, and time management.",
            "curriculumStandards": [
              "Health and Healthy Living",
              "Environmental Adaptation and Sustainable Development",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "State three human rights and related responsibilities",
              "Identify indigenous vegetables that promote healthy living",
              "Identify indigenous medicinal herbs (hloenya, lekhalana, blue gum)",
              "Identify early warning signs of insect plagues",
              "Demonstrate ways of controlling insect plagues",
              "Identify ways of recovering from insect plagues",
              "Demonstrate preservation of fruits by drying",
              "Plan a balanced diet",
              "Use calendar to show days in week and months in year",
              "Measure time in full and half hours",
              "Measure length using arbitrary units",
              "Measure mass using arbitrary units",
              "Measure volume using arbitrary units",
              "Demonstrate safe handling of hot water at home",
              "Demonstrate safe handling of sharp objects at home",
              "Demonstrate safe handling of poisonous and flammable substances",
              "Demonstrate safe handling of electrical appliances",
              "Design board games to encourage safety",
              "Recognise how infectious diseases are spread",
              "Recognise ways of reducing spread of infectious diseases",
              "Recognise ways of reducing spread of HIV",
              "Identify warning signs that help prevent injuries",
              "Identify and play indigenous games promoting healthy living",
              "Demonstrate ways of preparing for floods",
              "Demonstrate text messaging using cell phones",
              "Identify ways of protecting people and property during floods",
              "Demonstrate appropriate response after floods"
            ],
            "keyVocabulary": [
              "cleanliness",
              "needs",
              "wants",
              "rights",
              "responsibilities",
              "balanced diet",
              "food preservation",
              "infectious diseases",
              "measles",
              "chicken pox",
              "litter",
              "tally marks",
              "pictogram",
              "snowfall",
              "fire safety",
              "first aid"
            ],
            "exampleActivities": [
              "Cleaning classroom under supervision",
              "Classifying pictures according to needs and wants",
              "Matching rights with corresponding responsibilities",
              "Playing indigenous games: ho kalla, lesokoana, moraba-raba, cheko, liketoana, khati",
              "Collecting and sorting plants according to uses",
              "Sorting food stuffs into components of balanced diet",
              "Drying leafy vegetables",
              "Collecting indigenous vegetables and medicinal herbs",
              "Drawing pictures of patients with measles/chicken pox",
              "Simulating safe behaviour during epidemic",
              "Using tally marks to record litter",
              "Creating pictograms of collected objects",
              "Role-playing preparedness for snowfall and fire",
              "Simulating use of First Aid Kit"
            ],
            "assessmentFocus": [
              "Contribute to keeping classroom and school clean",
              "List basic human needs",
              "Match rights and responsibilities",
              "Play indigenous games",
              "Sort plants according to uses",
              "Sort foods into balanced diet components",
              "Dry and store leafy vegetables",
              "Identify medicinal herbs",
              "Mention signs of infectious diseases",
              "Simulate safe behaviour during disease outbreak",
              "Use tally marks to record litter",
              "Interpret pictograms",
              "Role-play preparedness plans",
              "Demonstrate proper use of First Aid Kit"
            ],
            "prerequisiteTopicIds": [
              "g2-is-about-myself",
              "g2-is-world-around-me"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g2-num-data-handling",
                "description": "Using tally marks and pictograms to record data about health and environment"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g2-sl-health-and-safety",
                "description": "Learning vocabulary related to health, food and safety"
              },
              {
                "subject": "Numeracy",
                "topicId": "g2-num-addition-subtraction-applications",
                "description": "Applying addition and subtraction to solve real-life problems"
              }
            ]
          }
        ]
      },
      {
        "name": "Sesotho Literacy",
        "topics": [
          {
            "id": "g2-sl-greetings-and-respect",
            "title": "Greetings and Respectful Communication",
            "description": "Learners develop appreciation of Basotho culture in relation to greetings, making respectful requests, showing gratitude and respect for elders.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "Greet appropriately according to Basotho culture",
              "Make respectful requests",
              "Show gratitude and respect for elders",
              "Use appropriate vocabulary when asking someone to recite clan-related poems",
              "Participate in traditional games rhythmically"
            ],
            "keyVocabulary": [
              "lumela",
              "lumelang",
              "ke a leboha",
              "ntÅ¡oarele",
              "tlhompho",
              "lebitso",
              "fane"
            ],
            "exampleActivities": [
              "Role-playing greetings in different situations",
              "Practising greeting in pairs and groups",
              "Discussing importance of greetings and respect",
              "Role-playing situations showing respect",
              "Writing and tracing their names"
            ],
            "assessmentFocus": [
              "Greet and respond appropriately with teacher guidance",
              "Greet and respond unprompted",
              "Request and thank appropriately",
              "Apologise when appropriate",
              "Write name correctly starting with capital letter"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-about-myself",
                "description": "Introducing oneself in cultural context"
              },
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-relating-to-others",
                "description": "Showing respect when relating to others"
              }
            ]
          },
          {
            "id": "g2-sl-letter-sounds-single",
            "title": "Single Letter Sounds",
            "description": "Learners are introduced to recognition and formation of single letter sounds in Sesotho, laying foundation for reading and writing.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Distinguish sounds formed by single letters (a, e, i, o, u, b, f, h, j, k, l, m, n, p, q, r, s, t)",
              "Form words with single letter sounds",
              "Write letters correctly",
              "Read words with learned sounds"
            ],
            "keyVocabulary": [
              "molumo",
              "tlhaku",
              "lentsoe",
              "bala",
              "ngola"
            ],
            "exampleActivities": [
              "Making sentences based on pictures",
              "Forming words with focus sound",
              "Imitating teacher when reading sounds",
              "Writing letters in sand and on ground",
              "Reading sounds to teacher",
              "Reading sounds to parents who sign to confirm"
            ],
            "assessmentFocus": [
              "Form sentences from pictures",
              "Form words with chosen sound",
              "Imitate teacher reading sounds",
              "Read sounds independently",
              "Write sounds correctly",
              "Identify sound within a word"
            ],
            "prerequisiteTopicIds": [
              "g2-sl-greetings-and-respect"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g2-sl-word-formation",
            "title": "Word Formation",
            "description": "Learners develop ability to form and read simple four-letter words using single letter sounds they have learned.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Form four-letter words with single letter sounds correctly",
              "Pronounce words correctly",
              "Write words correctly on the line",
              "Work cooperatively in groups"
            ],
            "keyVocabulary": [
              "bana",
              "lema",
              "sila",
              "bolo",
              "fofa"
            ],
            "exampleActivities": [
              "Teacher writes words for copying",
              "Filling in missing letters in words",
              "Forming words starting with given sound",
              "Copying words in groups",
              "Reading words by calling each sound then whole word",
              "Reading words to parents who sign"
            ],
            "assessmentFocus": [
              "Form words correctly",
              "Pronounce words correctly",
              "Write each letter on the line",
              "Copy correctly",
              "Work well with others in groups"
            ],
            "prerequisiteTopicIds": [
              "g2-sl-letter-sounds-single"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g2-sl-listening-and-stories",
            "title": "Listening and Stories",
            "description": "Learners develop listening comprehension skills by listening to short stories and responding to questions.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Listen to short stories for comprehension",
              "Answer questions: what, who, where, when, why",
              "Retell story briefly",
              "Act out parts of story",
              "Identify lesson from story"
            ],
            "keyVocabulary": [
              "pale",
              "mamela",
              "eng",
              "mang",
              "kae",
              "neng",
              "hobane'ng",
              "thuto"
            ],
            "exampleActivities": [
              "Discussing importance of not interrupting",
              "Listening to short story",
              "Answering comprehension questions",
              "Acting out parts of the story",
              "Discussing lesson from story"
            ],
            "assessmentFocus": [
              "Listen without interrupting",
              "Answer questions correctly",
              "Show emotional response to story",
              "Act out story parts correctly",
              "Retell part of story",
              "State lesson from story",
              "Not laugh at others when speaking"
            ],
            "prerequisiteTopicIds": [
              "g2-sl-greetings-and-respect"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-relating-to-others",
                "description": "Understanding cultural stories and their lessons"
              }
            ]
          },
          {
            "id": "g2-sl-kinship-and-jobs",
            "title": "Kinship Terms and Jobs",
            "description": "Learners learn to correctly use kinship terms and identify people according to their jobs.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Awareness of Self and Others",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Use correct kinship terms ('mÃ¨, ntate, ausi, abuti, nkhono, ntate-moholo)",
              "Name people according to their jobs (tichere, ngaka, mooki)",
              "Write and read kinship terms and job titles",
              "Distinguish people by their work"
            ],
            "keyVocabulary": [
              "'mÃ¨",
              "ntate",
              "ausi",
              "abuti",
              "nkhono",
              "ntate-moholo",
              "tichere",
              "ngaka",
              "mooki"
            ],
            "exampleActivities": [
              "Discussing relatives learners don't know",
              "Role-playing situations using kinship terms",
              "Matching pictures with describing words",
              "Writing and reading kinship terms",
              "Finding out about jobs of teacher, doctor, nurse",
              "Role-playing different jobs"
            ],
            "assessmentFocus": [
              "Name people correctly according to relationship",
              "Write and read kinship terms",
              "Name people according to their jobs",
              "Distinguish people by their work",
              "Act out different jobs"
            ],
            "prerequisiteTopicIds": [
              "g2-sl-greetings-and-respect",
              "g2-sl-word-formation"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-relating-to-others",
                "description": "Naming family members and understanding their roles"
              }
            ]
          },
          {
            "id": "g2-sl-diagraphs",
            "title": "Diagraphs and Complex Sounds",
            "description": "Learners are introduced to sounds formed by two letters (diagraphs) and sounds with apostrophe in Sesotho.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Distinguish diagraphs: ea, oa, oe, ch, nk, nt, ng, ph, sh, th, tl, ts, ue, hl, ll, mp",
              "Distinguish sounds with apostrophe: 'm, 'n, Ã¨",
              "Form words with these sounds",
              "Write and read words with complex sounds"
            ],
            "keyVocabulary": [
              "sehonyetso",
              "melumo e bopiloeng ka tlhaku tse peli"
            ],
            "exampleActivities": [
              "Making sentences from pictures",
              "Forming words with focus diagraph",
              "Imitating teacher reading sounds",
              "Writing letters in sand and on ground",
              "Reading sounds to teacher and parents",
              "Writing words with diagraphs"
            ],
            "assessmentFocus": [
              "Form sentences from pictures",
              "Form words with chosen sound",
              "Imitate teacher reading sounds",
              "Read sounds independently",
              "Write sounds correctly",
              "Identify sound within word"
            ],
            "prerequisiteTopicIds": [
              "g2-sl-letter-sounds-single",
              "g2-sl-word-formation"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g2-sl-time-and-calendar",
            "title": "Time and Calendar",
            "description": "Learners learn vocabulary related to time of day, days of week, months and seasons in Sesotho.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Scientific and Technological"
            ],
            "learningObjectives": [
              "Name times of day (hoseng, motÅ¡eare, mantsiboea, bosiu)",
              "Recite days of week in order",
              "Recite months of year in order",
              "Name seasons of year (selemo, hlabula, hoetla, mariha)",
              "Sequence times, days, months and seasons"
            ],
            "keyVocabulary": [
              "hoseng",
              "motÅ¡eare",
              "mantsiboea",
              "bosiu",
              "matsatsi a beke",
              "likhoeli tsa selemo",
              "linako tsa selemo"
            ],
            "exampleActivities": [
              "Discussing differences between times of day",
              "Mentioning things seen at different times",
              "Singing songs about days and months",
              "Copying days and months from chart",
              "Sequencing cards with days/months",
              "Identifying times using shadows"
            ],
            "assessmentFocus": [
              "Name times of day using prompts",
              "Name times of day unprompted",
              "Cite days of week in order",
              "Cite months of year in order",
              "Copy days and months correctly",
              "Sequence time periods correctly"
            ],
            "prerequisiteTopicIds": [
              "g2-sl-word-formation"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-world-around-me",
                "description": "Learning about time, calendar, and seasons"
              },
              {
                "subject": "Numeracy",
                "topicId": "g2-num-counting-1-20",
                "description": "Counting days and understanding number of days/months"
              }
            ]
          },
          {
            "id": "g2-sl-opposites-and-directions",
            "title": "Opposites and Directions",
            "description": "Learners learn to use opposite words and directional vocabulary in sentences.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Use opposite words in sentences (chesa-bata, koala-bula, ema-lula)",
              "Give and follow directions (lehojeng, leqeleng, hare, tlas'a, holim'a)",
              "Match opposites correctly",
              "Describe location using directional words"
            ],
            "keyVocabulary": [
              "chesa",
              "bata",
              "koala",
              "bula",
              "ema",
              "lula",
              "lehojeng",
              "leqeleng",
              "hare",
              "tlas'a",
              "holim'a"
            ],
            "exampleActivities": [
              "Demonstrating opposite actions",
              "Role-playing using opposite words",
              "Following directional instructions",
              "Giving directions to classmates",
              "Matching opposite word pairs",
              "Describing positions of objects"
            ],
            "assessmentFocus": [
              "Use opposite words correctly in context",
              "Follow simple directional instructions",
              "Give clear directions to others",
              "Match opposite pairs correctly",
              "Describe locations accurately"
            ],
            "prerequisiteTopicIds": [
              "g2-sl-word-formation"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g2-sl-sentence-structure",
            "title": "Basic Sentence Structure",
            "description": "Learners are introduced to basic sentence structure and grammar, including nouns, adjectives, and adverbs.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Identify nouns in sentences",
              "Use adjectives of colour correctly",
              "Use adverbs of time appropriately",
              "Form simple sentences",
              "Recognize sentence structure"
            ],
            "keyVocabulary": [
              "lebitso",
              "mmala",
              "nako",
              "polelo"
            ],
            "exampleActivities": [
              "Identifying objects (nouns) in the classroom",
              "Describing objects using colours",
              "Using time words in sentences",
              "Constructing simple sentences",
              "Matching words with pictures"
            ],
            "assessmentFocus": [
              "Identify nouns correctly",
              "Use colour adjectives appropriately",
              "Use time adverbs correctly",
              "Form simple grammatical sentences",
              "Show understanding of word order"
            ],
            "prerequisiteTopicIds": [
              "g2-sl-word-formation",
              "g2-sl-diagraphs"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g2-sl-health-and-safety",
            "title": "Health and Safety Vocabulary",
            "description": "Learners acquire vocabulary related to health, food, and safety in Sesotho.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Health and Healthy Living"
            ],
            "learningObjectives": [
              "Name common food items in Sesotho",
              "Identify vocabulary related to cleanliness",
              "Learn safety-related words",
              "Use health and safety vocabulary in context"
            ],
            "keyVocabulary": [
              "lijo",
              "bohlokoa",
              "polokeho",
              "bophelo",
              "hlwekileng"
            ],
            "exampleActivities": [
              "Naming traditional dishes",
              "Discussing importance of cleanliness",
              "Learning safety vocabulary through role-play",
              "Reading simple texts about health",
              "Drawing and labeling healthy foods"
            ],
            "assessmentFocus": [
              "Name food items correctly",
              "Use cleanliness vocabulary appropriately",
              "Demonstrate understanding of safety terms",
              "Apply vocabulary in context",
              "Read simple health-related texts"
            ],
            "prerequisiteTopicIds": [
              "g2-sl-word-formation",
              "g2-sl-diagraphs"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-looking-after-myself",
                "description": "Learning about health, nutrition and safety"
              }
            ]
          }
        ]
      },
      {
        "name": "English Literacy",
        "topics": [
          {
            "id": "g2-el-greetings-and-introductions",
            "title": "Giving and Following Simple Directions",
            "description": "Learners develop skills in giving and following simple directions in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "Understand simple directions in English",
              "Follow one and two-step directions",
              "Give simple directions to others",
              "Use directional vocabulary",
              "Respond appropriately to directions"
            ],
            "keyVocabulary": [
              "Good morning",
              "Good day",
              "Good evening",
              "Hello",
              "name",
              "surname",
              "age",
              "boy",
              "girl",
              "please",
              "thank you"
            ],
            "exampleActivities": [
              "Teacher teaches greetings used at different times of day",
              "Learners act out greeting each other at different times",
              "Learners introduce themselves individually under guidance",
              "Learners practice in pairs and small groups",
              "Role-playing classroom request scenarios",
              "Listening to greetings on the radio"
            ],
            "assessmentFocus": [
              "Recite correct greeting and response when guided by teacher",
              "Use correct response when given greeting as prompt",
              "Use correct greeting unprompted",
              "Say name correctly in response to prompt",
              "Say age correctly in response to prompt",
              "Introduce themselves unprompted stating name, age and gender",
              "Request to go out using proper English"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-about-myself",
                "description": "Introducing themselves in different languages"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g2-sl-greetings-and-respect",
                "description": "Comparing greetings in Sesotho and English"
              }
            ]
          },
          {
            "id": "g2-el-body-parts",
            "title": "Parts of the Body",
            "description": "Learners learn to identify and name different parts of the body in English through songs and activities.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Health and Healthy Living"
            ],
            "learningObjectives": [
              "Identify different parts of the body in English",
              "Name parts of the body: head, ear, eye, mouth, tooth, nose, hand, finger, shoulders, knees, tongue, toes",
              "Sing and perform actions to body parts songs",
              "Pronounce body part words correctly"
            ],
            "keyVocabulary": [
              "head",
              "ear",
              "eye",
              "mouth",
              "tooth",
              "nose",
              "hand",
              "finger",
              "shoulders",
              "knees",
              "tongue",
              "toes"
            ],
            "exampleActivities": [
              "Teacher teaches names of different parts of the body",
              "Learners point at body parts and name them in pairs",
              "Looking at pictures of body parts and naming them",
              "Drawing pictures and teacher labels parts",
              "Singing 'Head, shoulders, knees and toes' with actions",
              "Learning and performing other body parts rhymes"
            ],
            "assessmentFocus": [
              "Identify parts of their bodies in response to prompts",
              "Point at different parts of bodies and name them correctly unprompted",
              "Sing given rhymes performing appropriate actions",
              "Pronounce words correctly whilst singing"
            ],
            "prerequisiteTopicIds": [
              "g2-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-about-myself",
                "description": "Identifying external parts of the body"
              }
            ]
          },
          {
            "id": "g2-el-days-of-week",
            "title": "Days of the Week",
            "description": "Learners learn to name and sequence the days of the week in English through songs and chants.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Scientific and Technological"
            ],
            "learningObjectives": [
              "Name the days of the week in order in English",
              "Recite days of the week with correct pronunciation",
              "Sing songs about days of the week"
            ],
            "keyVocabulary": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
              "week",
              "day"
            ],
            "exampleActivities": [
              "Learners brainstorm days they already know",
              "Chanting days in order with correct pronunciation",
              "Learning and singing songs about days of the week",
              "Copying days from chart",
              "Sequencing day cards"
            ],
            "assessmentFocus": [
              "Recite days of the week in order when prompted",
              "Recite days of the week in order unprompted",
              "Pronounce day names correctly"
            ],
            "prerequisiteTopicIds": [
              "g2-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g2-num-counting-1-20",
                "description": "Counting days and understanding weekly sequence"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g2-sl-time-and-calendar",
                "description": "Learning days in both languages"
              }
            ]
          },
          {
            "id": "g2-el-gender-identification",
            "title": "Gender Identification",
            "description": "Learners learn to identify and name people according to gender and age in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "Identify people as boys, girls, men and women",
              "Use correct gender terms when describing people",
              "Match words with pictures of people",
              "Draw and label people by gender"
            ],
            "keyVocabulary": [
              "boy",
              "girl",
              "man",
              "woman",
              "he",
              "she"
            ],
            "exampleActivities": [
              "Teacher introduces vocabulary using pictures",
              "Learners match words with pictures",
              "Drawing pictures of boy, girl, man and woman",
              "Teacher labels learner drawings",
              "Identifying variety of pictures with correct words"
            ],
            "assessmentFocus": [
              "Identify people as boy, girl, man or woman when prompted",
              "Differentiate between genders independently",
              "Use appropriate pronouns"
            ],
            "prerequisiteTopicIds": [
              "g2-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-about-myself",
                "description": "Understanding personal identity and gender"
              }
            ]
          },
          {
            "id": "g2-el-family-and-relationships",
            "title": "Family and Relationships",
            "description": "Learners learn vocabulary related to family members and relationships in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Awareness of Self and Others"
            ],
            "learningObjectives": [
              "Name family members in English (mother, father, sister, brother, grandmother, grandfather)",
              "Use kinship terms correctly in English",
              "Identify relationships between people",
              "Describe their family in simple English"
            ],
            "keyVocabulary": [
              "mother",
              "father",
              "sister",
              "brother",
              "grandmother",
              "grandfather",
              "family",
              "parent"
            ],
            "exampleActivities": [
              "Introducing family members using pictures or drawings",
              "Role-playing family relationships",
              "Drawing family and labeling in English",
              "Singing songs about family",
              "Matching relationship words to pictures"
            ],
            "assessmentFocus": [
              "Name family members correctly",
              "Use kinship terms appropriately",
              "Describe family members in simple sentences",
              "Identify relationships in pictures"
            ],
            "prerequisiteTopicIds": [
              "g2-el-greetings-and-introductions",
              "g2-el-gender-identification"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-relating-to-others",
                "description": "Understanding family relationships and roles"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g2-sl-kinship-and-jobs",
                "description": "Learning kinship terms in both languages"
              }
            ]
          },
          {
            "id": "g2-el-classroom-language",
            "title": "Classroom Language and Instructions",
            "description": "Learners learn to understand and respond to simple classroom instructions in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Understand simple classroom instructions",
              "Follow basic commands (stand up, sit down, come here, be quiet)",
              "Respond appropriately to teacher's requests",
              "Use polite classroom language"
            ],
            "keyVocabulary": [
              "stand up",
              "sit down",
              "come here",
              "be quiet",
              "listen",
              "look",
              "open",
              "close",
              "stop",
              "start"
            ],
            "exampleActivities": [
              "Teacher demonstrates actions with commands",
              "Simon Says game using classroom instructions",
              "Following multi-step instructions",
              "Role-playing being the teacher",
              "Practicing polite requests"
            ],
            "assessmentFocus": [
              "Follow simple one-step instructions",
              "Follow two-step instructions",
              "Respond appropriately without translation",
              "Use polite language when requesting"
            ],
            "prerequisiteTopicIds": [
              "g2-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g2-el-numbers-and-counting",
            "title": "Numbers and Counting in English",
            "description": "Learners learn to count and recognize numbers from 1 to 20 in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Numerical and Mathematical",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Count from 1 to 20 in English",
              "Recognize and name numerals 1-20 in English",
              "Pronounce number words correctly",
              "Use numbers in simple contexts"
            ],
            "keyVocabulary": [
              "one",
              "two",
              "three",
              "four",
              "five",
              "six",
              "seven",
              "eight",
              "nine",
              "ten",
              "eleven",
              "twelve",
              "thirteen",
              "fourteen",
              "fifteen",
              "sixteen",
              "seventeen",
              "eighteen",
              "nineteen",
              "twenty"
            ],
            "exampleActivities": [
              "Counting objects in English",
              "Singing counting songs",
              "Playing counting games",
              "Matching numerals with English words",
              "Counting classroom objects"
            ],
            "assessmentFocus": [
              "Count from 1 to 20 correctly",
              "Name numerals in English",
              "Pronounce numbers correctly",
              "Use numbers to describe quantities"
            ],
            "prerequisiteTopicIds": [
              "g2-el-greetings-and-introductions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g2-num-counting-1-20",
                "description": "Counting in English and understanding numerals"
              }
            ]
          },
          {
            "id": "g2-el-colours-and-shapes",
            "title": "Colours and Shapes",
            "description": "Learners learn to name and identify colours and basic shapes in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication",
              "Creativity and Entrepreneurial"
            ],
            "learningObjectives": [
              "Name basic colours in English (red, blue, yellow, green, black, white, brown)",
              "Identify and name basic shapes (circle, square, triangle, rectangle)",
              "Describe objects using colour and shape words",
              "Match colour and shape words with objects"
            ],
            "keyVocabulary": [
              "red",
              "blue",
              "yellow",
              "green",
              "black",
              "white",
              "brown",
              "orange",
              "circle",
              "square",
              "triangle",
              "rectangle"
            ],
            "exampleActivities": [
              "Identifying colours in the classroom",
              "Sorting objects by colour",
              "Drawing and colouring shapes",
              "Playing colour and shape matching games",
              "Describing objects using colour and shape"
            ],
            "assessmentFocus": [
              "Name colours correctly",
              "Identify shapes correctly",
              "Describe objects using colour and shape",
              "Sort objects by colour and shape"
            ],
            "prerequisiteTopicIds": [
              "g2-el-classroom-language"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g2-num-2d-shapes",
                "description": "Learning about shapes in mathematics"
              }
            ]
          },
          {
            "id": "g2-el-time-and-seasons",
            "title": "Time of Day and Seasons",
            "description": "Learners learn to identify times of day, months, and seasons in English.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Scientific and Technological",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Identify times of day (morning, afternoon, evening, night)",
              "Name months of the year in English",
              "Name seasons (Spring, Summer, Autumn, Winter)",
              "Associate activities with times of day"
            ],
            "keyVocabulary": [
              "morning",
              "afternoon",
              "evening",
              "night",
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
              "Spring",
              "Summer",
              "Autumn",
              "Winter"
            ],
            "exampleActivities": [
              "Discussing activities done at different times of day",
              "Singing songs about months and seasons",
              "Matching pictures to times of day",
              "Learning about seasonal changes",
              "Creating a class calendar"
            ],
            "assessmentFocus": [
              "Identify times of day correctly",
              "Name months in order",
              "Name the four seasons",
              "Describe activities associated with different times"
            ],
            "prerequisiteTopicIds": [
              "g2-el-days-of-week"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-world-around-me",
                "description": "Learning about time, calendar and seasons"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g2-sl-time-and-calendar",
                "description": "Understanding time concepts in both languages"
              }
            ]
          },
          {
            "id": "g2-el-common-objects",
            "title": "Common Objects and Vocabulary",
            "description": "Learners build vocabulary of common objects found at home and school.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Name common classroom objects",
              "Name common household items",
              "Use simple adjectives to describe objects",
              "Identify objects from descriptions"
            ],
            "keyVocabulary": [
              "book",
              "pencil",
              "pen",
              "desk",
              "chair",
              "bag",
              "ruler",
              "door",
              "window",
              "table",
              "cup",
              "plate"
            ],
            "exampleActivities": [
              "Identifying and naming classroom objects",
              "Describing objects using adjectives",
              "Playing 'I spy' game with objects",
              "Drawing and labeling common items",
              "Matching words with pictures"
            ],
            "assessmentFocus": [
              "Name common objects correctly",
              "Describe objects using simple adjectives",
              "Identify objects from oral descriptions",
              "Use vocabulary in context"
            ],
            "prerequisiteTopicIds": [
              "g2-el-classroom-language",
              "g2-el-colours-and-shapes"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g2-el-action-verbs",
            "title": "Basic Action Verbs",
            "description": "Learners learn common action verbs and use them in simple sentences.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Identify and perform basic actions (run, jump, walk, sit, stand, eat, drink, sleep)",
              "Use action words in simple sentences",
              "Respond to action commands",
              "Demonstrate understanding through actions"
            ],
            "keyVocabulary": [
              "run",
              "jump",
              "walk",
              "sit",
              "stand",
              "eat",
              "drink",
              "sleep",
              "play",
              "read",
              "write",
              "draw"
            ],
            "exampleActivities": [
              "Acting out different actions",
              "Playing action games (Simon Says)",
              "Matching action words to pictures",
              "Making simple sentences with actions",
              "Drawing pictures of people doing actions"
            ],
            "assessmentFocus": [
              "Perform actions when named",
              "Name actions being performed",
              "Use action words in simple sentences",
              "Follow action commands correctly"
            ],
            "prerequisiteTopicIds": [
              "g2-el-classroom-language"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g2-el-simple-sentences",
            "title": "Simple Sentences and Communication",
            "description": "Learners begin to form and use simple sentences in English for basic communication.",
            "curriculumStandards": [
              "Linguistic and Literary",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Form simple sentences using subject and verb",
              "Use 'I can' and 'I like' structures",
              "Respond to simple questions in English",
              "Express basic needs and preferences"
            ],
            "keyVocabulary": [
              "I can",
              "I like",
              "I want",
              "I have",
              "I am",
              "yes",
              "no"
            ],
            "exampleActivities": [
              "Practicing 'I can' sentences with actions",
              "Expressing likes and dislikes",
              "Answering yes/no questions",
              "Role-playing simple conversations",
              "Making sentences about themselves"
            ],
            "assessmentFocus": [
              "Form simple grammatical sentences",
              "Use sentence structures correctly",
              "Respond appropriately to questions",
              "Express basic needs in English"
            ],
            "prerequisiteTopicIds": [
              "g2-el-action-verbs",
              "g2-el-common-objects"
            ],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Numeracy",
        "topics": [
          {
            "id": "g2-num-sorting-and-sets",
            "title": "Sorting and Making Sets",
            "description": "Learners develop fundamental mathematical thinking by sorting objects and forming sets based on common properties.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Sort objects by colour, size and shape",
              "Form sets using concrete objects",
              "Compare sets using numbers of members/elements",
              "Make sets by number of elements",
              "Use the word 'set' when referring to a group of objects",
              "Match sets into one-to-one correspondence"
            ],
            "keyVocabulary": [
              "set",
              "sorting",
              "members",
              "elements",
              "colour",
              "size",
              "shape",
              "same",
              "different",
              "group"
            ],
            "exampleActivities": [
              "Sort concrete objects by colour",
              "Sort concrete objects by size",
              "Sort concrete objects by shape",
              "Form sets using concrete objects (members 1 to 5)",
              "Describe formed sets by common property",
              "Compare numbers of elements of two sets",
              "Match sets into one-to-one correspondence"
            ],
            "assessmentFocus": [
              "Sort objects by colour, size and shape",
              "Form sets using concrete objects",
              "Compare sets using numbers of members/elements",
              "Make sets by number of elements",
              "Use the word set when referring to a group of objects"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-about-myself",
                "description": "Sorting themselves and objects"
              }
            ]
          },
          {
            "id": "g2-num-counting-1-20",
            "title": "Counting, Reading and Writing 1-100",
            "description": "Learners extend counting, reading and writing skills to numbers up to 100.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Count from 1 to 100",
              "Read numerals from 1 to 100",
              "Write numerals from 1 to 100",
              "Arrange numerals from 1 to 100 in sequence",
              "Identify missing numbers in sequences"
            ],
            "keyVocabulary": [
              "numbers 1-20",
              "count",
              "numeral",
              "first",
              "second",
              "third",
              "more",
              "less",
              "greater",
              "sequence",
              "order"
            ],
            "exampleActivities": [
              "Recite poems depicting numbers 1-20",
              "Count numbers 1-20",
              "Read and write numbers 1-20",
              "Play games to compare two numbers",
              "Identify cardinal and ordinal numbers",
              "Identify next numbers in a sequence",
              "Fill missing numbers in a sequence",
              "Arrange mixed numerals in a sequence",
              "Change order of objects to show conservation"
            ],
            "assessmentFocus": [
              "Recognize numbers and their relationship within the range 1-20",
              "Count numbers 1-20",
              "Compare two numbers and say which is greater",
              "Identify cardinal and ordinal numbers",
              "Recognize that arrangement does not affect quantity",
              "Read and write numerals representing number of concrete objects"
            ],
            "prerequisiteTopicIds": [
              "g2-num-sorting-and-sets"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-about-myself",
                "description": "Counting age and days of the week"
              },
              {
                "subject": "English Literacy",
                "topicId": "g2-el-numbers-and-counting",
                "description": "Learning number names in English"
              }
            ]
          },
          {
            "id": "g2-num-place-value",
            "title": "Place Value - Tens and Units",
            "description": "Learners begin to understand place value by grouping objects into tens and units.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving"
            ],
            "learningObjectives": [
              "Identify place value of 2 digit numbers",
              "Group objects in tens and units",
              "Write numbers showing tens and units (T and U)",
              "Use abacus to identify place value",
              "Represent numbers by strokes/bundles of tens and units"
            ],
            "keyVocabulary": [
              "tens",
              "units",
              "place value",
              "bundle",
              "abacus",
              "digit"
            ],
            "exampleActivities": [
              "Group objects in tens and units and write T and U",
              "Use abacus to identify place value of 2 digit numbers",
              "Represent numbers by strokes/bundles of tens and units",
              "Practice with linking blocks and counters",
              "Use beans and peas for grouping"
            ],
            "assessmentFocus": [
              "Identify place value of 2 digit numbers",
              "Group objects correctly into tens and units",
              "Write numbers in tens and units format",
              "Use abacus to show place value"
            ],
            "prerequisiteTopicIds": [
              "g2-num-counting-1-20"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g2-num-addition",
            "title": "Addition within 1-10",
            "description": "Learners develop addition skills using concrete objects and number facts within the range 1-10.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving"
            ],
            "learningObjectives": [
              "Form families of numbers in the range 1 to 10",
              "Generate number bonds in the range 1-10",
              "Use the sign + (plus) and = (equal) correctly",
              "Use number names in various real-life contexts",
              "Use own problem-solving strategies to solve addition problems",
              "Add numbers within the range 1 to 10",
              "Use number line to model addition",
              "Recall addition facts of numbers 1-10"
            ],
            "keyVocabulary": [
              "add",
              "addition",
              "plus",
              "equal",
              "sum",
              "total",
              "number bond",
              "number family",
              "altogether"
            ],
            "exampleActivities": [
              "Form families of numbers in the range 1-10",
              "Manipulate numbers to identify number bonds",
              "Use number line to model addition",
              "Recall addition facts of numbers 1-10",
              "Read telephone and cell phone numbers",
              "Solve real-life addition problems"
            ],
            "assessmentFocus": [
              "Form families of numbers in the range 1 to 10",
              "Generate number bonds in the range 1-10",
              "Use the sign + (plus) and = (equal) correctly to solve real-life problems",
              "Use number names in various real-life contexts",
              "Use own problem-solving strategies to solve addition problems"
            ],
            "prerequisiteTopicIds": [
              "g2-num-counting-1-20"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-about-myself",
                "description": "Adding numbers in daily contexts"
              }
            ]
          },
          {
            "id": "g2-num-subtraction",
            "title": "Subtraction within 1-10",
            "description": "Learners develop subtraction skills using concrete objects within the range 1-10.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving"
            ],
            "learningObjectives": [
              "Subtract numbers within the range 1-10",
              "Identify and use correctly the sign minus (-)",
              "Use subtraction to solve real-life problems",
              "Understand subtraction as taking away",
              "Use concrete objects to demonstrate subtraction"
            ],
            "keyVocabulary": [
              "subtract",
              "subtraction",
              "minus",
              "take away",
              "difference",
              "less",
              "remain",
              "left"
            ],
            "exampleActivities": [
              "Subtract using concrete objects",
              "Practice taking away from groups",
              "Use number line for subtraction",
              "Solve simple subtraction problems",
              "Apply subtraction to real-life situations"
            ],
            "assessmentFocus": [
              "Subtract within the range 1-10 using concrete objects",
              "Use the minus sign correctly",
              "Solve simple subtraction problems",
              "Apply subtraction to real situations"
            ],
            "prerequisiteTopicIds": [
              "g2-num-addition"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-relating-to-others",
                "description": "Using subtraction in daily contexts"
              }
            ]
          },
          {
            "id": "g2-num-2d-shapes",
            "title": "2-Dimensional Shapes",
            "description": "Learners identify, name, and sketch basic 2D shapes found in their environment.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Scientific and Technological",
              "Creativity and Entrepreneurial"
            ],
            "learningObjectives": [
              "Identify 2-dimensional shapes (triangle, rectangle, square and circle)",
              "Sketch 2-dimensional shapes",
              "Paint given shapes, managing to stay within the lines",
              "Make prints of simple designs",
              "Identify shapes in the environment",
              "Do tessellation using squares, rectangles and triangles"
            ],
            "keyVocabulary": [
              "shape",
              "circle",
              "square",
              "rectangle",
              "triangle",
              "sides",
              "corners",
              "round",
              "flat"
            ],
            "exampleActivities": [
              "Identify, trace, sketch and paint 2D shapes",
              "Find shapes in the classroom and environment",
              "Create tessellation patterns",
              "Make shape prints",
              "Sort objects by shape"
            ],
            "assessmentFocus": [
              "Identify 2-dimensional shapes by name",
              "Sketch 2-dimensional shapes",
              "Paint within the lines",
              "Create tessellation patterns",
              "Identify shapes in environment"
            ],
            "prerequisiteTopicIds": [
              "g2-num-sorting-and-sets"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-relating-to-others",
                "description": "Identifying and sketching shapes"
              },
              {
                "subject": "English Literacy",
                "topicId": "g2-el-colours-and-shapes",
                "description": "Learning shape names in English"
              }
            ]
          },
          {
            "id": "g2-num-money-and-measurement",
            "title": "Money and Measurement",
            "description": "Learners are introduced to coins and basic measurement using arbitrary units.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Production and Work-related Competencies"
            ],
            "learningObjectives": [
              "Identify Lesotho and RSA coins in circulation",
              "Measure length using arbitrary units such as body measurements",
              "Measure mass using arbitrary units",
              "Measure volume using arbitrary units",
              "Compare measurements",
              "Use appropriate vocabulary for measurement"
            ],
            "keyVocabulary": [
              "coin",
              "money",
              "measure",
              "length",
              "height",
              "weight",
              "mass",
              "volume",
              "capacity",
              "hand-span",
              "stride",
              "heavier",
              "lighter",
              "longer",
              "shorter"
            ],
            "exampleActivities": [
              "Identify Lesotho and RSA coins by colour, size, pictures and value",
              "Measure heights using hand-spans and strides",
              "Compare weights using bean bags and sand bags",
              "Compare volumes of different containers",
              "Practice measuring classroom objects"
            ],
            "assessmentFocus": [
              "Identify Lesotho and RSA coins by colour, size, pictures and value",
              "Measure using arbitrary units",
              "Compare measurements correctly",
              "Use measurement vocabulary appropriately"
            ],
            "prerequisiteTopicIds": [
              "g2-num-counting-1-20"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-relating-to-others",
                "description": "Identifying coins and measuring"
              }
            ]
          },
          {
            "id": "g2-num-shapes-in-environment",
            "title": "Shapes in the Environment",
            "description": "Learners apply their knowledge of shapes by identifying them in their natural and built environment.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Environmental Adaptation and Sustainable Development"
            ],
            "learningObjectives": [
              "Identify shapes in their environment",
              "Identify and name sets of up to five objects in their environment",
              "Recognize patterns in the environment",
              "Create patterns using shapes"
            ],
            "keyVocabulary": [
              "environment",
              "pattern",
              "design",
              "nature",
              "building"
            ],
            "exampleActivities": [
              "Identify shapes in classroom and school",
              "Find shapes in nature",
              "Look for shapes in buildings",
              "Create shape collections from environment",
              "Make patterns using environmental materials"
            ],
            "assessmentFocus": [
              "Identify shapes in their environment",
              "Name sets of objects in environment",
              "Recognize and describe patterns",
              "Create patterns using shapes"
            ],
            "prerequisiteTopicIds": [
              "g2-num-2d-shapes"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-world-around-me",
                "description": "Identifying shapes in the natural world"
              }
            ]
          },
          {
            "id": "g2-num-number-facts",
            "title": "Number Facts and Missing Numbers",
            "description": "Learners find missing numbers in addition and subtraction facts within the range 1-10.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Find the missing numbers in addition number facts within the range 1-10",
              "Find the missing numbers in subtraction number facts within the range 1-10",
              "Complete number sentences",
              "Understand inverse relationship between addition and subtraction"
            ],
            "keyVocabulary": [
              "missing number",
              "number fact",
              "number sentence",
              "complete",
              "solve"
            ],
            "exampleActivities": [
              "Complete number sentences with missing addends",
              "Find missing numbers in subtraction facts",
              "Use concrete objects to find missing numbers",
              "Practice with number families",
              "Solve problems with missing numbers"
            ],
            "assessmentFocus": [
              "Find missing numbers in addition facts within the range 1-10",
              "Find missing numbers in subtraction facts within the range 1-10",
              "Complete number sentences correctly",
              "Show understanding of number relationships"
            ],
            "prerequisiteTopicIds": [
              "g2-num-addition",
              "g2-num-subtraction"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-world-around-me",
                "description": "Finding missing numbers in number facts"
              }
            ]
          },
          {
            "id": "g2-num-data-handling",
            "title": "Data Handling - Tally Marks and Pictograms",
            "description": "Learners learn to collect, record and interpret simple data using tally marks and pictograms.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Scientific and Technological",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Use tally marks to record litter in the environment",
              "Use pictograms to give information about real-life contexts",
              "Interpret pictograms that represent health, environment and cultural issues",
              "Collect and organize simple data",
              "Read information from simple graphs"
            ],
            "keyVocabulary": [
              "tally marks",
              "pictogram",
              "data",
              "collect",
              "record",
              "count",
              "information",
              "graph"
            ],
            "exampleActivities": [
              "Use tally marks to record litter",
              "Create pictograms of collected objects",
              "Interpret simple pictograms",
              "Collect data about classroom",
              "Make pictograms about health topics"
            ],
            "assessmentFocus": [
              "Use tally marks to record litter",
              "Interpret pictograms",
              "Create simple pictograms",
              "Read information from pictograms",
              "Organize collected data"
            ],
            "prerequisiteTopicIds": [
              "g2-num-counting-1-20"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-looking-after-myself",
                "description": "Using tally marks and pictograms to record health and environmental data"
              }
            ]
          },
          {
            "id": "g2-num-addition-subtraction-applications",
            "title": "Application of Addition and Subtraction",
            "description": "Learners apply addition and subtraction skills to solve real-life problems.",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Problem solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Apply addition and subtraction to solve real-life problems",
              "Use problem-solving strategies",
              "Explain solution methods",
              "Check answers for reasonableness"
            ],
            "keyVocabulary": [
              "problem",
              "solve",
              "strategy",
              "real-life",
              "application",
              "answer",
              "check"
            ],
            "exampleActivities": [
              "Solve word problems involving addition",
              "Solve word problems involving subtraction",
              "Create own problem scenarios",
              "Use objects to model problems",
              "Explain problem-solving steps"
            ],
            "assessmentFocus": [
              "Solve real-life problems using addition and subtraction",
              "Use appropriate problem-solving strategies",
              "Explain how they solved problems",
              "Check if answers make sense"
            ],
            "prerequisiteTopicIds": [
              "g2-num-addition",
              "g2-num-subtraction"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-looking-after-myself",
                "description": "Applying addition and subtraction to real-life situations"
              }
            ]
          },
          {
            "id": "g2-num-money-operations",
            "title": "Money Operations",
            "description": "Learners perform simple addition and subtraction using Lesotho and RSA coins and notes (up to M100/R100).",
            "curriculumStandards": [
              "Numerical and Mathematical",
              "Production and Work-related Competencies",
              "Problem solving"
            ],
            "learningObjectives": [
              "Identify Lesotho and RSA coins and notes (up to M100/R100)",
              "Understand value of money",
              "Add money amounts",
              "Subtract money amounts",
              "Solve money problems in practical situations"
            ],
            "keyVocabulary": [
              "money",
              "coins",
              "notes",
              "Maloti",
              "Rand",
              "value",
              "buy",
              "sell",
              "change",
              "cost"
            ],
            "exampleActivities": [
              "Identifying coins and notes",
              "Counting money",
              "Adding money amounts",
              "Subtracting money amounts",
              "Role-playing buying and selling"
            ],
            "assessmentFocus": [
              "Identify coins and notes correctly",
              "Count money accurately",
              "Add money amounts",
              "Subtract money amounts",
              "Solve practical money problems"
            ],
            "prerequisiteTopicIds": [
              "g2-num-addition-without-carrying",
              "g2-num-subtraction-without-borrowing"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g2-is-relating-to-others",
                "description": "Using money in practical situations"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "grade": "3",
    "subjects": [
      {
        "name": "Integrated Studies",
        "topics": [
          {
            "id": "g3-is-family-genealogy",
            "title": "Family Genealogy",
            "description": "Understanding family trees and relationships across three generations including paternal and maternal grandparents.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Outline their family genealogy",
              "Identify family members up to three generations",
              "Role-play family members up to three generations",
              "Draw family trees up to three generations"
            ],
            "keyVocabulary": [
              "family tree",
              "paternal grandparents",
              "maternal grandparents",
              "three generations"
            ],
            "exampleActivities": [
              "Identify family members up to three generations",
              "Role-play family members",
              "Draw family tree"
            ],
            "assessmentFocus": [
              "Ability to outline their family genealogy",
              "Ability to draw family trees up to three generations",
              "Ability to role-play family members"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-clans-and-totems",
            "title": "Clans and Totems in Lesotho",
            "description": "Learning about different clans and totems in Lesotho culture.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify different clans and totems in Lesotho"
            ],
            "keyVocabulary": [
              "clan",
              "totem",
              "Lesotho"
            ],
            "exampleActivities": [
              "Group learners according to their clans to form sets",
              "Recite clan-related poems"
            ],
            "assessmentFocus": [
              "Ability to identify different clans and totems in Lesotho"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g3-num-sets-introduction",
                "description": "Using clans to form and understand sets"
              }
            ]
          },
          {
            "id": "g3-is-indigenous-games",
            "title": "Indigenous Games",
            "description": "Learning and playing traditional indigenous games.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Play indigenous games"
            ],
            "keyVocabulary": [
              "indigenous games",
              "traditional games"
            ],
            "exampleActivities": [
              "Play traditional indigenous games"
            ],
            "assessmentFocus": [
              "Ability to play indigenous games"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-leaders-in-institutions",
            "title": "Leaders in Social Institutions",
            "description": "Identifying leaders in different social institutions and understanding their roles.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify leaders in different social institutions",
              "State their roles and responsibilities in different social institutions"
            ],
            "keyVocabulary": [
              "leaders",
              "social institutions",
              "roles",
              "responsibilities"
            ],
            "exampleActivities": [
              "Identify leaders in various social institutions",
              "Discuss roles and responsibilities"
            ],
            "assessmentFocus": [
              "Ability to identify leaders in different social institutions",
              "Ability to state roles and responsibilities"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-goods-services-trade",
            "title": "Goods, Services and Trade",
            "description": "Understanding goods, services and forms of trade that satisfy basic needs.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify goods, services and forms of trade which satisfy basic needs"
            ],
            "keyVocabulary": [
              "goods",
              "services",
              "trade",
              "basic needs"
            ],
            "exampleActivities": [
              "Identify different goods and services",
              "Discuss forms of trade"
            ],
            "assessmentFocus": [
              "Ability to identify goods, services and forms of trade"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-career-types",
            "title": "Types of Careers",
            "description": "Exploring different types of careers and professions.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify different types of careers"
            ],
            "keyVocabulary": [
              "career",
              "profession",
              "occupation"
            ],
            "exampleActivities": [
              "Explore various career types",
              "Discuss different professions"
            ],
            "assessmentFocus": [
              "Ability to identify different types of careers"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-thematic-poems",
            "title": "Thematic Poems: Respect and Honesty",
            "description": "Learning and reciting poems about respect and honesty.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Recite thematic poems about respect and honesty"
            ],
            "keyVocabulary": [
              "poem",
              "respect",
              "honesty",
              "recite"
            ],
            "exampleActivities": [
              "Learn and recite poems",
              "Discuss themes of respect and honesty"
            ],
            "assessmentFocus": [
              "Ability to recite thematic poems about respect and honesty"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-creative-composition",
            "title": "Creative Composition",
            "description": "Composing games, expressive and literary works.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Compose games, expressive and literary works"
            ],
            "keyVocabulary": [
              "compose",
              "creative writing",
              "expressive works"
            ],
            "exampleActivities": [
              "Create original games",
              "Write expressive and literary works"
            ],
            "assessmentFocus": [
              "Ability to compose games, expressive and literary works"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-drawing-communication",
            "title": "Drawing for Expression and Communication",
            "description": "Using different types of drawing to express ideas and communicate.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use different types of drawing to express themselves and communicate"
            ],
            "keyVocabulary": [
              "drawing",
              "expression",
              "communication",
              "visual art"
            ],
            "exampleActivities": [
              "Create drawings to express ideas",
              "Use drawing as a communication tool"
            ],
            "assessmentFocus": [
              "Ability to use different types of drawing to express themselves and communicate"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-music-genres",
            "title": "Music Genres from Different Cultures",
            "description": "Identifying and appreciating music genres from three different cultures.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify music genres from three different cultures"
            ],
            "keyVocabulary": [
              "music genres",
              "culture",
              "multicultural"
            ],
            "exampleActivities": [
              "Listen to music from different cultures",
              "Identify and classify music genres"
            ],
            "assessmentFocus": [
              "Ability to identify music genres from three different cultures"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-crochet",
            "title": "Basic Crochet",
            "description": "Learning to crochet simple items.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Crochet simple items"
            ],
            "keyVocabulary": [
              "crochet",
              "yarn",
              "needle",
              "handicraft"
            ],
            "exampleActivities": [
              "Practice basic crochet stitches",
              "Create simple crocheted items"
            ],
            "assessmentFocus": [
              "Ability to crochet simple items"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-knitting",
            "title": "Basic Knitting",
            "description": "Learning to knit simple items.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Knit simple items"
            ],
            "keyVocabulary": [
              "knitting",
              "yarn",
              "needles",
              "handicraft"
            ],
            "exampleActivities": [
              "Practice basic knitting stitches",
              "Create simple knitted items"
            ],
            "assessmentFocus": [
              "Ability to knit simple items"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-sewing-stitches",
            "title": "Basic Sewing Stitches",
            "description": "Learning and performing basic sewing stitches.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Perform basic sewing stitches"
            ],
            "keyVocabulary": [
              "sewing",
              "stitches",
              "needle",
              "thread"
            ],
            "exampleActivities": [
              "Practice basic sewing stitches",
              "Create simple sewn items"
            ],
            "assessmentFocus": [
              "Ability to perform basic sewing stitches"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-coat-of-arms",
            "title": "Lesotho Coat of Arms",
            "description": "Understanding and interpreting the features of the Lesotho coat of arms.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Interpret the features of the coat of arms"
            ],
            "keyVocabulary": [
              "coat of arms",
              "national symbol",
              "Lesotho"
            ],
            "exampleActivities": [
              "Study the coat of arms",
              "Interpret the meaning of its features"
            ],
            "assessmentFocus": [
              "Ability to interpret the features of the coat of arms"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-signs-and-symbols",
            "title": "Creating Signs and Symbols",
            "description": "Creating and understanding signs and symbols for communication.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Create signs and symbols"
            ],
            "keyVocabulary": [
              "signs",
              "symbols",
              "visual communication"
            ],
            "exampleActivities": [
              "Create signs and symbols",
              "Interpret common signs and symbols"
            ],
            "assessmentFocus": [
              "Ability to create signs and symbols"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-respect-in-behavior",
            "title": "Respect in Speech and Behavior",
            "description": "Understanding and demonstrating respect in speech and behavior at school and at home.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Show respect in speech and behaviour at school and at home",
              "Discuss school regulations",
              "Discuss consequences of violating school regulations",
              "Role-play making requests and showing appreciation"
            ],
            "keyVocabulary": [
              "respect",
              "behavior",
              "speech",
              "school regulations"
            ],
            "exampleActivities": [
              "Discuss school regulations and consequences",
              "Role-play respectful interactions",
              "Practice making requests and showing appreciation"
            ],
            "assessmentFocus": [
              "Ability to show respect in speech and behaviour"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-kinship-terms",
            "title": "Kinship Terms and Titles",
            "description": "Learning to address people according to their kinship terms and titles.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Address people according to their kinship terms and titles"
            ],
            "keyVocabulary": [
              "kinship terms",
              "titles",
              "family relationships"
            ],
            "exampleActivities": [
              "Learn kinship terms",
              "Practice addressing people with appropriate titles"
            ],
            "assessmentFocus": [
              "Ability to address people according to their kinship terms and titles"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-dramatise-stories",
            "title": "Dramatising Stories: Respect and Honesty",
            "description": "Dramatising short stories that depict respect and honesty.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Dramatise short stories that depict respect and honesty"
            ],
            "keyVocabulary": [
              "dramatise",
              "role-play",
              "respect",
              "honesty"
            ],
            "exampleActivities": [
              "Read and analyze stories about respect and honesty",
              "Create and perform dramatizations"
            ],
            "assessmentFocus": [
              "Ability to dramatise short stories that depict respect and honesty"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-ethnic-groups",
            "title": "Ethnic Groups in Lesotho",
            "description": "Identifying different ethnic groups and their influence in Lesotho including San, Nguni and Sotho.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify different ethnic groups and their influence in Lesotho (San, Nguni and Sotho)",
              "State other African and non-African groups in Lesotho and their places of origin"
            ],
            "keyVocabulary": [
              "ethnic groups",
              "San",
              "Nguni",
              "Sotho",
              "cultural influence"
            ],
            "exampleActivities": [
              "Research ethnic groups in Lesotho",
              "Identify places of origin of different groups"
            ],
            "assessmentFocus": [
              "Ability to identify different ethnic groups and their influence",
              "Ability to state places of origin of various groups"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-cultural-songs-dances",
            "title": "Cultural Songs and Dances",
            "description": "Learning to sing and dance to cultural songs including mokhibo, mohobelo, and ndlamo.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Sing and dance to cultural songs (mokhibo, mohobelo, ndlamo)"
            ],
            "keyVocabulary": [
              "mokhibo",
              "mohobelo",
              "ndlamo",
              "cultural songs",
              "traditional dance"
            ],
            "exampleActivities": [
              "Learn and perform cultural songs",
              "Practice traditional dances"
            ],
            "assessmentFocus": [
              "Ability to sing and dance to cultural songs"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-2d-shapes-culture",
            "title": "2-Dimensional Shapes in Basotho Culture",
            "description": "Identifying 2-dimensional shapes found in Basotho culture.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify 2-dimensional shapes found in Basotho culture"
            ],
            "keyVocabulary": [
              "2-dimensional shapes",
              "Basotho culture",
              "geometric patterns"
            ],
            "exampleActivities": [
              "Identify shapes in cultural artifacts",
              "Explore geometric patterns in Basotho art"
            ],
            "assessmentFocus": [
              "Ability to identify 2-dimensional shapes in Basotho culture"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Numeracy",
                "topicId": "g3-num-shapes",
                "description": "Connection between cultural shapes and geometric concepts"
              }
            ]
          },
          {
            "id": "g3-is-traditional-dishes",
            "title": "Traditional Dishes",
            "description": "Identifying and preparing traditional dishes from Basotho and other cultures.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify a number of traditional dishes",
              "Prepare traditional cuisines from other cultures"
            ],
            "keyVocabulary": [
              "traditional dishes",
              "cuisine",
              "food preparation",
              "cultural food"
            ],
            "exampleActivities": [
              "Identify Basotho traditional dishes",
              "Prepare traditional food from different cultures"
            ],
            "assessmentFocus": [
              "Ability to identify traditional dishes",
              "Ability to prepare traditional cuisines"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-prophets-religions",
            "title": "Prophets in Different Religions",
            "description": "Learning about prophets and their roles in different religions.",
            "curriculumStandards": [],
            "learningObjectives": [
              "State names of the prophets to the Supreme Being in different religions",
              "State the roles of the prophets in different religions",
              "Relate one's responsibilities to the Supreme Being"
            ],
            "keyVocabulary": [
              "prophets",
              "Supreme Being",
              "religion",
              "spiritual responsibility"
            ],
            "exampleActivities": [
              "Learn about prophets in different religions",
              "Discuss roles of prophets",
              "Reflect on spiritual responsibilities"
            ],
            "assessmentFocus": [
              "Ability to state names of prophets",
              "Ability to state roles of prophets",
              "Ability to relate responsibilities to the Supreme Being"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-paint-designs",
            "title": "Painting Designs",
            "description": "Using paint to create designs that communicate ideas and feelings.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Paint designs to communicate ideas and feelings"
            ],
            "keyVocabulary": [
              "painting",
              "design",
              "visual communication",
              "expression"
            ],
            "exampleActivities": [
              "Create painted designs",
              "Express ideas through painting"
            ],
            "assessmentFocus": [
              "Ability to paint designs to communicate ideas and feelings"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-print-designs",
            "title": "Printing Simple Designs",
            "description": "Creating and printing simple designs.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Print simple designs"
            ],
            "keyVocabulary": [
              "printing",
              "design",
              "pattern"
            ],
            "exampleActivities": [
              "Create simple designs for printing",
              "Use printing techniques"
            ],
            "assessmentFocus": [
              "Ability to print simple designs"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-sound-communication",
            "title": "Using Sound to Communicate",
            "description": "Understanding and using sound as a means of communication.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use sound to communicate"
            ],
            "keyVocabulary": [
              "sound",
              "communication",
              "audio"
            ],
            "exampleActivities": [
              "Explore different sounds",
              "Use sound for communication"
            ],
            "assessmentFocus": [
              "Ability to use sound to communicate"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-computer-basics",
            "title": "Basic Computer Knowledge",
            "description": "Introduction to basic computer hardware, terminology, and etiquette.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify basic computer hardware components and peripheral devices",
              "Use basic computer terminology",
              "Perform the basic functions of computer word processing software",
              "Demonstrate appropriate computer etiquette"
            ],
            "keyVocabulary": [
              "computer hardware",
              "peripheral devices",
              "word processing",
              "computer etiquette"
            ],
            "exampleActivities": [
              "Identify computer parts",
              "Practice using word processing software",
              "Learn computer etiquette"
            ],
            "assessmentFocus": [
              "Ability to identify basic computer hardware components",
              "Ability to use basic computer terminology",
              "Ability to perform basic word processing functions",
              "Ability to demonstrate appropriate computer etiquette"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-living-nonliving",
            "title": "Living and Non-Living Things",
            "description": "Understanding the basic differences between living and non-living things.",
            "curriculumStandards": [],
            "learningObjectives": [
              "State basic differences between living and non-living things",
              "Make a plan to protect three living and three non-living things in the immediate environment"
            ],
            "keyVocabulary": [
              "living things",
              "non-living things",
              "breathing",
              "growth",
              "eating",
              "excretion"
            ],
            "exampleActivities": [
              "Identify and sort living and non-living things",
              "Create plans for environmental protection",
              "Create posters of living and non-living things"
            ],
            "assessmentFocus": [
              "Ability to differentiate between living and non-living things",
              "Ability to make a protection plan"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-plant-parts",
            "title": "Parts of a Plant",
            "description": "Identifying the main parts of a plant including leaves, stem, and roots.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify parts of a plant (leaves, stem, roots)"
            ],
            "keyVocabulary": [
              "leaves",
              "stem",
              "roots",
              "plant parts"
            ],
            "exampleActivities": [
              "Examine real plants",
              "Label plant parts",
              "Draw and identify plant structures"
            ],
            "assessmentFocus": [
              "Ability to identify parts of a plant"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-aerobic-exercise",
            "title": "Basic Aerobic Exercise",
            "description": "Learning and demonstrating proper basic aerobic exercising movements.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate proper basic aerobic exercising movements"
            ],
            "keyVocabulary": [
              "aerobic exercise",
              "movement",
              "physical fitness"
            ],
            "exampleActivities": [
              "Practice aerobic movements",
              "Perform exercise routines"
            ],
            "assessmentFocus": [
              "Ability to demonstrate proper basic aerobic exercising movements"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-recycling",
            "title": "Recycling for Sustainability",
            "description": "Learning about recycling materials and designing projects using recycled materials.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Recycle materials to promote sustainable use of resources",
              "Design a mini project using recycled materials"
            ],
            "keyVocabulary": [
              "recycling",
              "sustainability",
              "resources",
              "reuse"
            ],
            "exampleActivities": [
              "Collect and sort recyclable materials",
              "Create projects from recycled materials",
              "Design mini projects"
            ],
            "assessmentFocus": [
              "Ability to recycle materials",
              "Ability to design a mini project using recycled materials"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-toy-furniture",
            "title": "Toy Furniture from Local Resources",
            "description": "Designing and producing toy furniture using local resources.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Design and produce toy furniture from local resources"
            ],
            "keyVocabulary": [
              "toy furniture",
              "local resources",
              "design",
              "production"
            ],
            "exampleActivities": [
              "Plan toy furniture designs",
              "Create toy furniture using available materials"
            ],
            "assessmentFocus": [
              "Ability to design and produce toy furniture from local resources"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-weather-conditions",
            "title": "Weather Conditions",
            "description": "Identifying and recording combined weather conditions.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify and record combined weather conditions"
            ],
            "keyVocabulary": [
              "weather",
              "conditions",
              "observation",
              "recording"
            ],
            "exampleActivities": [
              "Observe daily weather",
              "Record weather conditions",
              "Create weather charts"
            ],
            "assessmentFocus": [
              "Ability to identify and record combined weather conditions"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-air-pollution",
            "title": "Air Pollution",
            "description": "Understanding causes of air pollution and ways to control it.",
            "curriculumStandards": [],
            "learningObjectives": [
              "State causes of air pollution and suggest ways of controlling it"
            ],
            "keyVocabulary": [
              "air pollution",
              "causes",
              "control measures",
              "environment"
            ],
            "exampleActivities": [
              "Discuss sources of air pollution",
              "Brainstorm solutions to reduce air pollution"
            ],
            "assessmentFocus": [
              "Ability to state causes of air pollution",
              "Ability to suggest ways of controlling it"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-soil-properties",
            "title": "Properties and Types of Soil",
            "description": "Describing the properties of different types of soil and understanding soil erosion.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe the properties of different types of soil",
              "Explain causes of soil erosion"
            ],
            "keyVocabulary": [
              "soil",
              "properties",
              "soil types",
              "erosion"
            ],
            "exampleActivities": [
              "Examine different soil samples",
              "Conduct soil experiments",
              "Discuss causes of soil erosion"
            ],
            "assessmentFocus": [
              "Ability to describe soil properties",
              "Ability to explain causes of soil erosion"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-environmental-sounds",
            "title": "Sounds from the Environment",
            "description": "Identifying, distinguishing, and presenting information about sounds from the environment.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify sounds of different objects and animals",
              "Use various ways of presenting information about sounds from the environment scientifically",
              "Distinguish various sounds from the environment to create a graphic score"
            ],
            "keyVocabulary": [
              "environmental sounds",
              "identification",
              "graphic score",
              "sound presentation"
            ],
            "exampleActivities": [
              "Listen to and identify environmental sounds",
              "Create sound maps",
              "Develop graphic scores"
            ],
            "assessmentFocus": [
              "Ability to identify sounds",
              "Ability to present information about sounds scientifically",
              "Ability to create a graphic score"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-human-rights",
            "title": "Basic Human Rights and Responsibilities",
            "description": "Understanding four basic human rights and their corresponding responsibilities.",
            "curriculumStandards": [],
            "learningObjectives": [
              "State four basic human rights and corresponding responsibilities"
            ],
            "keyVocabulary": [
              "human rights",
              "responsibilities",
              "love",
              "affection",
              "security",
              "protection",
              "discrimination",
              "clean environment"
            ],
            "exampleActivities": [
              "Discuss human rights and responsibilities",
              "Write compositions about human rights",
              "Role-play scenarios involving rights and responsibilities"
            ],
            "assessmentFocus": [
              "Ability to state four basic human rights and corresponding responsibilities",
              "Ability to write about human rights"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-vandalism-prevention",
            "title": "Preventing Vandalism",
            "description": "Understanding and suggesting ways to prevent vandalism.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Suggest ways of preventing vandalism"
            ],
            "keyVocabulary": [
              "vandalism",
              "prevention",
              "property damage"
            ],
            "exampleActivities": [
              "Discuss what vandalism is",
              "Brainstorm prevention strategies",
              "Create anti-vandalism campaigns"
            ],
            "assessmentFocus": [
              "Ability to suggest ways of preventing vandalism"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-additional-aerobic-exercise",
            "title": "Additional Aerobic Exercise Movements",
            "description": "Demonstrating additional aerobic exercising movements.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate additional aerobic exercising movements"
            ],
            "keyVocabulary": [
              "aerobic exercise",
              "movement",
              "physical fitness"
            ],
            "exampleActivities": [
              "Practice new aerobic movements",
              "Create exercise routines"
            ],
            "assessmentFocus": [
              "Ability to demonstrate additional aerobic exercising movements"
            ],
            "prerequisiteTopicIds": [
              "g3-is-aerobic-exercise"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-road-safety",
            "title": "Road Safety",
            "description": "Comprehensive understanding of road safety including signs, lights, atmospheric conditions, and accident prevention.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Make signs and symbols to promote road safety",
              "Identify the use of different types of lights in vehicles",
              "Identify atmospheric conditions that impede visibility",
              "Explain the colour sequence in traffic lights",
              "State causes of road accidents",
              "Explain ways of avoiding road accidents",
              "Describe precautions to promote road safety in the community",
              "Design and play safety games relating to road safety"
            ],
            "keyVocabulary": [
              "road safety",
              "traffic lights",
              "vehicle lights",
              "visibility",
              "accidents",
              "precautions"
            ],
            "exampleActivities": [
              "Create road safety signs",
              "Study traffic lights",
              "Discuss causes of accidents",
              "Design safety games"
            ],
            "assessmentFocus": [
              "Ability to make road safety signs and symbols",
              "Ability to identify vehicle lights and their uses",
              "Ability to explain traffic light sequences",
              "Ability to state causes of accidents and ways to avoid them",
              "Ability to describe safety precautions"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-body-care",
            "title": "Taking Care of the Body",
            "description": "Learning how to take care of external parts of the body.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate how to take care of external parts of the body"
            ],
            "keyVocabulary": [
              "body care",
              "hygiene",
              "health"
            ],
            "exampleActivities": [
              "Discuss proper hygiene practices",
              "Demonstrate body care routines"
            ],
            "assessmentFocus": [
              "Ability to demonstrate how to take care of external parts of the body"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-infectious-diseases",
            "title": "Infectious Diseases",
            "description": "Understanding infectious diseases including how they spread and how to reduce their spread.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Recognise ways in which infectious diseases are spread (diarrhoea, typhoid, dysentery)",
              "Recognise ways of reducing the spread of infectious diseases (diarrhoea, typhoid, dysentery)"
            ],
            "keyVocabulary": [
              "infectious diseases",
              "diarrhoea",
              "typhoid",
              "dysentery",
              "disease transmission",
              "prevention"
            ],
            "exampleActivities": [
              "Discuss how diseases spread",
              "Learn prevention methods",
              "Practice hygiene to prevent disease"
            ],
            "assessmentFocus": [
              "Ability to recognise ways diseases are spread",
              "Ability to recognise ways of reducing disease spread"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-expired-products",
            "title": "Expired Products and Pharmaceutical Waste",
            "description": "Identifying expired products and proper disposal of pharmaceutical waste.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify expired products for disposal",
              "Demonstrate proper ways of disposing pharmaceutical waste"
            ],
            "keyVocabulary": [
              "expired products",
              "pharmaceutical waste",
              "disposal",
              "safety"
            ],
            "exampleActivities": [
              "Learn to read expiry dates",
              "Discuss proper disposal methods",
              "Practice safe waste disposal"
            ],
            "assessmentFocus": [
              "Ability to identify expired products",
              "Ability to demonstrate proper disposal methods"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-balanced-diet",
            "title": "Balanced Diet and Food Preservation",
            "description": "Understanding principles of balanced diet, food preservation, and indigenous vegetables.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Explain the principles of a balanced diet",
              "Demonstrate drying of meat",
              "Identify indigenous vegetables that promote healthy living"
            ],
            "keyVocabulary": [
              "balanced diet",
              "nutrition",
              "food preservation",
              "indigenous vegetables"
            ],
            "exampleActivities": [
              "Discuss components of a balanced diet",
              "Practice meat drying techniques",
              "Identify local vegetables"
            ],
            "assessmentFocus": [
              "Ability to explain principles of balanced diet",
              "Ability to demonstrate meat drying",
              "Ability to identify indigenous vegetables"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-plant-animal-diseases",
            "title": "Common Diseases in Plants and Animals",
            "description": "Understanding common diseases in leaf and root crops and ruminant animals.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe common diseases in leaf and root crops",
              "Describe common diseases in ruminant animals"
            ],
            "keyVocabulary": [
              "plant diseases",
              "animal diseases",
              "leaf crops",
              "root crops",
              "ruminant animals"
            ],
            "exampleActivities": [
              "Study plant diseases",
              "Learn about animal health",
              "Identify disease symptoms"
            ],
            "assessmentFocus": [
              "Ability to describe common diseases in crops",
              "Ability to describe common diseases in ruminant animals"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-indigenous-healthy-games",
            "title": "Indigenous Games for Healthy Living",
            "description": "Learning and playing indigenous games that promote healthy living.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify indigenous games that promote healthy living (mokou, marondas, libeke, lebekere, morabaraba, boleke, ball games)",
              "Design health and safety games"
            ],
            "keyVocabulary": [
              "indigenous games",
              "healthy living",
              "mokou",
              "marondas",
              "morabaraba"
            ],
            "exampleActivities": [
              "Learn traditional games",
              "Play indigenous games",
              "Design new health-promoting games"
            ],
            "assessmentFocus": [
              "Ability to identify and play indigenous games",
              "Ability to design health and safety games"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-is-drought-preparedness",
            "title": "Drought Preparedness and Recovery",
            "description": "Understanding drought preparedness, proper behavior during drought, and recovery methods.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate a preparedness plan for drought",
              "Demonstrate proper behaviour and precautions during drought",
              "Identify ways of recovering from drought"
            ],
            "keyVocabulary": [
              "drought",
              "preparedness",
              "precautions",
              "recovery",
              "disaster management"
            ],
            "exampleActivities": [
              "Create drought preparedness plans",
              "Discuss proper drought behavior",
              "Identify recovery strategies"
            ],
            "assessmentFocus": [
              "Ability to demonstrate a preparedness plan",
              "Ability to demonstrate proper behaviour during drought",
              "Ability to identify recovery methods"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Literacy - Sesotho",
        "topics": [
          {
            "id": "g3-ses-greetings-unit1",
            "title": "Formal and Informal Greetings",
            "description": "Learning to greet appropriately using formal and informal greetings in Sesotho, including the use of titles.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Greet and respond to greetings appropriately and respectfully",
              "Greet appropriately depending on whether greeting one or many people",
              "Use appropriate words when parting with people"
            ],
            "keyVocabulary": [
              "Lumela",
              "Lumelang",
              "Le phela joang",
              "Sala hantle",
              "Fonane",
              "tumeliso"
            ],
            "exampleActivities": [
              "Practice greetings with teacher guidance",
              "Role-play greeting situations",
              "Practice greetings in pairs and small groups"
            ],
            "assessmentFocus": [
              "Ability to greet and respond to greetings appropriately",
              "Ability to use correct greeting forms for different situations"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-following-instructions",
            "title": "Following Multiple Instructions",
            "description": "Learning to listen to and follow up to three correct instructions at one time.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Listen and follow one instruction at a time",
              "Repeat two instructions given at once",
              "Follow three instructions when reminded",
              "Follow three instructions without being reminded",
              "Act out instructions given"
            ],
            "keyVocabulary": [
              "litaelo",
              "mamela",
              "phetha"
            ],
            "exampleActivities": [
              "Teacher gives instructions for learners to follow",
              "Learners practice following multiple instructions",
              "Learners act out instructions"
            ],
            "assessmentFocus": [
              "Ability to follow multiple instructions",
              "Ability to remember and execute instructions without prompting"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-story-prediction",
            "title": "Story Prediction and Comprehension",
            "description": "Listening to stories, predicting contents from titles, and answering comprehension questions.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Predict story contents with the help of the title",
              "Ask and answer questions about stories",
              "Give opinions about stories",
              "State events sequentially",
              "Explain why events occurred as they did"
            ],
            "keyVocabulary": [
              "pale",
              "sehlooho",
              "liketsahalo",
              "mabaka"
            ],
            "exampleActivities": [
              "Listen to stories and predict contents",
              "Answer comprehension questions",
              "Sequence story events",
              "Discuss reasons for story events"
            ],
            "assessmentFocus": [
              "Ability to predict story contents",
              "Ability to answer comprehension questions",
              "Ability to sequence events and explain causes"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-letter-blends-unit1",
            "title": "Four-Letter Blends: mpsh, ntlh",
            "description": "Introduction and practice of four-letter blends mpsh and ntlh in Sesotho.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Read words containing letter blends mpsh, ntlh",
              "Write words containing these blends",
              "Use the blends in sentences"
            ],
            "keyVocabulary": [
              "mpsh",
              "ntlh",
              "letter blends"
            ],
            "exampleActivities": [
              "Identify and practice four-letter blends",
              "Read and write words with these blends",
              "Create sentences using the blends"
            ],
            "assessmentFocus": [
              "Ability to read and write words with mpsh and ntlh",
              "Ability to use blends correctly in context"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-paragraph-writing",
            "title": "Paragraph Writing",
            "description": "Introduction to paragraph writing through guided composition, with attention to proper punctuation and capital letters for proper nouns.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Write paragraphs through guided composition",
              "Use capital letters for proper nouns",
              "Apply correct punctuation"
            ],
            "keyVocabulary": [
              "serapa",
              "setlhaku se seholo",
              "mabitso a tloaelehileng",
              "matÅ¡oao"
            ],
            "exampleActivities": [
              "Practice guided paragraph writing",
              "Identify and use capital letters for proper nouns",
              "Apply punctuation rules"
            ],
            "assessmentFocus": [
              "Ability to write paragraphs with guidance",
              "Ability to use capital letters and punctuation correctly"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-oral-skills-unit1",
            "title": "Oral Skills Development",
            "description": "Speaking about topics of interest, giving reports, and reciting poems including clan-related poems.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Speak about topics of interest",
              "Give reports",
              "Recite poems including clan-related poems"
            ],
            "keyVocabulary": [
              "buisana",
              "tlaleho",
              "litÅ¡omo",
              "moloko"
            ],
            "exampleActivities": [
              "Present on topics of interest",
              "Prepare and deliver reports",
              "Learn and recite poems"
            ],
            "assessmentFocus": [
              "Ability to speak clearly about topics",
              "Ability to give coherent reports",
              "Ability to recite poems"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-ntetekoane-folklore",
            "title": "Ntetekoane Folklore",
            "description": "Appreciation of Basotho culture through listening to and retelling the Ntetekoane folklore, focusing on vocabulary and themes of faithfulness.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Listen to and retell Ntetekoane folklore",
              "Understand vocabulary from the story",
              "Ask and answer questions about the story",
              "Understand the consequences of trying to implicate someone",
              "Appreciate the theme of faithfulness"
            ],
            "keyVocabulary": [
              "Ntetekoane",
              "litsomo",
              "tÅ¡epo",
              "botshepehi"
            ],
            "exampleActivities": [
              "Listen to Ntetekoane story",
              "Retell the story",
              "Discuss story themes and morals",
              "Answer comprehension questions"
            ],
            "assessmentFocus": [
              "Ability to retell the folklore",
              "Understanding of story themes",
              "Ability to answer comprehension questions"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-speech-protocol",
            "title": "Speech Making Protocol",
            "description": "Learning the protocol used in speech making at school and expressing social graces.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Understand protocol for making speeches at school",
              "Express social graces appropriately"
            ],
            "keyVocabulary": [
              "puo",
              "tloaelo",
              "melao",
              "tlhompho"
            ],
            "exampleActivities": [
              "Learn about speech protocol",
              "Practice making speeches",
              "Demonstrate social graces"
            ],
            "assessmentFocus": [
              "Ability to follow speech protocol",
              "Ability to express social graces"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-basotho-culture-description",
            "title": "Description of Basotho Culture",
            "description": "Describing lijo tsa Basotho (Basotho dishes), lipapali le lipina (games and related songs), and analyzing clan-related poems.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe Basotho dishes",
              "Describe Basotho games and songs",
              "Analyze parents' clans through poetry"
            ],
            "keyVocabulary": [
              "lijo tsa Basotho",
              "lipapali",
              "lipina",
              "litÅ¡omo tsa moloko"
            ],
            "exampleActivities": [
              "Discuss traditional Basotho dishes",
              "Learn about traditional games and songs",
              "Analyze clan-related poems"
            ],
            "assessmentFocus": [
              "Ability to describe Basotho culture elements",
              "Understanding of clan poetry"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g3-is-traditional-dishes",
                "description": "Connection between language and cultural practices"
              }
            ]
          },
          {
            "id": "g3-ses-vocabulary-expansion-unit2",
            "title": "Vocabulary Expansion: Kinship and Animals",
            "description": "Expanding vocabulary with kinship terms, names of animals and their young, and homographs/homophones.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Learn and use kinship terms",
              "Learn names of animals and their young",
              "Understand words that are spelled and sound the same but have different meanings"
            ],
            "keyVocabulary": [
              "mantsoe a malapa",
              "liphoofolo le bana ba tsona",
              "mantsoe a tÅ¡oanang"
            ],
            "exampleActivities": [
              "Study kinship terminology",
              "Match animals with their young",
              "Practice using homographs and homophones"
            ],
            "assessmentFocus": [
              "Ability to use kinship terms correctly",
              "Knowledge of animal names and their young",
              "Understanding of homographs and homophones"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-riddles",
            "title": "Basotho Riddles",
            "description": "Introduction to Basotho riddles and the vocabulary used during the riddles game.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Understand Basotho riddles",
              "Use appropriate vocabulary for riddles game",
              "Participate in riddles games"
            ],
            "keyVocabulary": [
              "lirididiri",
              "mantsoe a papali",
              "lipapali tsa Sesotho"
            ],
            "exampleActivities": [
              "Learn traditional riddles",
              "Practice riddle vocabulary",
              "Play riddles games"
            ],
            "assessmentFocus": [
              "Ability to understand and solve riddles",
              "Ability to use riddle vocabulary correctly"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-sentence-construction-unit2",
            "title": "Sentence Construction: Tense and Agreement",
            "description": "Constructing sentences with attention to correct use of tense and subject-verb agreement.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Construct sentences with correct tense usage",
              "Apply subject-verb agreement",
              "Write with proper meaning and spelling"
            ],
            "keyVocabulary": [
              "polelo",
              "nako",
              "tumellano"
            ],
            "exampleActivities": [
              "Practice sentence construction",
              "Apply tense rules",
              "Ensure subject-verb agreement"
            ],
            "assessmentFocus": [
              "Ability to construct grammatically correct sentences",
              "Correct use of tense and agreement"
            ],
            "prerequisiteTopicIds": [
              "g3-ses-paragraph-writing"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-guided-free-writing-unit2",
            "title": "Guided and Free Writing",
            "description": "Reinforcement of paragraph writing through both guided composition and free writing.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Write paragraphs with guidance",
              "Write paragraphs independently",
              "Apply proper structure and conventions"
            ],
            "keyVocabulary": [
              "serapa",
              "ngolo e tataiseloang",
              "ngolo e lokolohileng"
            ],
            "exampleActivities": [
              "Complete guided writing exercises",
              "Practice free writing",
              "Review and edit own writing"
            ],
            "assessmentFocus": [
              "Ability to write guided paragraphs",
              "Ability to write independently",
              "Quality of writing structure"
            ],
            "prerequisiteTopicIds": [
              "g3-ses-paragraph-writing"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-reading-comprehension-unit2",
            "title": "Reading and Summarizing Texts",
            "description": "Reading a variety of age-appropriate texts and showing appreciation by giving summaries.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Read age-appropriate texts",
              "Summarize texts",
              "Show appreciation of texts read"
            ],
            "keyVocabulary": [
              "bala",
              "kakaretso",
              "temohisiso"
            ],
            "exampleActivities": [
              "Read various texts",
              "Practice summarizing",
              "Discuss texts read"
            ],
            "assessmentFocus": [
              "Ability to read fluently",
              "Ability to provide accurate summaries",
              "Understanding of texts"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-moleso-folklore",
            "title": "Moleso oa likhomo Folklore",
            "description": "Appreciation of Basotho culture through the Moleso oa likhomo folklore, focusing on jealousy, healthy living, and environmental adaptation.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Listen to and retell Moleso oa likhomo",
              "Understand vocabulary from the story",
              "Discuss consequences of jealousy",
              "Relate story to healthy living and environmental adaptation"
            ],
            "keyVocabulary": [
              "Moleso",
              "likhomo",
              "lefufa",
              "bophelo bo botle"
            ],
            "exampleActivities": [
              "Listen to the folklore",
              "Retell the story",
              "Discuss story themes",
              "Relate to real-life situations"
            ],
            "assessmentFocus": [
              "Ability to retell the story",
              "Understanding of moral lessons",
              "Ability to relate story to real life"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-letter-writing",
            "title": "Friendly Letter Writing",
            "description": "Introduction to friendly letter writing with attention to structure, spelling, and punctuation.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Write friendly letters with proper structure",
              "Apply correct spelling in letters",
              "Use proper punctuation in letters"
            ],
            "keyVocabulary": [
              "lengolo",
              "sebopeho",
              "matÅ¡oao",
              "peletso"
            ],
            "exampleActivities": [
              "Learn letter structure",
              "Write practice letters",
              "Review and edit letters"
            ],
            "assessmentFocus": [
              "Ability to write properly structured letters",
              "Correct spelling and punctuation in letters"
            ],
            "prerequisiteTopicIds": [
              "g3-ses-paragraph-writing"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-creative-poetry",
            "title": "Creating Five-Line Poems",
            "description": "Sharpening creative skills by creating five-line poems of choice.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Create five-line poems",
              "Use creative expression in poetry",
              "Share and present poems"
            ],
            "keyVocabulary": [
              "thothokiso",
              "serapa se seng se metÅ¡otso",
              "boqapi"
            ],
            "exampleActivities": [
              "Study poem structure",
              "Create original poems",
              "Share poems with class"
            ],
            "assessmentFocus": [
              "Ability to create five-line poems",
              "Creativity and expression in poems"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-oral-skills-unit4",
            "title": "Advanced Oral Skills: Jokes and Anecdotes",
            "description": "Ongoing development of listening and speaking skills including telling jokes and anecdotes with focus on fluency and pronunciation.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Tell jokes and anecdotes",
              "Speak with fluency",
              "Pronounce words correctly"
            ],
            "keyVocabulary": [
              "metlae",
              "lipale",
              "ho bua hantle",
              "ho bitsa mantsoe hantle"
            ],
            "exampleActivities": [
              "Practice telling jokes",
              "Share anecdotes",
              "Focus on pronunciation and fluency"
            ],
            "assessmentFocus": [
              "Ability to tell jokes and anecdotes",
              "Fluency in speaking",
              "Correct pronunciation"
            ],
            "prerequisiteTopicIds": [
              "g3-ses-oral-skills-unit1"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-ses-everyday-writing",
            "title": "Everyday Writing Activities",
            "description": "Writing short messages and letters for everyday communication.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Write short messages",
              "Write everyday letters",
              "Apply proper conventions in everyday writing"
            ],
            "keyVocabulary": [
              "melaetsa",
              "mangolo",
              "puisano ea letsatsi le letsatsi"
            ],
            "exampleActivities": [
              "Write short messages",
              "Practice everyday letter writing",
              "Review conventions"
            ],
            "assessmentFocus": [
              "Ability to write clear messages",
              "Ability to write everyday letters",
              "Proper use of conventions"
            ],
            "prerequisiteTopicIds": [
              "g3-ses-letter-writing"
            ],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Literacy - English",
        "topics": [
          {
            "id": "g3-eng-greetings-requests",
            "title": "Greetings, Requests, and Social Graces",
            "description": "Learning formal and informal greetings, making requests, apologizing, showing gratitude, and respecting property.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use formal and informal greetings",
              "Use titles in formal modes of address",
              "Make requests appropriately",
              "Apologize when necessary",
              "Show gratitude",
              "Practice lost and found situations",
              "Respect one's and others' property"
            ],
            "keyVocabulary": [
              "greetings",
              "formal",
              "informal",
              "titles",
              "request",
              "apologize",
              "gratitude",
              "property"
            ],
            "exampleActivities": [
              "Practice formal and informal greetings",
              "Role-play requesting and apologizing",
              "Discuss respect for property"
            ],
            "assessmentFocus": [
              "Ability to use appropriate greetings",
              "Ability to make requests politely",
              "Understanding of social graces"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-grammar-unit1",
            "title": "Grammar: Nouns, Tenses, and Adverbs",
            "description": "Development of grammatical structures including countable/uncountable nouns, simple past vs past continuous tense, and adverbs of time.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Differentiate between countable and uncountable nouns",
              "Use simple past tense correctly",
              "Contrast simple past with past continuous",
              "Use adverbs of time appropriately"
            ],
            "keyVocabulary": [
              "countable nouns",
              "uncountable nouns",
              "simple past tense",
              "past continuous tense",
              "adverbs of time"
            ],
            "exampleActivities": [
              "Identify countable and uncountable nouns",
              "Practice using past tenses",
              "Use adverbs of time in sentences"
            ],
            "assessmentFocus": [
              "Ability to differentiate noun types",
              "Correct use of past tenses",
              "Appropriate use of time adverbs"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-sentence-construction-unit1",
            "title": "Sentence Construction Basics",
            "description": "Constructing sentences with emphasis on meaning, spelling, word formation, adjectives, punctuation, conjunctions, and self-correction.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Construct meaningful sentences",
              "Spell words correctly",
              "Form words appropriately",
              "Use adjectives",
              "Apply correct punctuation",
              "Use conjunctions",
              "Practice self-correction"
            ],
            "keyVocabulary": [
              "sentence",
              "meaning",
              "spelling",
              "word formation",
              "adjectives",
              "punctuation",
              "conjunctions"
            ],
            "exampleActivities": [
              "Build sentences with proper structure",
              "Practice spelling",
              "Use adjectives and conjunctions",
              "Edit and correct own work"
            ],
            "assessmentFocus": [
              "Ability to construct clear sentences",
              "Correct spelling and word formation",
              "Proper use of grammar elements"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-writing-development-unit1",
            "title": "Writing Development: Silent Letters and Paragraphs",
            "description": "Developing writing skills with focus on spelling words with silent letters, good handwriting, and correct punctuation in two-paragraph texts.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Spell common words containing silent letters",
              "Write with good handwriting",
              "Use correct punctuation in two-paragraph texts"
            ],
            "keyVocabulary": [
              "silent letters",
              "handwriting",
              "punctuation",
              "paragraphs"
            ],
            "exampleActivities": [
              "Practice spelling words with silent letters",
              "Improve handwriting",
              "Write two-paragraph texts"
            ],
            "assessmentFocus": [
              "Correct spelling of words with silent letters",
              "Quality of handwriting",
              "Proper punctuation in paragraphs"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-critical-reading",
            "title": "Critical Reading",
            "description": "Introduction of more in-depth reading with more critical responses from learners to what they have read.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Read texts with depth",
              "Provide critical responses to texts",
              "Analyze what has been read"
            ],
            "keyVocabulary": [
              "critical reading",
              "analysis",
              "response",
              "comprehension"
            ],
            "exampleActivities": [
              "Read various texts",
              "Discuss and analyze readings",
              "Provide critical opinions"
            ],
            "assessmentFocus": [
              "Ability to read with understanding",
              "Quality of critical responses",
              "Depth of analysis"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-oral-confidence",
            "title": "Oral Confidence and Critical Listening",
            "description": "Ongoing development of oral skills with focus on confidence in speaking and more critical listening.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Speak with confidence",
              "Listen critically",
              "Participate actively in discussions"
            ],
            "keyVocabulary": [
              "confidence",
              "speaking",
              "listening",
              "critical thinking"
            ],
            "exampleActivities": [
              "Practice public speaking",
              "Engage in discussions",
              "Practice active listening"
            ],
            "assessmentFocus": [
              "Confidence level in speaking",
              "Ability to listen critically",
              "Quality of participation"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-kinship-vocabulary",
            "title": "Increased Vocabulary: Kinship and Opposites",
            "description": "Vocabulary expansion including kinship terms, opposites, and new words from various texts.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Learn and use kinship terms",
              "Understand and use opposites",
              "Acquire new vocabulary from texts"
            ],
            "keyVocabulary": [
              "kinship terms",
              "opposites",
              "vocabulary",
              "antonyms"
            ],
            "exampleActivities": [
              "Study kinship vocabulary",
              "Match opposites",
              "Learn words from reading"
            ],
            "assessmentFocus": [
              "Use of kinship terms",
              "Understanding of opposites",
              "Expansion of vocabulary"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-comprehensive-skills-unit2",
            "title": "Comprehensive Language Skills Development",
            "description": "Ongoing development of reading, writing, speaking, and listening skills with focus on critical attitude and confidence.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Develop reading skills",
              "Develop writing skills",
              "Develop speaking skills",
              "Develop listening skills",
              "Build critical attitude",
              "Build confidence in language use"
            ],
            "keyVocabulary": [
              "reading",
              "writing",
              "speaking",
              "listening",
              "critical thinking",
              "confidence"
            ],
            "exampleActivities": [
              "Practice all language skills",
              "Engage in critical analysis",
              "Build confidence through practice"
            ],
            "assessmentFocus": [
              "Progress in all language skills",
              "Development of critical thinking",
              "Growth in confidence"
            ],
            "prerequisiteTopicIds": [
              "g3-eng-oral-confidence",
              "g3-eng-critical-reading"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-grammar-unit3",
            "title": "Grammar: Possessives, Prepositions, and Tenses",
            "description": "Developing sentence construction focusing on possessive determiners and pronouns, appropriate prepositions, adverbs of time and place, and contrasting present and past tenses.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use possessive determiners and pronouns",
              "Use appropriate prepositions",
              "Use adverbs of time and place",
              "Contrast simple present and past tenses"
            ],
            "keyVocabulary": [
              "possessive determiners",
              "possessive pronouns",
              "prepositions",
              "adverbs of time",
              "adverbs of place",
              "present tense",
              "past tense"
            ],
            "exampleActivities": [
              "Practice using possessives",
              "Use prepositions correctly",
              "Apply tense contrasts"
            ],
            "assessmentFocus": [
              "Correct use of possessives",
              "Appropriate use of prepositions",
              "Accurate tense usage"
            ],
            "prerequisiteTopicIds": [
              "g3-eng-grammar-unit1"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-storytelling-debates",
            "title": "Fluency in Storytelling and Debates",
            "description": "Developing fluency and confidence in oral skills through storytelling, simple debates, singing rhymes, and reciting poems.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Tell stories fluently",
              "Conduct simple debates",
              "Sing rhymes",
              "Recite poems"
            ],
            "keyVocabulary": [
              "storytelling",
              "debate",
              "rhymes",
              "poems",
              "fluency"
            ],
            "exampleActivities": [
              "Practice storytelling",
              "Participate in debates",
              "Learn and perform rhymes and poems"
            ],
            "assessmentFocus": [
              "Fluency in storytelling",
              "Ability to debate",
              "Performance of rhymes and poems"
            ],
            "prerequisiteTopicIds": [
              "g3-eng-oral-confidence"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-sentence-construction-unit3",
            "title": "Advanced Sentence Construction",
            "description": "Sentence construction with emphasis on meaning, spelling, word formation, adjectives, nouns (wild animals and habits), adverbs of time, punctuation, conjunctions, homophones, and self-correction.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Construct complex sentences",
              "Use vocabulary about wild animals",
              "Apply adjectives and adverbs correctly",
              "Understand homophones",
              "Practice self-correction"
            ],
            "keyVocabulary": [
              "wild animals",
              "habits",
              "adjectives",
              "adverbs of time",
              "homophones",
              "conjunctions"
            ],
            "exampleActivities": [
              "Build complex sentences",
              "Write about wild animals",
              "Practice using homophones",
              "Edit own work"
            ],
            "assessmentFocus": [
              "Complexity of sentences",
              "Correct use of animal vocabulary",
              "Understanding of homophones",
              "Quality of self-correction"
            ],
            "prerequisiteTopicIds": [
              "g3-eng-sentence-construction-unit1"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-homophones-confused-words",
            "title": "Homophones and Easily-Confused Words",
            "description": "Vocabulary development through introduction of homophones and easily-confused words.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Understand homophones",
              "Distinguish easily-confused words",
              "Use words correctly in context"
            ],
            "keyVocabulary": [
              "homophones",
              "confused words",
              "word usage",
              "context"
            ],
            "exampleActivities": [
              "Study homophones",
              "Practice distinguishing confused words",
              "Use words in sentences"
            ],
            "assessmentFocus": [
              "Understanding of homophones",
              "Ability to use confused words correctly"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-tense-contrast-unit4",
            "title": "Tense Contrasts: Simple and Continuous",
            "description": "Sentence construction with focus on correct punctuation and contrasting simple and continuous tenses in both present and past forms.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use correct punctuation",
              "Contrast simple and continuous tenses",
              "Apply tenses in both present and past forms"
            ],
            "keyVocabulary": [
              "simple tense",
              "continuous tense",
              "present tense",
              "past tense",
              "punctuation"
            ],
            "exampleActivities": [
              "Practice tense contrasts",
              "Write using different tenses",
              "Apply proper punctuation"
            ],
            "assessmentFocus": [
              "Correct use of tenses",
              "Appropriate tense contrasts",
              "Proper punctuation"
            ],
            "prerequisiteTopicIds": [
              "g3-eng-grammar-unit3"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-letter-reinforcement",
            "title": "Letter Writing Reinforcement",
            "description": "Reinforcement of letter writing with attention to structure, spelling, and punctuation.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Write letters with proper structure",
              "Apply correct spelling in letters",
              "Use proper punctuation in letters"
            ],
            "keyVocabulary": [
              "letter writing",
              "structure",
              "spelling",
              "punctuation"
            ],
            "exampleActivities": [
              "Write various types of letters",
              "Focus on letter structure",
              "Check spelling and punctuation"
            ],
            "assessmentFocus": [
              "Quality of letter structure",
              "Accuracy of spelling",
              "Correctness of punctuation"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-paragraph-reinforcement",
            "title": "Paragraph Writing Reinforcement",
            "description": "Reinforcement of paragraph writing through guided composition and free writing.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Write paragraphs with guidance",
              "Write paragraphs independently",
              "Apply proper paragraph structure"
            ],
            "keyVocabulary": [
              "paragraph",
              "guided composition",
              "free writing",
              "structure"
            ],
            "exampleActivities": [
              "Complete guided writing exercises",
              "Practice independent writing",
              "Review paragraph structure"
            ],
            "assessmentFocus": [
              "Quality of guided paragraphs",
              "Quality of independent paragraphs",
              "Understanding of structure"
            ],
            "prerequisiteTopicIds": [
              "g3-eng-writing-development-unit1"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-eng-text-appreciation",
            "title": "Reading and Appreciation with Summaries",
            "description": "Reading a variety of age-appropriate texts and showing appreciation by giving summaries.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Read age-appropriate texts",
              "Show appreciation of texts",
              "Provide summaries of texts read"
            ],
            "keyVocabulary": [
              "reading",
              "appreciation",
              "summary",
              "comprehension"
            ],
            "exampleActivities": [
              "Read various texts",
              "Discuss texts read",
              "Write summaries"
            ],
            "assessmentFocus": [
              "Reading fluency",
              "Understanding of texts",
              "Quality of summaries"
            ],
            "prerequisiteTopicIds": [
              "g3-eng-critical-reading"
            ],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Numeracy",
        "topics": [
          {
            "id": "g3-num-sets-introduction",
            "title": "Introduction to Sets",
            "description": "Learning about sets, including forming sets of up to 10 elements, listing elements using set braces, and using symbols âˆˆ (element of) and âˆ‰ (not element of).",
            "curriculumStandards": [],
            "learningObjectives": [
              "Form sets of up to 10 elements",
              "List elements of sets using set braces { }",
              "Use correctly the symbols âˆˆ and âˆ‰",
              "Identify elements of a set"
            ],
            "keyVocabulary": [
              "set",
              "element",
              "set braces",
              "element of (âˆˆ)",
              "not element of (âˆ‰)"
            ],
            "exampleActivities": [
              "Group learners according to clans to form sets",
              "Make sets with 1-10 elements from everyday objects",
              "Identify elements that belong or don't belong to sets"
            ],
            "assessmentFocus": [
              "Ability to form sets of up to 10 elements",
              "Correct listing of elements using set braces",
              "Correct use of symbols âˆˆ and âˆ‰"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g3-is-clans-and-totems",
                "description": "Using clans as examples to form sets"
              }
            ]
          },
          {
            "id": "g3-num-venn-diagrams",
            "title": "Venn Diagrams",
            "description": "Using Venn diagrams to represent and form sets.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use Venn diagrams to form sets",
              "Represent sets visually using Venn diagrams"
            ],
            "keyVocabulary": [
              "Venn diagram",
              "set representation",
              "visual representation"
            ],
            "exampleActivities": [
              "Form sets using Venn diagrams",
              "Create Venn diagrams for different sets"
            ],
            "assessmentFocus": [
              "Ability to use Venn diagrams to form sets"
            ],
            "prerequisiteTopicIds": [
              "g3-num-sets-introduction"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-counting-1000",
            "title": "Counting Within the Range 1-1000",
            "description": "Learning to count, read, and write numerals within the range 1-1000.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Count numbers from 1-1000",
              "Write numbers from 1-1000",
              "Count in 5s, 10s, 20s and 50s up to 1000",
              "Count backwards in 100s"
            ],
            "keyVocabulary": [
              "count",
              "numeral",
              "number",
              "thousand",
              "counting patterns"
            ],
            "exampleActivities": [
              "Count using 100 square chart",
              "Count using number strips",
              "Practice skip counting",
              "Write numbers on tables"
            ],
            "assessmentFocus": [
              "Ability to count numbers from 1-1000",
              "Ability to write numbers from 1-1000"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-comparing-numbers",
            "title": "Comparing Numbers",
            "description": "Learning to compare numbers using symbols =, >, and <.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Compare numbers using symbols =, >, and <",
              "Understand the meaning of equal to, greater than, and less than"
            ],
            "keyVocabulary": [
              "equal to (=)",
              "greater than (>)",
              "less than (<)",
              "compare"
            ],
            "exampleActivities": [
              "Compare pairs of numbers",
              "Use comparison symbols correctly",
              "Order numbers from smallest to largest"
            ],
            "assessmentFocus": [
              "Ability to compare numbers using symbols =, >, and <"
            ],
            "prerequisiteTopicIds": [
              "g3-num-counting-1000"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-place-value",
            "title": "Place Value of 3-Digit Numbers",
            "description": "Understanding the place value of 3-digit numbers and writing numbers in expanded notation.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify place value of 3-digit numbers",
              "Write 3-digit numbers in expanded notation",
              "Understand hundreds, tens, and ones"
            ],
            "keyVocabulary": [
              "place value",
              "hundreds",
              "tens",
              "ones",
              "expanded notation"
            ],
            "exampleActivities": [
              "Identify the value of each digit in 3-digit numbers",
              "Write numbers in expanded form",
              "Use place value charts"
            ],
            "assessmentFocus": [
              "Ability to identify place value of 3-digit numbers",
              "Ability to write numbers in expanded notation"
            ],
            "prerequisiteTopicIds": [
              "g3-num-counting-1000"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-ordering-numbers",
            "title": "Ordering 3-Digit Numbers",
            "description": "Learning to order 3-digit numbers in order of magnitude.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Order 3-digit numbers in order of magnitude",
              "Arrange numbers from smallest to largest",
              "Arrange numbers from largest to smallest"
            ],
            "keyVocabulary": [
              "order",
              "magnitude",
              "ascending",
              "descending",
              "arrange"
            ],
            "exampleActivities": [
              "Order sets of 3-digit numbers",
              "Arrange numbers in ascending and descending order"
            ],
            "assessmentFocus": [
              "Ability to order 3-digit numbers in order of magnitude"
            ],
            "prerequisiteTopicIds": [
              "g3-num-comparing-numbers",
              "g3-num-place-value"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-addition-3digit",
            "title": "Addition of 3-Digit Numbers",
            "description": "Learning to add 3-digit numbers with and without carrying, with sums within the range 1-1000.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Add 3-digit numbers without carrying",
              "Add 3-digit numbers with carrying",
              "Ensure sums are within the range 1-1000"
            ],
            "keyVocabulary": [
              "addition",
              "add",
              "sum",
              "carrying",
              "regrouping"
            ],
            "exampleActivities": [
              "Practice addition without carrying",
              "Practice addition with carrying",
              "Solve addition word problems"
            ],
            "assessmentFocus": [
              "Ability to add 3-digit numbers with and without carrying"
            ],
            "prerequisiteTopicIds": [
              "g3-num-place-value"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-subtraction-3digit",
            "title": "Subtraction of 3-Digit Numbers",
            "description": "Learning to subtract 3-digit numbers with and without borrowing.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Subtract 3-digit numbers without borrowing",
              "Subtract 3-digit numbers with borrowing"
            ],
            "keyVocabulary": [
              "subtraction",
              "subtract",
              "difference",
              "borrowing",
              "regrouping"
            ],
            "exampleActivities": [
              "Practice subtraction without borrowing",
              "Practice subtraction with borrowing",
              "Solve subtraction word problems"
            ],
            "assessmentFocus": [
              "Ability to subtract 3-digit numbers with and without borrowing"
            ],
            "prerequisiteTopicIds": [
              "g3-num-place-value"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-subset-symbols",
            "title": "Subset Symbols",
            "description": "Learning to use subset (âŠ‚) and not subset symbols correctly.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use the subset symbol (âŠ‚) correctly",
              "Use the not subset symbol correctly",
              "Identify subset relationships"
            ],
            "keyVocabulary": [
              "subset",
              "not subset",
              "set relationship"
            ],
            "exampleActivities": [
              "Identify subset relationships",
              "Use subset symbols in problems"
            ],
            "assessmentFocus": [
              "Ability to use subset and not subset symbols correctly"
            ],
            "prerequisiteTopicIds": [
              "g3-num-sets-introduction"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-money",
            "title": "Money: Lesotho and RSA Currency",
            "description": "Learning about money using Lesotho and RSA coins and notes up to M200/R200 in practical situations.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify Lesotho and RSA coins and notes",
              "Use money in practical situations up to M200/R200",
              "Add and subtract using money",
              "Understand the value of money"
            ],
            "keyVocabulary": [
              "money",
              "coins",
              "notes",
              "Maloti",
              "Rand",
              "currency"
            ],
            "exampleActivities": [
              "Identify different coins and notes",
              "Practice buying and selling",
              "Solve money problems",
              "Add and subtract money amounts"
            ],
            "assessmentFocus": [
              "Ability to use money in practical situations",
              "Ability to add and subtract money"
            ],
            "prerequisiteTopicIds": [
              "g3-num-addition-3digit",
              "g3-num-subtraction-3digit"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-zero",
            "title": "Understanding Zero",
            "description": "Understanding zero as a number and as a place holder.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Understand zero as a number",
              "Understand zero as a place holder",
              "Use zero correctly in numbers"
            ],
            "keyVocabulary": [
              "zero",
              "place holder",
              "value"
            ],
            "exampleActivities": [
              "Explore the concept of zero",
              "Use zero in place value",
              "Practice with numbers containing zero"
            ],
            "assessmentFocus": [
              "Understanding of zero as a number and place holder"
            ],
            "prerequisiteTopicIds": [
              "g3-num-place-value"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-shapes",
            "title": "2-Dimensional and 3-Dimensional Shapes",
            "description": "Investigating shapes in the environment and relating basic mathematical shapes to everyday life, including cubes, cuboids, and triangular pyramids.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify 2-dimensional shapes in the environment",
              "Identify 3-dimensional shapes (cubes, cuboids, triangular pyramids)",
              "Classify 3-dimensional shapes from the environment",
              "Identify edges, faces and vertices of 3-dimensional shapes",
              "Make patterns using 3-dimensional shapes"
            ],
            "keyVocabulary": [
              "2-dimensional shapes",
              "3-dimensional shapes",
              "cube",
              "cuboid",
              "triangular pyramid",
              "edges",
              "faces",
              "vertices"
            ],
            "exampleActivities": [
              "Identify shapes in the environment",
              "Build 3D shapes",
              "Count edges, faces and vertices",
              "Create patterns with shapes"
            ],
            "assessmentFocus": [
              "Ability to identify 2D and 3D shapes",
              "Ability to classify shapes",
              "Understanding of shape properties"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g3-is-2d-shapes-culture",
                "description": "Connection between mathematical shapes and Basotho cultural patterns"
              }
            ]
          },
          {
            "id": "g3-num-time",
            "title": "Reading Time",
            "description": "Learning to read time on clock faces in hours, half hours, and quarter hours, and understanding time in relation to everyday life.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Read time on clock face in hours",
              "Read time on clock face in half hours",
              "Read time on clock face in quarter hours",
              "Understand quarter hour time periods",
              "Relate time to everyday activities"
            ],
            "keyVocabulary": [
              "time",
              "clock",
              "hour",
              "half hour",
              "quarter hour",
              "minutes"
            ],
            "exampleActivities": [
              "Practice reading analog clocks",
              "Match times to activities",
              "Estimate time for activities",
              "Compare events that occur in quarter hours"
            ],
            "assessmentFocus": [
              "Ability to read time in hours, half hours, and quarter hours",
              "Understanding of time in daily life"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-fractions",
            "title": "Basic Fractions",
            "description": "Learning to identify and use fractions Â½, â…“, Â¼, and â…• in practical situations.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify fraction Â½ in practical situations",
              "Identify fraction â…“ in practical situations",
              "Identify fraction Â¼ in practical situations",
              "Identify fraction â…• in practical situations",
              "Use fractions in everyday contexts"
            ],
            "keyVocabulary": [
              "fraction",
              "half",
              "third",
              "quarter",
              "fifth",
              "part",
              "whole"
            ],
            "exampleActivities": [
              "Divide objects into fractions",
              "Identify fractions in real objects",
              "Practice with fraction manipulatives"
            ],
            "assessmentFocus": [
              "Ability to identify and use fractions Â½, â…“, Â¼, â…•"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-calendar",
            "title": "Reading the Calendar",
            "description": "Learning to read the calendar in days, weeks, months and years.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Read the calendar in days",
              "Read the calendar in weeks",
              "Read the calendar in months",
              "Read the calendar in years",
              "Understand calendar subdivisions"
            ],
            "keyVocabulary": [
              "calendar",
              "day",
              "week",
              "month",
              "year"
            ],
            "exampleActivities": [
              "Practice reading calendars",
              "Identify days, weeks, months",
              "Relate calendar to everyday life"
            ],
            "assessmentFocus": [
              "Ability to read the calendar in days, weeks, months and years"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-length-measurement",
            "title": "Measuring Length",
            "description": "Learning to measure length using metres and centimetres with estimation and comparison.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Measure length using metres",
              "Measure length using centimetres",
              "Estimate length",
              "Compare lengths"
            ],
            "keyVocabulary": [
              "length",
              "metre",
              "centimetre",
              "measure",
              "estimate",
              "compare"
            ],
            "exampleActivities": [
              "Measure objects in the environment",
              "Estimate before measuring",
              "Compare different lengths"
            ],
            "assessmentFocus": [
              "Ability to measure length using metres and centimetres",
              "Accuracy of estimation"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-mass-measurement",
            "title": "Measuring Mass",
            "description": "Learning to measure mass using kilograms and grams with estimation and comparison.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Measure mass using kilograms",
              "Measure mass using grams",
              "Estimate mass",
              "Compare masses"
            ],
            "keyVocabulary": [
              "mass",
              "kilogram",
              "gram",
              "weight",
              "measure",
              "estimate"
            ],
            "exampleActivities": [
              "Measure mass of objects",
              "Estimate before measuring",
              "Compare different masses"
            ],
            "assessmentFocus": [
              "Ability to measure mass using kilograms and grams",
              "Accuracy of estimation"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-volume-measurement",
            "title": "Measuring Volume",
            "description": "Learning to measure volume in litres with estimation and comparison.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Measure volume in litres",
              "Estimate volume",
              "Compare volumes"
            ],
            "keyVocabulary": [
              "volume",
              "litre",
              "capacity",
              "measure",
              "estimate"
            ],
            "exampleActivities": [
              "Measure liquid volumes",
              "Estimate before measuring",
              "Compare different volumes"
            ],
            "assessmentFocus": [
              "Ability to measure volume in litres",
              "Accuracy of estimation"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-bar-charts",
            "title": "Bar Charts",
            "description": "Learning to draw and interpret bar charts that represent real-life contexts.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Draw bar charts",
              "Interpret bar charts",
              "Use bar charts to represent real-life contexts",
              "Handle simple data about self and surroundings"
            ],
            "keyVocabulary": [
              "bar chart",
              "data",
              "interpret",
              "represent",
              "graph"
            ],
            "exampleActivities": [
              "Collect data from environment",
              "Create bar charts from data",
              "Interpret information from bar charts",
              "Draw bar charts for health and environmental issues"
            ],
            "assessmentFocus": [
              "Ability to draw bar charts",
              "Ability to interpret bar charts",
              "Accuracy of data representation"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-environmental-problem-solving",
            "title": "Solving Environmental Problems with Addition and Subtraction",
            "description": "Using addition and subtraction of 3-digit numbers to solve environmental problems.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Add 3-digit numbers with carrying to solve environmental problems",
              "Subtract 3-digit numbers with borrowing to solve environmental problems"
            ],
            "keyVocabulary": [
              "environmental problems",
              "addition",
              "subtraction",
              "problem solving"
            ],
            "exampleActivities": [
              "Solve word problems about environmental issues",
              "Apply addition and subtraction to real-world contexts"
            ],
            "assessmentFocus": [
              "Ability to solve environmental problems using addition",
              "Ability to solve environmental problems using subtraction"
            ],
            "prerequisiteTopicIds": [
              "g3-num-addition-3digit",
              "g3-num-subtraction-3digit"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g3-is-air-pollution",
                "description": "Mathematical application to environmental problem solving"
              }
            ]
          },
          {
            "id": "g3-num-multiplication",
            "title": "Multiplication",
            "description": "Learning to multiply numbers with products less than 100.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Multiply numbers with products less than 100",
              "Understand multiplication concepts",
              "Apply multiplication to problem solving"
            ],
            "keyVocabulary": [
              "multiplication",
              "multiply",
              "product",
              "times"
            ],
            "exampleActivities": [
              "Practice multiplication tables",
              "Solve multiplication problems",
              "Apply multiplication to real situations"
            ],
            "assessmentFocus": [
              "Ability to multiply numbers with products less than 100"
            ],
            "prerequisiteTopicIds": [
              "g3-num-addition-3digit"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g3-num-division",
            "title": "Division",
            "description": "Learning to divide whole numbers less than 100 without a remainder.",
            "curriculumStandards": [],
            "learningObjectives": [
              "Divide whole numbers less than 100 without a remainder",
              "Understand division concepts",
              "Apply division to problem solving"
            ],
            "keyVocabulary": [
              "division",
              "divide",
              "quotient",
              "divisor",
              "dividend"
            ],
            "exampleActivities": [
              "Practice division facts",
              "Solve division problems",
              "Apply division to real situations"
            ],
            "assessmentFocus": [
              "Ability to divide whole numbers less than 100 without a remainder"
            ],
            "prerequisiteTopicIds": [
              "g3-num-subtraction-3digit"
            ],
            "crossCurricularLinks": []
          }
        ]
      }
    ]
  },
  {
    "grade": "4",
    "subjects": [
      {
        "name": "Integrated Studies",
        "topics": [
          {
            "id": "g4-is-knowing-oneself-and-relating",
            "title": "Knowing Oneself and Relating with Others",
            "description": "Promotes awareness of personal identity within the context of national culture, encourages active learning to address emerging issues, and emphasizes learner's relations within family, school, communities and wider society.",
            "curriculumStandards": [
              "Awareness of Self and Others",
              "Personal, Spiritual and Social Learning Area",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Greet formally, informally and use social graces appropriately",
              "Demonstrate unique personal attributes and express positive feelings about themselves",
              "Talk about how they feel",
              "Suggest ways to build healthy relationships",
              "Explain that differences in ability of girls and boys are more cultural than biological",
              "Resist negative effects of gender socialisation on self-image",
              "Solve moral dilemmas on responsibility and reliability as themes and risk",
              "Demonstrate understanding of children's rights and responsibilities",
              "Engage in right promoting behaviour and reject behaviour that violates rights",
              "Outline their family genealogy",
              "Identify different types of councils in local government",
              "Jump, catch, balance and throw",
              "Identify signs and symbols of different religions in Lesotho",
              "Describe the culture of main ethnic groups in Lesotho (San, Sotho, Nguni)",
              "Perform simple dance movements of waltz",
              "Locate places in districts where ethnic groups are found in Lesotho",
              "Identify national symbols of Lesotho",
              "Perform local and foreign folk songs and dance",
              "Play indigenous games (liketoana and morabaraba)",
              "Practise athletics through running 50m and 100m race",
              "Play games from other cultures (playing cards, monopoly, scrabble and chess)",
              "Write precedence list in order",
              "Practise throwing and catching in netball game"
            ],
            "keyVocabulary": [
              "Formal greetings",
              "Informal greetings",
              "Social graces",
              "Personal identity",
              "Self-awareness",
              "Self-esteem",
              "Emotions",
              "Relationships",
              "Gender",
              "Rights",
              "Responsibilities",
              "Genealogy",
              "Local government",
              "Councils",
              "Religion",
              "Culture",
              "Ethnic groups",
              "National symbols",
              "Indigenous games",
              "Athletics",
              "Precedence"
            ],
            "exampleActivities": [
              "Role-play being teachers/elders and children greeting formally",
              "Role-play hospitality social graces and responses",
              "Engage in 'Who am I' game (personal identity)",
              "Form buzz groups to discuss physical characteristics",
              "Carry out individual exercises on valuing oneself",
              "Engage in friendly tree affirmation exercise",
              "Read stories emphasizing emotions of different characters",
              "Role-play different emotions",
              "Discuss appropriate responses to various emotions",
              "Research and present about ethnic groups",
              "Classify words according to San, Nguni and Sotho languages",
              "Sing and dance songs of different music genres",
              "Practice waltz dance movements",
              "Identify and draw signs and symbols of different religions",
              "Draw national symbols of Lesotho",
              "Play indigenous games",
              "Practice running races",
              "Play games from other cultures"
            ],
            "assessmentFocus": [
              "Ability to greet correctly in formal and informal situations",
              "Ability to use and respond to social graces appropriately",
              "Ability to list physical characteristics",
              "Ability to identify strong and weak points",
              "Ability to develop positive feelings about themselves",
              "Ability to explain how characters felt",
              "Ability to role-play different emotions",
              "Ability to state importance of expressing feelings",
              "Ability to recite clan poems appropriately",
              "Ability to state cultural differences of ethnic groups",
              "Ability to mention music genres of different cultures",
              "Ability to perform dance movements",
              "Ability to identify religious signs and symbols",
              "Ability to identify national symbols",
              "Ability to play indigenous and other games",
              "Ability to participate in athletic activities"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-greetings-and-social-graces",
                "description": "Formal and informal greetings in Sesotho"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-traditional-folktales",
                "description": "Using folktales to understand culture and relationships"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-proverbs",
                "description": "Using proverbs about relationships"
              }
            ]
          },
          {
            "id": "g4-is-health-and-safety",
            "title": "My Health and Safety",
            "description": "Introduces learners to principles of healthy lifestyles including personal care, fitness and nutrition. Focuses on precautionary measures that promote safety within the specific context of Lesotho.",
            "curriculumStandards": [
              "Health and Healthy Living",
              "Personal, Spiritual and Social Learning Area",
              "Environmental Adaptation and Sustainable Development"
            ],
            "learningObjectives": [
              "Understand principles of healthy lifestyles",
              "Practice personal care and hygiene",
              "Understand importance of fitness and nutrition",
              "Identify and practice safety measures",
              "Recognize safety risks in various contexts",
              "Demonstrate safe behaviors"
            ],
            "keyVocabulary": [
              "Health",
              "Safety",
              "Personal care",
              "Hygiene",
              "Fitness",
              "Nutrition",
              "Precautions",
              "Risk",
              "Prevention"
            ],
            "exampleActivities": [],
            "assessmentFocus": [
              "Understanding of healthy lifestyle principles",
              "Ability to practice personal care",
              "Knowledge of safety measures",
              "Ability to identify risks",
              "Demonstration of safe behaviors"
            ],
            "prerequisiteTopicIds": [
              "g4-is-knowing-oneself-and-relating"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-proverbs",
                "description": "Using proverbs about health and safety"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-food-vocabulary",
                "description": "Connecting food vocabulary to nutrition and health"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-instructions-and-procedures",
                "description": "Reading recipes for food preparation"
              }
            ]
          },
          {
            "id": "g4-is-environment",
            "title": "Understanding and Sustaining the Environment",
            "description": "Enhances resourceful and responsible interaction with the environment. Addresses issues of environmental protection and management for sustainable development.",
            "curriculumStandards": [
              "Environmental Adaptation and Sustainable Development",
              "Scientific and Technological Learning Area",
              "Personal, Spiritual and Social Learning Area"
            ],
            "learningObjectives": [
              "Understand environmental concepts",
              "Identify environmental challenges",
              "Practice environmental protection",
              "Demonstrate sustainable practices",
              "Participate in environmental management",
              "Show responsibility toward the environment"
            ],
            "keyVocabulary": [
              "Environment",
              "Sustainability",
              "Conservation",
              "Protection",
              "Resources",
              "Ecosystem",
              "Pollution",
              "Climate",
              "Biodiversity"
            ],
            "exampleActivities": [],
            "assessmentFocus": [
              "Understanding of environmental concepts",
              "Ability to identify environmental issues",
              "Demonstration of sustainable practices",
              "Engagement in environmental protection",
              "Responsible environmental behavior"
            ],
            "prerequisiteTopicIds": [
              "g4-is-health-and-safety"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-proverbs",
                "description": "Using proverbs about environment"
              },
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-animal-vocabulary",
                "description": "Learning about animals and their habitats"
              }
            ]
          },
          {
            "id": "g4-is-survival-and-self-reliance",
            "title": "Survival and Self Reliance",
            "description": "Aims at preparing learners to survive in various challenges and be self-reliant.",
            "curriculumStandards": [
              "Production and Work-related Competencies",
              "Personal, Spiritual and Social Learning Area",
              "Creativity and Entrepreneurial Learning Area"
            ],
            "learningObjectives": [
              "Develop survival skills",
              "Demonstrate self-reliance",
              "Practice problem-solving in challenging situations",
              "Show resilience",
              "Engage in productive activities",
              "Apply work-related competencies"
            ],
            "keyVocabulary": [
              "Survival",
              "Self-reliance",
              "Independence",
              "Resilience",
              "Problem-solving",
              "Productivity",
              "Skills",
              "Resourcefulness"
            ],
            "exampleActivities": [],
            "assessmentFocus": [
              "Demonstration of survival skills",
              "Ability to show self-reliance",
              "Problem-solving capabilities",
              "Resilience in challenging situations",
              "Engagement in productive activities"
            ],
            "prerequisiteTopicIds": [
              "g4-is-environment"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-proverbs",
                "description": "Using proverbs about survival"
              }
            ]
          }
        ]
      },
      {
        "name": "Sesotho Literacy",
        "topics": [
          {
            "id": "g4-ses-greetings-and-social-graces",
            "title": "Formal and Informal Greetings and Social Graces",
            "description": "Learn to greet formally and informally, use social graces appropriately, and demonstrate respect in Sesotho language and culture.",
            "curriculumStandards": [
              "Effective Communication",
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Greet correctly in formal situations",
              "Greet correctly in informal situations",
              "Use social graces appropriately (thank you, you are welcome, have a nice day)",
              "Respond to social graces appropriately",
              "Understand and use precedence in greetings"
            ],
            "keyVocabulary": [
              "Formal greetings (Good morning, Good afternoon, Good day)",
              "Informal greetings (Hi, Hello, How do you do)",
              "Social graces (Thank you, Have a nice day, Enjoy yourself)",
              "Responses (You are welcome)",
              "Tlhompho (respect)",
              "Tumeliso (greeting)"
            ],
            "exampleActivities": [
              "Role-play being teachers/elders and children greeting formally",
              "Pick correct word-cards displaying responses to different greetings",
              "Role-play hospitality social graces and their responses",
              "Practice formal greetings with elders",
              "Practice informal greetings with peers"
            ],
            "assessmentFocus": [
              "Ability to greet correctly in formal situations",
              "Ability to greet correctly in informal situations",
              "Ability to use social graces appropriately",
              "Ability to respond to social graces appropriately"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-knowing-oneself-and-relating",
                "description": "Connecting formal greetings to understanding social relationships"
              }
            ]
          },
          {
            "id": "g4-ses-reading-comprehension",
            "title": "Reading Comprehension and Analysis",
            "description": "Develop reading comprehension skills through short stories, analyze content, identify main ideas, provide reasons and conclusions.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Ask when not understanding",
              "Report on read content",
              "Answer questions about what was read",
              "Give reasons and conclusions about the content",
              "Explain content in own words",
              "Summarize content briefly",
              "Write dictated words correctly",
              "Create new sentences with learned words",
              "Give advice about the content"
            ],
            "keyVocabulary": [
              "Lipale (stories)",
              "Sesosa (reason/cause)",
              "Litholoana (conclusions)",
              "Akaretsa (summarize)",
              "Hlalosa (explain)",
              "Karabo (answer)"
            ],
            "exampleActivities": [
              "Research about topics to be read",
              "Teacher reads story emphasizing emotions of characters",
              "Discuss how characters felt",
              "Answer questions requiring explanation, summarization, reasons and conclusions",
              "Write dictated words",
              "Create new sentences with learned words"
            ],
            "assessmentFocus": [
              "Ability to ask when not understanding",
              "Ability to report on researched topic",
              "Ability to answer questions about read content",
              "Ability to give reasons and conclusions",
              "Ability to explain content in own words",
              "Ability to summarize content briefly",
              "Ability to write dictated words correctly",
              "Ability to create new sentences with new words",
              "Ability to give advice about the content"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-greetings-and-social-graces"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-knowing-oneself-and-relating",
                "description": "Using reading to understand emotions and relationships"
              }
            ]
          },
          {
            "id": "g4-ses-synonyms",
            "title": "Words with Similar Meanings (Synonyms)",
            "description": "Learn and use words with similar meanings in Sesotho to expand vocabulary and expression.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Demonstrate meanings of words where possible",
              "Give words with similar meanings",
              "Compare words with similar meanings",
              "Use words with similar meanings in sentences"
            ],
            "keyVocabulary": [
              "likela - nyamela",
              "mosa - mohau",
              "robala - khaleha",
              "leseli - khanya",
              "koata - khena",
              "letsatsi - lephahama",
              "letsoho - seatla",
              "bua - pepeta"
            ],
            "exampleActivities": [
              "Demonstrate meanings of words where applicable",
              "Create sentences using words with similar meanings",
              "Match words with similar meanings",
              "Fill in sentences with words having similar meanings to those highlighted"
            ],
            "assessmentFocus": [
              "Ability to demonstrate meanings of words",
              "Ability to give words with similar meanings",
              "Ability to compare words with similar meanings",
              "Ability to use words with similar meanings but written differently in sentences"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-reading-comprehension"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-ses-phonics-and-spelling",
            "title": "Sesotho Sounds and Spelling",
            "description": "Master Sesotho sounds including digraphs, four-letter combinations, and commonly confused sounds. Build words using these sounds correctly.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Form words using two-letter sounds (mm) correctly",
              "Write words with two-letter sounds",
              "Use words with two-letter sounds in sentences correctly",
              "Form words using four-letter sounds (mpsh, ntlh) correctly",
              "Differentiate and use confusing sounds (q/qh, p/ph, hl/tl/tlh, t/th, ts/tÅ¡)"
            ],
            "keyVocabulary": [
              "Melumo (sounds)",
              "Litlhaku (letters)",
              "Digraphs (two-letter sounds)",
              "Four-letter combinations (mpsh, ntlh)",
              "Confusing sounds (q/qh, p/ph, hl/tl/tlh, t/th, ts/tÅ¡)"
            ],
            "exampleActivities": [
              "Teacher writes and reads sounds on board",
              "Listen and repeat sounds correctly",
              "Write sounds in books and read to teacher",
              "Teacher dictates sounds for writing",
              "Form words using learned sounds",
              "Teacher dictates sentences with confusing sounds",
              "Read written sentences"
            ],
            "assessmentFocus": [
              "Ability to form words using two-letter sounds correctly",
              "Ability to write words with two-letter sounds",
              "Ability to use words with two-letter/four-letter sounds in sentences correctly"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-greetings-and-social-graces"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-ses-traditional-folktales",
            "title": "Traditional Folktales (LitÅ¡omo)",
            "description": "Learn and perform traditional Sesotho folktales following proper protocol and storytelling techniques.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area",
              "Personal, Spiritual and Social Learning Area"
            ],
            "learningObjectives": [
              "Follow folktale protocols when reminded",
              "Follow folktale protocols without reminders",
              "Tell folktales they know",
              "Answer questions showing understanding of folktale",
              "Act out folktale content",
              "State the moral/lesson of specific folktales",
              "Tell specific folktales (Bahlanakana ba bane, Leeba le Motinyane, Sekholomi leTakalasi, Pitso ea linonyana)"
            ],
            "keyVocabulary": [
              "TÅ¡omo (folktale)",
              "Moetlo (protocol/custom)",
              "Lehlokoa (grass/straw placed on head)",
              "Qalo (beginning): Ba re e ne e re",
              "Karabo (response): E/Qoi",
              "NtÅ¡etso-pele (continuation): E le...",
              "Qetello (ending): Ke tÅ¡omo ka mathetho",
              "Thuto (moral/lesson)"
            ],
            "exampleActivities": [
              "Discuss important points to follow when telling folktales",
              "Tell folktales they know",
              "Teacher tells specific folktales with actions",
              "Discuss difficult words in folktales",
              "Answer comprehension questions about folktales",
              "Discuss moral/lesson of folktales",
              "Act out folktale content",
              "In groups, tell specific folktales to each other"
            ],
            "assessmentFocus": [
              "Ability to follow folktale protocols when reminded",
              "Ability to follow folktale protocols without reminders",
              "Ability to tell folktales they know",
              "Ability to answer comprehension questions",
              "Ability to act out folktale content",
              "Ability to state the moral/lesson",
              "Ability to tell specific folktales"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-reading-comprehension"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-knowing-oneself-and-relating",
                "description": "Using folktales to understand culture and relationships"
              }
            ]
          },
          {
            "id": "g4-ses-proverbs",
            "title": "Sesotho Proverbs (Maele)",
            "description": "Learn, explain and use Sesotho proverbs related to relationships, health and safety, environment, and survival.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area",
              "Personal, Spiritual and Social Learning Area"
            ],
            "learningObjectives": [
              "Report on research",
              "Explain proverbs with teacher guidance",
              "Explain proverbs without guidance",
              "Use proverbs correctly in sentences",
              "Identify proverbs in sentences/paragraphs"
            ],
            "keyVocabulary": [
              "Maele (proverbs)",
              "Phelisano (relationships): Ngoan'a sa lleng o shoela tharing; Poli e lekhoekhoe e senya mohlape; Pheha nku e tsoe masapong; Ntja-peli ha e hloloe ke phokojoe",
              "Bophelo bo botle (health): Masene ha se boi; Monna haa bone habeli; Pela ho phela e itebelang",
              "Tikoloho (environment): Bo-ja-bo-tÅ¡eha ba Mariha; O hlaba khora ka se-feea-maeba; Le sele le bohoeng ba ntja; Re qetoa ke tlala ea leqeme",
              "Boipheliso (survival): Matsoho a lemisetsa 'metso; Mekoko ha e qhoaelane; Lekanyane ho phela le liretsana; 'Mesa-mohloane ha a fanye"
            ],
            "exampleActivities": [
              "Research proverbs on specific themes",
              "Report research findings",
              "Teacher guides explanation of proverbs",
              "Write proverbs and their explanations",
              "Use proverbs in sentences",
              "Act out proverbs where possible",
              "Read paragraphs/sentences containing learned proverbs",
              "Identify proverbs in paragraphs/sentences"
            ],
            "assessmentFocus": [
              "Ability to report research findings",
              "Ability to explain proverbs with guidance",
              "Ability to explain proverbs without guidance",
              "Ability to use proverbs correctly in sentences",
              "Ability to identify proverbs in sentences/paragraphs"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-traditional-folktales"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-knowing-oneself-and-relating",
                "description": "Using proverbs about relationships"
              },
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-health-and-safety",
                "description": "Using proverbs about health and safety"
              },
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-environment",
                "description": "Using proverbs about environment"
              },
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-survival-and-self-reliance",
                "description": "Using proverbs about survival"
              }
            ]
          },
          {
            "id": "g4-ses-riddles",
            "title": "Riddles (Lilotho)",
            "description": "Practice asking and answering traditional Sesotho riddles on various themes.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Use correct words when asking someone to riddle",
              "Use correct words when someone asks to riddle",
              "Use correct words when not knowing the answer",
              "Use correct words when out of riddles",
              "Play riddle game with appropriate riddles for each theme"
            ],
            "keyVocabulary": [
              "Lilotho (riddles)",
              "Moetlo oa ho lothana (riddle protocol)",
              "Ka u lotha? (May I riddle you?)",
              "Ka'ng? (With what?)",
              "Ka se reka (I don't buy/know)",
              "Body parts riddles",
              "Health and safety riddles",
              "Environment riddles",
              "Survival riddles"
            ],
            "exampleActivities": [
              "Discuss riddle protocol",
              "Discuss riddles related to specific themes",
              "Teacher riddles learners and they respond",
              "If they don't know, they say 'Ka se reka' or teacher tells answer",
              "One learner riddles the group",
              "Learners riddle each other in pairs or small groups"
            ],
            "assessmentFocus": [
              "Ability to use correct words when asking to riddle",
              "Ability to use correct words when asked to riddle",
              "Ability to use correct words when not knowing answer",
              "Ability to use correct words when out of riddles",
              "Ability to play riddle game with theme-appropriate riddles"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-traditional-folktales"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-ses-punctuation",
            "title": "Punctuation Marks",
            "description": "Learn to use punctuation marks correctly in Sesotho writing including full stop, question mark, comma, exclamation mark and capital letters.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Use punctuation marks correctly",
              "Use capital letters at beginning of person's name and sentence",
              "Use capital letters at beginning of place name",
              "Use capital letters at beginning of mountain name",
              "Use exclamation marks to show exclamation",
              "Use comma to list items in sentence",
              "Use question mark correctly in sentence",
              "Create own questions about what was read",
              "Read sentences with comma, question mark and exclamation correctly"
            ],
            "keyVocabulary": [
              "MatÅ¡oao (punctuation marks)",
              "Khutlo (.)",
              "Potso (?)",
              "Feeloane (,)",
              "Makalo (!)",
              "Tlhaku e kholo (capital letter)",
              "Khotsa (exclamation): Ao! Ache! Khili! Khele!"
            ],
            "exampleActivities": [
              "Discuss known punctuation marks and their use",
              "Discuss use of capital letters (beginning of sentence, person's name, place, mountain)",
              "Teacher writes short sentences for copying",
              "Create sentences while looking at pictures",
              "Read written sentences",
              "Write sentences paying attention to punctuation",
              "Insert correct punctuation in sentences without marks",
              "Read paragraph and write questions about it",
              "Read sentences with comma, question mark and exclamation correctly"
            ],
            "assessmentFocus": [
              "Ability to use punctuation marks correctly",
              "Ability to use capital letters at beginning of names and sentences",
              "Ability to use exclamation marks to show exclamation",
              "Ability to use comma to list items",
              "Ability to use question mark correctly",
              "Ability to create own questions about reading",
              "Ability to read sentences with punctuation correctly"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-phonics-and-spelling"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-ses-antonyms",
            "title": "Words with Opposite Meanings (Antonyms)",
            "description": "Learn and use words with opposite meanings in Sesotho.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Give words with opposite meanings",
              "Choose words with opposite meanings",
              "Use words with opposite meanings in sentences"
            ],
            "keyVocabulary": [
              "nyoloha - theoha",
              "lahla - thola",
              "rua - futsaneha",
              "hoeshetsa - hooeletsa/hoelehetsa",
              "boreleli - mahoashe"
            ],
            "exampleActivities": [
              "Give words with opposite meanings",
              "Use words with opposite meanings in sentences",
              "Teacher provides sentences with highlighted words and opposite words to choose from",
              "Teacher provides list of words for finding opposites"
            ],
            "assessmentFocus": [
              "Ability to give words with opposite meanings",
              "Ability to choose correct opposite words",
              "Ability to use words with opposite meanings in sentences"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-synonyms"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-ses-word-puzzles",
            "title": "Word Puzzles (Morabaraba oa Mantsoe)",
            "description": "Play word puzzles and word games in Sesotho including word searches and riddle-based word games.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Form words within letter grids",
              "Riddle others by describing items fully",
              "Solve word riddles",
              "Form words correctly from scrambled letters",
              "Form words from given letters"
            ],
            "keyVocabulary": [
              "Morabaraba oa mantsoe (word puzzle)",
              "Litlhaku (letters)",
              "Mantsoe (words)",
              "Hlalosa (describe)",
              "Lobokanya (scramble)"
            ],
            "exampleActivities": [
              "Form words within letter grids",
              "Riddle each other by fully describing items (appearance, number of letters, where found, how used)",
              "Listeners name the item",
              "Teacher scrambles letters of words for correct writing",
              "Teacher provides letters for word formation"
            ],
            "assessmentFocus": [
              "Ability to form words within letter grids",
              "Ability to riddle others by describing items fully",
              "Ability to solve word riddles",
              "Ability to form words correctly from scrambled letters",
              "Ability to form words from given letters"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-phonics-and-spelling"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-ses-verbs-and-tenses",
            "title": "Action Words and Tenses",
            "description": "Learn to use action words showing actions happening now, that happened, and that will happen.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "State what they are doing now (with guidance)",
              "State what they are doing now (without guidance)",
              "Write sentences",
              "Divide/join words correctly",
              "Spell words correctly",
              "Identify action words in sentences",
              "Use action words correctly"
            ],
            "keyVocabulary": [
              "Mantsoe a bontÅ¡ang ketso (action words/verbs)",
              "E etsahalang (happening now/present)",
              "E etsahetseng (happened/past)",
              "E tla etsahala (will happen/future)"
            ],
            "exampleActivities": [
              "State what they are doing now",
              "State what they did",
              "State what they will do after school",
              "Write their sentences on board",
              "Discuss sentences and clarify action words showing time",
              "Individually create sentences and underline action words showing if happening now, happened, or will happen"
            ],
            "assessmentFocus": [
              "Ability to state current actions with guidance",
              "Ability to state current actions without guidance",
              "Ability to write sentences",
              "Ability to divide/join words correctly",
              "Ability to spell words correctly",
              "Ability to identify action words",
              "Ability to use action words correctly"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-punctuation"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-ses-food-vocabulary",
            "title": "Sesotho Food Vocabulary",
            "description": "Learn names and descriptions of traditional Sesotho foods.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area",
              "Personal, Spiritual and Social Learning Area"
            ],
            "learningObjectives": [
              "Explain Sesotho foods"
            ],
            "keyVocabulary": [
              "Lijo tsa Sesotho (Sesotho foods)",
              "lihoapa",
              "makoakoa",
              "khoahla",
              "lefotho",
              "sebera",
              "potele"
            ],
            "exampleActivities": [
              "Research explanations of Sesotho foods at home",
              "Teacher shows pictures of foods or learners bring them",
              "State names of foods",
              "Match food names with pictures",
              "Teacher may record song about food and learners sing it",
              "Write Sesotho foods by copying and dictation",
              "Discuss benefits of foods",
              "Use food names in sentences",
              "Draw foods"
            ],
            "assessmentFocus": [
              "Ability to explain Sesotho foods"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-reading-comprehension"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-health-and-safety",
                "description": "Connecting food vocabulary to nutrition and health"
              }
            ]
          },
          {
            "id": "g4-ses-instructions-and-procedures",
            "title": "Reading and Following Instructions",
            "description": "Read and understand instructions, recipes, and procedural texts with equipment lists and steps.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Explain content shown in pictures using words",
              "Report on importance of recipes",
              "Write equipment with measurements and procedure steps",
              "Sequence procedure steps correctly",
              "Act out procedure",
              "Follow instructions to complete tasks",
              "Write procedure steps"
            ],
            "keyVocabulary": [
              "Liresepe (recipes)",
              "Lisebelisoa (equipment)",
              "Mokhoa (procedure/method)",
              "Mehato (steps)",
              "Tekanyo (measurement)",
              "Litaelo (instructions)"
            ],
            "exampleActivities": [
              "Teacher provides pictures showing content, learners describe in words",
              "Research importance of recipes and report to group",
              "Discuss importance of recipes",
              "Write equipment list and procedure for chosen task",
              "Act out procedure for chosen task",
              "In groups, write procedure for task",
              "Follow written instructions to complete tasks"
            ],
            "assessmentFocus": [
              "Ability to explain content of pictures in words",
              "Ability to report on importance of recipes",
              "Ability to write equipment and procedure",
              "Ability to sequence procedure steps correctly",
              "Ability to act out procedure",
              "Ability to complete tasks following instructions",
              "Ability to write procedure steps"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-reading-comprehension"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-health-and-safety",
                "description": "Reading recipes for food preparation"
              }
            ]
          },
          {
            "id": "g4-ses-pronouns",
            "title": "Pronouns (Words Standing for Nouns)",
            "description": "Learn to use pronouns that can stand in place of nouns in Sesotho.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Read sentences",
              "State pronouns standing for nouns",
              "State nouns represented by pronouns",
              "Identify nouns in paragraphs",
              "Write paragraphs using pronouns standing for nouns"
            ],
            "keyVocabulary": [
              "Mantsoe a ka emang bakeng sa mabitso (pronouns)",
              "'Na (I/me)",
              "Uena (you)",
              "Rona (we/us)",
              "Lona (you plural)",
              "Sona (it)",
              "Oona (they/them)",
              "Eona (it)",
              "Tsona (they/them)"
            ],
            "exampleActivities": [
              "Read sentences with nouns and teacher guides identifying pronouns that can replace nouns",
              "Teacher provides pronouns and learners give nouns",
              "Bring pictures, state their names and pronouns that can replace names",
              "Teacher provides paragraph with nouns, learners identify nouns and rewrite using pronouns"
            ],
            "assessmentFocus": [
              "Ability to read sentences",
              "Ability to state pronouns standing for nouns",
              "Ability to state nouns represented by pronouns",
              "Ability to identify nouns in paragraphs",
              "Ability to write paragraphs using pronouns"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-verbs-and-tenses"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-ses-conjunctions",
            "title": "Joining Words (Conjunctions)",
            "description": "Learn to use words that join other words or sentences together.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "State joining words",
              "Identify joining words in sentences",
              "Use joining words correctly"
            ],
            "keyVocabulary": [
              "Mantsoe a kopanyang (conjunctions/joining words)",
              "le (and)",
              "kapa (or)",
              "empa (but)",
              "hobane (because)",
              "joaloka (like/as)"
            ],
            "exampleActivities": [
              "Discuss function of le, kapa, empa, hobane, joaloka in sentences",
              "Teacher writes two sentences, one with joining word and one without, learners identify correct one",
              "Teacher writes sentences with gaps for filling in joining words",
              "Teacher writes sentences with joining words for underlining",
              "Create own sentences using joining words"
            ],
            "assessmentFocus": [
              "Ability to state joining words",
              "Ability to identify joining words in sentences",
              "Ability to use joining words correctly"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-punctuation"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-ses-animal-vocabulary",
            "title": "Animal Names and Classification",
            "description": "Learn animal names including male, female, young and dwelling places in Sesotho.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area",
              "Scientific and Technological Learning Area"
            ],
            "learningObjectives": [
              "Report on male/female names of animals",
              "Report on young animals and their dwelling places",
              "Use new words in sentences",
              "Draw animals and their dwelling places",
              "Fill in word grid about animals",
              "Research about chosen animal's life",
              "Compose poem about chosen animal"
            ],
            "keyVocabulary": [
              "Botona (male)",
              "Botsehali (female)",
              "Malinyane (young)",
              "Matlo/bolulo (dwelling places)",
              "monna - mosali - ngoana - ntlo",
              "pere - 'meri - petsana - setala",
              "mokoko - sethole - tsuonyana - serobe",
              "morena - mofumahali - khosana/khosatsana - ntlo",
              "pheleu - sethole - konyana - lesaka",
              "phooko - poli - potsanyana - lesaka",
              "poho - sethole - namane - lesaka",
              "pheeke - ntja - mootloane - serobe"
            ],
            "exampleActivities": [
              "Research male/female names of animals",
              "Research young animals and dwelling places",
              "In groups, collect male, female, young and dwelling information",
              "Teacher provides pictures of dwellings, learners name animals living there",
              "Use new words in sentences",
              "Draw animals and their dwellings",
              "Teacher provides animal grid for filling",
              "In groups, research life of chosen animal and compose poem about it"
            ],
            "assessmentFocus": [
              "Ability to report on male/female animals",
              "Ability to report on young animals and dwellings",
              "Ability to use new words in sentences",
              "Ability to draw animals and dwellings",
              "Ability to fill word grid",
              "Ability to compose poem"
            ],
            "prerequisiteTopicIds": [
              "g4-ses-reading-comprehension"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-environment",
                "description": "Learning about animals and their habitats"
              }
            ]
          }
        ]
      },
      {
        "name": "English Literacy",
        "topics": [
          {
            "id": "g4-eng-greetings-and-titles",
            "title": "Formal and Informal Greetings and Titles",
            "description": "Learn formal and informal modes of address, including use of titles in greetings.",
            "curriculumStandards": [
              "Effective Communication",
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Use formal greetings appropriately",
              "Use informal greetings appropriately",
              "Use titles correctly in formal address"
            ],
            "keyVocabulary": [
              "Formal greetings",
              "Informal greetings",
              "Titles (Mr., Mrs., Miss, Dr., Sir, Madam)"
            ],
            "exampleActivities": [
              "Practice formal and informal greetings in role-play",
              "Discuss when to use titles",
              "Practice greetings with different people"
            ],
            "assessmentFocus": [
              "Ability to use formal greetings appropriately",
              "Ability to use informal greetings appropriately",
              "Ability to use titles correctly"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-greetings-and-social-graces",
                "description": "Comparing formal and informal greetings across languages"
              }
            ]
          },
          {
            "id": "g4-eng-nouns-proper-common",
            "title": "Proper and Common Nouns",
            "description": "Differentiate between proper and common nouns, understanding capitalization rules.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Write names of persons, places and things",
              "Differentiate between special and ordinary names",
              "Differentiate between plural and singular forms of nouns",
              "Change nouns from singular to plural and from plural to singular",
              "Identify regular and irregular nouns",
              "Write regular nouns in plural form correctly"
            ],
            "keyVocabulary": [
              "Proper nouns",
              "Common nouns",
              "Capital letters",
              "Singular",
              "Plural",
              "Regular nouns",
              "Irregular nouns"
            ],
            "exampleActivities": [
              "Give list of proper nouns",
              "Discuss difference between special and ordinary names",
              "Guided questions to find capitalization rules",
              "Rewrite sentences correcting proper nouns",
              "Identify names from sentences",
              "Change names to plural form",
              "List body parts in singular and plural",
              "Identify rules for forming plurals (-s, -es)"
            ],
            "assessmentFocus": [
              "Ability to write names of persons, places and things",
              "Ability to differentiate between special and ordinary names",
              "Ability to differentiate between plural and singular forms",
              "Ability to change nouns between singular and plural",
              "Ability to identify regular and irregular nouns",
              "Ability to write regular nouns in plural form correctly"
            ],
            "prerequisiteTopicIds": [
              "g4-eng-greetings-and-titles"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-eng-adjectives",
            "title": "Describing Words (Adjectives)",
            "description": "Use describing words correctly in sentences to indicate number, color, and size.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Describe items according to number, colour, and size",
              "Construct sentences using different describing words",
              "Spell words correctly"
            ],
            "keyVocabulary": [
              "Describing words",
              "Adjectives",
              "Number",
              "Colour",
              "Size"
            ],
            "exampleActivities": [
              "Look at clothes and describe their colors in sentences",
              "Write sentences on chalkboard",
              "Underline describing words from written sentences",
              "Count items in school bags and construct sentences",
              "Bring items of different sizes and sort them",
              "Describe items according to size",
              "Fill in correct adjectives describing given pictures"
            ],
            "assessmentFocus": [
              "Ability to describe items by number, colour, and size",
              "Ability to construct sentences using describing words",
              "Ability to spell words correctly"
            ],
            "prerequisiteTopicIds": [
              "g4-eng-nouns-proper-common"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-eng-punctuation",
            "title": "Punctuation Marks and Capital Letters",
            "description": "Use punctuation marks and place capital letters appropriately in sentences.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Punctuate given sentences correctly",
              "Construct meaningful sentences through punctuation marks",
              "Use capital letters at beginning of sentences and for proper nouns",
              "Use comma appropriately in a list"
            ],
            "keyVocabulary": [
              "Punctuation marks",
              "Full stop (.)",
              "Question mark (?)",
              "Comma (,)",
              "Capital letters"
            ],
            "exampleActivities": [
              "Write sentence on board for reconstruction using punctuation",
              "Guide learners to change sentence to question form",
              "Punctuate given sentences to give meaning",
              "Construct sentences about after-school activities and punctuate",
              "List items used in class in a sentence"
            ],
            "assessmentFocus": [
              "Ability to punctuate given sentences correctly",
              "Ability to construct meaningful sentences through punctuation",
              "Ability to use capital letters at beginning of sentences and for proper nouns",
              "Ability to use comma appropriately in a list"
            ],
            "prerequisiteTopicIds": [
              "g4-eng-adjectives"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-eng-articles",
            "title": "Articles (a, an, the)",
            "description": "Use articles a, an, and the correctly in sentences.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Insert appropriate articles next to nouns",
              "Explain when to use each of the articles",
              "Use a, an, and the correctly in sentences"
            ],
            "keyVocabulary": [
              "Articles",
              "a",
              "an",
              "the"
            ],
            "exampleActivities": [
              "Create scenarios about fruits",
              "In groups create scenarios about different fruits",
              "Draw attention to use of articles",
              "Construct sentences about classroom items using articles",
              "Group fruits and vegetables by first letter and insert correct articles"
            ],
            "assessmentFocus": [
              "Ability to insert appropriate articles next to nouns",
              "Ability to explain when to use each article",
              "Ability to use a, an, and the correctly in sentences"
            ],
            "prerequisiteTopicIds": [
              "g4-eng-punctuation"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-eng-reading-comprehension",
            "title": "Reading for Information and Enjoyment",
            "description": "Read stories and passages for understanding and enjoyment, analyzing characters, themes, and settings.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Read fluently",
              "Analyze stories through questioning",
              "Come up with specific information from passages",
              "Re-read to clarify meaning",
              "Pay attention to punctuation when reading"
            ],
            "keyVocabulary": [
              "Short story",
              "Characterization",
              "Character",
              "Theme",
              "Setting",
              "Passage"
            ],
            "exampleActivities": [
              "Read story in turns",
              "Teacher guides with questions to understand story",
              "Analyze given stories through questioning",
              "Read passages",
              "Answer questions on passages",
              "Re-read passages to seek specific information"
            ],
            "assessmentFocus": [
              "Ability to read fluently",
              "Ability to analyze stories",
              "Ability to find specific information from passages",
              "Ability to re-read to clarify meaning",
              "Ability to pay attention to punctuation when reading"
            ],
            "prerequisiteTopicIds": [
              "g4-eng-articles"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-reading-comprehension",
                "description": "Developing reading comprehension across languages"
              }
            ]
          },
          {
            "id": "g4-eng-listening-skills",
            "title": "Listening and Responding to Different Texts",
            "description": "Listen to different texts including stories, descriptions, instructions and directions, and respond appropriately.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Respond to 'Wh' questions (who, what, when, whose, why, where, how)",
              "Pronounce words correctly",
              "Respond to different sounds",
              "Respond to descriptions, instructions and directions",
              "Spell and read new words correctly"
            ],
            "keyVocabulary": [
              "Stories",
              "Descriptions",
              "Instructions",
              "Directions",
              "Sounds",
              "Wh-questions"
            ],
            "exampleActivities": [
              "Teacher reads story while learners listen attentively",
              "Answer 'Wh' questions",
              "Listen to different sounds and respond",
              "Listen to descriptions, instructions and directions",
              "Teacher dictates new words and learners write them"
            ],
            "assessmentFocus": [
              "Ability to respond to 'Wh' questions",
              "Ability to pronounce words correctly",
              "Ability to respond to different sounds",
              "Ability to respond to descriptions, instructions and directions",
              "Ability to spell and read new words correctly"
            ],
            "prerequisiteTopicIds": [
              "g4-eng-reading-comprehension"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-eng-spelling-silent-letters",
            "title": "Spelling Words with Silent Letters",
            "description": "Learn to spell common words containing silent letters correctly.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Identify silent letters in words",
              "Spell words with silent letters correctly",
              "Use words with silent letters in sentences"
            ],
            "keyVocabulary": [
              "Silent letters",
              "Spelling"
            ],
            "exampleActivities": [
              "Identify silent letters in given words",
              "Practice spelling words with silent letters",
              "Write sentences using words with silent letters"
            ],
            "assessmentFocus": [
              "Ability to identify silent letters",
              "Ability to spell words with silent letters correctly",
              "Ability to use words with silent letters in sentences"
            ],
            "prerequisiteTopicIds": [
              "g4-eng-listening-skills"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-eng-verb-tenses",
            "title": "Verb Tenses (Past, Present, Future)",
            "description": "Practice using simple past tense, present tense and future tense correctly.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Use simple past tense correctly",
              "Use present tense correctly",
              "Use future tense correctly",
              "Identify verb tenses in sentences"
            ],
            "keyVocabulary": [
              "Simple past tense",
              "Present tense",
              "Future tense",
              "Verbs"
            ],
            "exampleActivities": [
              "Construct sentences in different tenses",
              "Identify tense in given sentences",
              "Change sentences from one tense to another",
              "Use verbs correctly in different tenses"
            ],
            "assessmentFocus": [
              "Ability to use simple past tense correctly",
              "Ability to use present tense correctly",
              "Ability to use future tense correctly",
              "Ability to identify verb tenses in sentences"
            ],
            "prerequisiteTopicIds": [
              "g4-eng-spelling-silent-letters"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Sesotho Literacy",
                "topicId": "g4-ses-verbs-and-tenses",
                "description": "Understanding verb tenses across languages"
              }
            ]
          },
          {
            "id": "g4-eng-handwriting",
            "title": "Good Handwriting",
            "description": "Develop clear and legible handwriting with proper letter formation.",
            "curriculumStandards": [
              "Linguistic and Literary Learning Area"
            ],
            "learningObjectives": [
              "Write legibly",
              "Form letters correctly",
              "Maintain consistent letter size and spacing",
              "Write neatly"
            ],
            "keyVocabulary": [
              "Handwriting",
              "Legibility",
              "Letter formation",
              "Spacing"
            ],
            "exampleActivities": [
              "Practice letter formation",
              "Copy passages with attention to handwriting",
              "Write sentences focusing on neatness",
              "Practice writing in lines"
            ],
            "assessmentFocus": [
              "Ability to write legibly",
              "Ability to form letters correctly",
              "Ability to maintain consistent letter size and spacing",
              "Ability to write neatly"
            ],
            "prerequisiteTopicIds": [
              "g4-eng-verb-tenses"
            ],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Numeracy",
        "topics": [
          {
            "id": "g4-num-sets-and-notation",
            "title": "Sets and Set Notation",
            "description": "Manipulate sets and set notations including empty set and set symbols.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area"
            ],
            "learningObjectives": [
              "Identify empty set",
              "Use set symbols { }, Ã˜ correctly",
              "Describe sets",
              "Form sets from given elements"
            ],
            "keyVocabulary": [
              "Empty set",
              "Set symbols { }, Ã˜",
              "Set description",
              "Elements"
            ],
            "exampleActivities": [
              "Use symbol of empty set correctly with reference to different contexts",
              "Identify empty sets in real-life situations",
              "Describe sets using set notation",
              "Form sets from given criteria"
            ],
            "assessmentFocus": [
              "Ability to identify empty set",
              "Ability to use set symbols correctly",
              "Ability to describe sets",
              "Ability to demonstrate set concepts in real life"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-place-value-4-digits",
            "title": "Place Value and 4-Digit Numbers",
            "description": "Read and write 4-digit numbers in words and number symbols, understanding place value up to thousands.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area"
            ],
            "learningObjectives": [
              "Read 4-digit numbers",
              "Write 4-digit numbers in words and symbols",
              "Understand place value up to thousands",
              "Identify value of digits in 4-digit numbers"
            ],
            "keyVocabulary": [
              "Place value",
              "4-digit numbers",
              "Thousands",
              "Hundreds",
              "Tens",
              "Ones/Units",
              "Number symbols",
              "Number words"
            ],
            "exampleActivities": [
              "Read 4-digit numbers aloud",
              "Write numbers in word form",
              "Write numbers in symbol form",
              "Identify place value of digits",
              "Represent numbers using place value materials",
              "Order 4-digit numbers"
            ],
            "assessmentFocus": [
              "Ability to read 4-digit numbers",
              "Ability to write 4-digit numbers in words and symbols",
              "Ability to identify place value of digits",
              "Ability to understand value of numerals 1-1000"
            ],
            "prerequisiteTopicIds": [
              "g4-num-sets-and-notation"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-addition-4-digits",
            "title": "Addition of 4-Digit Numbers",
            "description": "Add 4-digit numbers without carrying and with carrying.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area"
            ],
            "learningObjectives": [
              "Add 4-digit numbers without carrying",
              "Add 4-digit numbers with carrying",
              "Solve real life problems involving addition of 4-digit numbers"
            ],
            "keyVocabulary": [
              "Addition",
              "Sum",
              "Addends",
              "Carrying",
              "4-digit numbers"
            ],
            "exampleActivities": [
              "Teacher demonstrates addition without carrying",
              "Learners add 4-digit numbers without carrying",
              "Solve real life problems involving addition",
              "Teacher demonstrates addition with carrying",
              "Practice addition with carrying",
              "Use place value materials to understand carrying"
            ],
            "assessmentFocus": [
              "Ability to add 4-digit numbers without carrying",
              "Ability to add 4-digit numbers with carrying",
              "Ability to solve real life problems involving addition"
            ],
            "prerequisiteTopicIds": [
              "g4-num-place-value-4-digits"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-subtraction-4-digits",
            "title": "Subtraction of 4-Digit Numbers",
            "description": "Subtract 4-digit numbers without borrowing and with borrowing.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area"
            ],
            "learningObjectives": [
              "Subtract 4-digit numbers without borrowing",
              "Subtract 4-digit numbers with borrowing",
              "Solve real life problems involving subtraction of 4-digit numbers"
            ],
            "keyVocabulary": [
              "Subtraction",
              "Difference",
              "Minuend",
              "Subtrahend",
              "Borrowing",
              "4-digit numbers"
            ],
            "exampleActivities": [
              "Teacher demonstrates subtraction without borrowing",
              "Learners subtract numbers without borrowing",
              "Solve real life problems involving subtraction",
              "Teacher demonstrates subtraction with borrowing",
              "Practice subtraction with borrowing",
              "Use place value materials to understand borrowing"
            ],
            "assessmentFocus": [
              "Ability to subtract 4-digit numbers without borrowing",
              "Ability to subtract 4-digit numbers with borrowing",
              "Ability to solve real life problems involving subtraction"
            ],
            "prerequisiteTopicIds": [
              "g4-num-addition-4-digits"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-fractions",
            "title": "Fractions (Â½, â…“, Â¼, â…•, 1/10, 1/12)",
            "description": "Identify and use fractions in real life situations.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area"
            ],
            "learningObjectives": [
              "Identify fractions by using fraction board",
              "Use fractions to solve real life problems",
              "Show denominators and numerators",
              "Show shaded and unshaded fractions",
              "Form own fractions"
            ],
            "keyVocabulary": [
              "Fraction",
              "Denominator",
              "Numerator",
              "Half (Â½)",
              "Third (â…“)",
              "Quarter (Â¼)",
              "Fifth (â…•)",
              "Tenth (1/10)",
              "Twelfth (1/12)",
              "Shaded",
              "Unshaded"
            ],
            "exampleActivities": [
              "Present parts of items as fractions",
              "Demonstrate fractions by folding papers",
              "Find given parts by folding, shading and cutting papers",
              "Use concrete materials to represent fractions",
              "Shade fractions in pictorial form",
              "Teacher introduces denominator and numerator",
              "Divide into groups to demonstrate fractions"
            ],
            "assessmentFocus": [
              "Ability to identify fractions using fraction board",
              "Ability to use fractions to solve real life problems",
              "Ability to show denominators and numerators",
              "Ability to show shaded and unshaded fractions",
              "Ability to form own fractions"
            ],
            "prerequisiteTopicIds": [
              "g4-num-subtraction-4-digits"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-money-currency",
            "title": "Currency (Lesotho, RSA and Swazi)",
            "description": "Identify and compare Lesotho, RSA and Swazi currency in terms of shape, colour, size and value. Use currency for buying and selling.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area",
              "Production and Work-related Competencies"
            ],
            "learningObjectives": [
              "Identify Lesotho, RSA and Swazi currency",
              "Compare currency in terms of shape, colour, size and value",
              "Use currency in circulation for buying and selling activities",
              "Demonstrate use and management of money in practical situations"
            ],
            "keyVocabulary": [
              "Currency",
              "Maloti (Lesotho)",
              "Rand (RSA)",
              "Lilangeni (Swazi)",
              "Coins",
              "Notes",
              "Value",
              "Buying",
              "Selling",
              "Change"
            ],
            "exampleActivities": [
              "Identify different currencies",
              "Compare shape, colour, and size of currencies",
              "Discuss value of different denominations",
              "Practice buying and selling using real or play money",
              "Calculate change in transactions",
              "Manage money in practical situations"
            ],
            "assessmentFocus": [
              "Ability to identify Lesotho, RSA and Swazi currency",
              "Ability to compare currencies by shape, colour, size and value",
              "Ability to use currency for buying and selling",
              "Ability to demonstrate money management"
            ],
            "prerequisiteTopicIds": [
              "g4-num-fractions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Integrated Studies",
                "topicId": "g4-is-survival-and-self-reliance",
                "description": "Applying money management to survival and self-reliance"
              }
            ]
          },
          {
            "id": "g4-num-time",
            "title": "Time (Hours to Days)",
            "description": "Relate hours to days to solve real life problems.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area"
            ],
            "learningObjectives": [
              "Convert hours to days",
              "Convert days to hours",
              "Solve real life problems involving time"
            ],
            "keyVocabulary": [
              "Hours",
              "Days",
              "Time",
              "24 hours",
              "Conversion"
            ],
            "exampleActivities": [
              "Discuss relationship between hours and days",
              "Convert hours to days",
              "Convert days to hours",
              "Solve problems involving time conversion",
              "Apply time concepts to real life situations"
            ],
            "assessmentFocus": [
              "Ability to relate hours to days",
              "Ability to solve real life problems involving time"
            ],
            "prerequisiteTopicIds": [
              "g4-num-money-currency"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-measurement-length",
            "title": "Measurement of Length and Height",
            "description": "Measure length and height in millimetres, centimetres, metres and kilometres.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area",
              "Scientific and Technological Learning Area"
            ],
            "learningObjectives": [
              "Measure length in millimetres, centimetres, metres and kilometres",
              "Measure height in appropriate units",
              "Convert between units of length",
              "Apply measurement of length in real life situations"
            ],
            "keyVocabulary": [
              "Length",
              "Height",
              "Millimetres (mm)",
              "Centimetres (cm)",
              "Metres (m)",
              "Kilometres (km)",
              "Measuring tools",
              "Ruler",
              "Measuring tape"
            ],
            "exampleActivities": [
              "Measure objects using different units",
              "Practice measuring length and height",
              "Convert between units of length",
              "Estimate and measure lengths",
              "Apply measurement to solve real life problems"
            ],
            "assessmentFocus": [
              "Ability to measure length and height in different units",
              "Ability to use appropriate units for measurement",
              "Ability to apply measurement in real life situations"
            ],
            "prerequisiteTopicIds": [
              "g4-num-time"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-measurement-mass",
            "title": "Measurement of Mass",
            "description": "Measure mass using milligrams, grams, and kilograms.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area",
              "Scientific and Technological Learning Area"
            ],
            "learningObjectives": [
              "Measure mass in milligrams, grams and kilograms",
              "Convert between units of mass",
              "Apply measurement of mass in real life situations"
            ],
            "keyVocabulary": [
              "Mass",
              "Weight",
              "Milligrams (mg)",
              "Grams (g)",
              "Kilograms (kg)",
              "Scale",
              "Balance"
            ],
            "exampleActivities": [
              "Measure mass of different objects",
              "Practice using scales and balances",
              "Convert between units of mass",
              "Estimate and measure mass",
              "Apply measurement to solve real life problems"
            ],
            "assessmentFocus": [
              "Ability to measure mass in different units",
              "Ability to convert between units of mass",
              "Ability to apply measurement in real life situations"
            ],
            "prerequisiteTopicIds": [
              "g4-num-measurement-length"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-measurement-volume",
            "title": "Measurement of Volume",
            "description": "Measure volume using millilitres and litres.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area",
              "Scientific and Technological Learning Area"
            ],
            "learningObjectives": [
              "Measure volume in millilitres and litres",
              "Convert between units of volume",
              "Apply measurement of volume in real life situations"
            ],
            "keyVocabulary": [
              "Volume",
              "Capacity",
              "Millilitres (ml)",
              "Litres (l)",
              "Measuring jug",
              "Container"
            ],
            "exampleActivities": [
              "Measure volume of liquids",
              "Practice using measuring jugs",
              "Convert between millilitres and litres",
              "Estimate and measure volume",
              "Apply measurement to solve real life problems"
            ],
            "assessmentFocus": [
              "Ability to measure volume in different units",
              "Ability to convert between units of volume",
              "Ability to apply measurement in real life situations"
            ],
            "prerequisiteTopicIds": [
              "g4-num-measurement-mass"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-lines-shapes",
            "title": "Lines and Shapes",
            "description": "Identify and draw different types of lines and identify regular and irregular 2D polygons.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area",
              "Creativity and Entrepreneurial Learning Area"
            ],
            "learningObjectives": [
              "Identify and draw vertical, horizontal, diagonal and curving lines",
              "Identify regular and irregular 2D polygons: pentagon and hexagon",
              "Find lines of symmetry in basic shapes",
              "Identify symmetry in objects in nature and cultural art forms"
            ],
            "keyVocabulary": [
              "Vertical line",
              "Horizontal line",
              "Diagonal line",
              "Curving line",
              "Pentagon",
              "Hexagon",
              "Regular polygon",
              "Irregular polygon",
              "Symmetry",
              "Line of symmetry"
            ],
            "exampleActivities": [
              "Draw different types of lines",
              "Identify lines in environment",
              "Identify and draw pentagons and hexagons",
              "Classify polygons as regular or irregular",
              "Find lines of symmetry in shapes",
              "Identify symmetry in nature and art",
              "Create symmetrical designs"
            ],
            "assessmentFocus": [
              "Ability to identify and draw different types of lines",
              "Ability to identify regular and irregular polygons",
              "Ability to identify lines of symmetry",
              "Ability to use lines in forming shapes"
            ],
            "prerequisiteTopicIds": [
              "g4-num-measurement-volume"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-perimeter",
            "title": "Perimeter of Shapes",
            "description": "Measure the perimeter of regular and irregular shapes.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area"
            ],
            "learningObjectives": [
              "Calculate perimeter of regular shapes",
              "Calculate perimeter of irregular shapes",
              "Apply perimeter concept to solve real life problems"
            ],
            "keyVocabulary": [
              "Perimeter",
              "Regular shapes",
              "Irregular shapes",
              "Sides",
              "Length",
              "Distance around"
            ],
            "exampleActivities": [
              "Measure sides of shapes",
              "Calculate perimeter by adding all sides",
              "Find perimeter of regular shapes",
              "Find perimeter of irregular shapes",
              "Apply perimeter to real life situations",
              "Solve problems involving perimeter"
            ],
            "assessmentFocus": [
              "Ability to measure perimeter of regular shapes",
              "Ability to measure perimeter of irregular shapes",
              "Ability to calculate perimeter accurately"
            ],
            "prerequisiteTopicIds": [
              "g4-num-lines-shapes"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-area",
            "title": "Area of Shapes",
            "description": "Find the area of regular and irregular shapes in square units.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area"
            ],
            "learningObjectives": [
              "Calculate area of regular shapes in square units",
              "Calculate area of irregular shapes in square units",
              "Apply area concept to solve real life problems"
            ],
            "keyVocabulary": [
              "Area",
              "Square units",
              "Regular shapes",
              "Irregular shapes",
              "Space inside",
              "Coverage"
            ],
            "exampleActivities": [
              "Count square units to find area",
              "Calculate area of regular shapes",
              "Calculate area of irregular shapes",
              "Compare areas of different shapes",
              "Apply area to real life situations",
              "Solve problems involving area"
            ],
            "assessmentFocus": [
              "Ability to find area of regular shapes",
              "Ability to find area of irregular shapes",
              "Ability to calculate area in square units"
            ],
            "prerequisiteTopicIds": [
              "g4-num-perimeter"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g4-num-data-collection",
            "title": "Data Collection and Tally Marks",
            "description": "Collect data in the immediate environment and use tally marks to organize it.",
            "curriculumStandards": [
              "Numerical and Mathematical Learning Area",
              "Scientific and Technological Learning Area"
            ],
            "learningObjectives": [
              "Collect data from immediate environment",
              "Use tally marks to record data",
              "Organize data using tally marks",
              "Interpret data represented by tally marks"
            ],
            "keyVocabulary": [
              "Data",
              "Data collection",
              "Tally marks",
              "Frequency",
              "Recording",
              "Organizing"
            ],
            "exampleActivities": [
              "Collect data about classroom items",
              "Record data using tally marks",
              "Organize collected data",
              "Count tally marks to find totals",
              "Interpret tally mark representations",
              "Compare data collected"
            ],
            "assessmentFocus": [
              "Ability to collect data in immediate environment",
              "Ability to use tally marks correctly",
              "Ability to organize and interpret data"
            ],
            "prerequisiteTopicIds": [
              "g4-num-area"
            ],
            "crossCurricularLinks": []
          }
        ]
      }
    ]
  },
  {
    "grade": "5",
    "subjects": [
      {
        "name": "Linguistic and Literary (Sesotho)",
        "topics": [
          {
            "id": "g5-ses-study-skills",
            "title": "Mekhoa ea ho ithuta (Study Skills)",
            "description": "Development of oral communication, reading comprehension, writing skills, and debate techniques in Sesotho.",
            "curriculumStandards": [
              "Effective Communication",
              "Critical thinking",
              "Learning to learn"
            ],
            "learningObjectives": [
              "Bua ka boitÅ¡epo ka taba eo ba sa itokisetsang eona (Speak confidently on an unprepared topic)",
              "Sebelisa buka ka nepo ho ipatlela litaba (Use a book correctly to find information)",
              "Bala lipale tse fanang ka tsebo (Read informative stories)",
              "Bala buka ea pale ka kutloisiso (Read a story book with understanding)",
              "Ngola papatso (Write advertisements)",
              "Qhaqholla thothokiso ka kutloisiso (Recite poetry with understanding)",
              "Phehisana ka taba (Debate a topic)",
              "Itokisetsa liphoso moo ba ngotseng (Edit their own writing)"
            ],
            "keyVocabulary": [
              "Moqoqo",
              "Lenaneo la litaba",
              "Linyenyeletso",
              "Sesosa",
              "Litholoana",
              "Papatso",
              "Thothokiso",
              "Phehisano"
            ],
            "exampleActivities": [
              "Unprepared speeches on given topics",
              "Using table of contents to locate information",
              "Reading and summarizing informative stories",
              "Creating advertisements for products",
              "Reciting poetry with proper expression",
              "Participating in structured debates",
              "Peer editing of written work"
            ],
            "assessmentFocus": [
              "Ability to speak confidently without preparation",
              "Correct use of book features to find information",
              "Identification of cause and effect in stories",
              "Creation of effective advertisements",
              "Understanding and expression of poetry",
              "Ability to argue for and against a proposition",
              "Self-correction of spelling and punctuation errors"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-ses-social-skills",
            "title": "Phelisano le bochaba (Social Skills and Culture)",
            "description": "Understanding and practicing Basotho cultural norms, traditions, greetings, totems, riddles, folktales, games, food, and animal descriptions.",
            "curriculumStandards": [
              "Awareness of Self and Others",
              "Cultural identity",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Lumelisa batho ho latela tlhahlamano ea bona ha ba etsa puo (Greet people according to their status when making speeches)",
              "BontÅ¡a tlhompho lipuong le liketsong (Show respect in speech and actions)",
              "Thella ka botlalo (Recite praise poetry completely)",
              "Lokolisa bohlokoa ba baamani (Explain the importance of relatives)",
              "Lothana ka lilotho tseo likarabo tsa tsona e leng limela (Recite riddles with plant answers)",
              "Pheta tÅ¡omo e khothaletsang tÅ¡ebelisano â€Ÿmoho (Tell a folktale that encourages cooperation)",
              "Bapala lipapali le lipina tsa bochaba (Play traditional games and songs)",
              "Hlalosa lijo tsa Sesotho (Describe Sesotho food)",
              "Sebelisa mebala ho hlalosa liphoofolo (Use colors to describe animals)",
              "Hlalosa liphoofolo ka matÅ¡oao a tsona (Describe animals by their markings)",
              "BontÅ¡a kutloisiso ea liketso tse supang ho ba le boikarabello (Show understanding of actions that demonstrate responsibility)"
            ],
            "keyVocabulary": [
              "Tlhahlamano",
              "Tlhompho",
              "Liboko",
              "Baamani",
              "Lilotho",
              "TÅ¡omo",
              "Lipapali",
              "Mebala ea liphoofolo",
              "MatÅ¡oao",
              "Boikarabello"
            ],
            "exampleActivities": [
              "Role-playing greetings for different social contexts",
              "Reciting clan praise poems (liboko)",
              "Playing riddle games with plant-based answers",
              "Storytelling: Phokojoe o hana ho fata seliba",
              "Traditional games and songs performance",
              "Food preparation demonstrations",
              "Describing animal colors and markings",
              "Dramatizing responsible and irresponsible behaviors"
            ],
            "assessmentFocus": [
              "Appropriate greeting protocols for different contexts",
              "Complete recitation of praise poetry",
              "Knowledge of family relationships and their importance",
              "Participation in traditional games and songs",
              "Accurate description of traditional foods",
              "Use of color terms for animals",
              "Recognition of actions showing responsibility"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-culture-ethnic-groups",
                "description": "Understanding Basotho culture and traditions"
              }
            ]
          },
          {
            "id": "g5-ses-language-use",
            "title": "TÅ¡ebeliso ea puo (Language Use)",
            "description": "Practical application of Sesotho language including antonyms, synonyms, homonyms, idioms, weather terms, and formal letter writing.",
            "curriculumStandards": [
              "Effective Communication",
              "Functional literacy"
            ],
            "learningObjectives": [
              "Sebelisa mantsoe a hananang lipolelong ka nepo (Use antonyms correctly in sentences)",
              "Sebelisa mantsoe a tÅ¡oanang ka moelelo (Use synonyms)",
              "Sebelisa mantsoe a nang le meelelo e fapaneng (Use words with multiple meanings)",
              "Sebelisa maelana lipolelong (Use idioms in sentences)",
              "Hlalosa maemo a fapaneng a leholimo/a mocheso (Describe different weather/temperature conditions)",
              "Ngola lengolo la setsoalle ka sepheo sa ho kholisa (Write a persuasive friendly letter)",
              "Ngola moqoqo (Write a composition)"
            ],
            "keyVocabulary": [
              "Mantsoe a hananang",
              "Mantsoe a tÅ¡oanang ka moelelo",
              "Maelana",
              "Maemo a leholimo",
              "Lengolo la setsoalle",
              "Moqoqo"
            ],
            "exampleActivities": [
              "Matching exercises for antonyms and synonyms",
              "Creating sentences with idioms",
              "Weather observation and description",
              "Writing persuasive letters for specific purposes",
              "Composing multi-paragraph essays"
            ],
            "assessmentFocus": [
              "Correct use of antonyms and synonyms in context",
              "Appropriate use of idioms",
              "Accurate description of weather conditions",
              "Proper structure and format of friendly letters",
              "Well-organized composition with introduction, body, and conclusion"
            ],
            "prerequisiteTopicIds": [
              "g5-ses-study-skills"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g5-sci-weather-measurement",
                "description": "Describing weather and temperature conditions"
              }
            ]
          },
          {
            "id": "g5-ses-language-structure",
            "title": "Sebopeho sa puo (Language Structure)",
            "description": "Grammar, sentence structure, parts of speech, and morphology in Sesotho including verbs, nouns, adjectives, pronouns, conjunctions, and sound patterns.",
            "curriculumStandards": [
              "Functional literacy",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Qolla sere se bontÅ¡ang molumo, monko le â€Ÿmala (Identify ideophones showing sound, smell and color)",
              "Sebelisa lereho e le moetsi kapa moetsuoa polelong (Use nouns as subject or object in sentences)",
              "Sebelisa mareho-â€Ÿmoka ka nepo lipolelong (Use collective nouns correctly)",
              "Sebelisa seemeli-tu le tumela ka nepo lipolelong (Use subject concords and pronouns correctly)",
              "Bopa mantsoe ba sebelisa melumo/litlhaku tsa Sesotho ka nepo (Form words using Sesotho sounds/letters correctly)",
              "Sebelisa sehokelo lipolelong (Use conjunctions in sentences)",
              "Bopa lipolelo tse bontÅ¡ang bonako (Construct sentences showing tense)",
              "Sebelisa sehlakisi sa â€Ÿmala le sa palo (Use color and number adjectives)",
              "Sebelisa lipoleoana tse bontÅ¡ang nako (Use time expressions)",
              "Sebelisa leeketsi la sebaka (Use locative adverbs)"
            ],
            "keyVocabulary": [
              "Sere",
              "Lereho",
              "Moetsi",
              "Moetsuoa",
              "Mareho-â€Ÿmoka",
              "Seemeli-tu",
              "Tumela",
              "Sehokelo",
              "Bonako",
              "Sehlakisi",
              "Leeketsi la sebaka"
            ],
            "exampleActivities": [
              "Identifying and using ideophones in descriptive writing",
              "Subject-object noun exercises",
              "Sentence construction with various tenses",
              "Using collective nouns appropriately",
              "Pronoun and concord agreement exercises",
              "Conjunction practice in complex sentences",
              "Time and place adverbial phrases in context"
            ],
            "assessmentFocus": [
              "Correct identification and use of ideophones",
              "Proper noun usage as subject and object",
              "Agreement of pronouns and concords",
              "Accurate spelling with Sesotho sound patterns",
              "Correct tense formation",
              "Appropriate use of adjectives and adverbs",
              "Proper conjunction usage in compound sentences"
            ],
            "prerequisiteTopicIds": [
              "g5-ses-language-use"
            ],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Linguistic and Literary (English)",
        "topics": [
          {
            "id": "g5-eng-study-skills",
            "title": "Study Skills",
            "description": "Developing listening comprehension, information literacy, reading strategies, editing skills, dictionary use, and public speaking abilities in English.",
            "curriculumStandards": [
              "Effective Communication",
              "Learning to learn",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Listen for information and respond appropriately",
              "Use the author, title and table of contents to describe a book",
              "Read for specific information",
              "Read for enjoyment",
              "Edit their own piece of writing",
              "Use a dictionary effectively",
              "Make a speech within a limited time without preparation",
              "Defend their point of view in a debate"
            ],
            "keyVocabulary": [
              "Author",
              "Title",
              "Table of contents",
              "Prediction",
              "Summary",
              "Editing",
              "Alphabetical order",
              "Debate",
              "Motion"
            ],
            "exampleActivities": [
              "Listening to oral texts and answering comprehension questions",
              "Book exploration using covers and tables of contents",
              "Reading passages to find specific information",
              "Independent reading for pleasure",
              "Peer editing exercises",
              "Dictionary scavenger hunts",
              "Impromptu speeches on random topics",
              "Structured classroom debates"
            ],
            "assessmentFocus": [
              "Ability to listen attentively and extract key information",
              "Correct use of book features to locate information",
              "Accurate identification of specific details in texts",
              "Self-editing for spelling and punctuation errors",
              "Effective dictionary navigation",
              "Confident unprepared speaking",
              "Logical argumentation in debates"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-eng-language-structure",
            "title": "Language Structure",
            "description": "Grammar fundamentals including nouns, verbs, tenses, adjectives, punctuation, articles, pronouns, prepositions, adverbs, conjunctions, and word formation.",
            "curriculumStandards": [
              "Functional literacy",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Construct sentences using proper and common nouns",
              "Construct sentences using compound nouns",
              "Construct sentences using singular and plural forms of nouns",
              "Use past, present and future tenses correctly in sentences",
              "Use comparative and superlative forms to describe things",
              "Use punctuation marks and place capital letters appropriately",
              "Use a, an and the correctly in sentences",
              "Use pronouns appropriately in sentences",
              "Read and use words with silent letters properly",
              "Spell and pronounce selected words correctly",
              "Use prepositions of place correctly in sentences",
              "Use relative and demonstrative pronouns correctly",
              "Use adverbs of time, manner and place in sentences",
              "Combine simple sentences using conjunctions",
              "Form nouns from verbs using suffixes"
            ],
            "keyVocabulary": [
              "Proper noun",
              "Common noun",
              "Compound noun",
              "Singular",
              "Plural",
              "Tense",
              "Comparative",
              "Superlative",
              "Punctuation",
              "Article",
              "Pronoun",
              "Silent letter",
              "Preposition",
              "Relative pronoun",
              "Demonstrative pronoun",
              "Adverb",
              "Conjunction",
              "Suffix"
            ],
            "exampleActivities": [
              "Noun classification exercises",
              "Tense transformation activities",
              "Comparative and superlative game activities",
              "Punctuation correction exercises",
              "Pronoun substitution drills",
              "Silent letter word searches",
              "Sentence combination using conjunctions",
              "Word formation workshops"
            ],
            "assessmentFocus": [
              "Correct identification and use of different noun types",
              "Accurate tense formation and usage",
              "Appropriate comparative and superlative forms",
              "Correct punctuation and capitalization",
              "Proper pronoun-antecedent agreement",
              "Accurate spelling of words with silent letters",
              "Correct preposition usage",
              "Effective sentence combining with conjunctions"
            ],
            "prerequisiteTopicIds": [
              "g5-eng-study-skills"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-eng-language-use",
            "title": "Language Use",
            "description": "Practical application of English in various contexts including descriptive writing, creative writing, formal letters, poetry, and figurative language.",
            "curriculumStandards": [
              "Effective Communication",
              "Creativity",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Describe people according to their nationality and language",
              "Construct sentences using similes correctly",
              "Use male and female words in sentences",
              "Write a composition of two to three paragraphs",
              "Use synonyms and antonyms in sentences",
              "Write an unguided friendly letter",
              "Recite poems",
              "Draw and write about pictures",
              "Give and follow instructions on how to perform a task",
              "Use homographs in sentences"
            ],
            "keyVocabulary": [
              "Nationality",
              "Language",
              "Simile",
              "Male/female words",
              "Composition",
              "Synonym",
              "Antonym",
              "Friendly letter",
              "Poetry",
              "Rhythm",
              "Rhyme",
              "Instructions",
              "Homograph"
            ],
            "exampleActivities": [
              "Creating identity cards with nationality and language",
              "Simile creation exercises",
              "Descriptive composition writing",
              "Synonym and antonym matching games",
              "Letter writing to pen pals",
              "Poetry recitation performances",
              "Picture description and narrative writing",
              "Instruction-following activities",
              "Homograph sentence construction"
            ],
            "assessmentFocus": [
              "Accurate description of nationalities and languages",
              "Effective use of similes",
              "Well-organized multi-paragraph compositions",
              "Appropriate use of synonyms and antonyms",
              "Proper friendly letter format and content",
              "Expressive poetry recitation",
              "Clear and detailed picture descriptions",
              "Precise instruction giving and following",
              "Correct homograph usage showing different meanings"
            ],
            "prerequisiteTopicIds": [
              "g5-eng-language-structure"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-african-non-african-groups",
                "description": "Describing people by nationality and language"
              }
            ]
          }
        ]
      },
      {
        "name": "Numerical and Mathematical",
        "topics": [
          {
            "id": "g5-num-sets",
            "title": "Sets and Set Operations",
            "description": "Understanding sets, intersection, and union using Venn diagrams.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Logical thinking"
            ],
            "learningObjectives": [
              "Compare two sets with common members using the intersection symbol",
              "Form a union of two sets"
            ],
            "keyVocabulary": [
              "Sets",
              "Intersection",
              "Union",
              "Venn diagram",
              "Common elements"
            ],
            "exampleActivities": [
              "Grouping learners by sporting activities",
              "Drawing Venn diagrams for intersections and unions",
              "Identifying common elements in sets"
            ],
            "assessmentFocus": [
              "Ability to identify common elements",
              "Correct use of intersection and union symbols",
              "Accurate Venn diagram representation"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-place-value-5-digit",
            "title": "Place Value in 5-Digit Numbers",
            "description": "Understanding place value, ordering, and expanded notation for numbers up to 99,999.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Demonstrate an understanding of place value in 5-digit numbers using meaningful contexts"
            ],
            "keyVocabulary": [
              "Place value",
              "Ordering",
              "Expanded notation",
              "Ascending",
              "Descending"
            ],
            "exampleActivities": [
              "Arranging voter registration numbers in order",
              "Writing numbers in expanded form",
              "Reading and writing 5-digit numbers in words"
            ],
            "assessmentFocus": [
              "Correct ordering of 5-digit numbers",
              "Accurate expanded notation",
              "Proper reading and writing of large numbers"
            ],
            "prerequisiteTopicIds": [
              "g5-num-sets"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-addition-subtraction-5-digit",
            "title": "Addition and Subtraction of 5-Digit Numbers",
            "description": "Performing addition and subtraction operations with 5-digit numbers with and without carrying/borrowing.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Add 5-digit numbers with and without carrying",
              "Subtract 5-digit numbers with and without borrowing"
            ],
            "keyVocabulary": [
              "Addition",
              "Subtraction",
              "Carrying",
              "Borrowing",
              "Algorithm"
            ],
            "exampleActivities": [
              "Adding voter registration numbers from different constituencies",
              "Using different algorithms for addition and subtraction",
              "Real-world problem solving with large numbers"
            ],
            "assessmentFocus": [
              "Accurate computation with carrying",
              "Accurate computation with borrowing",
              "Use of various computational strategies"
            ],
            "prerequisiteTopicIds": [
              "g5-num-place-value-5-digit"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-multiplication-relationships",
            "title": "Multiplicative Relationships",
            "description": "Understanding and expressing multiplicative relationships between quantities, including multiples and factors.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Describe multiplicative relationships between quantities",
              "Demonstrate understanding of multiples of numbers from 2 up to 10"
            ],
            "keyVocabulary": [
              "Multiples",
              "Factors",
              "Product",
              "Multiplication",
              "Common multiples",
              "Lowest common multiple"
            ],
            "exampleActivities": [
              "Identifying multiplicative relationships in real contexts",
              "Building multiplication tables",
              "Finding common multiples and factors"
            ],
            "assessmentFocus": [
              "Correct expression of multiplicative relationships",
              "Accurate identification of multiples up to 1000",
              "Finding lowest common multiples"
            ],
            "prerequisiteTopicIds": [
              "g5-num-addition-subtraction-5-digit"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-fractions-basic",
            "title": "Fractions: Equivalence and Operations",
            "description": "Working with equivalent fractions, adding and subtracting fractions with different denominators using units of measure.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Determine equivalent fractions using meaningful contexts",
              "Add fractions using different units of measure",
              "Subtract fractions using different units of measure"
            ],
            "keyVocabulary": [
              "Fraction",
              "Numerator",
              "Denominator",
              "Equivalent fractions",
              "Units of measure",
              "Addition",
              "Subtraction"
            ],
            "exampleActivities": [
              "Using concrete materials to demonstrate equivalent fractions",
              "Labeling containers as fractions of a liter",
              "Pouring and measuring fractional volumes",
              "Converting units of measure to fractions"
            ],
            "assessmentFocus": [
              "Identification of equivalent fractions",
              "Accurate addition of fractions with different denominators",
              "Accurate subtraction of fractions with different denominators",
              "Conversion between units of measure and fractions"
            ],
            "prerequisiteTopicIds": [
              "g5-num-multiplication-relationships"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g5-sci-measurement",
                "description": "Using units of measure in practical contexts"
              }
            ]
          },
          {
            "id": "g5-num-angles-triangles",
            "title": "Angles and Triangles",
            "description": "Measuring, constructing, and working with angles and triangles including calculating interior angle sums.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Scientific and technological skills"
            ],
            "learningObjectives": [
              "Measure and construct angles up to 180Âº using a protractor",
              "Construct triangles given acute or right angles and side measurements",
              "Find the sum of interior angles of a triangle"
            ],
            "keyVocabulary": [
              "Angle",
              "Acute",
              "Right",
              "Obtuse",
              "Straight",
              "Protractor",
              "Triangle",
              "Interior angles",
              "Isosceles",
              "Equilateral",
              "Right-angled"
            ],
            "exampleActivities": [
              "Measuring angles with protractors",
              "Constructing angles of given sizes",
              "Constructing triangles from specifications",
              "Investigating sum of triangle angles through cutting and tessellation"
            ],
            "assessmentFocus": [
              "Accurate angle measurement",
              "Precise angle construction",
              "Correct triangle construction from given information",
              "Understanding that triangle angles sum to 180Â°"
            ],
            "prerequisiteTopicIds": [
              "g5-num-fractions-basic"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-rounding-estimation",
            "title": "Rounding and Estimation",
            "description": "Rounding numbers to the nearest 1000 and applying estimation skills in relevant contexts.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Express numbers to the nearest 1000 in relevant contexts"
            ],
            "keyVocabulary": [
              "Rounding",
              "Estimation",
              "Nearest 1000",
              "Place value"
            ],
            "exampleActivities": [
              "Rounding school population figures",
              "Estimating costs and quantities",
              "Applying rounding to real-world data"
            ],
            "assessmentFocus": [
              "Correct rounding to nearest 1000",
              "Application of rounding in practical contexts"
            ],
            "prerequisiteTopicIds": [
              "g5-num-place-value-5-digit"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-money-management",
            "title": "Money Management",
            "description": "Practical use and management of money in buying, selling, and budgeting situations.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Production and work-related competencies"
            ],
            "learningObjectives": [
              "Demonstrate the use and management of money in practical situations",
              "Demonstrate understanding of multiplication of money in buying and selling",
              "Demonstrate understanding of division involving money"
            ],
            "keyVocabulary": [
              "Money",
              "Budget",
              "Shopping list",
              "Change",
              "Buying",
              "Selling",
              "Price",
              "Cost"
            ],
            "exampleActivities": [
              "Creating shopping lists and estimating costs",
              "Role-playing buying and selling in mock shops",
              "Calculating change",
              "Determining prices of packaged goods",
              "Dividing costs among groups"
            ],
            "assessmentFocus": [
              "Accurate addition and subtraction of money",
              "Correct calculation of change",
              "Appropriate pricing decisions",
              "Accurate multiplication and division with money"
            ],
            "prerequisiteTopicIds": [
              "g5-num-addition-subtraction-5-digit",
              "g5-num-multiplication-relationships"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Creativity and Entrepreneurial",
                "topicId": "g5-ce-business-basics",
                "description": "Determining prices and conducting transactions"
              }
            ]
          },
          {
            "id": "g5-num-measurement-conversions",
            "title": "Measurement and Conversions",
            "description": "Understanding and converting between units of length (cm and m), and calculating volume of cubes and cuboids.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Scientific and technological skills"
            ],
            "learningObjectives": [
              "Demonstrate understanding of conversions from cm to m and from m to cm when reading scales",
              "Describe the volume of a cube and cuboid in terms of the space they occupy"
            ],
            "keyVocabulary": [
              "Length",
              "Metre",
              "Centimetre",
              "Conversion",
              "Volume",
              "Cube",
              "Cuboid",
              "Cubic centimetres"
            ],
            "exampleActivities": [
              "Measuring objects in cm and m",
              "Converting measurements on house plans",
              "Calculating area of cube and cuboid faces",
              "Calculating volume by multiplying area by height"
            ],
            "assessmentFocus": [
              "Accurate conversion between cm and m",
              "Correct volume calculations for cubes and cuboids",
              "Application of conversions to scales and plans"
            ],
            "prerequisiteTopicIds": [
              "g5-num-fractions-basic"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g5-sci-measurement",
                "description": "Practical measurement activities"
              }
            ]
          },
          {
            "id": "g5-num-symmetry-patterns",
            "title": "Symmetry and Patterns",
            "description": "Exploring lines of symmetry, creating symmetrical designs through reflection, and analyzing patterns.",
            "curriculumStandards": [
              "Functional numeracy",
              "Creativity",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Find number of lines of symmetry in objects found in the environment",
              "Create and analyse symmetrical designs by reflecting shape(s)",
              "Create and describe numeric and geometric patterns"
            ],
            "keyVocabulary": [
              "Symmetry",
              "Line of symmetry",
              "Reflection",
              "Mirror line",
              "Pattern",
              "Sequence",
              "Tessellation"
            ],
            "exampleActivities": [
              "Finding lines of symmetry in environmental objects",
              "Creating symmetrical patterns",
              "Reflecting shapes on grid paper",
              "Creating repeating, growing, and decreasing patterns",
              "Identifying numerical sequences in patterns"
            ],
            "assessmentFocus": [
              "Correct identification of lines of symmetry",
              "Accurate reflection of shapes",
              "Creation of symmetrical designs",
              "Description and extension of patterns"
            ],
            "prerequisiteTopicIds": [
              "g5-num-angles-triangles"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Creativity and Entrepreneurial",
                "topicId": "g5-ce-design-crafts",
                "description": "Using symmetry and patterns in design"
              }
            ]
          },
          {
            "id": "g5-num-multiplication-large-numbers",
            "title": "Multiplication of Large Numbers",
            "description": "Multiplying 3-digit numbers by 2-digit numbers to obtain products not exceeding 5-digit numbers.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Multiply a 3-digit number by a 2-digit number to obtain a product not exceeding a 5-digit number"
            ],
            "keyVocabulary": [
              "Multiplication",
              "Product",
              "Algorithm",
              "Place value"
            ],
            "exampleActivities": [
              "Solving word problems from manufacturing contexts",
              "Using various multiplication algorithms",
              "Calculating production quantities"
            ],
            "assessmentFocus": [
              "Accurate multiplication resulting in 5-digit products",
              "Correct interpretation of word problems",
              "Use of appropriate operations"
            ],
            "prerequisiteTopicIds": [
              "g5-num-multiplication-relationships"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-mixed-fractions",
            "title": "Mixed Fractions",
            "description": "Adding and subtracting mixed fractions in various contexts.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Add mixed fractions",
              "Subtract mixed fractions"
            ],
            "keyVocabulary": [
              "Mixed fraction",
              "Improper fraction",
              "Whole number",
              "Addition",
              "Subtraction"
            ],
            "exampleActivities": [
              "Identifying mixed fractions on measuring instruments",
              "Adding whole numbers and fractions separately",
              "Converting between mixed and improper fractions",
              "Practical measurement with mixed fractions"
            ],
            "assessmentFocus": [
              "Correct addition of mixed fractions",
              "Correct subtraction of mixed fractions",
              "Conversion between mixed and improper fractions"
            ],
            "prerequisiteTopicIds": [
              "g5-num-fractions-basic"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-coordinate-grid",
            "title": "Coordinate Grid System",
            "description": "Locating objects using a grid system with rows and columns.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Logical thinking"
            ],
            "learningObjectives": [
              "Locate an object using a grid system"
            ],
            "keyVocabulary": [
              "Grid",
              "Rows",
              "Columns",
              "Coordinates",
              "Location"
            ],
            "exampleActivities": [
              "Labeling grids with rows and columns",
              "Locating objects on grids",
              "Describing coordinates of objects",
              "Finding objects using given coordinates"
            ],
            "assessmentFocus": [
              "Accurate object location on grids",
              "Correct description of coordinates",
              "Ability to use coordinates to find objects"
            ],
            "prerequisiteTopicIds": [
              "g5-num-symmetry-patterns"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-decimal-numbers",
            "title": "Decimal Numbers",
            "description": "Understanding place value in decimal numbers, rounding, and operations with decimals up to two decimal places.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Demonstrate understanding of place value in decimal numbers from 0.01 to 0.1",
              "Round decimal numbers to the nearest tenth and unit",
              "Add and subtract decimal numbers up to two decimal places",
              "Convert decimal numbers to fractions and fractions to decimal numbers"
            ],
            "keyVocabulary": [
              "Decimal",
              "Decimal point",
              "Tenth",
              "Hundredth",
              "Place value",
              "Rounding",
              "Conversion"
            ],
            "exampleActivities": [
              "Using abacus to represent decimal place value",
              "Using expanded notation for decimals",
              "Rounding money to nearest 10 cents or Loti",
              "Using number stripes to convert between fractions and decimals",
              "Adding and subtracting with improvised money"
            ],
            "assessmentFocus": [
              "Correct understanding of decimal place value",
              "Accurate rounding of decimals",
              "Correct addition and subtraction with decimals",
              "Accurate conversion between fractions and decimals"
            ],
            "prerequisiteTopicIds": [
              "g5-num-fractions-basic"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-division-large-numbers",
            "title": "Division of Large Numbers",
            "description": "Dividing 4-digit numbers by 2-digit numbers in meaningful contexts.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Divide a 4-digit number by a 2-digit number in meaningful contexts"
            ],
            "keyVocabulary": [
              "Division",
              "Dividend",
              "Divisor",
              "Quotient",
              "Remainder"
            ],
            "exampleActivities": [
              "Division without remainders",
              "Division with remainders",
              "Word problems from manufacturing and monetary contexts",
              "Interpreting scenarios to formulate numerical statements"
            ],
            "assessmentFocus": [
              "Accurate division with and without remainders",
              "Correct interpretation of word problems",
              "Application to real-world contexts"
            ],
            "prerequisiteTopicIds": [
              "g5-num-multiplication-large-numbers"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-fraction-whole-multiplication",
            "title": "Multiplying Fractions by Whole Numbers",
            "description": "Multiplying fractions by whole numbers less than 10.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Multiply a fraction by a whole number less than 10"
            ],
            "keyVocabulary": [
              "Fraction",
              "Whole number",
              "Multiplication",
              "Product",
              "Mixed fraction"
            ],
            "exampleActivities": [
              "Using repeated addition to multiply fractions",
              "Multiplying numerator by whole number",
              "Creating products that result in mixed fractions"
            ],
            "assessmentFocus": [
              "Accurate multiplication of fractions by whole numbers",
              "Correct conversion to mixed fractions when needed"
            ],
            "prerequisiteTopicIds": [
              "g5-num-mixed-fractions"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-num-data-handling",
            "title": "Data Collection and Analysis",
            "description": "Collecting data through surveys, organizing it in charts and tables, and measuring temperature changes over time.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Scientific and technological skills"
            ],
            "learningObjectives": [
              "Collect data by conducting a survey",
              "Measure and record temperature changes over a period of time"
            ],
            "keyVocabulary": [
              "Data",
              "Survey",
              "Bar chart",
              "Table",
              "Temperature",
              "Thermometer",
              "Degree Celsius"
            ],
            "exampleActivities": [
              "Conducting surveys on environmental issues",
              "Organizing data in tables and charts",
              "Measuring water temperature at intervals",
              "Recording and comparing findings"
            ],
            "assessmentFocus": [
              "Appropriate data collection methods",
              "Accurate organization and display of data",
              "Correct interpretation of data",
              "Accurate temperature measurement and recording"
            ],
            "prerequisiteTopicIds": [
              "g5-num-coordinate-grid"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g5-sci-measurement",
                "description": "Using thermometers to measure temperature"
              }
            ]
          }
        ]
      },
      {
        "name": "Scientific and Technological",
        "topics": [
          {
            "id": "g5-sci-measurement",
            "title": "Scientific Measurement",
            "description": "Using scientific instruments to measure temperature, mass, and rainfall accurately.",
            "curriculumStandards": [
              "Scientific and technological skills",
              "Problem-solving",
              "Functional numeracy"
            ],
            "learningObjectives": [
              "Measure temperature using a thermometer",
              "Measure mass using a pan scale",
              "Measure the amount of rainfall using a rain gauge"
            ],
            "keyVocabulary": [
              "Temperature",
              "Thermometer",
              "Mass",
              "Pan scale",
              "Rainfall",
              "Rain gauge",
              "Measurement",
              "Scale"
            ],
            "exampleActivities": [
              "Using different types of thermometers",
              "Measuring masses of various objects",
              "Setting up and reading a rain gauge",
              "Recording measurements accurately",
              "Visiting weather stations"
            ],
            "assessmentFocus": [
              "Correct use of measuring instruments",
              "Accurate reading of scales",
              "Proper recording of measurements",
              "Understanding of measurement units"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g5-num-measurement-conversions",
                "description": "Units of measurement and conversions"
              }
            ]
          },
          {
            "id": "g5-sci-heat-oxygen",
            "title": "Heat and Oxygen",
            "description": "Understanding sources of heat, effects of heat on matter, and properties of oxygen.",
            "curriculumStandards": [
              "Scientific and technological skills",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Identify sources of heat",
              "Demonstrate the effects of heat on solids and liquids",
              "Demonstrate that oxygen supports burning, life and causes rust"
            ],
            "keyVocabulary": [
              "Heat",
              "Source",
              "Expansion",
              "Oxygen",
              "Combustion",
              "Respiration",
              "Oxidation",
              "Rust"
            ],
            "exampleActivities": [
              "Identifying heat sources in the environment",
              "Heating solids and liquids to observe expansion",
              "Conducting experiments with candles and jars",
              "Observing rusting of iron nails",
              "Testing oxygen's role in supporting life"
            ],
            "assessmentFocus": [
              "Identification of various heat sources",
              "Observation and explanation of heat effects",
              "Understanding of oxygen's role in combustion, respiration, and oxidation",
              "Proper recording of experimental observations"
            ],
            "prerequisiteTopicIds": [
              "g5-sci-measurement"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-sci-food-preparation",
            "title": "Food Preparation and Nutrition",
            "description": "Preparing green leafy vegetables and eggs, understanding food nutrients, their sources and functions, and learning about deficiency diseases.",
            "curriculumStandards": [
              "Health and healthy living",
              "Scientific and technological skills",
              "Production and work-related competencies"
            ],
            "learningObjectives": [
              "Prepare green leafy vegetables",
              "Prepare eggs",
              "Identify food nutrients, their sources and functions",
              "Explain signs, symptoms and treatment of deficiency diseases"
            ],
            "keyVocabulary": [
              "Nutrients",
              "Carbohydrates",
              "Proteins",
              "Fats",
              "Balanced diet",
              "Deficiency diseases",
              "Marasmus",
              "Kwashiorkor",
              "Cooking",
              "Preparation"
            ],
            "exampleActivities": [
              "Following recipes to prepare vegetables",
              "Preparing soft-boiled, hard-boiled, and scrambled eggs",
              "Sorting foods by nutrient type",
              "Matching nutrients with their functions",
              "Researching deficiency diseases at health centers"
            ],
            "assessmentFocus": [
              "Correct preparation techniques",
              "Proper use of kitchen equipment",
              "Identification of food nutrients and sources",
              "Understanding of deficiency disease symptoms and prevention"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-health-hygiene",
                "description": "Health and hygiene practices"
              }
            ]
          },
          {
            "id": "g5-sci-diseases",
            "title": "Human and Animal Diseases",
            "description": "Understanding infectious and non-infectious diseases in humans, and common diseases of farm animals.",
            "curriculumStandards": [
              "Health and healthy living",
              "Scientific and technological skills",
              "Awareness of self and others"
            ],
            "learningObjectives": [
              "Explain non-infectious diseases",
              "Explain the spread of infectious diseases",
              "Describe common diseases of ruminants and their control",
              "Describe common diseases of pigs and their control",
              "Describe common diseases of equines and their control",
              "Describe common diseases of rabbits and their control",
              "Demonstrate proper ways of controlling crop diseases"
            ],
            "keyVocabulary": [
              "Infectious",
              "Non-infectious",
              "Asthma",
              "Ulcer",
              "Arthritis",
              "Swine flu",
              "Pneumonia",
              "Diphtheria",
              "Bloat",
              "Tuberculosis",
              "Foot rot",
              "Mange",
              "Prevention",
              "Control"
            ],
            "exampleActivities": [
              "Visiting health centers to research diseases",
              "Identifying signs and symptoms of diseases",
              "Visiting veterinary clinics and farms",
              "Examining affected crops in gardens",
              "Demonstrating disease control methods"
            ],
            "assessmentFocus": [
              "Correct identification of disease types",
              "Understanding of disease transmission",
              "Knowledge of prevention and treatment methods",
              "Ability to identify diseased plants and animals"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-health-safety",
                "description": "Disease prevention and health promotion"
              }
            ]
          },
          {
            "id": "g5-sci-hygiene-cleaning",
            "title": "Hygiene and Cleaning Practices",
            "description": "Understanding good hygiene practices, washing and finishing clothes, protective clothing, and cleaning methods.",
            "curriculumStandards": [
              "Health and healthy living",
              "Production and work-related competencies",
              "Environmental adaptation"
            ],
            "learningObjectives": [
              "Describe good hygiene practices critical to health and self-esteem",
              "Wash and finish clothes",
              "Explain the importance of protective clothing",
              "Demonstrate proper ways of sweeping and dusting",
              "Demonstrate proper ways of cleaning plastic and enamel ware"
            ],
            "keyVocabulary": [
              "Hygiene",
              "Self-esteem",
              "Washing",
              "Ironing",
              "Protective clothing",
              "Sweeping",
              "Dusting",
              "Cleaning"
            ],
            "exampleActivities": [
              "Discussing hygiene practices and self-esteem",
              "Sorting and washing clothes",
              "Ironing and finishing garments",
              "Identifying protective clothing for different activities",
              "Practicing sweeping and dusting techniques",
              "Washing plastic and enamel utensils"
            ],
            "assessmentFocus": [
              "Understanding of hygiene-self-esteem connection",
              "Correct washing and ironing techniques",
              "Identification of appropriate protective clothing",
              "Proper cleaning methods for different surfaces and materials"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-sci-water",
            "title": "Water Properties and Conservation",
            "description": "Understanding properties of water, methods of cleaning water, and ways to conserve water sources.",
            "curriculumStandards": [
              "Environmental adaptation and sustainable development",
              "Scientific and technological skills",
              "Health and healthy living"
            ],
            "learningObjectives": [
              "Demonstrate properties of water",
              "Explain ways of cleaning water",
              "Explain proper ways of conserving water sources"
            ],
            "keyVocabulary": [
              "Properties",
              "Magnifier",
              "Freezing",
              "Melting",
              "Evaporation",
              "Condensation",
              "Boiling",
              "Filtration",
              "Decantation",
              "Distillation",
              "Conservation",
              "Wetlands",
              "Springs",
              "Wells"
            ],
            "exampleActivities": [
              "Using water as a magnifier",
              "Observing phase changes of water",
              "Conducting cleaning experiments (boiling, filtering, distilling)",
              "Creating wetland models",
              "Undertaking mini-projects to protect water sources"
            ],
            "assessmentFocus": [
              "Identification of water properties",
              "Understanding of water cleaning methods",
              "Differentiation between clean and safe water",
              "Knowledge of water conservation methods",
              "Demonstration of water source protection"
            ],
            "prerequisiteTopicIds": [
              "g5-sci-heat-oxygen"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-sci-agriculture",
            "title": "Agricultural Practices",
            "description": "Understanding farm implements, planting methods, crop care, and identification of leguminous crop diseases.",
            "curriculumStandards": [
              "Production and work-related competencies",
              "Environmental adaptation and sustainable development",
              "Scientific and technological skills"
            ],
            "learningObjectives": [
              "Explain the use of farm implements",
              "Describe different methods of planting crops",
              "Demonstrate proper ways of watering vegetables",
              "Identify leguminous crop diseases"
            ],
            "keyVocabulary": [
              "Farm implements",
              "Disc harrow",
              "Ox-drawn plough",
              "Planter",
              "Cultivator",
              "Monocropping",
              "Intercropping",
              "Crop rotation",
              "Spacing",
              "Watering",
              "Leguminous crops",
              "Powdery mildew",
              "Blight",
              "Rust"
            ],
            "exampleActivities": [
              "Drawing and labeling farm implements",
              "Visiting agricultural departments",
              "Practicing different planting methods",
              "Demonstrating proper watering techniques",
              "Observing and identifying crop diseases"
            ],
            "assessmentFocus": [
              "Identification and functions of farm implements",
              "Understanding of different planting methods",
              "Proper watering techniques",
              "Recognition of leguminous crop diseases and control measures"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-sci-geography",
            "title": "Geography and Environment",
            "description": "Understanding lines of latitude and longitude, cardinal points, soil erosion control, and climate.",
            "curriculumStandards": [
              "Environmental adaptation and sustainable development",
              "Scientific and technological skills",
              "Awareness of self and others"
            ],
            "learningObjectives": [
              "Identify lines of latitude and longitude",
              "Identify the cardinal points",
              "Describe ways of controlling soil erosion",
              "Describe Lesotho's climatic conditions"
            ],
            "keyVocabulary": [
              "Latitude",
              "Longitude",
              "Meridian",
              "Equator",
              "Greenwich meridian",
              "Cardinal points",
              "North",
              "South",
              "East",
              "West",
              "Soil erosion",
              "Climate",
              "Weather",
              "Highlands",
              "Lowlands"
            ],
            "exampleActivities": [
              "Locating lines on globes and maps",
              "Drawing maps showing latitude and longitude",
              "Identifying erosion sites in the environment",
              "Implementing erosion control projects",
              "Visiting weather stations",
              "Comparing highland and lowland climates"
            ],
            "assessmentFocus": [
              "Correct identification of latitude and longitude lines",
              "Understanding of cardinal points",
              "Knowledge of soil erosion causes and control",
              "Understanding of Lesotho's climate in different regions"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-nation-state",
                "description": "Geographic features of Lesotho"
              }
            ]
          },
          {
            "id": "g5-sci-biology",
            "title": "Plant and Animal Biology",
            "description": "Understanding plant structures (leaves, stems, flowers), animal classification, animal behavior, and species conservation.",
            "curriculumStandards": [
              "Scientific and technological skills",
              "Environmental adaptation and sustainable development",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Identify the external structure of a simple leaf",
              "Identify the internal structure of a typical flower and the functions of its parts",
              "Identify different types of stems in terms of their structure",
              "Classify insects and animals with segmented bodies according to number of legs and main body parts",
              "Explain how animals protect themselves against enemies or unfavourable conditions",
              "Preserve animals and plants",
              "Identify endangered species in their local environment",
              "Explain ways of conserving endangered species"
            ],
            "keyVocabulary": [
              "Leaf",
              "Midrib",
              "Blade",
              "Veins",
              "Flower",
              "Stamen",
              "Pistil",
              "Stem",
              "Climber",
              "Runner",
              "Bulb",
              "Tuber",
              "Insects",
              "Segmented body",
              "Camouflage",
              "Hibernation",
              "Migration",
              "Preservation",
              "Mounting",
              "Herbarium",
              "Endangered species",
              "Conservation"
            ],
            "exampleActivities": [
              "Collecting and examining leaves",
              "Dissecting flowers to identify parts",
              "Classifying plant stems",
              "Collecting and classifying insects",
              "Observing animal defense mechanisms",
              "Preserving specimens by mounting and herbarium methods",
              "Investigating endangered species",
              "Establishing botanical gardens"
            ],
            "assessmentFocus": [
              "Correct identification of plant structures",
              "Understanding of flower parts and functions",
              "Classification of stems and insects",
              "Knowledge of animal protection strategies",
              "Proper preservation techniques",
              "Identification of endangered species",
              "Understanding of conservation methods"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-sci-human-body",
            "title": "Human Body Systems",
            "description": "Understanding the structure and functions of the tooth, eye, ear, and skeletal system.",
            "curriculumStandards": [
              "Health and healthy living",
              "Scientific and technological skills",
              "Awareness of self and others"
            ],
            "learningObjectives": [
              "Describe the structure and functions of parts the tooth, eye and ear",
              "Describe the basic structure and functions of the skeletal system"
            ],
            "keyVocabulary": [
              "Tooth",
              "Milk teeth",
              "Permanent teeth",
              "Eye",
              "Ear",
              "Skeletal system",
              "Bones",
              "Joints",
              "Ball and socket joint",
              "Hinge joint"
            ],
            "exampleActivities": [
              "Drawing and labeling body parts",
              "Identifying types of teeth and their functions",
              "Studying models of eye and ear",
              "Examining bone specimens",
              "Demonstrating different joint movements"
            ],
            "assessmentFocus": [
              "Correct identification of body part structures",
              "Understanding of functions of different parts",
              "Accurate drawing and labeling",
              "Knowledge of skeletal system divisions and functions"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-self-awareness",
                "description": "Understanding body changes and development"
              }
            ]
          },
          {
            "id": "g5-sci-life-skills-health",
            "title": "Life Skills and Health Education",
            "description": "Understanding puberty, sexual health, refusal skills, and personal safety.",
            "curriculumStandards": [
              "Health and healthy living",
              "Awareness of self and others",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Demonstrate an understanding that changes at puberty are normal and natural",
              "Explain that forced sex is a crime regardless of social norms and media messages",
              "Demonstrate an understanding of how refusal skills can be used to protect one against coercive sex"
            ],
            "keyVocabulary": [
              "Puberty",
              "Physical changes",
              "Emotional changes",
              "Forced sex",
              "Coercive sex",
              "Refusal skills",
              "Assertiveness",
              "Rights",
              "Consent"
            ],
            "exampleActivities": [
              "Discussing physical and emotional changes at puberty",
              "Analyzing case studies on sexual coercion",
              "Role-playing refusal scenarios",
              "Creating information posters",
              "Discussing media influences"
            ],
            "assessmentFocus": [
              "Understanding that puberty changes are normal",
              "Knowledge that forced sex is a crime",
              "Ability to demonstrate refusal skills",
              "Recognition of coercive situations"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-rights-protection",
                "description": "Children's rights and protection from abuse"
              }
            ]
          }
        ]
      },
      {
        "name": "Personal, Spiritual and Social",
        "topics": [
          {
            "id": "g5-pss-self-awareness",
            "title": "Self-Awareness and Self-Esteem",
            "description": "Developing self-awareness, self-esteem, critical thinking skills, and understanding personal values.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Critical thinking",
              "Effective communication"
            ],
            "learningObjectives": [
              "Demonstrate self-awareness, self-esteem and critical thinking skills"
            ],
            "keyVocabulary": [
              "Self-awareness",
              "Self-esteem",
              "Values",
              "Rights",
              "Self-image",
              "Relationships"
            ],
            "exampleActivities": [
              "Discussing talents and positive qualities",
              "Self-esteem affirmation exercises",
              "Value clarification activities",
              "Building and breaking relationships exercises",
              "Analyzing how relationships affect rights and self-image"
            ],
            "assessmentFocus": [
              "Identification of positive qualities in self and others",
              "Understanding of factors affecting self-esteem",
              "Knowledge of personal values and their sources",
              "Understanding of relationship impacts on self-image"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-pss-culture-ethnic-groups",
            "title": "Culture of Ethnic Groups in Lesotho",
            "description": "Understanding the culture, beliefs, norms, customs, food, tools and weapons of the San, Sotho, and Nguni ethnic groups.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Cultural identity",
              "Effective communication"
            ],
            "learningObjectives": [
              "Describe the culture of the three main ethnic groups in Lesotho (San, Sotho, Nguni)"
            ],
            "keyVocabulary": [
              "Culture",
              "Ethnic group",
              "San",
              "Sotho",
              "Nguni",
              "Beliefs",
              "Norms",
              "Customs",
              "Taboos",
              "Tools",
              "Weapons"
            ],
            "exampleActivities": [
              "Researching beliefs, norms and customs",
              "Presenting findings on traditional food",
              "Drawing tools and weapons",
              "Educational excursions to historical sites",
              "Discussing cultural similarities and differences"
            ],
            "assessmentFocus": [
              "Knowledge of beliefs, norms, customs and taboos",
              "Understanding of traditional foods",
              "Identification of tools and weapons",
              "Ability to compare cultures"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (Sesotho)",
                "topicId": "g5-ses-social-skills",
                "description": "Basotho cultural practices and traditions"
              }
            ]
          },
          {
            "id": "g5-pss-religions",
            "title": "Religions in Lesotho",
            "description": "Understanding similarities and differences of different religions in Lesotho including Christianity, Islam, Bahai, and African Traditional Religions.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Respect for diversity",
              "Effective communication"
            ],
            "learningObjectives": [
              "Describe similarities and differences of different religions in Lesotho"
            ],
            "keyVocabulary": [
              "Religion",
              "Christianity",
              "Islam",
              "Bahai",
              "African Traditional Religions",
              "Place of worship",
              "Religious practices",
              "Sacred texts"
            ],
            "exampleActivities": [
              "Researching places of worship",
              "Identifying days of worship",
              "Comparing religious practices",
              "Discussing guiding literature",
              "Presenting findings on similarities and differences"
            ],
            "assessmentFocus": [
              "Knowledge of different religions in Lesotho",
              "Understanding of religious practices",
              "Ability to compare and contrast religions",
              "Respect for religious diversity"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-pss-african-non-african-groups",
            "title": "African and Non-African Groups in Lesotho",
            "description": "Identifying African and non-African groups living in Lesotho and their places of origin.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Respect for diversity",
              "Global awareness"
            ],
            "learningObjectives": [
              "State African and non-African groups in Lesotho and their places of origin"
            ],
            "keyVocabulary": [
              "African groups",
              "Non-African groups",
              "Continents",
              "Origin",
              "Diversity"
            ],
            "exampleActivities": [
              "Brainstorming groups living in Lesotho",
              "Sorting groups into African and non-African",
              "Identifying continents on world maps",
              "Matching groups with their continents of origin"
            ],
            "assessmentFocus": [
              "Identification of African and non-African groups",
              "Knowledge of seven continents",
              "Ability to match groups with their origins"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (English)",
                "topicId": "g5-eng-language-use",
                "description": "Describing people by nationality and language"
              }
            ]
          },
          {
            "id": "g5-pss-local-governance",
            "title": "Local Governance Structures",
            "description": "Understanding the structure and functions of chieftaincies, community and urban councils, district councils, and municipalities in Lesotho.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Effective communication",
              "Patriotism"
            ],
            "learningObjectives": [
              "Describe the structure and functions of chieftaincies in Lesotho",
              "Identify the functions of the community and urban councils",
              "Identify functions of District Councils",
              "Identify functions of the municipality"
            ],
            "keyVocabulary": [
              "Chieftaincy",
              "Principal chiefs",
              "Area chiefs",
              "Head chiefs",
              "Community council",
              "Urban council",
              "District Council",
              "District Administrator",
              "Municipality"
            ],
            "exampleActivities": [
              "Drawing governance structures",
              "Matching chiefs with their hierarchy levels",
              "Role-playing council functions",
              "Discussing governance responsibilities"
            ],
            "assessmentFocus": [
              "Understanding of chieftaincy hierarchy",
              "Knowledge of council functions",
              "Ability to explain governance structures"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-pss-roles-responsibilities",
            "title": "Roles and Responsibilities",
            "description": "Understanding personal roles and responsibilities in the village and community.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Responsibility",
              "Effective communication"
            ],
            "learningObjectives": [
              "Describe their roles and responsibilities in the village"
            ],
            "keyVocabulary": [
              "Roles",
              "Responsibilities",
              "Community",
              "Village",
              "Contribution"
            ],
            "exampleActivities": [
              "Brainstorming roles and responsibilities",
              "Role-playing village responsibilities",
              "Writing compositions about roles",
              "Discussing differences between roles and responsibilities"
            ],
            "assessmentFocus": [
              "Understanding of personal roles",
              "Knowledge of responsibilities in the village",
              "Ability to differentiate roles from responsibilities"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-pss-rights-protection",
            "title": "Human Rights and Child Protection",
            "description": "Understanding human rights, children's rights, violations, and various forms of abuse and violence against children.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Critical thinking",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Demonstrate understanding of the notion of violation of human rights",
              "Demonstrate understanding of the consequences of the violation of children's rights on the wellbeing of the individual",
              "Identify various forms of abuse and violence against children"
            ],
            "keyVocabulary": [
              "Human rights",
              "Children's rights",
              "Violation",
              "Abuse",
              "Violence",
              "Physical abuse",
              "Gender-based violence",
              "Early marriage",
              "Protection",
              "Reporting"
            ],
            "exampleActivities": [
              "Brainstorming human rights",
              "Role-playing rights violations",
              "Matching rights with responsibilities",
              "Analyzing case studies on violations",
              "Learning about reporting mechanisms"
            ],
            "assessmentFocus": [
              "Knowledge of human and children's rights",
              "Understanding of violation consequences",
              "Identification of forms of abuse",
              "Knowledge of protection and reporting mechanisms"
            ],
            "prerequisiteTopicIds": [
              "g5-pss-self-awareness"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g5-sci-life-skills-health",
                "description": "Personal safety and protection"
              }
            ]
          },
          {
            "id": "g5-pss-career-development",
            "title": "Career Development and Education",
            "description": "Understanding the role of education in career development and identifying institutions of career training.",
            "curriculumStandards": [
              "Production and work-related competencies",
              "Awareness of self and others",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Describe the role of education in career development",
              "Identify institutions of career training"
            ],
            "keyVocabulary": [
              "Career",
              "Education",
              "Training institutions",
              "Career development",
              "Career preferences"
            ],
            "exampleActivities": [
              "Discussing career preferences",
              "Identifying education requirements for careers",
              "Locating training institutions on maps",
              "Organizing career days",
              "Writing about career aspirations"
            ],
            "assessmentFocus": [
              "Understanding of education's role in careers",
              "Knowledge of training institutions",
              "Ability to match careers with training needs"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-pss-nation-state",
            "title": "Nation and State: Lesotho",
            "description": "Understanding Basotho as a nation and the Kingdom of Lesotho as a state, including relationships with neighboring countries and regional organizations.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Patriotism",
              "Global awareness"
            ],
            "learningObjectives": [
              "Describe Basotho as a nation",
              "Describe the Kingdom of Lesotho as a state",
              "Describe the relationship between the Kingdom of Lesotho and the Republic of South Africa (RSA)",
              "Situate Lesotho within the Southern African Customs Union (SACU) states",
              "Identify signs and symbols of non-governmental organizations in Lesotho"
            ],
            "keyVocabulary": [
              "Nation",
              "State",
              "Independence",
              "Boundaries",
              "Government",
              "SACU",
              "Relationship",
              "Non-governmental organizations",
              "Nationality",
              "Currency"
            ],
            "exampleActivities": [
              "Discussing Basotho clans and nation formation",
              "Identifying boundaries on maps",
              "Drawing and labeling SACU member flags",
              "Discussing relationships with South Africa",
              "Identifying NGO signs and symbols"
            ],
            "assessmentFocus": [
              "Understanding of nation vs. state concepts",
              "Knowledge of Lesotho's independence and boundaries",
              "Understanding of regional relationships",
              "Identification of SACU members and their details",
              "Recognition of NGO symbols"
            ],
            "prerequisiteTopicIds": [
              "g5-pss-culture-ethnic-groups"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-pss-migration-trafficking",
            "title": "Migration and Human Trafficking",
            "description": "Understanding causes of migration and the effects of human trafficking.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Critical thinking",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Describe causes of migration",
              "Describe the effects of human trafficking"
            ],
            "keyVocabulary": [
              "Migration",
              "Human trafficking",
              "Causes",
              "Effects",
              "Vulnerable",
              "Prevention",
              "Protection"
            ],
            "exampleActivities": [
              "Discussing types of migration",
              "Researching migration examples",
              "Role-playing trafficking scenarios",
              "Identifying vulnerable targets",
              "Discussing prevention strategies"
            ],
            "assessmentFocus": [
              "Knowledge of migration causes and types",
              "Understanding of human trafficking effects",
              "Identification of vulnerable groups",
              "Knowledge of prevention methods"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-pss-gender-equality",
            "title": "Gender Equality and Stereotypes",
            "description": "Understanding how gender stereotypes promote gender roles and boundaries, and rejecting myths about the place of girls and boys in society.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Critical thinking",
              "Social justice"
            ],
            "learningObjectives": [
              "Explain how gender stereotypes promote gender roles and gender boundaries",
              "Reject myths relating to the place of girls and boys in society"
            ],
            "keyVocabulary": [
              "Gender",
              "Stereotypes",
              "Gender roles",
              "Gender boundaries",
              "Myths",
              "Facts",
              "Equality",
              "Socialization"
            ],
            "exampleActivities": [
              "Discussing gender stereotypes",
              "Analyzing time spent on activities by gender",
              "Case study analysis on gender stereotyping",
              "Playing 'agree or disagree' games with myths and facts",
              "Writing compositions on myths vs. facts"
            ],
            "assessmentFocus": [
              "Understanding of gender stereotypes",
              "Ability to distinguish myths from facts",
              "Critical thinking about gender roles",
              "Understanding of gender equality"
            ],
            "prerequisiteTopicIds": [
              "g5-pss-self-awareness"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-pss-health-safety",
            "title": "Health and Safety",
            "description": "Understanding emergency response, disease impacts, substance abuse, risky behavior, and accident prevention.",
            "curriculumStandards": [
              "Health and healthy living",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Demonstrate ways of handling everyday emergencies",
              "Describe ways of managing fainting",
              "Describe the health and social impacts of drug, alcohol and substance abuse on people's lives",
              "Apply assertiveness and refusal skills in avoiding abuse of drugs, alcohol and substances",
              "Explain how to avoid situations and behaviour leading to a risk of contracting STIs, including HIV",
              "Explain how to resist negative peer influence to engage in risky behaviour",
              "Demonstrate ways of preventing accidents at home",
              "State effects of human made hazards on people's lives"
            ],
            "keyVocabulary": [
              "Emergency",
              "First aid",
              "Fainting",
              "Substance abuse",
              "Refusal skills",
              "Assertiveness",
              "STIs",
              "HIV",
              "Risky behaviour",
              "Peer pressure",
              "Accidents",
              "Hazards",
              "Prevention"
            ],
            "exampleActivities": [
              "Role-playing emergency responses",
              "Demonstrating first aid techniques",
              "Analyzing substance abuse impacts",
              "Practicing refusal skills",
              "Discussing risky situations and behaviors",
              "Creating accident prevention scenarios",
              "Collecting pictures of hazards and their effects"
            ],
            "assessmentFocus": [
              "Correct emergency response procedures",
              "Understanding of substance abuse impacts",
              "Demonstration of refusal and assertiveness skills",
              "Knowledge of risk avoidance strategies",
              "Understanding of accident prevention",
              "Knowledge of hazard effects"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g5-sci-diseases",
                "description": "Disease prevention and health promotion"
              },
              {
                "subject": "Scientific and Technological",
                "topicId": "g5-sci-life-skills-health",
                "description": "Personal health and safety"
              }
            ]
          }
        ]
      },
      {
        "name": "Creativity and Entrepreneurial",
        "topics": [
          {
            "id": "g5-ce-drawing-painting",
            "title": "Drawing and Painting",
            "description": "Developing drawing skills including measured drawings, portraits, observational sketching, and painting with secondary colors.",
            "curriculumStandards": [
              "Creativity",
              "Aesthetic development",
              "Technical skills"
            ],
            "learningObjectives": [
              "Draw measured drawings",
              "Draw portraits using freehand sketching",
              "Make observational drawings of natural scenes using freehand sketching",
              "Paint using secondary colours"
            ],
            "keyVocabulary": [
              "Measured drawing",
              "Portrait",
              "Freehand sketching",
              "Observational drawing",
              "Primary colors",
              "Secondary colors",
              "Proportions"
            ],
            "exampleActivities": [
              "Measuring and drawing geometric solids",
              "Practicing portrait proportions",
              "Sketching outdoor scenes",
              "Mixing primary colors to create secondary colors",
              "Painting natural scenes"
            ],
            "assessmentFocus": [
              "Accurate measured drawings",
              "Correct facial proportions in portraits",
              "Observational accuracy in sketches",
              "Proper color mixing and application"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-ce-cultural-art",
            "title": "Cultural Art and Printing",
            "description": "Creating portraits depicting different cultures and producing prints using various objects.",
            "curriculumStandards": [
              "Creativity",
              "Cultural awareness",
              "Technical skills"
            ],
            "learningObjectives": [
              "Make portraits depicting three cultures (European, Chinese and Indians)",
              "Use different objects to produce prints"
            ],
            "keyVocabulary": [
              "Culture",
              "Portrait",
              "European",
              "Chinese",
              "Indian",
              "Printing",
              "Bottle prints",
              "Finger prints",
              "Crayon prints"
            ],
            "exampleActivities": [
              "Studying photographs of different cultures",
              "Drawing portraits from models or pictures",
              "Experimenting with bottle, finger, and crayon printing",
              "Creating print patterns"
            ],
            "assessmentFocus": [
              "Cultural accuracy in portraits",
              "Technical skill in printing",
              "Creativity in print designs"
            ],
            "prerequisiteTopicIds": [
              "g5-ce-drawing-painting"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-african-non-african-groups",
                "description": "Understanding different cultural groups"
              }
            ]
          },
          {
            "id": "g5-ce-music-composition",
            "title": "Music and Composition",
            "description": "Using major scales to compose music, performing songs and dances, and composing poems and lyrics.",
            "curriculumStandards": [
              "Creativity",
              "Aesthetic development",
              "Effective communication"
            ],
            "learningObjectives": [
              "Use three major scales to compose music",
              "Perform songs and dances and play musical instruments",
              "Perform local and foreign songs and dance",
              "Compose their own poems and lyrics",
              "Differentiate between the pitch, duration and volume of different sounds from the environment"
            ],
            "keyVocabulary": [
              "Major scale",
              "C major",
              "G major",
              "F major",
              "Composition",
              "Musical instruments",
              "Pitch",
              "Duration",
              "Volume",
              "Lyrics",
              "Poetry",
              "Graphic score"
            ],
            "exampleActivities": [
              "Practicing major scales",
              "Composing simple melodies",
              "Learning to play musical instruments",
              "Performing local and foreign songs",
              "Writing original poems and lyrics",
              "Creating graphic scores for environmental sounds"
            ],
            "assessmentFocus": [
              "Accurate scale performance",
              "Original compositions",
              "Confident performance",
              "Differentiation of sound qualities",
              "Creative lyrics and poetry"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-ce-drama-advertising",
            "title": "Drama and Advertising",
            "description": "Dramatizing stories and advertising products using various methods including cartoons, puppetry, and posters.",
            "curriculumStandards": [
              "Creativity",
              "Effective communication",
              "Entrepreneurial skills"
            ],
            "learningObjectives": [
              "Dramatise read and created stories",
              "Advertise products using different methods"
            ],
            "keyVocabulary": [
              "Dramatization",
              "Characters",
              "Roles",
              "Advertising",
              "Cartoons",
              "Puppetry",
              "Posters",
              "Marketing"
            ],
            "exampleActivities": [
              "Reading and dramatizing stories",
              "Creating original stories for dramatization",
              "Drawing cartoons for advertisements",
              "Making puppets for advertising",
              "Designing advertising posters",
              "Practicing product marketing"
            ],
            "assessmentFocus": [
              "Effective dramatization",
              "Creative storytelling",
              "Variety of advertising methods",
              "Persuasive advertising content"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-ce-design-crafts",
            "title": "Modeling and Design",
            "description": "Using papermache and play dough to make crafts, designing costumes, signs, warning signs, toys and decorative ornaments.",
            "curriculumStandards": [
              "Creativity",
              "Technical skills",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Use paper mache and play dough to make animals and household utensils",
              "Design traditional costumes from other cultures",
              "Design signs and symbols using calligraphy",
              "Design warning signs for dangerous places in their area",
              "Design toys and decorative ornaments"
            ],
            "keyVocabulary": [
              "Paper mache",
              "Play dough",
              "Modeling",
              "Design",
              "Traditional costumes",
              "Calligraphy",
              "Signs",
              "Symbols",
              "Warning signs",
              "Toys",
              "Ornaments"
            ],
            "exampleActivities": [
              "Making paper mache",
              "Modeling animals and utensils",
              "Designing cultural costumes",
              "Practicing calligraphy",
              "Creating warning signs for dangerous locations",
              "Designing and producing toys and ornaments"
            ],
            "assessmentFocus": [
              "Quality of paper mache creations",
              "Cultural accuracy in costume designs",
              "Clarity of calligraphy",
              "Effectiveness of warning signs",
              "Creativity and functionality of toys and ornaments"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-health-safety",
                "description": "Designing warning signs for safety"
              }
            ]
          },
          {
            "id": "g5-ce-ict-skills",
            "title": "ICT Skills",
            "description": "Performing basic word processing functions and drawing graphics in painting programmes.",
            "curriculumStandards": [
              "Scientific and technological skills",
              "Problem-solving",
              "Creativity"
            ],
            "learningObjectives": [
              "Perform basic functions of word processing and draw graphics in a graphics painting programme"
            ],
            "keyVocabulary": [
              "Word processing",
              "Graphics",
              "Bold",
              "Italics",
              "Underline",
              "Font",
              "Spacing",
              "Table",
              "Graphics painting programme"
            ],
            "exampleActivities": [
              "Opening graphics painting programmes",
              "Practicing text formatting",
              "Drawing simple graphics on computer",
              "Coloring graphics",
              "Creating formatted documents"
            ],
            "assessmentFocus": [
              "Correct use of formatting functions",
              "Ability to draw and color graphics",
              "Proper use of software tools"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-ce-games-puzzles",
            "title": "Games and Puzzles",
            "description": "Playing and modifying indigenous and cultural games, and creating word puzzles to address social issues.",
            "curriculumStandards": [
              "Creativity",
              "Critical thinking",
              "Cultural awareness"
            ],
            "learningObjectives": [
              "Depict moral dilemmas in a story",
              "Play advanced versions of indigenous games",
              "Play games of strategy from other cultures",
              "Modify existing board games to suit their situations",
              "Adapt word puzzles to combat substance abuse"
            ],
            "keyVocabulary": [
              "Moral dilemma",
              "Indigenous games",
              "Morabaraba",
              "Liketoana",
              "Chess",
              "Playing cards",
              "Strategy",
              "Modification",
              "Word puzzles",
              "Substance abuse"
            ],
            "exampleActivities": [
              "Dramatizing moral dilemmas",
              "Playing advanced Morabaraba and Liketoana",
              "Learning chess and card games",
              "Modifying board game rules",
              "Creating word puzzles with anti-substance abuse messages"
            ],
            "assessmentFocus": [
              "Understanding of moral dilemmas",
              "Skill in playing games",
              "Creativity in game modification",
              "Effective puzzle creation"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-health-safety",
                "description": "Combating substance abuse through creative activities"
              }
            ]
          },
          {
            "id": "g5-ce-recycling-crafts",
            "title": "Recycling and Crafts",
            "description": "Reusing and recycling materials, and using wire and clay to make crafts for income generation.",
            "curriculumStandards": [
              "Environmental adaptation and sustainable development",
              "Creativity",
              "Entrepreneurial skills"
            ],
            "learningObjectives": [
              "Reuse plastics, tins and bottles to promote sustainable use of resources and generate income",
              "Recycle plastics, tins and bottles to promote sustainable use of resources and income generation",
              "Use wire and clay to make crafts"
            ],
            "keyVocabulary": [
              "Reuse",
              "Recycle",
              "Sustainability",
              "Income generation",
              "Plastics",
              "Tins",
              "Bottles",
              "Wire",
              "Clay",
              "Crafts"
            ],
            "exampleActivities": [
              "Collecting materials for reuse and recycling",
              "Creating useful items from waste materials",
              "Making wire crafts",
              "Making clay crafts",
              "Planning income-generating projects"
            ],
            "assessmentFocus": [
              "Creativity in reusing materials",
              "Understanding of recycling concepts",
              "Quality of wire and clay crafts",
              "Entrepreneurial thinking"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-ce-resources-economics",
            "title": "Resources and Economics",
            "description": "Understanding types of resources, resource management, needs vs. wants, and basic economic concepts.",
            "curriculumStandards": [
              "Production and work-related competencies",
              "Critical thinking",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Explain different types of resources",
              "Classify resources into renewable and non-renewable",
              "Demonstrate ways of protecting and conserving resources",
              "Explain the relationship between needs and resources",
              "Explain the scarcity of resources in relation to people's wants"
            ],
            "keyVocabulary": [
              "Resources",
              "Natural resources",
              "Human-made resources",
              "Human resources",
              "Renewable",
              "Non-renewable",
              "Conservation",
              "Needs",
              "Wants",
              "Scarcity"
            ],
            "exampleActivities": [
              "Identifying and classifying resources",
              "Demonstrating resource conservation",
              "Undertaking mini-projects to protect resources",
              "Matching needs with resources",
              "Analyzing resource scarcity scenarios"
            ],
            "assessmentFocus": [
              "Correct classification of resources",
              "Understanding of conservation methods",
              "Ability to match needs with resources",
              "Understanding of scarcity concept"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g5-ce-business-basics",
            "title": "Business Basics",
            "description": "Understanding producers, providers, consumers, pricing, and markets.",
            "curriculumStandards": [
              "Production and work-related competencies",
              "Entrepreneurial skills",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Distinguish between producers and providers of goods and services",
              "Describe a consumer of goods and services",
              "Determine the price of goods and services",
              "Explain two different types of market"
            ],
            "keyVocabulary": [
              "Producer",
              "Provider",
              "Consumer",
              "Goods",
              "Services",
              "Price",
              "Pricing",
              "Market",
              "Face-to-face market",
              "Faceless market"
            ],
            "exampleActivities": [
              "Identifying producers and providers",
              "Role-playing buying and selling",
              "Pricing goods and services",
              "Setting up mock markets",
              "Comparing market types"
            ],
            "assessmentFocus": [
              "Understanding of economic roles",
              "Appropriate pricing decisions",
              "Knowledge of market types",
              "Practical business skills"
            ],
            "prerequisiteTopicIds": [
              "g5-ce-resources-economics"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g5-num-money-management",
                "description": "Money management and transactions"
              }
            ]
          },
          {
            "id": "g5-ce-vandalism-awareness",
            "title": "Vandalism Awareness",
            "description": "Identifying effects of vandalism in daily life and developing solutions.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Problem-solving",
              "Responsibility"
            ],
            "learningObjectives": [
              "Identify effects of vandalism in daily-life"
            ],
            "keyVocabulary": [
              "Vandalism",
              "Property",
              "Effects",
              "Prevention",
              "Responsibility"
            ],
            "exampleActivities": [
              "Identifying vandalism on personal, school, and public property",
              "Discussing effects of vandalism",
              "Creating role plays on combating vandalism",
              "Developing prevention strategies"
            ],
            "assessmentFocus": [
              "Recognition of vandalism instances",
              "Understanding of vandalism effects",
              "Practical prevention strategies",
              "Demonstration of responsible values"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g5-pss-roles-responsibilities",
                "description": "Community responsibility and care for property"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "grade": "6",
    "subjects": [
      {
        "name": "Linguistic and Literary (Sesotho)",
        "topics": [
          {
            "id": "g6-ses-study-skills",
            "title": "Mekhoa ea ho ithuta (Study Skills)",
            "description": "Development of oral communication, reading comprehension, writing skills, and debate techniques in Sesotho.",
            "curriculumStandards": [
              "Effective Communication",
              "Critical thinking",
              "Learning to learn"
            ],
            "learningObjectives": [
              "Bua ka boitÅ¡epo ka taba eo ba sa itokisetsang eona (Speak confidently on an unprepared topic)",
              "Sebelisa buka ka nepo ho ipatlela litaba (Use a book correctly to find information)",
              "Bala lipale tse fanang ka tsebo (Read informative stories)",
              "Bala buka ea pale ka kutloisiso (Read a story book with understanding)",
              "Ngola papatso (Write advertisements)",
              "Qhaqholla thothokiso ka kutloisiso (Recite poetry with understanding)",
              "Phehisana ka taba (Debate a topic)",
              "Itokisetsa liphoso moo ba ngotseng (Edit their own writing)"
            ],
            "keyVocabulary": [
              "Moqoqo",
              "Lenaneo la litaba",
              "Linyenyeletso",
              "Sesosa",
              "Litholoana",
              "Papatso",
              "Thothokiso",
              "Phehisano"
            ],
            "exampleActivities": [
              "Unprepared speeches on given topics",
              "Using table of contents to locate information",
              "Reading and summarizing informative stories",
              "Creating advertisements for products",
              "Reciting poetry with proper expression",
              "Participating in structured debates",
              "Peer editing of written work"
            ],
            "assessmentFocus": [
              "Ability to speak confidently without preparation",
              "Correct use of book features to find information",
              "Identification of cause and effect in stories",
              "Creation of effective advertisements",
              "Understanding and expression of poetry",
              "Ability to argue for and against a proposition",
              "Self-correction of spelling and punctuation errors"
            ],
            "prerequisiteTopicIds": [
              "g6-ses-study-skills"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-ses-social-skills",
            "title": "Phelisano le bochaba (Social Skills and Culture)",
            "description": "Understanding and practicing Basotho cultural norms, traditions, greetings, totems, riddles, folktales, games, food, and animal descriptions.",
            "curriculumStandards": [
              "Awareness of Self and Others",
              "Cultural identity",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Lumelisa batho ho latela tlhahlamano ea bona ha ba etsa puo (Greet people according to their status when making speeches)",
              "BontÅ¡a tlhompho lipuong le liketsong (Show respect in speech and actions)",
              "Thella ka botlalo (Recite praise poetry completely)",
              "Lokolisa bohlokoa ba baamani (Explain the importance of relatives)",
              "Lothana ka lilotho tseo likarabo tsa tsona e leng limela (Recite riddles with plant answers)",
              "Pheta tÅ¡omo e khothaletsang tÅ¡ebelisano â€Ÿmoho (Tell a folktale that encourages cooperation)",
              "Bapala lipapali le lipina tsa bochaba (Play traditional games and songs)",
              "Hlalosa lijo tsa Sesotho (Describe Sesotho food)",
              "Sebelisa mebala ho hlalosa liphoofolo (Use colors to describe animals)",
              "Hlalosa liphoofolo ka matÅ¡oao a tsona (Describe animals by their markings)",
              "BontÅ¡a kutloisiso ea liketso tse supang ho ba le boikarabello (Show understanding of actions that demonstrate responsibility)"
            ],
            "keyVocabulary": [
              "Tlhahlamano",
              "Tlhompho",
              "Liboko",
              "Baamani",
              "Lilotho",
              "TÅ¡omo",
              "Lipapali",
              "Mebala ea liphoofolo",
              "MatÅ¡oao",
              "Boikarabello"
            ],
            "exampleActivities": [
              "Role-playing greetings for different social contexts",
              "Reciting clan praise poems (liboko)",
              "Playing riddle games with plant-based answers",
              "Storytelling: Phokojoe o hana ho fata seliba",
              "Traditional games and songs performance",
              "Food preparation demonstrations",
              "Describing animal colors and markings",
              "Dramatizing responsible and irresponsible behaviors"
            ],
            "assessmentFocus": [
              "Appropriate greeting protocols for different contexts",
              "Complete recitation of praise poetry",
              "Knowledge of family relationships and their importance",
              "Participation in traditional games and songs",
              "Accurate description of traditional foods",
              "Use of color terms for animals",
              "Recognition of actions showing responsibility"
            ],
            "prerequisiteTopicIds": [
              "g6-ses-social-skills"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-culture-ethnic-groups",
                "description": "Understanding Basotho culture and traditions"
              }
            ]
          },
          {
            "id": "g6-ses-language-use",
            "title": "TÅ¡ebeliso ea puo (Language Use)",
            "description": "Practical application of Sesotho language including antonyms, synonyms, homonyms, idioms, weather terms, and formal letter writing.",
            "curriculumStandards": [
              "Effective Communication",
              "Functional literacy"
            ],
            "learningObjectives": [
              "Sebelisa mantsoe a hananang lipolelong ka nepo (Use antonyms correctly in sentences)",
              "Sebelisa mantsoe a tÅ¡oanang ka moelelo (Use synonyms)",
              "Sebelisa mantsoe a nang le meelelo e fapaneng (Use words with multiple meanings)",
              "Sebelisa maelana lipolelong (Use idioms in sentences)",
              "Hlalosa maemo a fapaneng a leholimo/a mocheso (Describe different weather/temperature conditions)",
              "Ngola lengolo la setsoalle ka sepheo sa ho kholisa (Write a persuasive friendly letter)",
              "Ngola moqoqo (Write a composition)"
            ],
            "keyVocabulary": [
              "Mantsoe a hananang",
              "Mantsoe a tÅ¡oanang ka moelelo",
              "Maelana",
              "Maemo a leholimo",
              "Lengolo la setsoalle",
              "Moqoqo"
            ],
            "exampleActivities": [
              "Matching exercises for antonyms and synonyms",
              "Creating sentences with idioms",
              "Weather observation and description",
              "Writing persuasive letters for specific purposes",
              "Composing multi-paragraph essays"
            ],
            "assessmentFocus": [
              "Correct use of antonyms and synonyms in context",
              "Appropriate use of idioms",
              "Accurate description of weather conditions",
              "Proper structure and format of friendly letters",
              "Well-organized composition with introduction, body, and conclusion"
            ],
            "prerequisiteTopicIds": [
              "g6-ses-language-use"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g6-sci-weather-measurement",
                "description": "Describing weather and temperature conditions"
              }
            ]
          },
          {
            "id": "g6-ses-language-structure",
            "title": "Sebopeho sa puo (Language Structure)",
            "description": "Grammar, sentence structure, parts of speech, and morphology in Sesotho including verbs, nouns, adjectives, pronouns, conjunctions, and sound patterns.",
            "curriculumStandards": [
              "Functional literacy",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Qolla sere se bontÅ¡ang molumo, monko le â€Ÿmala (Identify ideophones showing sound, smell and color)",
              "Sebelisa lereho e le moetsi kapa moetsuoa polelong (Use nouns as subject or object in sentences)",
              "Sebelisa mareho-â€Ÿmoka ka nepo lipolelong (Use collective nouns correctly)",
              "Sebelisa seemeli-tu le tumela ka nepo lipolelong (Use subject concords and pronouns correctly)",
              "Bopa mantsoe ba sebelisa melumo/litlhaku tsa Sesotho ka nepo (Form words using Sesotho sounds/letters correctly)",
              "Sebelisa sehokelo lipolelong (Use conjunctions in sentences)",
              "Bopa lipolelo tse bontÅ¡ang bonako (Construct sentences showing tense)",
              "Sebelisa sehlakisi sa â€Ÿmala le sa palo (Use color and number adjectives)",
              "Sebelisa lipoleoana tse bontÅ¡ang nako (Use time expressions)",
              "Sebelisa leeketsi la sebaka (Use locative adverbs)"
            ],
            "keyVocabulary": [
              "Sere",
              "Lereho",
              "Moetsi",
              "Moetsuoa",
              "Mareho-â€Ÿmoka",
              "Seemeli-tu",
              "Tumela",
              "Sehokelo",
              "Bonako",
              "Sehlakisi",
              "Leeketsi la sebaka"
            ],
            "exampleActivities": [
              "Identifying and using ideophones in descriptive writing",
              "Subject-object noun exercises",
              "Sentence construction with various tenses",
              "Using collective nouns appropriately",
              "Pronoun and concord agreement exercises",
              "Conjunction practice in complex sentences",
              "Time and place adverbial phrases in context"
            ],
            "assessmentFocus": [
              "Correct identification and use of ideophones",
              "Proper noun usage as subject and object",
              "Agreement of pronouns and concords",
              "Accurate spelling with Sesotho sound patterns",
              "Correct tense formation",
              "Appropriate use of adjectives and adverbs",
              "Proper conjunction usage in compound sentences"
            ],
            "prerequisiteTopicIds": [
              "g6-ses-language-structure"
            ],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Linguistic and Literary (English)",
        "topics": [
          {
            "id": "g6-eng-study-skills",
            "title": "Study Skills",
            "description": "Developing listening comprehension, information literacy, reading strategies, editing skills, dictionary use, and public speaking abilities in English.",
            "curriculumStandards": [
              "Effective Communication",
              "Learning to learn",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Listen for information and respond appropriately",
              "Use the author, title and table of contents to describe a book",
              "Read for specific information",
              "Read for enjoyment",
              "Edit their own piece of writing",
              "Use a dictionary effectively",
              "Make a speech within a limited time without preparation",
              "Defend their point of view in a debate"
            ],
            "keyVocabulary": [
              "Author",
              "Title",
              "Table of contents",
              "Prediction",
              "Summary",
              "Editing",
              "Alphabetical order",
              "Debate",
              "Motion"
            ],
            "exampleActivities": [
              "Listening to oral texts and answering comprehension questions",
              "Book exploration using covers and tables of contents",
              "Reading passages to find specific information",
              "Independent reading for pleasure",
              "Peer editing exercises",
              "Dictionary scavenger hunts",
              "Impromptu speeches on random topics",
              "Structured classroom debates"
            ],
            "assessmentFocus": [
              "Ability to listen attentively and extract key information",
              "Correct use of book features to locate information",
              "Accurate identification of specific details in texts",
              "Self-editing for spelling and punctuation errors",
              "Effective dictionary navigation",
              "Confident unprepared speaking",
              "Logical argumentation in debates"
            ],
            "prerequisiteTopicIds": [
              "g6-eng-study-skills"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-eng-language-structure",
            "title": "Language Structure",
            "description": "Grammar fundamentals including nouns, verbs, tenses, adjectives, punctuation, articles, pronouns, prepositions, adverbs, conjunctions, and word formation.",
            "curriculumStandards": [
              "Functional literacy",
              "Effective Communication"
            ],
            "learningObjectives": [
              "Construct sentences using proper and common nouns",
              "Construct sentences using compound nouns",
              "Construct sentences using singular and plural forms of nouns",
              "Use past, present and future tenses correctly in sentences",
              "Use comparative and superlative forms to describe things",
              "Use punctuation marks and place capital letters appropriately",
              "Use a, an and the correctly in sentences",
              "Use pronouns appropriately in sentences",
              "Read and use words with silent letters properly",
              "Spell and pronounce selected words correctly",
              "Use prepositions of place correctly in sentences",
              "Use relative and demonstrative pronouns correctly",
              "Use adverbs of time, manner and place in sentences",
              "Combine simple sentences using conjunctions",
              "Form nouns from verbs using suffixes"
            ],
            "keyVocabulary": [
              "Proper noun",
              "Common noun",
              "Compound noun",
              "Singular",
              "Plural",
              "Tense",
              "Comparative",
              "Superlative",
              "Punctuation",
              "Article",
              "Pronoun",
              "Silent letter",
              "Preposition",
              "Relative pronoun",
              "Demonstrative pronoun",
              "Adverb",
              "Conjunction",
              "Suffix"
            ],
            "exampleActivities": [
              "Noun classification exercises",
              "Tense transformation activities",
              "Comparative and superlative game activities",
              "Punctuation correction exercises",
              "Pronoun substitution drills",
              "Silent letter word searches",
              "Sentence combination using conjunctions",
              "Word formation workshops"
            ],
            "assessmentFocus": [
              "Correct identification and use of different noun types",
              "Accurate tense formation and usage",
              "Appropriate comparative and superlative forms",
              "Correct punctuation and capitalization",
              "Proper pronoun-antecedent agreement",
              "Accurate spelling of words with silent letters",
              "Correct preposition usage",
              "Effective sentence combining with conjunctions"
            ],
            "prerequisiteTopicIds": [
              "g6-eng-language-structure"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-eng-language-use",
            "title": "Language Use",
            "description": "Practical application of English in various contexts including descriptive writing, creative writing, formal letters, poetry, and figurative language.",
            "curriculumStandards": [
              "Effective Communication",
              "Creativity",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Describe people according to their nationality and language",
              "Construct sentences using similes correctly",
              "Use male and female words in sentences",
              "Write a composition of two to three paragraphs",
              "Use synonyms and antonyms in sentences",
              "Write an unguided friendly letter",
              "Recite poems",
              "Draw and write about pictures",
              "Give and follow instructions on how to perform a task",
              "Use homographs in sentences"
            ],
            "keyVocabulary": [
              "Nationality",
              "Language",
              "Simile",
              "Male/female words",
              "Composition",
              "Synonym",
              "Antonym",
              "Friendly letter",
              "Poetry",
              "Rhythm",
              "Rhyme",
              "Instructions",
              "Homograph"
            ],
            "exampleActivities": [
              "Creating identity cards with nationality and language",
              "Simile creation exercises",
              "Descriptive composition writing",
              "Synonym and antonym matching games",
              "Letter writing to pen pals",
              "Poetry recitation performances",
              "Picture description and narrative writing",
              "Instruction-following activities",
              "Homograph sentence construction"
            ],
            "assessmentFocus": [
              "Accurate description of nationalities and languages",
              "Effective use of similes",
              "Well-organized multi-paragraph compositions",
              "Appropriate use of synonyms and antonyms",
              "Proper friendly letter format and content",
              "Expressive poetry recitation",
              "Clear and detailed picture descriptions",
              "Precise instruction giving and following",
              "Correct homograph usage showing different meanings"
            ],
            "prerequisiteTopicIds": [
              "g6-eng-language-use"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-african-non-african-groups",
                "description": "Describing people by nationality and language"
              }
            ]
          }
        ]
      },
      {
        "name": "Numerical and Mathematical",
        "topics": [
          {
            "id": "g6-num-sets",
            "title": "Sets and Set Operations",
            "description": "Understanding sets, intersection, and union using Venn diagrams.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Logical thinking"
            ],
            "learningObjectives": [
              "Compare two sets with common members using the intersection symbol",
              "Form a union of two sets"
            ],
            "keyVocabulary": [
              "Sets",
              "Intersection",
              "Union",
              "Venn diagram",
              "Common elements"
            ],
            "exampleActivities": [
              "Grouping learners by sporting activities",
              "Drawing Venn diagrams for intersections and unions",
              "Identifying common elements in sets"
            ],
            "assessmentFocus": [
              "Ability to identify common elements",
              "Correct use of intersection and union symbols",
              "Accurate Venn diagram representation"
            ],
            "prerequisiteTopicIds": [
              "g6-num-sets"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-place-value-5-digit",
            "title": "Place Value in 5-Digit Numbers",
            "description": "Understanding place value, ordering, and expanded notation for numbers up to 99,999.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Demonstrate an understanding of place value in 5-digit numbers using meaningful contexts"
            ],
            "keyVocabulary": [
              "Place value",
              "Ordering",
              "Expanded notation",
              "Ascending",
              "Descending"
            ],
            "exampleActivities": [
              "Arranging voter registration numbers in order",
              "Writing numbers in expanded form",
              "Reading and writing 5-digit numbers in words"
            ],
            "assessmentFocus": [
              "Correct ordering of 5-digit numbers",
              "Accurate expanded notation",
              "Proper reading and writing of large numbers"
            ],
            "prerequisiteTopicIds": [
              "g6-num-place-value-5-digit"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-addition-subtraction-5-digit",
            "title": "Addition and Subtraction of 5-Digit Numbers",
            "description": "Performing addition and subtraction operations with 5-digit numbers with and without carrying/borrowing.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Add 5-digit numbers with and without carrying",
              "Subtract 5-digit numbers with and without borrowing"
            ],
            "keyVocabulary": [
              "Addition",
              "Subtraction",
              "Carrying",
              "Borrowing",
              "Algorithm"
            ],
            "exampleActivities": [
              "Adding voter registration numbers from different constituencies",
              "Using different algorithms for addition and subtraction",
              "Real-world problem solving with large numbers"
            ],
            "assessmentFocus": [
              "Accurate computation with carrying",
              "Accurate computation with borrowing",
              "Use of various computational strategies"
            ],
            "prerequisiteTopicIds": [
              "g6-num-addition-subtraction-5-digit"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-multiplication-relationships",
            "title": "Multiplicative Relationships",
            "description": "Understanding and expressing multiplicative relationships between quantities, including multiples and factors.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Describe multiplicative relationships between quantities",
              "Demonstrate understanding of multiples of numbers from 2 up to 10"
            ],
            "keyVocabulary": [
              "Multiples",
              "Factors",
              "Product",
              "Multiplication",
              "Common multiples",
              "Lowest common multiple"
            ],
            "exampleActivities": [
              "Identifying multiplicative relationships in real contexts",
              "Building multiplication tables",
              "Finding common multiples and factors"
            ],
            "assessmentFocus": [
              "Correct expression of multiplicative relationships",
              "Accurate identification of multiples up to 1000",
              "Finding lowest common multiples"
            ],
            "prerequisiteTopicIds": [
              "g6-num-multiplication-relationships"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-fractions-basic",
            "title": "Fractions: Equivalence and Operations",
            "description": "Working with equivalent fractions, adding and subtracting fractions with different denominators using units of measure.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Determine equivalent fractions using meaningful contexts",
              "Add fractions using different units of measure",
              "Subtract fractions using different units of measure"
            ],
            "keyVocabulary": [
              "Fraction",
              "Numerator",
              "Denominator",
              "Equivalent fractions",
              "Units of measure",
              "Addition",
              "Subtraction"
            ],
            "exampleActivities": [
              "Using concrete materials to demonstrate equivalent fractions",
              "Labeling containers as fractions of a liter",
              "Pouring and measuring fractional volumes",
              "Converting units of measure to fractions"
            ],
            "assessmentFocus": [
              "Identification of equivalent fractions",
              "Accurate addition of fractions with different denominators",
              "Accurate subtraction of fractions with different denominators",
              "Conversion between units of measure and fractions"
            ],
            "prerequisiteTopicIds": [
              "g6-num-fractions-basic"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g6-sci-measurement",
                "description": "Using units of measure in practical contexts"
              }
            ]
          },
          {
            "id": "g6-num-angles-triangles",
            "title": "Angles and Triangles",
            "description": "Measuring, constructing, and working with angles and triangles including calculating interior angle sums.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Scientific and technological skills"
            ],
            "learningObjectives": [
              "Measure and construct angles up to 180Âº using a protractor",
              "Construct triangles given acute or right angles and side measurements",
              "Find the sum of interior angles of a triangle"
            ],
            "keyVocabulary": [
              "Angle",
              "Acute",
              "Right",
              "Obtuse",
              "Straight",
              "Protractor",
              "Triangle",
              "Interior angles",
              "Isosceles",
              "Equilateral",
              "Right-angled"
            ],
            "exampleActivities": [
              "Measuring angles with protractors",
              "Constructing angles of given sizes",
              "Constructing triangles from specifications",
              "Investigating sum of triangle angles through cutting and tessellation"
            ],
            "assessmentFocus": [
              "Accurate angle measurement",
              "Precise angle construction",
              "Correct triangle construction from given information",
              "Understanding that triangle angles sum to 180Â°"
            ],
            "prerequisiteTopicIds": [
              "g6-num-angles-triangles"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-rounding-estimation",
            "title": "Rounding and Estimation",
            "description": "Rounding numbers to the nearest 1000 and applying estimation skills in relevant contexts.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Express numbers to the nearest 1000 in relevant contexts"
            ],
            "keyVocabulary": [
              "Rounding",
              "Estimation",
              "Nearest 1000",
              "Place value"
            ],
            "exampleActivities": [
              "Rounding school population figures",
              "Estimating costs and quantities",
              "Applying rounding to real-world data"
            ],
            "assessmentFocus": [
              "Correct rounding to nearest 1000",
              "Application of rounding in practical contexts"
            ],
            "prerequisiteTopicIds": [
              "g6-num-rounding-estimation"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-money-management",
            "title": "Money Management",
            "description": "Practical use and management of money in buying, selling, and budgeting situations.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Production and work-related competencies"
            ],
            "learningObjectives": [
              "Demonstrate the use and management of money in practical situations",
              "Demonstrate understanding of multiplication of money in buying and selling",
              "Demonstrate understanding of division involving money"
            ],
            "keyVocabulary": [
              "Money",
              "Budget",
              "Shopping list",
              "Change",
              "Buying",
              "Selling",
              "Price",
              "Cost"
            ],
            "exampleActivities": [
              "Creating shopping lists and estimating costs",
              "Role-playing buying and selling in mock shops",
              "Calculating change",
              "Determining prices of packaged goods",
              "Dividing costs among groups"
            ],
            "assessmentFocus": [
              "Accurate addition and subtraction of money",
              "Correct calculation of change",
              "Appropriate pricing decisions",
              "Accurate multiplication and division with money"
            ],
            "prerequisiteTopicIds": [
              "g6-num-money-management"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Creativity and Entrepreneurial",
                "topicId": "g6-ce-business-basics",
                "description": "Determining prices and conducting transactions"
              }
            ]
          },
          {
            "id": "g6-num-measurement-conversions",
            "title": "Measurement and Conversions",
            "description": "Understanding and converting between units of length (cm and m), and calculating volume of cubes and cuboids.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Scientific and technological skills"
            ],
            "learningObjectives": [
              "Demonstrate understanding of conversions from cm to m and from m to cm when reading scales",
              "Describe the volume of a cube and cuboid in terms of the space they occupy"
            ],
            "keyVocabulary": [
              "Length",
              "Metre",
              "Centimetre",
              "Conversion",
              "Volume",
              "Cube",
              "Cuboid",
              "Cubic centimetres"
            ],
            "exampleActivities": [
              "Measuring objects in cm and m",
              "Converting measurements on house plans",
              "Calculating area of cube and cuboid faces",
              "Calculating volume by multiplying area by height"
            ],
            "assessmentFocus": [
              "Accurate conversion between cm and m",
              "Correct volume calculations for cubes and cuboids",
              "Application of conversions to scales and plans"
            ],
            "prerequisiteTopicIds": [
              "g6-num-measurement-conversions"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g6-sci-measurement",
                "description": "Practical measurement activities"
              }
            ]
          },
          {
            "id": "g6-num-symmetry-patterns",
            "title": "Symmetry and Patterns",
            "description": "Exploring lines of symmetry, creating symmetrical designs through reflection, and analyzing patterns.",
            "curriculumStandards": [
              "Functional numeracy",
              "Creativity",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Find number of lines of symmetry in objects found in the environment",
              "Create and analyse symmetrical designs by reflecting shape(s)",
              "Create and describe numeric and geometric patterns"
            ],
            "keyVocabulary": [
              "Symmetry",
              "Line of symmetry",
              "Reflection",
              "Mirror line",
              "Pattern",
              "Sequence",
              "Tessellation"
            ],
            "exampleActivities": [
              "Finding lines of symmetry in environmental objects",
              "Creating symmetrical patterns",
              "Reflecting shapes on grid paper",
              "Creating repeating, growing, and decreasing patterns",
              "Identifying numerical sequences in patterns"
            ],
            "assessmentFocus": [
              "Correct identification of lines of symmetry",
              "Accurate reflection of shapes",
              "Creation of symmetrical designs",
              "Description and extension of patterns"
            ],
            "prerequisiteTopicIds": [
              "g6-num-symmetry-patterns"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Creativity and Entrepreneurial",
                "topicId": "g6-ce-design-crafts",
                "description": "Using symmetry and patterns in design"
              }
            ]
          },
          {
            "id": "g6-num-multiplication-large-numbers",
            "title": "Multiplication of Large Numbers",
            "description": "Multiplying 3-digit numbers by 2-digit numbers to obtain products not exceeding 5-digit numbers.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Multiply a 3-digit number by a 2-digit number to obtain a product not exceeding a 5-digit number"
            ],
            "keyVocabulary": [
              "Multiplication",
              "Product",
              "Algorithm",
              "Place value"
            ],
            "exampleActivities": [
              "Solving word problems from manufacturing contexts",
              "Using various multiplication algorithms",
              "Calculating production quantities"
            ],
            "assessmentFocus": [
              "Accurate multiplication resulting in 5-digit products",
              "Correct interpretation of word problems",
              "Use of appropriate operations"
            ],
            "prerequisiteTopicIds": [
              "g6-num-multiplication-large-numbers"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-mixed-fractions",
            "title": "Mixed Fractions",
            "description": "Adding and subtracting mixed fractions in various contexts.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Add mixed fractions",
              "Subtract mixed fractions"
            ],
            "keyVocabulary": [
              "Mixed fraction",
              "Improper fraction",
              "Whole number",
              "Addition",
              "Subtraction"
            ],
            "exampleActivities": [
              "Identifying mixed fractions on measuring instruments",
              "Adding whole numbers and fractions separately",
              "Converting between mixed and improper fractions",
              "Practical measurement with mixed fractions"
            ],
            "assessmentFocus": [
              "Correct addition of mixed fractions",
              "Correct subtraction of mixed fractions",
              "Conversion between mixed and improper fractions"
            ],
            "prerequisiteTopicIds": [
              "g6-num-mixed-fractions"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-coordinate-grid",
            "title": "Coordinate Grid System",
            "description": "Locating objects using a grid system with rows and columns.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Logical thinking"
            ],
            "learningObjectives": [
              "Locate an object using a grid system"
            ],
            "keyVocabulary": [
              "Grid",
              "Rows",
              "Columns",
              "Coordinates",
              "Location"
            ],
            "exampleActivities": [
              "Labeling grids with rows and columns",
              "Locating objects on grids",
              "Describing coordinates of objects",
              "Finding objects using given coordinates"
            ],
            "assessmentFocus": [
              "Accurate object location on grids",
              "Correct description of coordinates",
              "Ability to use coordinates to find objects"
            ],
            "prerequisiteTopicIds": [
              "g6-num-coordinate-grid"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-decimal-numbers",
            "title": "Decimal Numbers",
            "description": "Understanding place value in decimal numbers, rounding, and operations with decimals up to two decimal places.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Demonstrate understanding of place value in decimal numbers from 0.01 to 0.1",
              "Round decimal numbers to the nearest tenth and unit",
              "Add and subtract decimal numbers up to two decimal places",
              "Convert decimal numbers to fractions and fractions to decimal numbers"
            ],
            "keyVocabulary": [
              "Decimal",
              "Decimal point",
              "Tenth",
              "Hundredth",
              "Place value",
              "Rounding",
              "Conversion"
            ],
            "exampleActivities": [
              "Using abacus to represent decimal place value",
              "Using expanded notation for decimals",
              "Rounding money to nearest 10 cents or Loti",
              "Using number stripes to convert between fractions and decimals",
              "Adding and subtracting with improvised money"
            ],
            "assessmentFocus": [
              "Correct understanding of decimal place value",
              "Accurate rounding of decimals",
              "Correct addition and subtraction with decimals",
              "Accurate conversion between fractions and decimals"
            ],
            "prerequisiteTopicIds": [
              "g6-num-decimal-numbers"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-division-large-numbers",
            "title": "Division of Large Numbers",
            "description": "Dividing 4-digit numbers by 2-digit numbers in meaningful contexts.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Divide a 4-digit number by a 2-digit number in meaningful contexts"
            ],
            "keyVocabulary": [
              "Division",
              "Dividend",
              "Divisor",
              "Quotient",
              "Remainder"
            ],
            "exampleActivities": [
              "Division without remainders",
              "Division with remainders",
              "Word problems from manufacturing and monetary contexts",
              "Interpreting scenarios to formulate numerical statements"
            ],
            "assessmentFocus": [
              "Accurate division with and without remainders",
              "Correct interpretation of word problems",
              "Application to real-world contexts"
            ],
            "prerequisiteTopicIds": [
              "g6-num-division-large-numbers"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-fraction-whole-multiplication",
            "title": "Multiplying Fractions by Whole Numbers",
            "description": "Multiplying fractions by whole numbers less than 10.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Multiply a fraction by a whole number less than 10"
            ],
            "keyVocabulary": [
              "Fraction",
              "Whole number",
              "Multiplication",
              "Product",
              "Mixed fraction"
            ],
            "exampleActivities": [
              "Using repeated addition to multiply fractions",
              "Multiplying numerator by whole number",
              "Creating products that result in mixed fractions"
            ],
            "assessmentFocus": [
              "Accurate multiplication of fractions by whole numbers",
              "Correct conversion to mixed fractions when needed"
            ],
            "prerequisiteTopicIds": [
              "g6-num-fraction-whole-multiplication"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-num-data-handling",
            "title": "Data Collection and Analysis",
            "description": "Collecting data through surveys, organizing it in charts and tables, and measuring temperature changes over time.",
            "curriculumStandards": [
              "Functional numeracy",
              "Problem-solving",
              "Scientific and technological skills"
            ],
            "learningObjectives": [
              "Collect data by conducting a survey",
              "Measure and record temperature changes over a period of time"
            ],
            "keyVocabulary": [
              "Data",
              "Survey",
              "Bar chart",
              "Table",
              "Temperature",
              "Thermometer",
              "Degree Celsius"
            ],
            "exampleActivities": [
              "Conducting surveys on environmental issues",
              "Organizing data in tables and charts",
              "Measuring water temperature at intervals",
              "Recording and comparing findings"
            ],
            "assessmentFocus": [
              "Appropriate data collection methods",
              "Accurate organization and display of data",
              "Correct interpretation of data",
              "Accurate temperature measurement and recording"
            ],
            "prerequisiteTopicIds": [
              "g6-num-data-handling"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g6-sci-measurement",
                "description": "Using thermometers to measure temperature"
              }
            ]
          }
        ]
      },
      {
        "name": "Scientific and Technological",
        "topics": [
          {
            "id": "g6-sci-measurement",
            "title": "Scientific Measurement",
            "description": "Using scientific instruments to measure temperature, mass, and rainfall accurately.",
            "curriculumStandards": [
              "Scientific and technological skills",
              "Problem-solving",
              "Functional numeracy"
            ],
            "learningObjectives": [
              "Measure temperature using a thermometer",
              "Measure mass using a pan scale",
              "Measure the amount of rainfall using a rain gauge"
            ],
            "keyVocabulary": [
              "Temperature",
              "Thermometer",
              "Mass",
              "Pan scale",
              "Rainfall",
              "Rain gauge",
              "Measurement",
              "Scale"
            ],
            "exampleActivities": [
              "Using different types of thermometers",
              "Measuring masses of various objects",
              "Setting up and reading a rain gauge",
              "Recording measurements accurately",
              "Visiting weather stations"
            ],
            "assessmentFocus": [
              "Correct use of measuring instruments",
              "Accurate reading of scales",
              "Proper recording of measurements",
              "Understanding of measurement units"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-measurement"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g6-num-measurement-conversions",
                "description": "Units of measurement and conversions"
              }
            ]
          },
          {
            "id": "g6-sci-heat-oxygen",
            "title": "Heat and Oxygen",
            "description": "Understanding sources of heat, effects of heat on matter, and properties of oxygen.",
            "curriculumStandards": [
              "Scientific and technological skills",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Identify sources of heat",
              "Demonstrate the effects of heat on solids and liquids",
              "Demonstrate that oxygen supports burning, life and causes rust"
            ],
            "keyVocabulary": [
              "Heat",
              "Source",
              "Expansion",
              "Oxygen",
              "Combustion",
              "Respiration",
              "Oxidation",
              "Rust"
            ],
            "exampleActivities": [
              "Identifying heat sources in the environment",
              "Heating solids and liquids to observe expansion",
              "Conducting experiments with candles and jars",
              "Observing rusting of iron nails",
              "Testing oxygen's role in supporting life"
            ],
            "assessmentFocus": [
              "Identification of various heat sources",
              "Observation and explanation of heat effects",
              "Understanding of oxygen's role in combustion, respiration, and oxidation",
              "Proper recording of experimental observations"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-heat-oxygen"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-sci-food-preparation",
            "title": "Food Preparation and Nutrition",
            "description": "Preparing green leafy vegetables and eggs, understanding food nutrients, their sources and functions, and learning about deficiency diseases.",
            "curriculumStandards": [
              "Health and healthy living",
              "Scientific and technological skills",
              "Production and work-related competencies"
            ],
            "learningObjectives": [
              "Prepare green leafy vegetables",
              "Prepare eggs",
              "Identify food nutrients, their sources and functions",
              "Explain signs, symptoms and treatment of deficiency diseases"
            ],
            "keyVocabulary": [
              "Nutrients",
              "Carbohydrates",
              "Proteins",
              "Fats",
              "Balanced diet",
              "Deficiency diseases",
              "Marasmus",
              "Kwashiorkor",
              "Cooking",
              "Preparation"
            ],
            "exampleActivities": [
              "Following recipes to prepare vegetables",
              "Preparing soft-boiled, hard-boiled, and scrambled eggs",
              "Sorting foods by nutrient type",
              "Matching nutrients with their functions",
              "Researching deficiency diseases at health centers"
            ],
            "assessmentFocus": [
              "Correct preparation techniques",
              "Proper use of kitchen equipment",
              "Identification of food nutrients and sources",
              "Understanding of deficiency disease symptoms and prevention"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-food-preparation"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-health-hygiene",
                "description": "Health and hygiene practices"
              }
            ]
          },
          {
            "id": "g6-sci-diseases",
            "title": "Human and Animal Diseases",
            "description": "Understanding infectious and non-infectious diseases in humans, and common diseases of farm animals.",
            "curriculumStandards": [
              "Health and healthy living",
              "Scientific and technological skills",
              "Awareness of self and others"
            ],
            "learningObjectives": [
              "Explain non-infectious diseases",
              "Explain the spread of infectious diseases",
              "Describe common diseases of ruminants and their control",
              "Describe common diseases of pigs and their control",
              "Describe common diseases of equines and their control",
              "Describe common diseases of rabbits and their control",
              "Demonstrate proper ways of controlling crop diseases"
            ],
            "keyVocabulary": [
              "Infectious",
              "Non-infectious",
              "Asthma",
              "Ulcer",
              "Arthritis",
              "Swine flu",
              "Pneumonia",
              "Diphtheria",
              "Bloat",
              "Tuberculosis",
              "Foot rot",
              "Mange",
              "Prevention",
              "Control"
            ],
            "exampleActivities": [
              "Visiting health centers to research diseases",
              "Identifying signs and symptoms of diseases",
              "Visiting veterinary clinics and farms",
              "Examining affected crops in gardens",
              "Demonstrating disease control methods"
            ],
            "assessmentFocus": [
              "Correct identification of disease types",
              "Understanding of disease transmission",
              "Knowledge of prevention and treatment methods",
              "Ability to identify diseased plants and animals"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-diseases"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-health-safety",
                "description": "Disease prevention and health promotion"
              }
            ]
          },
          {
            "id": "g6-sci-hygiene-cleaning",
            "title": "Hygiene and Cleaning Practices",
            "description": "Understanding good hygiene practices, washing and finishing clothes, protective clothing, and cleaning methods.",
            "curriculumStandards": [
              "Health and healthy living",
              "Production and work-related competencies",
              "Environmental adaptation"
            ],
            "learningObjectives": [
              "Describe good hygiene practices critical to health and self-esteem",
              "Wash and finish clothes",
              "Explain the importance of protective clothing",
              "Demonstrate proper ways of sweeping and dusting",
              "Demonstrate proper ways of cleaning plastic and enamel ware"
            ],
            "keyVocabulary": [
              "Hygiene",
              "Self-esteem",
              "Washing",
              "Ironing",
              "Protective clothing",
              "Sweeping",
              "Dusting",
              "Cleaning"
            ],
            "exampleActivities": [
              "Discussing hygiene practices and self-esteem",
              "Sorting and washing clothes",
              "Ironing and finishing garments",
              "Identifying protective clothing for different activities",
              "Practicing sweeping and dusting techniques",
              "Washing plastic and enamel utensils"
            ],
            "assessmentFocus": [
              "Understanding of hygiene-self-esteem connection",
              "Correct washing and ironing techniques",
              "Identification of appropriate protective clothing",
              "Proper cleaning methods for different surfaces and materials"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-hygiene-cleaning"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-sci-water",
            "title": "Water Properties and Conservation",
            "description": "Understanding properties of water, methods of cleaning water, and ways to conserve water sources.",
            "curriculumStandards": [
              "Environmental adaptation and sustainable development",
              "Scientific and technological skills",
              "Health and healthy living"
            ],
            "learningObjectives": [
              "Demonstrate properties of water",
              "Explain ways of cleaning water",
              "Explain proper ways of conserving water sources"
            ],
            "keyVocabulary": [
              "Properties",
              "Magnifier",
              "Freezing",
              "Melting",
              "Evaporation",
              "Condensation",
              "Boiling",
              "Filtration",
              "Decantation",
              "Distillation",
              "Conservation",
              "Wetlands",
              "Springs",
              "Wells"
            ],
            "exampleActivities": [
              "Using water as a magnifier",
              "Observing phase changes of water",
              "Conducting cleaning experiments (boiling, filtering, distilling)",
              "Creating wetland models",
              "Undertaking mini-projects to protect water sources"
            ],
            "assessmentFocus": [
              "Identification of water properties",
              "Understanding of water cleaning methods",
              "Differentiation between clean and safe water",
              "Knowledge of water conservation methods",
              "Demonstration of water source protection"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-water"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-sci-agriculture",
            "title": "Agricultural Practices",
            "description": "Understanding farm implements, planting methods, crop care, and identification of leguminous crop diseases.",
            "curriculumStandards": [
              "Production and work-related competencies",
              "Environmental adaptation and sustainable development",
              "Scientific and technological skills"
            ],
            "learningObjectives": [
              "Explain the use of farm implements",
              "Describe different methods of planting crops",
              "Demonstrate proper ways of watering vegetables",
              "Identify leguminous crop diseases"
            ],
            "keyVocabulary": [
              "Farm implements",
              "Disc harrow",
              "Ox-drawn plough",
              "Planter",
              "Cultivator",
              "Monocropping",
              "Intercropping",
              "Crop rotation",
              "Spacing",
              "Watering",
              "Leguminous crops",
              "Powdery mildew",
              "Blight",
              "Rust"
            ],
            "exampleActivities": [
              "Drawing and labeling farm implements",
              "Visiting agricultural departments",
              "Practicing different planting methods",
              "Demonstrating proper watering techniques",
              "Observing and identifying crop diseases"
            ],
            "assessmentFocus": [
              "Identification and functions of farm implements",
              "Understanding of different planting methods",
              "Proper watering techniques",
              "Recognition of leguminous crop diseases and control measures"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-agriculture"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-sci-geography",
            "title": "Geography and Environment",
            "description": "Understanding lines of latitude and longitude, cardinal points, soil erosion control, and climate.",
            "curriculumStandards": [
              "Environmental adaptation and sustainable development",
              "Scientific and technological skills",
              "Awareness of self and others"
            ],
            "learningObjectives": [
              "Identify lines of latitude and longitude",
              "Identify the cardinal points",
              "Describe ways of controlling soil erosion",
              "Describe Lesotho's climatic conditions"
            ],
            "keyVocabulary": [
              "Latitude",
              "Longitude",
              "Meridian",
              "Equator",
              "Greenwich meridian",
              "Cardinal points",
              "North",
              "South",
              "East",
              "West",
              "Soil erosion",
              "Climate",
              "Weather",
              "Highlands",
              "Lowlands"
            ],
            "exampleActivities": [
              "Locating lines on globes and maps",
              "Drawing maps showing latitude and longitude",
              "Identifying erosion sites in the environment",
              "Implementing erosion control projects",
              "Visiting weather stations",
              "Comparing highland and lowland climates"
            ],
            "assessmentFocus": [
              "Correct identification of latitude and longitude lines",
              "Understanding of cardinal points",
              "Knowledge of soil erosion causes and control",
              "Understanding of Lesotho's climate in different regions"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-geography"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-nation-state",
                "description": "Geographic features of Lesotho"
              }
            ]
          },
          {
            "id": "g6-sci-biology",
            "title": "Plant and Animal Biology",
            "description": "Understanding plant structures (leaves, stems, flowers), animal classification, animal behavior, and species conservation.",
            "curriculumStandards": [
              "Scientific and technological skills",
              "Environmental adaptation and sustainable development",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Identify the external structure of a simple leaf",
              "Identify the internal structure of a typical flower and the functions of its parts",
              "Identify different types of stems in terms of their structure",
              "Classify insects and animals with segmented bodies according to number of legs and main body parts",
              "Explain how animals protect themselves against enemies or unfavourable conditions",
              "Preserve animals and plants",
              "Identify endangered species in their local environment",
              "Explain ways of conserving endangered species"
            ],
            "keyVocabulary": [
              "Leaf",
              "Midrib",
              "Blade",
              "Veins",
              "Flower",
              "Stamen",
              "Pistil",
              "Stem",
              "Climber",
              "Runner",
              "Bulb",
              "Tuber",
              "Insects",
              "Segmented body",
              "Camouflage",
              "Hibernation",
              "Migration",
              "Preservation",
              "Mounting",
              "Herbarium",
              "Endangered species",
              "Conservation"
            ],
            "exampleActivities": [
              "Collecting and examining leaves",
              "Dissecting flowers to identify parts",
              "Classifying plant stems",
              "Collecting and classifying insects",
              "Observing animal defense mechanisms",
              "Preserving specimens by mounting and herbarium methods",
              "Investigating endangered species",
              "Establishing botanical gardens"
            ],
            "assessmentFocus": [
              "Correct identification of plant structures",
              "Understanding of flower parts and functions",
              "Classification of stems and insects",
              "Knowledge of animal protection strategies",
              "Proper preservation techniques",
              "Identification of endangered species",
              "Understanding of conservation methods"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-biology"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-sci-human-body",
            "title": "Human Body Systems",
            "description": "Understanding the structure and functions of the tooth, eye, ear, and skeletal system.",
            "curriculumStandards": [
              "Health and healthy living",
              "Scientific and technological skills",
              "Awareness of self and others"
            ],
            "learningObjectives": [
              "Describe the structure and functions of parts the tooth, eye and ear",
              "Describe the basic structure and functions of the skeletal system"
            ],
            "keyVocabulary": [
              "Tooth",
              "Milk teeth",
              "Permanent teeth",
              "Eye",
              "Ear",
              "Skeletal system",
              "Bones",
              "Joints",
              "Ball and socket joint",
              "Hinge joint"
            ],
            "exampleActivities": [
              "Drawing and labeling body parts",
              "Identifying types of teeth and their functions",
              "Studying models of eye and ear",
              "Examining bone specimens",
              "Demonstrating different joint movements"
            ],
            "assessmentFocus": [
              "Correct identification of body part structures",
              "Understanding of functions of different parts",
              "Accurate drawing and labeling",
              "Knowledge of skeletal system divisions and functions"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-human-body"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-self-awareness",
                "description": "Understanding body changes and development"
              }
            ]
          },
          {
            "id": "g6-sci-life-skills-health",
            "title": "Life Skills and Health Education",
            "description": "Understanding puberty, sexual health, refusal skills, and personal safety.",
            "curriculumStandards": [
              "Health and healthy living",
              "Awareness of self and others",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Demonstrate an understanding that changes at puberty are normal and natural",
              "Explain that forced sex is a crime regardless of social norms and media messages",
              "Demonstrate an understanding of how refusal skills can be used to protect one against coercive sex"
            ],
            "keyVocabulary": [
              "Puberty",
              "Physical changes",
              "Emotional changes",
              "Forced sex",
              "Coercive sex",
              "Refusal skills",
              "Assertiveness",
              "Rights",
              "Consent"
            ],
            "exampleActivities": [
              "Discussing physical and emotional changes at puberty",
              "Analyzing case studies on sexual coercion",
              "Role-playing refusal scenarios",
              "Creating information posters",
              "Discussing media influences"
            ],
            "assessmentFocus": [
              "Understanding that puberty changes are normal",
              "Knowledge that forced sex is a crime",
              "Ability to demonstrate refusal skills",
              "Recognition of coercive situations"
            ],
            "prerequisiteTopicIds": [
              "g6-sci-life-skills-health"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-rights-protection",
                "description": "Children's rights and protection from abuse"
              }
            ]
          }
        ]
      },
      {
        "name": "Personal, Spiritual and Social",
        "topics": [
          {
            "id": "g6-pss-self-awareness",
            "title": "Self-Awareness and Self-Esteem",
            "description": "Developing self-awareness, self-esteem, critical thinking skills, and understanding personal values.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Critical thinking",
              "Effective communication"
            ],
            "learningObjectives": [
              "Demonstrate self-awareness, self-esteem and critical thinking skills"
            ],
            "keyVocabulary": [
              "Self-awareness",
              "Self-esteem",
              "Values",
              "Rights",
              "Self-image",
              "Relationships"
            ],
            "exampleActivities": [
              "Discussing talents and positive qualities",
              "Self-esteem affirmation exercises",
              "Value clarification activities",
              "Building and breaking relationships exercises",
              "Analyzing how relationships affect rights and self-image"
            ],
            "assessmentFocus": [
              "Identification of positive qualities in self and others",
              "Understanding of factors affecting self-esteem",
              "Knowledge of personal values and their sources",
              "Understanding of relationship impacts on self-image"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-self-awareness"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-pss-culture-ethnic-groups",
            "title": "Culture of Ethnic Groups in Lesotho",
            "description": "Understanding the culture, beliefs, norms, customs, food, tools and weapons of the San, Sotho, and Nguni ethnic groups.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Cultural identity",
              "Effective communication"
            ],
            "learningObjectives": [
              "Describe the culture of the three main ethnic groups in Lesotho (San, Sotho, Nguni)"
            ],
            "keyVocabulary": [
              "Culture",
              "Ethnic group",
              "San",
              "Sotho",
              "Nguni",
              "Beliefs",
              "Norms",
              "Customs",
              "Taboos",
              "Tools",
              "Weapons"
            ],
            "exampleActivities": [
              "Researching beliefs, norms and customs",
              "Presenting findings on traditional food",
              "Drawing tools and weapons",
              "Educational excursions to historical sites",
              "Discussing cultural similarities and differences"
            ],
            "assessmentFocus": [
              "Knowledge of beliefs, norms, customs and taboos",
              "Understanding of traditional foods",
              "Identification of tools and weapons",
              "Ability to compare cultures"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-culture-ethnic-groups"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (Sesotho)",
                "topicId": "g6-ses-social-skills",
                "description": "Basotho cultural practices and traditions"
              }
            ]
          },
          {
            "id": "g6-pss-religions",
            "title": "Religions in Lesotho",
            "description": "Understanding similarities and differences of different religions in Lesotho including Christianity, Islam, Bahai, and African Traditional Religions.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Respect for diversity",
              "Effective communication"
            ],
            "learningObjectives": [
              "Describe similarities and differences of different religions in Lesotho"
            ],
            "keyVocabulary": [
              "Religion",
              "Christianity",
              "Islam",
              "Bahai",
              "African Traditional Religions",
              "Place of worship",
              "Religious practices",
              "Sacred texts"
            ],
            "exampleActivities": [
              "Researching places of worship",
              "Identifying days of worship",
              "Comparing religious practices",
              "Discussing guiding literature",
              "Presenting findings on similarities and differences"
            ],
            "assessmentFocus": [
              "Knowledge of different religions in Lesotho",
              "Understanding of religious practices",
              "Ability to compare and contrast religions",
              "Respect for religious diversity"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-religions"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-pss-african-non-african-groups",
            "title": "African and Non-African Groups in Lesotho",
            "description": "Identifying African and non-African groups living in Lesotho and their places of origin.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Respect for diversity",
              "Global awareness"
            ],
            "learningObjectives": [
              "State African and non-African groups in Lesotho and their places of origin"
            ],
            "keyVocabulary": [
              "African groups",
              "Non-African groups",
              "Continents",
              "Origin",
              "Diversity"
            ],
            "exampleActivities": [
              "Brainstorming groups living in Lesotho",
              "Sorting groups into African and non-African",
              "Identifying continents on world maps",
              "Matching groups with their continents of origin"
            ],
            "assessmentFocus": [
              "Identification of African and non-African groups",
              "Knowledge of seven continents",
              "Ability to match groups with their origins"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-african-non-african-groups"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (English)",
                "topicId": "g6-eng-language-use",
                "description": "Describing people by nationality and language"
              }
            ]
          },
          {
            "id": "g6-pss-local-governance",
            "title": "Local Governance Structures",
            "description": "Understanding the structure and functions of chieftaincies, community and urban councils, district councils, and municipalities in Lesotho.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Effective communication",
              "Patriotism"
            ],
            "learningObjectives": [
              "Describe the structure and functions of chieftaincies in Lesotho",
              "Identify the functions of the community and urban councils",
              "Identify functions of District Councils",
              "Identify functions of the municipality"
            ],
            "keyVocabulary": [
              "Chieftaincy",
              "Principal chiefs",
              "Area chiefs",
              "Head chiefs",
              "Community council",
              "Urban council",
              "District Council",
              "District Administrator",
              "Municipality"
            ],
            "exampleActivities": [
              "Drawing governance structures",
              "Matching chiefs with their hierarchy levels",
              "Role-playing council functions",
              "Discussing governance responsibilities"
            ],
            "assessmentFocus": [
              "Understanding of chieftaincy hierarchy",
              "Knowledge of council functions",
              "Ability to explain governance structures"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-local-governance"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-pss-roles-responsibilities",
            "title": "Roles and Responsibilities",
            "description": "Understanding personal roles and responsibilities in the village and community.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Responsibility",
              "Effective communication"
            ],
            "learningObjectives": [
              "Describe their roles and responsibilities in the village"
            ],
            "keyVocabulary": [
              "Roles",
              "Responsibilities",
              "Community",
              "Village",
              "Contribution"
            ],
            "exampleActivities": [
              "Brainstorming roles and responsibilities",
              "Role-playing village responsibilities",
              "Writing compositions about roles",
              "Discussing differences between roles and responsibilities"
            ],
            "assessmentFocus": [
              "Understanding of personal roles",
              "Knowledge of responsibilities in the village",
              "Ability to differentiate roles from responsibilities"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-roles-responsibilities"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-pss-rights-protection",
            "title": "Human Rights and Child Protection",
            "description": "Understanding human rights, children's rights, violations, and various forms of abuse and violence against children.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Critical thinking",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Demonstrate understanding of the notion of violation of human rights",
              "Demonstrate understanding of the consequences of the violation of children's rights on the wellbeing of the individual",
              "Identify various forms of abuse and violence against children"
            ],
            "keyVocabulary": [
              "Human rights",
              "Children's rights",
              "Violation",
              "Abuse",
              "Violence",
              "Physical abuse",
              "Gender-based violence",
              "Early marriage",
              "Protection",
              "Reporting"
            ],
            "exampleActivities": [
              "Brainstorming human rights",
              "Role-playing rights violations",
              "Matching rights with responsibilities",
              "Analyzing case studies on violations",
              "Learning about reporting mechanisms"
            ],
            "assessmentFocus": [
              "Knowledge of human and children's rights",
              "Understanding of violation consequences",
              "Identification of forms of abuse",
              "Knowledge of protection and reporting mechanisms"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-rights-protection"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g6-sci-life-skills-health",
                "description": "Personal safety and protection"
              }
            ]
          },
          {
            "id": "g6-pss-career-development",
            "title": "Career Development and Education",
            "description": "Understanding the role of education in career development and identifying institutions of career training.",
            "curriculumStandards": [
              "Production and work-related competencies",
              "Awareness of self and others",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Describe the role of education in career development",
              "Identify institutions of career training"
            ],
            "keyVocabulary": [
              "Career",
              "Education",
              "Training institutions",
              "Career development",
              "Career preferences"
            ],
            "exampleActivities": [
              "Discussing career preferences",
              "Identifying education requirements for careers",
              "Locating training institutions on maps",
              "Organizing career days",
              "Writing about career aspirations"
            ],
            "assessmentFocus": [
              "Understanding of education's role in careers",
              "Knowledge of training institutions",
              "Ability to match careers with training needs"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-career-development"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-pss-nation-state",
            "title": "Nation and State: Lesotho",
            "description": "Understanding Basotho as a nation and the Kingdom of Lesotho as a state, including relationships with neighboring countries and regional organizations.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Patriotism",
              "Global awareness"
            ],
            "learningObjectives": [
              "Describe Basotho as a nation",
              "Describe the Kingdom of Lesotho as a state",
              "Describe the relationship between the Kingdom of Lesotho and the Republic of South Africa (RSA)",
              "Situate Lesotho within the Southern African Customs Union (SACU) states",
              "Identify signs and symbols of non-governmental organizations in Lesotho"
            ],
            "keyVocabulary": [
              "Nation",
              "State",
              "Independence",
              "Boundaries",
              "Government",
              "SACU",
              "Relationship",
              "Non-governmental organizations",
              "Nationality",
              "Currency"
            ],
            "exampleActivities": [
              "Discussing Basotho clans and nation formation",
              "Identifying boundaries on maps",
              "Drawing and labeling SACU member flags",
              "Discussing relationships with South Africa",
              "Identifying NGO signs and symbols"
            ],
            "assessmentFocus": [
              "Understanding of nation vs. state concepts",
              "Knowledge of Lesotho's independence and boundaries",
              "Understanding of regional relationships",
              "Identification of SACU members and their details",
              "Recognition of NGO symbols"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-nation-state"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-pss-migration-trafficking",
            "title": "Migration and Human Trafficking",
            "description": "Understanding causes of migration and the effects of human trafficking.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Critical thinking",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Describe causes of migration",
              "Describe the effects of human trafficking"
            ],
            "keyVocabulary": [
              "Migration",
              "Human trafficking",
              "Causes",
              "Effects",
              "Vulnerable",
              "Prevention",
              "Protection"
            ],
            "exampleActivities": [
              "Discussing types of migration",
              "Researching migration examples",
              "Role-playing trafficking scenarios",
              "Identifying vulnerable targets",
              "Discussing prevention strategies"
            ],
            "assessmentFocus": [
              "Knowledge of migration causes and types",
              "Understanding of human trafficking effects",
              "Identification of vulnerable groups",
              "Knowledge of prevention methods"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-migration-trafficking"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-pss-gender-equality",
            "title": "Gender Equality and Stereotypes",
            "description": "Understanding how gender stereotypes promote gender roles and boundaries, and rejecting myths about the place of girls and boys in society.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Critical thinking",
              "Social justice"
            ],
            "learningObjectives": [
              "Explain how gender stereotypes promote gender roles and gender boundaries",
              "Reject myths relating to the place of girls and boys in society"
            ],
            "keyVocabulary": [
              "Gender",
              "Stereotypes",
              "Gender roles",
              "Gender boundaries",
              "Myths",
              "Facts",
              "Equality",
              "Socialization"
            ],
            "exampleActivities": [
              "Discussing gender stereotypes",
              "Analyzing time spent on activities by gender",
              "Case study analysis on gender stereotyping",
              "Playing 'agree or disagree' games with myths and facts",
              "Writing compositions on myths vs. facts"
            ],
            "assessmentFocus": [
              "Understanding of gender stereotypes",
              "Ability to distinguish myths from facts",
              "Critical thinking about gender roles",
              "Understanding of gender equality"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-gender-equality"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-pss-health-safety",
            "title": "Health and Safety",
            "description": "Understanding emergency response, disease impacts, substance abuse, risky behavior, and accident prevention.",
            "curriculumStandards": [
              "Health and healthy living",
              "Problem-solving",
              "Critical thinking"
            ],
            "learningObjectives": [
              "Demonstrate ways of handling everyday emergencies",
              "Describe ways of managing fainting",
              "Describe the health and social impacts of drug, alcohol and substance abuse on people's lives",
              "Apply assertiveness and refusal skills in avoiding abuse of drugs, alcohol and substances",
              "Explain how to avoid situations and behaviour leading to a risk of contracting STIs, including HIV",
              "Explain how to resist negative peer influence to engage in risky behaviour",
              "Demonstrate ways of preventing accidents at home",
              "State effects of human made hazards on people's lives"
            ],
            "keyVocabulary": [
              "Emergency",
              "First aid",
              "Fainting",
              "Substance abuse",
              "Refusal skills",
              "Assertiveness",
              "STIs",
              "HIV",
              "Risky behaviour",
              "Peer pressure",
              "Accidents",
              "Hazards",
              "Prevention"
            ],
            "exampleActivities": [
              "Role-playing emergency responses",
              "Demonstrating first aid techniques",
              "Analyzing substance abuse impacts",
              "Practicing refusal skills",
              "Discussing risky situations and behaviors",
              "Creating accident prevention scenarios",
              "Collecting pictures of hazards and their effects"
            ],
            "assessmentFocus": [
              "Correct emergency response procedures",
              "Understanding of substance abuse impacts",
              "Demonstration of refusal and assertiveness skills",
              "Knowledge of risk avoidance strategies",
              "Understanding of accident prevention",
              "Knowledge of hazard effects"
            ],
            "prerequisiteTopicIds": [
              "g6-pss-health-safety"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g6-sci-diseases",
                "description": "Disease prevention and health promotion"
              },
              {
                "subject": "Scientific and Technological",
                "topicId": "g6-sci-life-skills-health",
                "description": "Personal health and safety"
              }
            ]
          }
        ]
      },
      {
        "name": "Creativity and Entrepreneurial",
        "topics": [
          {
            "id": "g6-ce-drawing-painting",
            "title": "Drawing and Painting",
            "description": "Developing drawing skills including measured drawings, portraits, observational sketching, and painting with secondary colors.",
            "curriculumStandards": [
              "Creativity",
              "Aesthetic development",
              "Technical skills"
            ],
            "learningObjectives": [
              "Draw measured drawings",
              "Draw portraits using freehand sketching",
              "Make observational drawings of natural scenes using freehand sketching",
              "Paint using secondary colours"
            ],
            "keyVocabulary": [
              "Measured drawing",
              "Portrait",
              "Freehand sketching",
              "Observational drawing",
              "Primary colors",
              "Secondary colors",
              "Proportions"
            ],
            "exampleActivities": [
              "Measuring and drawing geometric solids",
              "Practicing portrait proportions",
              "Sketching outdoor scenes",
              "Mixing primary colors to create secondary colors",
              "Painting natural scenes"
            ],
            "assessmentFocus": [
              "Accurate measured drawings",
              "Correct facial proportions in portraits",
              "Observational accuracy in sketches",
              "Proper color mixing and application"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-drawing-painting"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-ce-cultural-art",
            "title": "Cultural Art and Printing",
            "description": "Creating portraits depicting different cultures and producing prints using various objects.",
            "curriculumStandards": [
              "Creativity",
              "Cultural awareness",
              "Technical skills"
            ],
            "learningObjectives": [
              "Make portraits depicting three cultures (European, Chinese and Indians)",
              "Use different objects to produce prints"
            ],
            "keyVocabulary": [
              "Culture",
              "Portrait",
              "European",
              "Chinese",
              "Indian",
              "Printing",
              "Bottle prints",
              "Finger prints",
              "Crayon prints"
            ],
            "exampleActivities": [
              "Studying photographs of different cultures",
              "Drawing portraits from models or pictures",
              "Experimenting with bottle, finger, and crayon printing",
              "Creating print patterns"
            ],
            "assessmentFocus": [
              "Cultural accuracy in portraits",
              "Technical skill in printing",
              "Creativity in print designs"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-cultural-art"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-african-non-african-groups",
                "description": "Understanding different cultural groups"
              }
            ]
          },
          {
            "id": "g6-ce-music-composition",
            "title": "Music and Composition",
            "description": "Using major scales to compose music, performing songs and dances, and composing poems and lyrics.",
            "curriculumStandards": [
              "Creativity",
              "Aesthetic development",
              "Effective communication"
            ],
            "learningObjectives": [
              "Use three major scales to compose music",
              "Perform songs and dances and play musical instruments",
              "Perform local and foreign songs and dance",
              "Compose their own poems and lyrics",
              "Differentiate between the pitch, duration and volume of different sounds from the environment"
            ],
            "keyVocabulary": [
              "Major scale",
              "C major",
              "G major",
              "F major",
              "Composition",
              "Musical instruments",
              "Pitch",
              "Duration",
              "Volume",
              "Lyrics",
              "Poetry",
              "Graphic score"
            ],
            "exampleActivities": [
              "Practicing major scales",
              "Composing simple melodies",
              "Learning to play musical instruments",
              "Performing local and foreign songs",
              "Writing original poems and lyrics",
              "Creating graphic scores for environmental sounds"
            ],
            "assessmentFocus": [
              "Accurate scale performance",
              "Original compositions",
              "Confident performance",
              "Differentiation of sound qualities",
              "Creative lyrics and poetry"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-music-composition"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-ce-drama-advertising",
            "title": "Drama and Advertising",
            "description": "Dramatizing stories and advertising products using various methods including cartoons, puppetry, and posters.",
            "curriculumStandards": [
              "Creativity",
              "Effective communication",
              "Entrepreneurial skills"
            ],
            "learningObjectives": [
              "Dramatise read and created stories",
              "Advertise products using different methods"
            ],
            "keyVocabulary": [
              "Dramatization",
              "Characters",
              "Roles",
              "Advertising",
              "Cartoons",
              "Puppetry",
              "Posters",
              "Marketing"
            ],
            "exampleActivities": [
              "Reading and dramatizing stories",
              "Creating original stories for dramatization",
              "Drawing cartoons for advertisements",
              "Making puppets for advertising",
              "Designing advertising posters",
              "Practicing product marketing"
            ],
            "assessmentFocus": [
              "Effective dramatization",
              "Creative storytelling",
              "Variety of advertising methods",
              "Persuasive advertising content"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-drama-advertising"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-ce-design-crafts",
            "title": "Modeling and Design",
            "description": "Using papermache and play dough to make crafts, designing costumes, signs, warning signs, toys and decorative ornaments.",
            "curriculumStandards": [
              "Creativity",
              "Technical skills",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Use paper mache and play dough to make animals and household utensils",
              "Design traditional costumes from other cultures",
              "Design signs and symbols using calligraphy",
              "Design warning signs for dangerous places in their area",
              "Design toys and decorative ornaments"
            ],
            "keyVocabulary": [
              "Paper mache",
              "Play dough",
              "Modeling",
              "Design",
              "Traditional costumes",
              "Calligraphy",
              "Signs",
              "Symbols",
              "Warning signs",
              "Toys",
              "Ornaments"
            ],
            "exampleActivities": [
              "Making paper mache",
              "Modeling animals and utensils",
              "Designing cultural costumes",
              "Practicing calligraphy",
              "Creating warning signs for dangerous locations",
              "Designing and producing toys and ornaments"
            ],
            "assessmentFocus": [
              "Quality of paper mache creations",
              "Cultural accuracy in costume designs",
              "Clarity of calligraphy",
              "Effectiveness of warning signs",
              "Creativity and functionality of toys and ornaments"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-design-crafts"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-health-safety",
                "description": "Designing warning signs for safety"
              }
            ]
          },
          {
            "id": "g6-ce-ict-skills",
            "title": "ICT Skills",
            "description": "Performing basic word processing functions and drawing graphics in painting programmes.",
            "curriculumStandards": [
              "Scientific and technological skills",
              "Problem-solving",
              "Creativity"
            ],
            "learningObjectives": [
              "Perform basic functions of word processing and draw graphics in a graphics painting programme"
            ],
            "keyVocabulary": [
              "Word processing",
              "Graphics",
              "Bold",
              "Italics",
              "Underline",
              "Font",
              "Spacing",
              "Table",
              "Graphics painting programme"
            ],
            "exampleActivities": [
              "Opening graphics painting programmes",
              "Practicing text formatting",
              "Drawing simple graphics on computer",
              "Coloring graphics",
              "Creating formatted documents"
            ],
            "assessmentFocus": [
              "Correct use of formatting functions",
              "Ability to draw and color graphics",
              "Proper use of software tools"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-ict-skills"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-ce-games-puzzles",
            "title": "Games and Puzzles",
            "description": "Playing and modifying indigenous and cultural games, and creating word puzzles to address social issues.",
            "curriculumStandards": [
              "Creativity",
              "Critical thinking",
              "Cultural awareness"
            ],
            "learningObjectives": [
              "Depict moral dilemmas in a story",
              "Play advanced versions of indigenous games",
              "Play games of strategy from other cultures",
              "Modify existing board games to suit their situations",
              "Adapt word puzzles to combat substance abuse"
            ],
            "keyVocabulary": [
              "Moral dilemma",
              "Indigenous games",
              "Morabaraba",
              "Liketoana",
              "Chess",
              "Playing cards",
              "Strategy",
              "Modification",
              "Word puzzles",
              "Substance abuse"
            ],
            "exampleActivities": [
              "Dramatizing moral dilemmas",
              "Playing advanced Morabaraba and Liketoana",
              "Learning chess and card games",
              "Modifying board game rules",
              "Creating word puzzles with anti-substance abuse messages"
            ],
            "assessmentFocus": [
              "Understanding of moral dilemmas",
              "Skill in playing games",
              "Creativity in game modification",
              "Effective puzzle creation"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-games-puzzles"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-health-safety",
                "description": "Combating substance abuse through creative activities"
              }
            ]
          },
          {
            "id": "g6-ce-recycling-crafts",
            "title": "Recycling and Crafts",
            "description": "Reusing and recycling materials, and using wire and clay to make crafts for income generation.",
            "curriculumStandards": [
              "Environmental adaptation and sustainable development",
              "Creativity",
              "Entrepreneurial skills"
            ],
            "learningObjectives": [
              "Reuse plastics, tins and bottles to promote sustainable use of resources and generate income",
              "Recycle plastics, tins and bottles to promote sustainable use of resources and income generation",
              "Use wire and clay to make crafts"
            ],
            "keyVocabulary": [
              "Reuse",
              "Recycle",
              "Sustainability",
              "Income generation",
              "Plastics",
              "Tins",
              "Bottles",
              "Wire",
              "Clay",
              "Crafts"
            ],
            "exampleActivities": [
              "Collecting materials for reuse and recycling",
              "Creating useful items from waste materials",
              "Making wire crafts",
              "Making clay crafts",
              "Planning income-generating projects"
            ],
            "assessmentFocus": [
              "Creativity in reusing materials",
              "Understanding of recycling concepts",
              "Quality of wire and clay crafts",
              "Entrepreneurial thinking"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-recycling-crafts"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-ce-resources-economics",
            "title": "Resources and Economics",
            "description": "Understanding types of resources, resource management, needs vs. wants, and basic economic concepts.",
            "curriculumStandards": [
              "Production and work-related competencies",
              "Critical thinking",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Explain different types of resources",
              "Classify resources into renewable and non-renewable",
              "Demonstrate ways of protecting and conserving resources",
              "Explain the relationship between needs and resources",
              "Explain the scarcity of resources in relation to people's wants"
            ],
            "keyVocabulary": [
              "Resources",
              "Natural resources",
              "Human-made resources",
              "Human resources",
              "Renewable",
              "Non-renewable",
              "Conservation",
              "Needs",
              "Wants",
              "Scarcity"
            ],
            "exampleActivities": [
              "Identifying and classifying resources",
              "Demonstrating resource conservation",
              "Undertaking mini-projects to protect resources",
              "Matching needs with resources",
              "Analyzing resource scarcity scenarios"
            ],
            "assessmentFocus": [
              "Correct classification of resources",
              "Understanding of conservation methods",
              "Ability to match needs with resources",
              "Understanding of scarcity concept"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-resources-economics"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g6-ce-business-basics",
            "title": "Business Basics",
            "description": "Understanding producers, providers, consumers, pricing, and markets.",
            "curriculumStandards": [
              "Production and work-related competencies",
              "Entrepreneurial skills",
              "Problem-solving"
            ],
            "learningObjectives": [
              "Distinguish between producers and providers of goods and services",
              "Describe a consumer of goods and services",
              "Determine the price of goods and services",
              "Explain two different types of market"
            ],
            "keyVocabulary": [
              "Producer",
              "Provider",
              "Consumer",
              "Goods",
              "Services",
              "Price",
              "Pricing",
              "Market",
              "Face-to-face market",
              "Faceless market"
            ],
            "exampleActivities": [
              "Identifying producers and providers",
              "Role-playing buying and selling",
              "Pricing goods and services",
              "Setting up mock markets",
              "Comparing market types"
            ],
            "assessmentFocus": [
              "Understanding of economic roles",
              "Appropriate pricing decisions",
              "Knowledge of market types",
              "Practical business skills"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-business-basics"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g6-num-money-management",
                "description": "Money management and transactions"
              }
            ]
          },
          {
            "id": "g6-ce-vandalism-awareness",
            "title": "Vandalism Awareness",
            "description": "Identifying effects of vandalism in daily life and developing solutions.",
            "curriculumStandards": [
              "Awareness of self and others",
              "Problem-solving",
              "Responsibility"
            ],
            "learningObjectives": [
              "Identify effects of vandalism in daily-life"
            ],
            "keyVocabulary": [
              "Vandalism",
              "Property",
              "Effects",
              "Prevention",
              "Responsibility"
            ],
            "exampleActivities": [
              "Identifying vandalism on personal, school, and public property",
              "Discussing effects of vandalism",
              "Creating role plays on combating vandalism",
              "Developing prevention strategies"
            ],
            "assessmentFocus": [
              "Recognition of vandalism instances",
              "Understanding of vandalism effects",
              "Practical prevention strategies",
              "Demonstration of responsible values"
            ],
            "prerequisiteTopicIds": [
              "g6-ce-vandalism-awareness"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g6-pss-roles-responsibilities",
                "description": "Community responsibility and care for property"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "grade": "7",
    "subjects": [
      {
        "name": "Linguistic and Literary (Sesotho)",
        "topics": [
          {
            "id": "g7-ses-study-skills",
            "title": "Mekhoa ea ho ithuta (Study Skills)",
            "description": "Development of listening comprehension, reading strategies, dictionary use, and text analysis skills in Sesotho",
            "curriculumStandards": [],
            "learningObjectives": [
              "Listen attentively to different types of information",
              "Speak briefly about topics not chosen by themselves",
              "Use books correctly to find information",
              "Use a dictionary correctly",
              "Read different types of comprehension texts of one page length",
              "Read story books with understanding",
              "Read picture books with understanding",
              "Correct mistakes in their writing",
              "Explain the steps they took when conducting a test",
              "Design advertisements",
              "Recite poetry correctly",
              "Translate short texts from English to Sesotho"
            ],
            "keyVocabulary": [],
            "exampleActivities": [
              "Discuss in groups the importance of listening to different information",
              "Practice taking notes from announcements",
              "Listen to schedules and note important details",
              "Use index and glossary to find information in books"
            ],
            "assessmentFocus": [
              "Ability to extract key information from listened texts",
              "Correct use of dictionary for word meanings",
              "Comprehension of read texts",
              "Accuracy in self-editing written work"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (English)",
                "topicId": "g7-eng-study-skills",
                "description": "Similar study skills developed in both languages"
              }
            ]
          },
          {
            "id": "g7-ses-culture-society",
            "title": "Phelisano le Bochaba (Culture and Society)",
            "description": "Understanding Basotho culture, traditions, and social interactions",
            "curriculumStandards": [],
            "learningObjectives": [
              "Greet correctly in different situations",
              "Show respect in speech and actions",
              "Describe Sesotho foods",
              "Tell traditional stories that encourage good behavior",
              "Describe Basotho rituals",
              "Explain relationships between people according to kinship",
              "Solve riddles with answers related to body parts, plants and tools",
              "Describe animals by their colors and markings"
            ],
            "keyVocabulary": [],
            "exampleActivities": [
              "Practice appropriate greetings for different contexts",
              "Discuss Basotho traditional foods and their preparation",
              "Tell and analyze traditional stories",
              "Study family relationships and kinship terms"
            ],
            "assessmentFocus": [
              "Correct use of greetings in appropriate contexts",
              "Understanding of Basotho cultural practices",
              "Ability to tell traditional stories",
              "Knowledge of kinship relationships"
            ],
            "prerequisiteTopicIds": [
              "g7-ses-study-skills"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g7-pss-basotho-culture",
                "description": "Understanding of Basotho cultural heritage"
              }
            ]
          },
          {
            "id": "g7-ses-language-use",
            "title": "TÅ¡ebeliso ea Puo (Language Use)",
            "description": "Practical application of Sesotho language in various contexts including writing and speaking",
            "curriculumStandards": [],
            "learningObjectives": [
              "Speak and write Sesotho correctly",
              "Use Sesotho words and phrases correctly",
              "Create and enjoy tongue twisters",
              "Write a one-page narrative composition",
              "Write a one-page descriptive composition",
              "Use proverbs and sayings correctly in compositions",
              "Write a friendly letter correctly",
              "Write a business letter correctly",
              "Give encouragement and good wishes",
              "Debate on a topic",
              "Write a dialogue between three people of one page length",
              "Write numbers in words from one to one thousand five hundred",
              "Use synonyms, antonyms, and words with multiple meanings in sentences"
            ],
            "keyVocabulary": [],
            "exampleActivities": [
              "Write narrative and descriptive compositions",
              "Practice writing formal and informal letters",
              "Engage in debates on various topics",
              "Create dialogues and perform them",
              "Use proverbs and sayings in appropriate contexts"
            ],
            "assessmentFocus": [
              "Correct grammar and spelling in written work",
              "Appropriate use of formal and informal language",
              "Ability to structure different types of writing",
              "Use of proverbs and sayings in context"
            ],
            "prerequisiteTopicIds": [
              "g7-ses-study-skills"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (English)",
                "topicId": "g7-eng-language-use",
                "description": "Similar writing skills developed in both languages"
              }
            ]
          },
          {
            "id": "g7-ses-language-structure",
            "title": "Sebopeho sa Puo (Language Structure)",
            "description": "Understanding and applying Sesotho grammatical structures and word formation",
            "curriculumStandards": [],
            "learningObjectives": [
              "Form nouns using suffixes",
              "Use nouns and their pronouns correctly in sentences",
              "Use adjectives correctly in sentences",
              "Use adverbs of time and place correctly",
              "Use adjectives of color and sound in sentences"
            ],
            "keyVocabulary": [],
            "exampleActivities": [
              "Practice forming nouns with suffixes like -hali and -ana",
              "Identify and use pronouns correctly",
              "Use adjectives to describe objects and situations",
              "Apply adverbs of time and place in sentences"
            ],
            "assessmentFocus": [
              "Correct formation of nouns using suffixes",
              "Appropriate use of pronouns",
              "Correct use of adjectives and adverbs",
              "Understanding of grammatical gender in Sesotho"
            ],
            "prerequisiteTopicIds": [
              "g7-ses-language-use"
            ],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Linguistic and Literary (English)",
        "topics": [
          {
            "id": "g7-eng-study-skills",
            "title": "Study Skills",
            "description": "Development of essential study and research skills including information retrieval, dictionary use, time management, and self-editing",
            "curriculumStandards": [],
            "learningObjectives": [
              "Obtain specific information from a book",
              "Use a dictionary for different purposes",
              "Make a time-table",
              "Edit their own work",
              "Read extensively on their own",
              "Read a passage with understanding"
            ],
            "keyVocabulary": [
              "Title",
              "Author",
              "Table of contents",
              "Index",
              "Glossary",
              "Parts of speech",
              "Spelling",
              "Time-table",
              "Editing",
              "Grammar",
              "Punctuation",
              "Coherence"
            ],
            "exampleActivities": [
              "Identify titles and authors of different books",
              "Use index to find specific information from books",
              "Use glossary to find meanings of words and phrases",
              "Find meanings of words from dictionary within given time",
              "Discuss components of a time-table",
              "Draw daily and weekly study time-tables",
              "Identify and correct errors in written texts"
            ],
            "assessmentFocus": [
              "Ability to locate content using table of contents",
              "Correct use of dictionary for meanings and spelling",
              "Ability to create and follow a time-table",
              "Skill in identifying and correcting errors in writing",
              "Reading comprehension"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (Sesotho)",
                "topicId": "g7-ses-study-skills",
                "description": "Similar study skills developed in both languages"
              }
            ]
          },
          {
            "id": "g7-eng-language-structure",
            "title": "Language Structure",
            "description": "Understanding and applying English grammatical structures including parts of speech, sentence types, and tenses",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use adverbs correctly",
              "Use different types of sentences",
              "Use different tenses appropriately in speaking and writing",
              "Form nouns",
              "Use reciprocal pronouns appropriately",
              "Use compound and collective nouns correctly in speaking and writing",
              "Use prepositions appropriately"
            ],
            "keyVocabulary": [
              "Adverbs",
              "Sentences",
              "Tenses",
              "Nouns",
              "Pronouns",
              "Reciprocal pronouns",
              "Compound nouns",
              "Collective nouns",
              "Prepositions"
            ],
            "exampleActivities": [
              "Identify and use different types of adverbs",
              "Practice forming different sentence types",
              "Apply appropriate tenses in written compositions",
              "Form nouns from verbs and adjectives",
              "Use reciprocal pronouns in sentences",
              "Identify and use compound and collective nouns",
              "Practice using prepositions of place, time, and direction"
            ],
            "assessmentFocus": [
              "Correct use of adverbs in context",
              "Ability to construct different sentence types",
              "Appropriate use of tenses",
              "Correct formation and use of nouns",
              "Proper use of pronouns and prepositions"
            ],
            "prerequisiteTopicIds": [
              "g7-eng-study-skills"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-eng-language-use",
            "title": "Language Use",
            "description": "Practical application of English language in various contexts including reading, writing, and speaking",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use conditional forms correctly",
              "Use active and passive voice correctly",
              "Use synonyms and antonyms correctly",
              "Use homophones and homographs correctly in speaking and writing",
              "Read a novel with understanding",
              "Read a drama book with understanding",
              "Write a one page narrative composition",
              "Write a business letter",
              "Write a one page friendly letter",
              "Write a detailed Curriculum Vitae",
              "Tell a story on a given topic",
              "Make a three minutes impromptu speech",
              "Write a paragraph on a given topic using direct and indirect speech",
              "Analyse a poem",
              "Use idioms appropriately in speaking and writing",
              "Use proverbs appropriately in speaking and writing",
              "Compose advertisements",
              "Edit their own work"
            ],
            "keyVocabulary": [
              "Conditional forms",
              "Active voice",
              "Passive voice",
              "Synonyms",
              "Antonyms",
              "Homophones",
              "Homographs",
              "Narrative composition",
              "Business letter",
              "Friendly letter",
              "Curriculum Vitae",
              "Direct speech",
              "Indirect speech",
              "Poetry analysis",
              "Idioms",
              "Proverbs",
              "Advertisements"
            ],
            "exampleActivities": [
              "Read and analyse novels and drama books",
              "Write different types of compositions and letters",
              "Practice impromptu speeches on various topics",
              "Analyse poems for theme, imagery, and figures of speech",
              "Use idioms and proverbs appropriately in context",
              "Create written and oral advertisements",
              "Edit written work for grammar, spelling, and coherence"
            ],
            "assessmentFocus": [
              "Correct use of conditional forms",
              "Understanding of active and passive voice",
              "Ability to use synonyms and antonyms",
              "Reading comprehension of novels and drama",
              "Quality of written compositions",
              "Effectiveness of speeches and presentations",
              "Ability to analyse poetry",
              "Appropriate use of idioms and proverbs"
            ],
            "prerequisiteTopicIds": [
              "g7-eng-language-structure"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Creativity and Entrepreneurial",
                "topicId": "g7-ce-advertising",
                "description": "Creating advertisements connects language and entrepreneurship"
              }
            ]
          }
        ]
      },
      {
        "name": "Numerical and Mathematical",
        "topics": [
          {
            "id": "g7-num-sets",
            "title": "Sets and Universal Sets",
            "description": "Understanding and interpreting universal sets containing two sets",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe and interpret universal set which has two sets"
            ],
            "keyVocabulary": [
              "Universal set",
              "Subset",
              "Element",
              "Union",
              "Intersection"
            ],
            "exampleActivities": [
              "Identify elements of sets",
              "Draw Venn diagrams",
              "Solve problems involving set operations"
            ],
            "assessmentFocus": [
              "Understanding of set notation",
              "Ability to interpret Venn diagrams",
              "Correct identification of set relationships"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-num-place-value",
            "title": "Place Value to Billions",
            "description": "Understanding place value of numbers up to billions",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate an understanding of place value of up to billions"
            ],
            "keyVocabulary": [
              "Billions",
              "Millions",
              "Thousands",
              "Place value",
              "Standard form",
              "Expanded form"
            ],
            "exampleActivities": [
              "Read and write large numbers",
              "Identify place values in large numbers",
              "Compare and order large numbers"
            ],
            "assessmentFocus": [
              "Correct reading and writing of large numbers",
              "Understanding of place value system",
              "Ability to compare large numbers"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-num-ratio",
            "title": "Ratio and Proportion",
            "description": "Sharing quantities using ratios and understanding rate as comparison of measurements",
            "curriculumStandards": [],
            "learningObjectives": [
              "Share a quantity using ratio",
              "Demonstrate an understanding of rate as a comparison of two measurements with different units"
            ],
            "keyVocabulary": [
              "Ratio",
              "Proportion",
              "Rate",
              "Comparison",
              "Equivalent ratios"
            ],
            "exampleActivities": [
              "Share quantities in given ratios",
              "Solve ratio problems in practical situations",
              "Calculate rates such as speed and density"
            ],
            "assessmentFocus": [
              "Ability to share quantities using ratios",
              "Understanding of rate as comparison",
              "Application of ratio in real-life situations"
            ],
            "prerequisiteTopicIds": [
              "g7-num-place-value"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-num-percentage",
            "title": "Percentage, Profit, and Loss",
            "description": "Calculating percentages, profit, loss, commission, and discount in practical situations",
            "curriculumStandards": [],
            "learningObjectives": [
              "Calculate % profit and % loss in practical situations",
              "Calculate commission in selling of goods and services",
              "Calculate discount in buying and selling",
              "Operate a mini project involving buying and selling of items"
            ],
            "keyVocabulary": [
              "Percentage",
              "Profit",
              "Loss",
              "Commission",
              "Discount",
              "Cost price",
              "Selling price"
            ],
            "exampleActivities": [
              "Calculate profit and loss percentages",
              "Determine commission on sales",
              "Apply discount calculations in shopping scenarios",
              "Run a mini business project"
            ],
            "assessmentFocus": [
              "Correct calculation of percentages",
              "Understanding of profit and loss",
              "Ability to calculate commission and discount",
              "Application in mini project"
            ],
            "prerequisiteTopicIds": [
              "g7-num-ratio"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Creativity and Entrepreneurial",
                "topicId": "g7-ce-business-plan",
                "description": "Financial calculations used in business planning"
              }
            ]
          },
          {
            "id": "g7-num-geometry",
            "title": "Geometry and Shapes",
            "description": "Construction and properties of quadrilaterals, polygons, and their angles",
            "curriculumStandards": [],
            "learningObjectives": [
              "Construct parallelogram, rhombus, kite and trapezium",
              "Find the sum of the interior angles of regular polygons (up to twelve sided shapes)",
              "Calculate exterior angles in polygons",
              "Establish the relationship between different types of angles using their properties (vertically opposite, interior, corresponding and alternating angles)"
            ],
            "keyVocabulary": [
              "Parallelogram",
              "Rhombus",
              "Kite",
              "Trapezium",
              "Polygon",
              "Interior angles",
              "Exterior angles",
              "Vertically opposite angles",
              "Corresponding angles",
              "Alternating angles"
            ],
            "exampleActivities": [
              "Construct quadrilaterals using geometric tools",
              "Calculate interior and exterior angles of polygons",
              "Identify angle relationships in geometric figures"
            ],
            "assessmentFocus": [
              "Accuracy in construction of shapes",
              "Correct calculation of angles",
              "Understanding of angle properties"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Creativity and Entrepreneurial",
                "topicId": "g7-ce-technical-drawing",
                "description": "Geometric constructions used in technical drawing"
              }
            ]
          },
          {
            "id": "g7-num-3d-shapes",
            "title": "Three-Dimensional Shapes",
            "description": "Understanding and calculating properties of prisms and pyramids",
            "curriculumStandards": [],
            "learningObjectives": [
              "Make models and skeletons (nets) of prisms and pyramids",
              "Calculate the total surface area of prisms (rectangular, triangular and cylinder)",
              "Calculate volume of prisms (rectangular, triangular and cylinder)",
              "Establish the relationship between units of volume and capacity (ml and cm3, dm3 and litres)"
            ],
            "keyVocabulary": [
              "Prism",
              "Pyramid",
              "Net",
              "Surface area",
              "Volume",
              "Capacity",
              "Cylinder",
              "Cuboid",
              "Triangular prism"
            ],
            "exampleActivities": [
              "Create nets of 3D shapes",
              "Build models of prisms and pyramids",
              "Calculate surface area and volume",
              "Convert between volume and capacity units"
            ],
            "assessmentFocus": [
              "Ability to create accurate nets",
              "Correct calculation of surface area",
              "Correct calculation of volume",
              "Understanding of volume-capacity relationships"
            ],
            "prerequisiteTopicIds": [
              "g7-num-geometry"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-num-transformations",
            "title": "Transformations",
            "description": "Understanding and applying translations, reflections, and rotations",
            "curriculumStandards": [],
            "learningObjectives": [
              "Create designs by translating and reflecting shapes",
              "Identify translations and reflections that map congruent shapes onto each other in a given design",
              "Rotate shapes through 90Â° and 180Â°"
            ],
            "keyVocabulary": [
              "Translation",
              "Reflection",
              "Rotation",
              "Congruent",
              "Transformation",
              "Image",
              "Object"
            ],
            "exampleActivities": [
              "Translate shapes on coordinate planes",
              "Reflect shapes across lines of symmetry",
              "Rotate shapes through specified angles",
              "Create tessellation patterns"
            ],
            "assessmentFocus": [
              "Accuracy in performing transformations",
              "Ability to identify transformations in designs",
              "Understanding of congruence"
            ],
            "prerequisiteTopicIds": [
              "g7-num-geometry"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Creativity and Entrepreneurial",
                "topicId": "g7-ce-art-design",
                "description": "Transformations used in creating artistic designs"
              }
            ]
          },
          {
            "id": "g7-num-algebra",
            "title": "Basic Algebra",
            "description": "Finding unknown values in equations",
            "curriculumStandards": [],
            "learningObjectives": [
              "Find the unknown number represented by a letter in equations involving addition and subtraction of one- and two-digit numbers",
              "Find the unknown number represented by a letter in equations involving multiplication and division of one- and two-digit numbers"
            ],
            "keyVocabulary": [
              "Variable",
              "Equation",
              "Unknown",
              "Solve",
              "Expression",
              "Algebraic"
            ],
            "exampleActivities": [
              "Solve simple linear equations",
              "Use inverse operations to find unknowns",
              "Write equations from word problems"
            ],
            "assessmentFocus": [
              "Ability to solve equations correctly",
              "Understanding of inverse operations",
              "Application of algebra to problem solving"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-num-probability",
            "title": "Probability",
            "description": "Understanding and solving simple probability problems through experiments",
            "curriculumStandards": [],
            "learningObjectives": [
              "Solve simple probability problems by conducting probability experiments"
            ],
            "keyVocabulary": [
              "Probability",
              "Experiment",
              "Outcome",
              "Event",
              "Likelihood",
              "Chance"
            ],
            "exampleActivities": [
              "Conduct coin toss experiments",
              "Use spinners and dice for probability",
              "Calculate experimental probability",
              "Compare theoretical and experimental probability"
            ],
            "assessmentFocus": [
              "Ability to conduct probability experiments",
              "Understanding of probability concepts",
              "Correct calculation of probability"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-num-graphing",
            "title": "Graphing and Coordinate Plane",
            "description": "Drawing and interpreting linear graphs using the Cartesian plane",
            "curriculumStandards": [],
            "learningObjectives": [
              "Draw and label linear graphs using xy-plane (cartesian plane)"
            ],
            "keyVocabulary": [
              "Cartesian plane",
              "xy-plane",
              "Coordinates",
              "x-axis",
              "y-axis",
              "Linear graph",
              "Plot"
            ],
            "exampleActivities": [
              "Plot points on coordinate plane",
              "Draw linear graphs from tables of values",
              "Interpret information from graphs"
            ],
            "assessmentFocus": [
              "Accuracy in plotting coordinates",
              "Ability to draw linear graphs",
              "Interpretation of graphical information"
            ],
            "prerequisiteTopicIds": [
              "g7-num-algebra"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g7-st-data-recording",
                "description": "Graphing used in recording scientific data"
              }
            ]
          },
          {
            "id": "g7-num-fractions-decimals",
            "title": "Fractions and Decimals",
            "description": "Operations with fractions and decimal numbers",
            "curriculumStandards": [],
            "learningObjectives": [
              "Divide fractions with denominators less than 10",
              "Divide decimal numbers up to two decimal places by a whole number less than 10",
              "Divide decimal numbers by decimal numbers of up to two decimal places",
              "Round off decimal numbers to the nearest thousandths"
            ],
            "keyVocabulary": [
              "Fraction",
              "Decimal",
              "Division",
              "Denominator",
              "Numerator",
              "Rounding",
              "Thousandths"
            ],
            "exampleActivities": [
              "Divide fractions using visual models",
              "Perform decimal division",
              "Round decimals to specified places",
              "Solve word problems involving fractions and decimals"
            ],
            "assessmentFocus": [
              "Correct division of fractions",
              "Accuracy in decimal operations",
              "Proper rounding of decimals"
            ],
            "prerequisiteTopicIds": [
              "g7-num-ratio"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-num-statistics",
            "title": "Statistics: Mean and Median",
            "description": "Calculating measures of central tendency from collected data",
            "curriculumStandards": [],
            "learningObjectives": [
              "Calculate median in the data collected",
              "Calculate mean in the data collected"
            ],
            "keyVocabulary": [
              "Data",
              "Median",
              "Mean",
              "Average",
              "Frequency",
              "Frequency table",
              "Central tendency"
            ],
            "exampleActivities": [
              "Collect and organize data",
              "Calculate median from ordered data",
              "Calculate mean from frequency tables",
              "Interpret statistical measures"
            ],
            "assessmentFocus": [
              "Ability to organize data",
              "Correct calculation of median",
              "Correct calculation of mean",
              "Interpretation of results"
            ],
            "prerequisiteTopicIds": [
              "g7-num-graphing"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g7-st-data-analysis",
                "description": "Statistical analysis used in scientific investigations"
              }
            ]
          }
        ]
      },
      {
        "name": "Scientific and Technological",
        "topics": [
          {
            "id": "g7-st-matter-compression",
            "title": "Compression in Gases and Liquids",
            "description": "Understanding compression properties of gases and liquids using practical demonstrations",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate compression in gases and liquids using a syringe"
            ],
            "keyVocabulary": [
              "Compression",
              "Gases",
              "Liquids",
              "Syringe",
              "Volume",
              "Particles",
              "States of matter"
            ],
            "exampleActivities": [
              "Use syringes to demonstrate compression of air",
              "Compare compression of gases and liquids",
              "Draw and label parts of a syringe",
              "Measure volume changes during compression"
            ],
            "assessmentFocus": [
              "Understanding of compression concept",
              "Ability to explain why air is compressible",
              "Correct labeling of syringe parts",
              "Observation and recording skills"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-st-human-body",
            "title": "Human Body Systems",
            "description": "Understanding the structure and function of excretory and circulatory systems",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe the excretory system",
              "Describe the circulatory system"
            ],
            "keyVocabulary": [
              "Excretory system",
              "Kidneys",
              "Ureter",
              "Bladder",
              "Circulatory system",
              "Heart",
              "Blood vessels",
              "Arteries",
              "Veins",
              "Capillaries"
            ],
            "exampleActivities": [
              "Draw and label the excretory system",
              "Explain functions of each part",
              "Draw and label the circulatory system",
              "Trace the path of blood through the body"
            ],
            "assessmentFocus": [
              "Correct identification of body system parts",
              "Understanding of system functions",
              "Accuracy in diagrams"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g7-pss-health",
                "description": "Understanding body systems relates to health education"
              }
            ]
          },
          {
            "id": "g7-st-cells",
            "title": "Cell Structure and Function",
            "description": "Understanding the structure of a typical cell and functions of each part",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe the structure a typical cell and functions of each part"
            ],
            "keyVocabulary": [
              "Cell",
              "Cell membrane",
              "Cytoplasm",
              "Nucleus",
              "Cell wall",
              "Vacuole",
              "Chloroplast",
              "Mitochondria"
            ],
            "exampleActivities": [
              "Observe cells under microscope",
              "Draw and label plant and animal cells",
              "Compare plant and animal cells",
              "Explain functions of cell parts"
            ],
            "assessmentFocus": [
              "Correct identification of cell parts",
              "Understanding of cell functions",
              "Ability to compare different cell types"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-st-atoms-purity",
            "title": "Atoms and Purity",
            "description": "Understanding atomic structure and determining purity of substances",
            "curriculumStandards": [],
            "learningObjectives": [
              "Determine purity",
              "Describe the structure of an atom"
            ],
            "keyVocabulary": [
              "Atom",
              "Proton",
              "Neutron",
              "Electron",
              "Nucleus",
              "Purity",
              "Mixture",
              "Pure substance"
            ],
            "exampleActivities": [
              "Draw atomic structure",
              "Test purity of substances",
              "Compare pure and impure substances",
              "Identify elements and compounds"
            ],
            "assessmentFocus": [
              "Understanding of atomic structure",
              "Ability to determine purity",
              "Correct use of scientific terminology"
            ],
            "prerequisiteTopicIds": [
              "g7-st-cells"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-st-food-nutrition",
            "title": "Food, Nutrition and Preservation",
            "description": "Understanding cooking methods, beverages, food preservation, and spoilage",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate two main cooking methods",
              "Classify beverages and state their importance",
              "Prepare fruit drinks",
              "Preserve fruits and vegetables",
              "Describe food spoilage",
              "Identify nutrients, their sources and functions",
              "Describe deficiency diseases and their treatment"
            ],
            "keyVocabulary": [
              "Cooking methods",
              "Beverages",
              "Preservation",
              "Food spoilage",
              "Nutrients",
              "Proteins",
              "Carbohydrates",
              "Vitamins",
              "Minerals",
              "Deficiency diseases"
            ],
            "exampleActivities": [
              "Demonstrate moist and dry cooking methods",
              "Classify different types of beverages",
              "Prepare fresh fruit drinks",
              "Practice food preservation methods",
              "Identify causes of food spoilage",
              "Study nutrient sources and functions"
            ],
            "assessmentFocus": [
              "Ability to demonstrate cooking methods",
              "Knowledge of beverage types",
              "Skills in food preparation and preservation",
              "Understanding of nutrition and deficiency diseases"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g7-pss-health",
                "description": "Nutrition relates to health and wellbeing"
              }
            ]
          },
          {
            "id": "g7-st-energy-force",
            "title": "Energy, Force and Pressure",
            "description": "Understanding forms of energy, types of force, and pressure in solids",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe different forms and sources of energy",
              "Demonstrate types of force and their effects",
              "Demonstrate pressure in solids"
            ],
            "keyVocabulary": [
              "Energy",
              "Force",
              "Pressure",
              "Kinetic energy",
              "Potential energy",
              "Friction",
              "Gravity",
              "Magnetism"
            ],
            "exampleActivities": [
              "Identify forms of energy in everyday life",
              "Demonstrate different types of forces",
              "Conduct experiments on pressure",
              "Calculate pressure in solids"
            ],
            "assessmentFocus": [
              "Understanding of energy forms",
              "Ability to demonstrate force effects",
              "Correct calculation of pressure"
            ],
            "prerequisiteTopicIds": [
              "g7-st-matter-compression"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g7-num-ratio",
                "description": "Pressure calculations involve mathematical operations"
              }
            ]
          },
          {
            "id": "g7-st-earth-science",
            "title": "Earth Science",
            "description": "Understanding earth's structure, rock formation, weathering, and external movements",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe the structure of the earth",
              "Describe rock formation",
              "Describe effects of external movement of the earth",
              "Describe weathering processes and their effects"
            ],
            "keyVocabulary": [
              "Crust",
              "Mantle",
              "Core",
              "Rocks",
              "Igneous",
              "Sedimentary",
              "Metamorphic",
              "Weathering",
              "Erosion",
              "Earthquakes",
              "Volcanoes"
            ],
            "exampleActivities": [
              "Draw and label earth's layers",
              "Classify different types of rocks",
              "Study weathering processes",
              "Investigate effects of earth movements"
            ],
            "assessmentFocus": [
              "Understanding of earth's structure",
              "Knowledge of rock formation",
              "Ability to explain weathering processes",
              "Understanding of earth movements"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g7-pss-geography",
                "description": "Earth science concepts relate to geography"
              }
            ]
          },
          {
            "id": "g7-st-heat-climate",
            "title": "Heat Transfer and Climate",
            "description": "Understanding heat transfer methods and greenhouse effects",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate understanding of the pre-requisite science relevant to learning about greenhouse effects in global warming",
              "Demonstrate methods of heat transfer"
            ],
            "keyVocabulary": [
              "Heat transfer",
              "Conduction",
              "Convection",
              "Radiation",
              "Greenhouse effect",
              "Global warming",
              "Climate change"
            ],
            "exampleActivities": [
              "Demonstrate three methods of heat transfer",
              "Investigate greenhouse effect",
              "Study causes of global warming",
              "Discuss climate change impacts"
            ],
            "assessmentFocus": [
              "Understanding of heat transfer methods",
              "Knowledge of greenhouse effect",
              "Awareness of climate change"
            ],
            "prerequisiteTopicIds": [
              "g7-st-energy-force"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g7-pss-climate-change",
                "description": "Climate change is a global concern"
              }
            ]
          },
          {
            "id": "g7-st-geography-skills",
            "title": "Geography Skills",
            "description": "Using latitudes and longitudes to determine time and place",
            "curriculumStandards": [],
            "learningObjectives": [
              "Determine time and place using latitudes and longitudes",
              "Measure sunshine using sunshine recorder"
            ],
            "keyVocabulary": [
              "Latitude",
              "Longitude",
              "Coordinates",
              "Time zones",
              "Sunshine recorder",
              "Equator",
              "Prime meridian"
            ],
            "exampleActivities": [
              "Read and plot coordinates on maps",
              "Calculate time differences using longitudes",
              "Use sunshine recorder to measure sunshine hours",
              "Locate places using coordinates"
            ],
            "assessmentFocus": [
              "Ability to use coordinates",
              "Correct calculation of time",
              "Skill in using sunshine recorder"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g7-num-graphing",
                "description": "Coordinate skills used in both subjects"
              }
            ]
          },
          {
            "id": "g7-st-reproduction-classification",
            "title": "Reproduction and Classification",
            "description": "Understanding plant reproduction and classification of organisms",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe reproduction in plants",
              "Classify organisms into viri, bacteria and fungi"
            ],
            "keyVocabulary": [
              "Reproduction",
              "Pollination",
              "Fertilization",
              "Seeds",
              "Spores",
              "Virus",
              "Bacteria",
              "Fungi",
              "Microorganisms"
            ],
            "exampleActivities": [
              "Study plant reproduction processes",
              "Observe and classify microorganisms",
              "Investigate fungi and bacteria",
              "Understand disease-causing organisms"
            ],
            "assessmentFocus": [
              "Understanding of plant reproduction",
              "Ability to classify organisms",
              "Knowledge of microorganisms"
            ],
            "prerequisiteTopicIds": [
              "g7-st-cells"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-st-electricity-magnetism",
            "title": "Electricity and Magnetism",
            "description": "Understanding static electricity, magnetism, and current electricity",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate static electricity",
              "Demonstrate an understanding of magnetism",
              "Demonstrate an understanding of current electricity"
            ],
            "keyVocabulary": [
              "Static electricity",
              "Magnetism",
              "Current electricity",
              "Circuit",
              "Conductor",
              "Insulator",
              "Magnetic field",
              "Electric charge"
            ],
            "exampleActivities": [
              "Conduct static electricity experiments",
              "Investigate properties of magnets",
              "Build simple circuits",
              "Test conductors and insulators"
            ],
            "assessmentFocus": [
              "Understanding of electricity concepts",
              "Ability to demonstrate magnetic properties",
              "Skill in building circuits"
            ],
            "prerequisiteTopicIds": [
              "g7-st-energy-force"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-st-simple-machines-waves",
            "title": "Simple Machines and Waves",
            "description": "Understanding simple machines and wave properties",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe simple machines",
              "Describe waves"
            ],
            "keyVocabulary": [
              "Simple machines",
              "Lever",
              "Pulley",
              "Inclined plane",
              "Wedge",
              "Screw",
              "Waves",
              "Amplitude",
              "Frequency",
              "Wavelength"
            ],
            "exampleActivities": [
              "Identify simple machines in daily life",
              "Investigate mechanical advantage",
              "Study wave properties",
              "Demonstrate different types of waves"
            ],
            "assessmentFocus": [
              "Understanding of simple machines",
              "Knowledge of wave properties",
              "Ability to identify machines in context"
            ],
            "prerequisiteTopicIds": [
              "g7-st-energy-force"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-st-agriculture",
            "title": "Agriculture and Soil Science",
            "description": "Understanding agriculture's importance, soil formation, structure, and fertility",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe the socio-economic importance of agriculture in Lesotho",
              "Investigate factors affecting agriculture",
              "Describe soil formation",
              "Describe soil profile",
              "Determine soil texture",
              "Describe soil structure",
              "Describe soil fertility",
              "Identify implements their uses and care"
            ],
            "keyVocabulary": [
              "Agriculture",
              "Soil formation",
              "Soil profile",
              "Soil texture",
              "Soil structure",
              "Soil fertility",
              "Agricultural implements",
              "Horizons"
            ],
            "exampleActivities": [
              "Study importance of agriculture in Lesotho",
              "Investigate soil formation processes",
              "Examine soil profiles",
              "Test soil texture",
              "Identify agricultural tools and their uses"
            ],
            "assessmentFocus": [
              "Understanding of agriculture's importance",
              "Knowledge of soil science",
              "Ability to identify and use implements",
              "Skill in soil testing"
            ],
            "prerequisiteTopicIds": [
              "g7-st-earth-science"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g7-pss-economy",
                "description": "Agriculture's role in economy"
              }
            ]
          },
          {
            "id": "g7-st-ecology",
            "title": "Ecology and Food Webs",
            "description": "Understanding ecological relationships and food webs",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe a food web"
            ],
            "keyVocabulary": [
              "Food web",
              "Food chain",
              "Producer",
              "Consumer",
              "Decomposer",
              "Herbivore",
              "Carnivore",
              "Omnivore",
              "Ecosystem"
            ],
            "exampleActivities": [
              "Draw food chains and food webs",
              "Identify producers and consumers",
              "Study energy flow in ecosystems",
              "Investigate local ecosystems"
            ],
            "assessmentFocus": [
              "Understanding of food web concept",
              "Ability to draw food webs",
              "Knowledge of ecological relationships"
            ],
            "prerequisiteTopicIds": [
              "g7-st-reproduction-classification"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-st-ict-excel",
            "title": "Excel Spreadsheet Basics",
            "description": "Performing basic functions in Microsoft Excel",
            "curriculumStandards": [],
            "learningObjectives": [
              "Perform basic functions of excel programme"
            ],
            "keyVocabulary": [
              "Excel",
              "Spreadsheet",
              "Cells",
              "Rows",
              "Columns",
              "Formulas",
              "Functions"
            ],
            "exampleActivities": [
              "Create spreadsheets",
              "Enter and format data",
              "Use basic formulas",
              "Create simple charts"
            ],
            "assessmentFocus": [
              "Ability to use Excel features",
              "Correct use of formulas",
              "Skill in data organization"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g7-num-statistics",
                "description": "Excel used for statistical calculations"
              }
            ]
          },
          {
            "id": "g7-st-ict-powerpoint",
            "title": "PowerPoint Presentation Skills",
            "description": "Formatting text and creating slide shows using PowerPoint",
            "curriculumStandards": [],
            "learningObjectives": [
              "Format text on a slide using power point"
            ],
            "keyVocabulary": [
              "PowerPoint",
              "Slides",
              "Presentation",
              "Formatting",
              "Design templates",
              "Animation",
              "Slide show"
            ],
            "exampleActivities": [
              "Create presentations",
              "Format text on slides",
              "Apply design templates",
              "Add animations and effects",
              "Present slide shows"
            ],
            "assessmentFocus": [
              "Ability to format slides",
              "Creativity in design",
              "Quality of presentations"
            ],
            "prerequisiteTopicIds": [
              "g7-st-ict-excel"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-st-ict-email",
            "title": "Email Communication",
            "description": "Setting up and using email for communication",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use internet to set-up and send e-mails"
            ],
            "keyVocabulary": [
              "Email",
              "Internet",
              "Mailbox",
              "Inbox",
              "Send",
              "Reply",
              "Attachment",
              "Carbon copy"
            ],
            "exampleActivities": [
              "Set up email accounts",
              "Send and receive emails",
              "Attach files to emails",
              "Manage mailbox",
              "Practice email etiquette"
            ],
            "assessmentFocus": [
              "Ability to set up email",
              "Skill in sending and managing emails",
              "Understanding of email etiquette"
            ],
            "prerequisiteTopicIds": [
              "g7-st-ict-powerpoint"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (English)",
                "topicId": "g7-eng-language-use",
                "description": "Email writing requires language skills"
              }
            ]
          }
        ]
      },
      {
        "name": "Personal, Spiritual and Social",
        "topics": [
          {
            "id": "g7-pss-patriotism",
            "title": "Patriotism and National Identity",
            "description": "Understanding and demonstrating patriotism",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate understanding of patriotism"
            ],
            "keyVocabulary": [
              "Patriotism",
              "National identity",
              "Citizenship",
              "National symbols",
              "Pledge"
            ],
            "exampleActivities": [
              "Discuss how patriotism can be demonstrated",
              "Identify acts of patriotism",
              "Make pledges for the country",
              "Study national symbols"
            ],
            "assessmentFocus": [
              "Understanding of patriotism",
              "Ability to identify patriotic acts",
              "Commitment to national development"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-pss-moshoeshoe-nation-building",
            "title": "Moshoeshoe I and Nation Building",
            "description": "Understanding Moshoeshoe I's leadership in building the Basotho nation",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate appreciation of Moshoeshoe 1's leadership qualities in external strategies in nation building",
              "Appreciate Moshoeshoe I's ways of avoiding conflict with his African neighbours during nation building",
              "Demonstrate understanding of domestic and foreign mediation",
              "Describe the way Moshoeshoe 1 maintained relations with the Boers"
            ],
            "keyVocabulary": [
              "Moshoeshoe I",
              "Nation building",
              "Leadership",
              "Diplomacy",
              "Tribute",
              "Treaties",
              "Boers",
              "Missionaries"
            ],
            "exampleActivities": [
              "Study Moshoeshoe's diplomatic strategies",
              "Discuss battles and conflicts",
              "Analyze treaty negotiations",
              "Study relationships with neighboring groups"
            ],
            "assessmentFocus": [
              "Understanding of leadership qualities",
              "Knowledge of diplomatic strategies",
              "Ability to analyze historical events"
            ],
            "prerequisiteTopicIds": [
              "g7-pss-patriotism"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-pss-british-rule",
            "title": "Basotho Under British Rule",
            "description": "Understanding how Basotho were governed by Britain from 1868-1966",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe the way Basotho were governed by Britain in 1868-1884",
              "Describe the way Basotho were governed by Britain in 1884-1966"
            ],
            "keyVocabulary": [
              "British rule",
              "Colonial administration",
              "Protectorate",
              "Independence",
              "Governance"
            ],
            "exampleActivities": [
              "Study colonial administration structures",
              "Compare different periods of British rule",
              "Analyze impact of colonial rule",
              "Study path to independence"
            ],
            "assessmentFocus": [
              "Understanding of colonial history",
              "Ability to compare different periods",
              "Knowledge of governance systems"
            ],
            "prerequisiteTopicIds": [
              "g7-pss-moshoeshoe-nation-building"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-pss-international-organizations",
            "title": "Regional and International Organizations",
            "description": "Understanding SADC, AU, and Commonwealth of Nations",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe the functions of SADC organs",
              "Describe the functions of AU structure",
              "Situate Lesotho within Commonwealth of Nations"
            ],
            "keyVocabulary": [
              "SADC",
              "African Union",
              "Commonwealth",
              "Regional cooperation",
              "International relations"
            ],
            "exampleActivities": [
              "Study structure of SADC",
              "Discuss functions of AU organs",
              "Investigate Lesotho's role in Commonwealth",
              "Research current activities of these organizations"
            ],
            "assessmentFocus": [
              "Knowledge of organizational structures",
              "Understanding of functions",
              "Awareness of Lesotho's membership"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-pss-spiritual-life",
            "title": "Spiritual Life and Values",
            "description": "Understanding life as God's gift, forgiveness, and dealing with life's realities",
            "curriculumStandards": [],
            "learningObjectives": [
              "Respect life as the gift from God",
              "Demonstrate understanding of forgiveness and reconciliation",
              "Describe some realities of life",
              "Demonstrate understanding of patience and persistence",
              "Compare Jesus's healing with today's healing",
              "Differentiate between the way Jesus drove out demons from possessed people and the way Basotho do"
            ],
            "keyVocabulary": [
              "Spiritual life",
              "Forgiveness",
              "Reconciliation",
              "Faith",
              "Patience",
              "Persistence",
              "Healing",
              "Biblical texts"
            ],
            "exampleActivities": [
              "Study biblical texts on life and forgiveness",
              "Discuss aspects of spiritual life",
              "Share experiences of forgiveness",
              "Role-play forgiveness scenarios",
              "Compare healing methods"
            ],
            "assessmentFocus": [
              "Understanding of spiritual concepts",
              "Ability to apply forgiveness",
              "Knowledge of biblical teachings"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-pss-health-first-aid",
            "title": "Health and First Aid",
            "description": "Understanding first aid treatment for fainting and fractures",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe treatment of fainting",
              "Describe different types of fractures"
            ],
            "keyVocabulary": [
              "Fainting",
              "First aid",
              "Fractures",
              "Treatment",
              "Signs and symptoms",
              "Emergency response"
            ],
            "exampleActivities": [
              "Learn causes and symptoms of fainting",
              "Demonstrate first aid for fainting",
              "Study types of fractures",
              "Practice first aid procedures",
              "Role-play emergency situations"
            ],
            "assessmentFocus": [
              "Knowledge of first aid procedures",
              "Ability to demonstrate treatment",
              "Understanding of health emergencies"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g7-st-human-body",
                "description": "Understanding body systems relates to first aid"
              }
            ]
          },
          {
            "id": "g7-pss-geography",
            "title": "Geography: Settlements and Population",
            "description": "Understanding settlements, population distribution, and migration",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe settlements according to size and function",
              "Classify countries into Northern and Southern regions in the world map",
              "Describe advantages and disadvantages of migration",
              "Describe factors influencing population distribution and density"
            ],
            "keyVocabulary": [
              "Settlement",
              "Rural",
              "Urban",
              "Migration",
              "Population distribution",
              "Population density",
              "Hemispheres"
            ],
            "exampleActivities": [
              "Compare rural and urban settlements",
              "Draw different settlement patterns",
              "Study world map regions",
              "Investigate migration patterns",
              "Analyze population distribution factors"
            ],
            "assessmentFocus": [
              "Understanding of settlement types",
              "Knowledge of migration impacts",
              "Ability to interpret population data"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g7-st-geography-skills",
                "description": "Geographic concepts connect both subjects"
              }
            ]
          },
          {
            "id": "g7-pss-economy",
            "title": "Economic Development",
            "description": "Understanding development, industries, and economic concepts",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe the concept of development",
              "Identify the three industrial estates found in Lesotho",
              "Describe the advantages and disadvantages of industries in Lesotho"
            ],
            "keyVocabulary": [
              "Development",
              "Industries",
              "Industrial estates",
              "Economic growth",
              "Manufacturing"
            ],
            "exampleActivities": [
              "Define development indicators",
              "Locate industrial estates in Lesotho",
              "Study types of industries",
              "Analyze advantages and disadvantages of industrialization",
              "Visit local industries"
            ],
            "assessmentFocus": [
              "Understanding of development concept",
              "Knowledge of Lesotho's industries",
              "Ability to analyze economic impacts"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g7-st-agriculture",
                "description": "Agriculture and industry both contribute to economy"
              }
            ]
          },
          {
            "id": "g7-pss-climate-change",
            "title": "Climate Change",
            "description": "Understanding and mitigating climate change in Lesotho",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe ways of mitigating against climate change in Lesotho"
            ],
            "keyVocabulary": [
              "Climate change",
              "Mitigation",
              "Adaptation",
              "Environmental conservation",
              "Sustainability"
            ],
            "exampleActivities": [
              "Study causes of climate change",
              "Identify impacts in Lesotho",
              "Discuss mitigation strategies",
              "Plan environmental conservation activities"
            ],
            "assessmentFocus": [
              "Understanding of climate change",
              "Knowledge of mitigation methods",
              "Commitment to environmental action"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g7-st-heat-climate",
                "description": "Scientific understanding of climate change"
              }
            ]
          },
          {
            "id": "g7-pss-talents",
            "title": "Discovering and Developing Talents",
            "description": "Understanding how to discover and develop individual talents",
            "curriculumStandards": [],
            "learningObjectives": [
              "Describe ways of discovering and developing talents"
            ],
            "keyVocabulary": [
              "Talents",
              "Abilities",
              "Skills development",
              "Self-discovery",
              "Career"
            ],
            "exampleActivities": [
              "Identify personal talents",
              "Explore different talent areas",
              "Plan talent development strategies",
              "Share talents with others"
            ],
            "assessmentFocus": [
              "Self-awareness of talents",
              "Understanding of development methods",
              "Commitment to skill building"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Creativity and Entrepreneurial",
                "topicId": "g7-ce-business-idea",
                "description": "Talents can be developed into businesses"
              }
            ]
          },
          {
            "id": "g7-pss-physical-education",
            "title": "Physical Education: Sports Skills",
            "description": "Developing skills in shot put, volleyball, and ballroom dancing",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate appropriate throwing techniques in shot put",
              "Demonstrate appropriate basic skills in volleyball game",
              "Perform ball room dances"
            ],
            "keyVocabulary": [
              "Shot put",
              "Volleyball",
              "Ballroom dancing",
              "Techniques",
              "Rules",
              "Teamwork",
              "Physical fitness"
            ],
            "exampleActivities": [
              "Practice shot put throwing techniques",
              "Learn volleyball skills and rules",
              "Practice ballroom dance steps",
              "Participate in team games",
              "Demonstrate sports techniques"
            ],
            "assessmentFocus": [
              "Correct technique demonstration",
              "Understanding of game rules",
              "Physical skill development",
              "Teamwork and cooperation"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Life Skills Based Sexuality Education",
        "topics": [
          {
            "id": "g7-lbse-self-others",
            "title": "Knowing Oneself and Living with Others",
            "description": "Developing self-awareness and interpersonal skills",
            "curriculumStandards": [],
            "learningObjectives": [
              "Develop self-awareness and positive self-image",
              "Build healthy relationships with others",
              "Develop empathy and tolerance"
            ],
            "keyVocabulary": [
              "Self-awareness",
              "Self-esteem",
              "Interpersonal skills",
              "Relationships",
              "Empathy",
              "Tolerance"
            ],
            "exampleActivities": [
              "Discuss personal strengths and weaknesses",
              "Practice communication skills",
              "Engage in team-building activities",
              "Reflect on relationships"
            ],
            "assessmentFocus": [
              "Self-awareness demonstrated",
              "Quality of interpersonal interactions",
              "Empathy shown towards others"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-lbse-rights-protection",
            "title": "Human Rights and Child Protection",
            "description": "Understanding children's rights and protection from violence",
            "curriculumStandards": [],
            "learningObjectives": [
              "Identify children's rights",
              "Act to reduce violence against children",
              "Report violations of rights",
              "Access child protection services"
            ],
            "keyVocabulary": [
              "Children's rights",
              "Child protection",
              "Violence",
              "Child labour",
              "Sexual exploitation",
              "Trafficking"
            ],
            "exampleActivities": [
              "Study children's rights in CRC",
              "Identify forms of violence",
              "Discuss prevention strategies",
              "Learn about protection services",
              "Practice saying no to abuse"
            ],
            "assessmentFocus": [
              "Knowledge of children's rights",
              "Understanding of protection measures",
              "Ability to report violations"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g7-pss-spiritual-life",
                "description": "Human dignity and rights connect to spiritual values"
              }
            ]
          },
          {
            "id": "g7-lbse-gender",
            "title": "Gender Norms and Gender Equality",
            "description": "Understanding and rejecting harmful gender practices",
            "curriculumStandards": [],
            "learningObjectives": [
              "Reject gender practices and norms that are harmful to children's rights and well-being",
              "Understand effects of peer gender norms",
              "Practice refusal skills"
            ],
            "keyVocabulary": [
              "Gender norms",
              "Gender equality",
              "Harmful practices",
              "Early marriage",
              "Teenage pregnancy",
              "Gender-based violence"
            ],
            "exampleActivities": [
              "Identify harmful gender practices",
              "Discuss gender equality",
              "Practice refusal skills through role-play",
              "Analyze case studies on gender issues"
            ],
            "assessmentFocus": [
              "Understanding of gender concepts",
              "Ability to identify harmful practices",
              "Skill in refusing negative pressure"
            ],
            "prerequisiteTopicIds": [
              "g7-lbse-rights-protection"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-lbse-reproductive-health",
            "title": "Sexual and Reproductive Health",
            "description": "Understanding sexual health, abstinence, and making informed decisions",
            "curriculumStandards": [],
            "learningObjectives": [
              "Demonstrate intentions to abstain when confronted with romantic and sexual feelings",
              "Avoid situations that may put them at risk of sexual abuse",
              "Make informed decisions about sexual health"
            ],
            "keyVocabulary": [
              "Sexual health",
              "Reproductive health",
              "Abstinence",
              "Sexual feelings",
              "Consent",
              "Sexual abuse",
              "Risk situations"
            ],
            "exampleActivities": [
              "Discuss influences on sexual decisions",
              "Identify ways of dealing with romantic feelings",
              "Analyze risky situations",
              "Practice decision-making skills",
              "Learn about protective tools"
            ],
            "assessmentFocus": [
              "Understanding of sexual health concepts",
              "Ability to make informed decisions",
              "Skill in avoiding risky situations"
            ],
            "prerequisiteTopicIds": [
              "g7-lbse-gender"
            ],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-lbse-sti-hiv",
            "title": "Sexually Transmitted Infections including HIV and AIDS",
            "description": "Understanding STIs, HIV/AIDS, prevention, and support",
            "curriculumStandards": [],
            "learningObjectives": [
              "Understand transmission and prevention of STIs including HIV",
              "Know how to access testing and treatment services",
              "Support people living with HIV",
              "Reduce stigma and discrimination"
            ],
            "keyVocabulary": [
              "STIs",
              "HIV",
              "AIDS",
              "Transmission",
              "Prevention",
              "Testing",
              "Treatment",
              "Stigma"
            ],
            "exampleActivities": [
              "Learn about STIs and HIV/AIDS",
              "Discuss prevention methods",
              "Understand testing procedures",
              "Learn about treatment options",
              "Address stigma and discrimination"
            ],
            "assessmentFocus": [
              "Knowledge of STIs and HIV",
              "Understanding of prevention",
              "Awareness of support services",
              "Attitude towards affected persons"
            ],
            "prerequisiteTopicIds": [
              "g7-lbse-reproductive-health"
            ],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g7-st-human-body",
                "description": "Understanding body systems relates to health"
              }
            ]
          },
          {
            "id": "g7-lbse-substances",
            "title": "Drugs, Alcohol and Substance Abuse",
            "description": "Understanding and preventing drug and substance abuse",
            "curriculumStandards": [],
            "learningObjectives": [
              "Understand factors influencing drug abuse",
              "Recognize link between drugs and STIs/HIV",
              "Learn avoidance strategies",
              "Know about rehabilitation services"
            ],
            "keyVocabulary": [
              "Drugs",
              "Alcohol",
              "Substance abuse",
              "Addiction",
              "Peer pressure",
              "Prevention",
              "Rehabilitation"
            ],
            "exampleActivities": [
              "Discuss myths and facts about drugs",
              "Identify factors influencing abuse",
              "Study consequences of abuse",
              "Practice refusal skills",
              "Learn about support services"
            ],
            "assessmentFocus": [
              "Knowledge of drugs and their effects",
              "Understanding of risk factors",
              "Ability to resist pressure",
              "Awareness of help available"
            ],
            "prerequisiteTopicIds": [
              "g7-lbse-sti-hiv"
            ],
            "crossCurricularLinks": []
          }
        ]
      },
      {
        "name": "Creativity and Entrepreneurial",
        "topics": [
          {
            "id": "g7-ce-art-design",
            "title": "Art and Design",
            "description": "Developing artistic skills through drawing, perspective, and design",
            "curriculumStandards": [],
            "learningObjectives": [
              "Draw scenes from observation",
              "Draw from one point perspective",
              "Draw human figure",
              "Design book jacket",
              "Paint mural on a wall",
              "Design signs and symbols",
              "Design furniture and make model jewellery earrings",
              "Use available materials to model"
            ],
            "keyVocabulary": [
              "Observation drawing",
              "Perspective",
              "Elements of art",
              "Line",
              "Tone",
              "Texture",
              "Form",
              "Shape",
              "Color",
              "Balance",
              "Unity"
            ],
            "exampleActivities": [
              "Sketch scenes from environment",
              "Practice one-point perspective drawing",
              "Draw human figures in different poses",
              "Design book covers",
              "Create signs and symbols",
              "Model with available materials"
            ],
            "assessmentFocus": [
              "Quality of drawings",
              "Use of perspective",
              "Creativity in design",
              "Application of art elements"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g7-num-geometry",
                "description": "Geometric concepts used in art and design"
              }
            ]
          },
          {
            "id": "g7-ce-technical-drawing",
            "title": "Technical Drawing",
            "description": "Developing technical drawing skills using orthographic projection",
            "curriculumStandards": [],
            "learningObjectives": [
              "Draw orthographic projection in two planes at first angle projection"
            ],
            "keyVocabulary": [
              "Orthographic projection",
              "First angle projection",
              "Front view",
              "Side view",
              "Top view",
              "Technical drawing"
            ],
            "exampleActivities": [
              "Practice orthographic projections",
              "Draw objects in multiple views",
              "Use drawing instruments correctly",
              "Create technical sketches"
            ],
            "assessmentFocus": [
              "Accuracy of projections",
              "Correct use of drawing tools",
              "Understanding of views"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g7-num-geometry",
                "description": "Geometric principles apply to technical drawing"
              }
            ]
          },
          {
            "id": "g7-ce-music",
            "title": "Music Theory and Composition",
            "description": "Understanding music theory, scales, and composition",
            "curriculumStandards": [],
            "learningObjectives": [
              "Construct sharps through use of cycle of 5ths and tetra chord formation",
              "Construct three major scales with sharps",
              "Construct three major scales with flats",
              "Identify the simple time signatures in tonic sol-fa and staff notation",
              "Compose and write simple musicals",
              "Identify compound time rhythm in tonic sol-fa and staff notation"
            ],
            "keyVocabulary": [
              "Sharps",
              "Flats",
              "Major scales",
              "Cycle of fifths",
              "Tetrachord",
              "Time signatures",
              "Tonic sol-fa",
              "Staff notation",
              "Musical composition"
            ],
            "exampleActivities": [
              "Practice constructing scales",
              "Read and write music notation",
              "Identify time signatures",
              "Compose simple melodies",
              "Perform musical pieces"
            ],
            "assessmentFocus": [
              "Understanding of music theory",
              "Ability to construct scales",
              "Skill in reading notation",
              "Quality of compositions"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-ce-drama",
            "title": "Drama and Performance",
            "description": "Writing scripts and performing dramatic works",
            "curriculumStandards": [],
            "learningObjectives": [
              "Write script for drama",
              "Act out musicals",
              "Dramatize own scripts"
            ],
            "keyVocabulary": [
              "Script",
              "Drama",
              "Musical",
              "Performance",
              "Acting",
              "Dialogue",
              "Stage directions"
            ],
            "exampleActivities": [
              "Write drama scripts",
              "Practice acting techniques",
              "Perform musicals",
              "Dramatize original works",
              "Create stage productions"
            ],
            "assessmentFocus": [
              "Quality of scripts",
              "Performance skills",
              "Creativity in dramatization",
              "Teamwork in productions"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (English)",
                "topicId": "g7-eng-language-use",
                "description": "Writing scripts requires language skills"
              }
            ]
          },
          {
            "id": "g7-ce-advertising",
            "title": "Advertising and Marketing",
            "description": "Using media to promote products and services",
            "curriculumStandards": [],
            "learningObjectives": [
              "Use four media of advertising to promote products and services",
              "Marketing"
            ],
            "keyVocabulary": [
              "Advertising",
              "Marketing",
              "Media",
              "Promotion",
              "Product",
              "Target audience",
              "Campaign"
            ],
            "exampleActivities": [
              "Create advertisements",
              "Use different media for promotion",
              "Study marketing strategies",
              "Present advertising campaigns",
              "Analyze effective advertisements"
            ],
            "assessmentFocus": [
              "Creativity in advertisements",
              "Understanding of marketing",
              "Effective use of media",
              "Quality of campaigns"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Linguistic and Literary (English)",
                "topicId": "g7-eng-language-use",
                "description": "Advertising requires language and communication skills"
              }
            ]
          },
          {
            "id": "g7-ce-business-idea",
            "title": "Entrepreneurship and Business Development",
            "description": "Developing business ideas and creating business plans",
            "curriculumStandards": [],
            "learningObjectives": [
              "Develop business idea",
              "Draw a simple business plan",
              "Make project appraisal",
              "Carry-out a mini research on HIV and AIDS situation in their area"
            ],
            "keyVocabulary": [
              "Business idea",
              "Business plan",
              "Entrepreneurship",
              "Market research",
              "Project appraisal",
              "Capital",
              "Profit"
            ],
            "exampleActivities": [
              "Identify business opportunities",
              "Develop business ideas",
              "Create simple business plans",
              "Conduct market research",
              "Evaluate business projects"
            ],
            "assessmentFocus": [
              "Viability of business ideas",
              "Quality of business plans",
              "Understanding of entrepreneurship",
              "Research skills"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Numerical and Mathematical",
                "topicId": "g7-num-percentage",
                "description": "Business calculations involve percentages and profit"
              }
            ]
          },
          {
            "id": "g7-ce-ict-skills",
            "title": "Advanced ICT Skills",
            "description": "Manipulating images and computer-aided design",
            "curriculumStandards": [],
            "learningObjectives": [
              "Manipulate and edit photographic images",
              "Design basic computer aided art"
            ],
            "keyVocabulary": [
              "Image manipulation",
              "Photo editing",
              "Computer-aided design",
              "CAD",
              "Digital art",
              "Graphics"
            ],
            "exampleActivities": [
              "Edit photographic images",
              "Create digital art",
              "Use design software",
              "Manipulate graphics",
              "Create computer-aided designs"
            ],
            "assessmentFocus": [
              "Skill in image editing",
              "Quality of digital designs",
              "Understanding of design software",
              "Creativity in digital art"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Scientific and Technological",
                "topicId": "g7-st-ict-powerpoint",
                "description": "ICT skills build on previous computer knowledge"
              }
            ]
          },
          {
            "id": "g7-ce-practical-skills",
            "title": "Practical Life Skills",
            "description": "Developing practical skills in various areas",
            "curriculumStandards": [],
            "learningObjectives": [
              "Paint nails (manicure and pedicure)",
              "Plan and design landscaping"
            ],
            "keyVocabulary": [
              "Manicure",
              "Pedicure",
              "Landscaping",
              "Design",
              "Practical skills",
              "Grooming"
            ],
            "exampleActivities": [
              "Practice nail care techniques",
              "Learn grooming skills",
              "Plan landscape designs",
              "Create landscaping models",
              "Demonstrate practical skills"
            ],
            "assessmentFocus": [
              "Skill in nail care",
              "Quality of landscape designs",
              "Attention to detail",
              "Practical application"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": []
          },
          {
            "id": "g7-ce-strategic-thinking",
            "title": "Strategic Thinking and Social Awareness",
            "description": "Developing strategic thinking and social consciousness",
            "curriculumStandards": [],
            "learningObjectives": [
              "Play chess as game of strategy from other cultures",
              "Identify impact of vandalism on economy",
              "Identify components of intellectual property"
            ],
            "keyVocabulary": [
              "Strategy",
              "Chess",
              "Vandalism",
              "Economy",
              "Intellectual property",
              "Copyright",
              "Patent"
            ],
            "exampleActivities": [
              "Learn and play chess",
              "Study strategic thinking",
              "Discuss impact of vandalism",
              "Understand intellectual property rights",
              "Analyze economic impacts"
            ],
            "assessmentFocus": [
              "Strategic thinking demonstrated",
              "Understanding of social issues",
              "Knowledge of intellectual property",
              "Chess playing skills"
            ],
            "prerequisiteTopicIds": [],
            "crossCurricularLinks": [
              {
                "subject": "Personal, Spiritual and Social",
                "topicId": "g7-pss-economy",
                "description": "Economic concepts connect both subjects"
              }
            ]
          }
        ]
      }
    ]
  }
],
  highSchool: [
    { grade: "Grade 8", subjects: [{ name: "Mathematics", topics: gradeToTopic(["Sets", "Algebraic Expressions", "Polygons"], '8', 'Mathematics') }, { name: "English Language", topics: gradeToTopic(["Nouns", "Verbs", "Tenses"], '8', 'English Language') }, { name: "Science and Technology", topics: gradeToTopic(["Irrigation", "Soil Fertility", "Acids & Bases"], '8', 'Science and Technology') }, { name: "Social Science", topics: gradeToTopic(["Conflict Resolution", "Democracy", "Health Systems"], '8', 'Social Science') }, { name: "Arts and Entrepreneurial", topics: gradeToTopic(["Freehand Drawing", "Drama Production", "Business Plan"], '8', 'Arts and Entrepreneurial') }] },
    { grade: "Grade 9", subjects: [{ name: "Mathematics", topics: gradeToTopic(["Sets", "Quadratic Sequences", "Trigonometry"], '9', 'Mathematics') }, { name: "Sesotho", topics: gradeToTopic(["Reading Comprehension", "Composition Writing", "Grammar"], '9', 'Sesotho') }, { name: "Agriculture", topics: gradeToTopic(["Land Use", "Soil Types", "Crop Production"], '9', 'Agriculture') }, { name: "Accounting", topics: gradeToTopic(["Financial Records", "Budgeting", "Double Entry System"], '9', 'Accounting') }, { name: "Religious Studies", topics: gradeToTopic(["Miracles", "Parables", "Faith"], '9', 'Religious Studies') }] },
    { grade: "Grade 10", subjects: [{ name: "Mathematics", topics: gradeToTopic(["Sets", "Quadratic Sequences", "Trigonometry"], '10', 'Mathematics') }, { name: "Accounting", topics: gradeToTopic(["Payroll", "Depreciation", "Financial Statements"], '10', 'Accounting') }, { name: "Sesotho", topics: gradeToTopic(["Reading Comprehension", "Composition Writing"], '10', 'Sesotho') }, { name: "Agriculture", topics: gradeToTopic(["Soil Erosion", "Plant Reproduction", "Farm Mechanization"], '10', 'Agriculture') }, { name: "Biology", topics: gradeToTopic(["Cell Structure", "Enzymes", "Nutrition"], '10', 'Biology') }, { name: "Geography", topics: gradeToTopic(["Plate Tectonics", "Weathering", "River Processes"], '10', 'Geography') }] },
    { grade: "Grade 11", subjects: [{ name: "Mathematics", topics: gradeToTopic(["Cubic Sequences", "Composite Solids", "Linear Programming"], '11', 'Mathematics') }, { name: "Accounting", topics: gradeToTopic(["Payroll", "Depreciation", "Financial Statements"], '11', 'Accounting') }, { name: "Sesotho", topics: gradeToTopic(["Reading Comprehension", "Composition Writing"], '11', 'Sesotho') }, { name: "Agriculture", topics: gradeToTopic(["Soil Erosion", "Plant Reproduction", "Farm Mechanization"], '11', 'Agriculture') }, { name: "Biology", topics: gradeToTopic(["Cell Structure", "Enzymes", "Nutrition"], '11', 'Biology') }, { name: "Geography", topics: gradeToTopic(["Plate Tectonics", "Weathering", "River Processes"], '11', 'Geography') }, { name: "Business Studies", topics: gradeToTopic(["Business Activity", "Marketing", "Operations Management"], '11', 'Business Studies') }] },
  ]
};

// Combine primary and high school grades into a single array for easier access throughout the app.
export const allGrades: Grade[] = [...curriculumData.primary, ...curriculumData.highSchool];