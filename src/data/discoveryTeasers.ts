// Authored teasers for the Daily Chai discovery pick. The whole point of a
// discovery card is that the HEADLINE carries the insight on its own — you
// should get the "aha" without reading the body — and that the insight lands in
// modern life. The body then grounds it in the actual story and cites it.
//
// Voice: product-spec §8 (Teaching voice + Reads-human texture), calibrated to
// the `f-wheel-karma` card in foundations.ts. In practice:
//   - plain, spoken sentences; one idea at a time; simple vocabulary
//   - define a term the moment it appears ("bhakti, the path of devotion")
//   - concrete before abstract (the rope, the guarded door, the lump of salt)
//   - NO em-dashes in the prose, and no "X, not Y" slogan pairs or chiasmus
//   - the modern relevance is honest to the source, never bent to fit
//
// Keyed by the permanent content-ref the discovery pool already uses
// (`deity:rama`, `concept:maya`, …). dailyPickService gates discovery to refs
// that (a) have a teaser here, (b) are unseen, (c) route — so a flat catalog
// blurb can never ship. The `eyebrow` is title-case; the card uppercases it.
export interface DiscoveryTeaser {
  eyebrow: string; // subject-bearing, e.g. 'Meet Rama' → "☕ DAILY CHAI · MEET RAMA"
  headline: string; // the standalone insight (the card's hero line)
  body: string; // grounds the insight in the story, in the §8 voice
  citation: string; // famous, verifiable locus; tradition/folk labeled honestly
  krishnaPrompt: string; // pre-seeded Ask Krishna question
}

export const DISCOVERY_TEASERS: Record<string, DiscoveryTeaser> = {
  // ---- Deities -------------------------------------------------------------
  'deity:krishna': {
    eyebrow: 'Meet Krishna',
    headline: 'The god most loved for his joy gave his hardest talk on a battlefield.',
    body: 'Krishna is the flute player, the mischievous child who stole butter, the friend who teases. But the moment he is most remembered for is not playful at all. On the edge of a war, a soldier named Arjuna freezes, sick at the thought of fighting his own family. Krishna sits with him in the chariot and talks him through it. That conversation became the Bhagavad Gita, and people have carried it for guidance ever since.',
    citation: 'Bhagavad Gita',
    krishnaPrompt: 'Why did Krishna give the Gita in the middle of a battle?',
  },
  'deity:shiva': {
    eyebrow: 'Meet Shiva',
    headline: 'Shiva destroys things, and that is exactly why people love him.',
    body: 'Shiva is often called the destroyer, which sounds frightening at first. But in this tradition, an ending is not the enemy of a beginning. It is what makes room for one. A field has to be cleared before anything new can grow. Shiva is the force that clears the field, which is why he is honored and not feared.',
    citation: 'Shaiva tradition; the Puranas',
    krishnaPrompt: 'Why is Shiva called the destroyer, and why is that a good thing?',
  },
  'deity:ganesha': {
    eyebrow: 'Meet Ganesha',
    headline: 'New beginnings often come right out of a loss.',
    body: 'Ganesha is the god people call on before anything new: a wedding, a business, a move. But his own start was a loss. As a boy he was guarding his mother’s door and turned away a stranger, not knowing it was Shiva, his father. In the anger of that moment he lost his head, and was given a new one, the elephant’s. The god of fresh starts began with a hard ending.',
    citation: 'Shiva Purana',
    krishnaPrompt: 'How did Ganesha get his elephant head?',
  },
  'deity:hanuman': {
    eyebrow: 'Meet Hanuman',
    headline: 'Hanuman could do almost anything, but only found his full strength when it was for someone else.',
    body: 'Hanuman is one of the strongest figures in all the stories. He can grow mountain-sized and leap across an ocean. But there is a catch in his tale. He forgets how powerful he is, and remembers only when he is serving Rama, the one he loves. His strength wakes up in devotion. On his own he holds back. For someone else, he becomes limitless.',
    citation: 'Valmiki’s Ramayana; the Sundara Kanda',
    krishnaPrompt: 'Why does Hanuman forget his own strength until he needs it for Rama?',
  },
  'deity:rama': {
    eyebrow: 'Meet Rama',
    headline: 'Rama did everything right, and it still cost him almost everyone he loved.',
    body: 'Rama keeps every promise he ever makes. To honor one his father made, he gives up the throne and lives fourteen years in a forest. Later, to keep his people’s trust in him, he even gives up Sita, the person closest to him. Doing the right thing did not protect him from loss. That is the ache the whole story sits with, and people have argued about it for two thousand years.',
    citation: 'Valmiki’s Ramayana',
    krishnaPrompt: 'Was Rama right to give up Sita? What does the story ask us to feel?',
  },
  'deity:lakshmi': {
    eyebrow: 'Meet Lakshmi',
    headline: 'The goddess of wealth is almost never shown standing still.',
    body: 'Lakshmi brings fortune, beauty, and plenty. But look closely at how she is drawn, and you notice she is often standing on a lotus in moving water, with coins slipping from her open hand. The old idea is that good fortune moves. It flows in and it flows out, and clutching at it is the surest way to lose it. She is honored not as a hoard to guard, but as a current to keep flowing.',
    citation: 'Sri Sukta, Rig Veda tradition',
    krishnaPrompt: 'What does Lakshmi teach about money and holding on to it?',
  },
  'deity:saraswati': {
    eyebrow: 'Meet Saraswati',
    headline: 'The goddess of knowledge carries a musical instrument where other gods carry weapons.',
    body: 'Most of the great deities hold a weapon. Saraswati holds a veena, a stringed instrument, and a book. She is knowledge, music, and speech. The quiet suggestion is that learning is not something you conquer or fight for. It is something you tune yourself to, slowly and with patience, the way you learn an instrument. Students and artists honor her before they begin their work.',
    citation: 'The Puranas; the Saraswati Vandana',
    krishnaPrompt: 'Why does Saraswati carry a veena instead of a weapon?',
  },
  'deity:durga': {
    eyebrow: 'Meet Durga',
    headline: 'When the gods could not defeat a demon alone, they combined their power into her.',
    body: 'There was a demon no single god could beat. So the story goes that each of them gave up a piece of their own power, and out of that gathered light, Durga took form. She rides a lion and holds a weapon in each of her many arms, one from each god. She is the idea that some threats are too large for anyone alone, and that combined strength can meet them.',
    citation: 'Devi Mahatmya',
    krishnaPrompt: 'How was Durga created, and what does she stand for?',
  },

  // ---- Ideas ---------------------------------------------------------------
  'concept:dharma': {
    eyebrow: 'The idea of Dharma',
    headline: 'The right thing to do is not the same for everyone, and that is the point.',
    body: 'Dharma is often translated as duty or righteousness, but it is more personal than that. It is the right action for your particular life, your role, and your moment. A soldier’s dharma and a mother’s dharma are not the same. The tradition does not hand you one rule for all people. It asks you to find the one that fits where you actually stand.',
    citation: 'Bhagavad Gita; the Dharmashastra tradition',
    krishnaPrompt: 'How do I know what my own dharma is?',
  },
  'concept:karma': {
    eyebrow: 'The idea of Karma',
    headline: 'Karma is not something that happens to you. It is what you do.',
    body: 'People sigh and say, it is my karma, nothing I can do. That has the word backwards. Karma is a Sanskrit word, and it simply means action. Something you do. The belief is that every action carries a consequence, and those consequences travel forward with you. So karma is not a sentence handed down to you. It is the one part of your life that is always yours to steer.',
    citation: 'Bhagavad Gita; the Upanishads',
    krishnaPrompt: 'If karma is action, how much of my life is really in my hands?',
  },
  'concept:samsara': {
    eyebrow: 'The idea of Samsara',
    headline: 'This tradition does not picture life as a single line from birth to an ending.',
    body: 'In a lot of Western thinking, a life runs in a straight line. You are born, you live, it ends. Samsara is a different picture. It sees life as a wheel that keeps turning, birth after birth, until something changes. Samsara is the Sanskrit word for that turning. The aim of the great teachings is not to ride the wheel better. It is to understand it well enough to step off.',
    citation: 'The Upanishads; the Bhagavad Gita',
    krishnaPrompt: 'What is samsara, and why would someone want to be free of it?',
  },
  'concept:moksha': {
    eyebrow: 'The idea of Moksha',
    headline: 'The highest aim in this tradition is to stop being reborn at all.',
    body: 'Many traditions aim at a reward after death, a better place to arrive. The goal here is quieter and stranger. It is called moksha, which means release. Not a nicer next life, but freedom from the whole cycle of coming back. The old teachers described it less like reaching somewhere new and more like waking from a long dream and finding you were home the whole time.',
    citation: 'The Upanishads',
    krishnaPrompt: 'What actually is moksha, and how is it different from heaven?',
  },
  'concept:maya': {
    eyebrow: 'The idea of Maya',
    headline: 'Sometimes the thing you are afraid of was never really there.',
    body: 'Picture a coiled rope on a dark path. For a second you are sure it is a snake, and your whole body reacts before you can think. But the rope was always just a rope. Maya is the old word for that gap between what is there and what you think is there. The teachers said we live inside that gap far more than we notice, reacting to the stories we add on top of the plain facts.',
    citation: 'The rope and the snake, a classic image in Advaita Vedanta',
    krishnaPrompt: 'What does maya really mean? Is it saying the world is fake?',
  },
  'concept:three-gunas': {
    eyebrow: 'The idea of the Gunas',
    headline: 'Every mood you have, the tradition sorts into just three basic threads.',
    body: 'The gunas are three qualities the tradition says run through everything, including you. Sattva is calm and clarity. Rajas is drive and restlessness. Tamas is heaviness and inertia. On any given day you are some mix of the three. The old idea is not to erase them but to notice which one is running you right now, because you can shift the balance by what you do, eat, and think.',
    citation: 'Bhagavad Gita, Chapter 14',
    krishnaPrompt: 'What are the three gunas, and how do they shape my daily mood?',
  },
  'concept:ahimsa': {
    eyebrow: 'The idea of Ahimsa',
    headline: 'The famous idea of nonviolence began as something much wider than not hitting people.',
    body: 'Ahimsa is usually translated as nonviolence, and it shaped Gandhi and, through him, much of the world. But the original idea is broader. It means not causing harm, in your hands, your words, and even your thoughts. It is less a rule against fighting and more a way of moving through the world so that you leave less damage behind you. That is why it touches diet, speech, and anger, not only war.',
    citation: 'The Yoga Sutras; Jain and Hindu tradition',
    krishnaPrompt: 'Is ahimsa only about not being violent, or something bigger?',
  },
  'concept:brahman-atman': {
    eyebrow: 'The idea of Atman',
    headline: 'The oldest texts make one claim that still stops people cold: the self in you is the same as everything.',
    body: 'This is the boldest idea in the Upanishads. There is a word, Brahman, for the one reality behind everything. And there is a word, atman, for the deepest self inside you. The teaching is that these two are not merely close. They are the same. Whatever you truly are is not separate from the whole. Sit with that, and it changes how alone you think you are.',
    citation: 'The Upanishads; tat tvam asi, Chandogya Upanishad',
    krishnaPrompt: 'What does it mean that atman and Brahman are the same?',
  },
  'concept:guru': {
    eyebrow: 'The idea of the Guru',
    headline: 'The word guru literally means the one who brings you out of the dark.',
    body: 'We use guru now for an expert in anything, a fitness guru, a tech guru. The Sanskrit is heavier than that. Gu points to darkness, ru to removing it. A guru is the one who helps you see what you could not see before. It is less about handing over information and more about someone walking you from confusion toward light.',
    citation: 'The Upanishads; the Guru Gita',
    krishnaPrompt: 'What makes someone a true guru in this tradition?',
  },
  'concept:prana': {
    eyebrow: 'The idea of Prana',
    headline: 'The breath you are taking right now is treated as the thread that ties your body to your mind.',
    body: 'Prana is often translated as breath, but it means something closer to life-force, the energy that moves in you. The tradition noticed something simple. When you are anxious, your breath goes short and fast. When you are calm, it slows. So they worked it backwards. Steady the breath on purpose, and the mind follows. That is the whole basis of pranayama, the breathing practices.',
    citation: 'The Yoga Sutras; the Upanishads',
    krishnaPrompt: 'How does the breath, or prana, connect to calming the mind?',
  },

  // ---- Stories -------------------------------------------------------------
  'story:nachiketa': {
    eyebrow: 'The story of Nachiketa',
    headline: 'A boy turned down every reward to ask the one question we all avoid.',
    body: 'Sent to the house of Death, a young boy named Nachiketa is offered gold, land, and every pleasure a person could want. He says no to all of it. The one thing he wants is an answer to a single question. What, if anything, is still here after we die. We spend a lot of our lives filling the silence so we never have to ask it. He walked straight up to it and waited.',
    citation: 'Katha Upanishad',
    krishnaPrompt: 'What answer did Death finally give Nachiketa?',
  },
  'story:svetaketu-salt': {
    eyebrow: 'The story of the salt',
    headline: 'A father taught his proud son the deepest truth with a lump of salt and a cup of water.',
    body: 'Shvetaketu came home from years of study certain he knew everything. His father asked him to drop some salt into water and leave it overnight. In the morning the salt was gone from sight, but every sip tasted of it. You cannot see it, the father said, yet it is fully there. That unseen presence, filling everything, is what you are made of too. The lesson ends in three words the tradition never forgot: tat tvam asi, you are that.',
    citation: 'Chandogya Upanishad',
    krishnaPrompt: 'What does tat tvam asi, you are that, actually mean?',
  },
  'story:ekalavya': {
    eyebrow: 'The story of Ekalavya',
    headline: 'The greatest archer in the tale was the one who was never allowed to be taught.',
    body: 'Ekalavya wanted to learn archery from the famous teacher Drona, who turned him away because of his low birth. So Ekalavya built a clay statue of Drona and practiced before it alone, until he outshot even Drona’s favored student. When Drona saw this, he asked Ekalavya for a teacher’s fee: the thumb of his right hand, which would end his archery. Ekalavya gave it without hesitating. People still argue over who the real teacher was, and what is owed to someone who rejected you.',
    citation: 'Mahabharata, Adi Parva',
    krishnaPrompt: 'Was Drona right or cruel to ask Ekalavya for his thumb?',
  },
  'story:gajendra': {
    eyebrow: 'The story of Gajendra',
    headline: 'An elephant fought a crocodile for a thousand years, and was saved only the moment he stopped fighting alone.',
    body: 'Gajendra, the king of elephants, went to drink at a lake, and a crocodile seized his leg. He was strong, and he pulled, for what the story calls a thousand years. He could not win. At the very end of his strength, he stopped relying on himself and simply cried out for help, holding up a single lotus. That was the moment he was saved. The tale is about the point where effort ends and surrender begins.',
    citation: 'Bhagavata Purana, Canto 8',
    krishnaPrompt: 'What does Gajendra’s story say about when to stop struggling?',
  },
  'story:markandeya': {
    eyebrow: 'The story of Markandeya',
    headline: 'A boy fated to die at sixteen met his death by holding on to something that could not die.',
    body: 'Markandeya was blessed with brilliance but cursed to a short life, just sixteen years. When the day came and the god of death arrived with his noose, the boy wrapped his arms around the stone form of Shiva and would not let go. The noose fell around them both. Out of that devotion, Shiva stopped death itself. The story is less about escaping death and more about what a person reaches for when it comes.',
    citation: 'The Puranas; the Markandeya legend',
    krishnaPrompt: 'What saved Markandeya from death?',
  },
  'story:savitri-full': {
    eyebrow: 'The story of Savitri',
    headline: 'She could not stop her husband from dying, so she out-argued the god of death instead.',
    body: 'Savitri chose to marry a man she was warned would die within a year. When death came for him, she followed the god Yama as he carried her husband’s soul away. She would not turn back. As they walked, she spoke with Yama so wisely that he offered her boons, anything but her husband’s life. She asked for children, and for those children to be her husband’s. Caught by his own word, Yama had to return the man to life.',
    citation: 'Mahabharata, Vana Parva',
    krishnaPrompt: 'How did Savitri outwit Yama to save her husband?',
  },
  'story:prahlada-full': {
    eyebrow: 'The story of Prahlada',
    headline: 'A boy kept his faith while his own father tried to kill him for it, and never answered hate with hate.',
    body: 'Prahlada was born to a demon king who had forbidden the worship of Vishnu. But the boy loved Vishnu anyway, openly. His father tried again and again to have him killed, by poison, by fire, by the sword. Each time the boy was unharmed, and he never turned bitter. When his father demanded, is your God even in this pillar, the answer came out of the pillar itself. The story is about a faith that stays gentle under pressure that would harden anyone.',
    citation: 'Bhagavata Purana, Canto 7',
    krishnaPrompt: 'How did Prahlada keep his faith without becoming bitter?',
  },

  // ---- Festivals -----------------------------------------------------------
  'festival:diwali-2025': {
    eyebrow: 'The festival of Diwali',
    headline: 'The same lamps mean a different homecoming in every part of the country.',
    body: 'On Diwali night, homes across India light the same small rows of lamps. But ask why, and the answer changes as you travel. In the north the lights welcome Rama home from exile. In the south they mark Krishna defeating a cruel king. For many families the night calls in Lakshmi, who brings good fortune. In Bengal it belongs to the goddess Kali. One night, one row of flames, and a different story waiting behind every door.',
    citation: 'Regional traditions across India',
    krishnaPrompt: 'Why do different regions celebrate Diwali for different reasons?',
  },
  'festival:holi-2025': {
    eyebrow: 'The festival of Holi',
    headline: 'For one day, the colored powder erases who is rich and who is poor, who is old and who is young.',
    body: 'Holi is famous for the throwing of colored powder and water, a riot of pink and green and yellow. But there is an idea underneath the mess. For that one day everyone looks the same, covered head to toe, and the usual lines between people fall away. Elders and children, strangers and friends, all become fair game and equal. It is joy used on purpose to flatten the walls we keep up the rest of the year.',
    citation: 'Holi tradition; the legend of Holika and Prahlada',
    krishnaPrompt: 'What is the meaning behind throwing colors at Holi?',
  },
  'festival:navratri-2025': {
    eyebrow: 'The festival of Navratri',
    headline: 'Nine nights honor the divine as a woman, in her fierce form and her gentle one both.',
    body: 'Navratri means nine nights. Across them, the goddess is worshipped in her many forms, from the fierce warrior who slays demons to the calm giver of wealth and wisdom. People fast, dance late into the night, and wear a different color each day. The quiet message across the nine nights is that strength and softness are not opposites in the divine feminine. They are the same power, turned to different needs.',
    citation: 'Devi Mahatmya; regional Navratri traditions',
    krishnaPrompt: 'Why is the goddess worshipped in so many different forms during Navratri?',
  },
  'festival:janmashtami-2025': {
    eyebrow: 'The festival of Janmashtami',
    headline: 'The most joyful god was born in a prison, at midnight, under threat of death.',
    body: 'Janmashtami marks the birth of Krishna, and it is celebrated with singing, dancing, and swings decorated for a baby. But the birth itself was anything but safe. Krishna was born in a prison cell at midnight, to parents jailed by a king who meant to kill the child. He had to be carried out that same night across a flooding river. The festival holds both truths at once, that a great light can arrive in the darkest room.',
    citation: 'Bhagavata Purana, Canto 10',
    krishnaPrompt: 'Why was Krishna born in a prison?',
  },
  'festival:ganesh-chaturthi-2025': {
    eyebrow: 'The festival of Ganesh Chaturthi',
    headline: 'For ten days the god is welcomed home like family, then carried to the water and let go.',
    body: 'Ganesh Chaturthi brings clay images of Ganesha into homes and streets, treated as an honored guest for up to ten days, fed and sung to. Then, at the end, that same beloved image is carried to a river or the sea and dissolved into the water. The letting go is the whole point. The festival practices, in public and together, the hardest thing: loving something fully and still releasing it when the time comes.',
    citation: 'Ganesh Chaturthi tradition',
    krishnaPrompt: 'Why is the Ganesha idol dissolved in water at the end of the festival?',
  },
  'festival:maha-shivratri-2025': {
    eyebrow: 'The festival of Maha Shivratri',
    headline: 'One night a year is kept awake on purpose, in stillness rather than celebration.',
    body: 'Most festivals are loud with color and food. Maha Shivratri, the great night of Shiva, runs the other way. People stay awake through the night, often fasting, in quiet and meditation. There is no feast at its center, only stillness held on purpose. The idea is that some things are met not by doing more, but by growing quiet enough to notice them. It is a festival built out of restraint.',
    citation: 'Shaiva tradition; the Puranas',
    krishnaPrompt: 'Why do people stay awake all night on Maha Shivratri?',
  },

  // ---- Practices -----------------------------------------------------------
  'practice:bhakti-yoga': {
    eyebrow: 'A practice: Bhakti',
    headline: 'You do not have to earn your way into being loved.',
    body: 'Most paths ask something of you first. Still your mind, or master the texts, or give up the world. Bhakti, the path of devotion, asks for none of that. Krishna says in the Gita that love offered honestly reaches him just as surely, whether it comes from a scholar, a farmer, or a child. It is the one road in with no entrance test.',
    citation: 'Bhagavad Gita, Chapter 12',
    krishnaPrompt: 'Is bhakti, the path of love, really open to anyone?',
  },
  'practice:karma-yoga': {
    eyebrow: 'A practice: Karma Yoga',
    headline: 'There is a way to work hard for something and not be wrecked when it does not go your way.',
    body: 'Karma yoga is the path of action, and its core instruction sounds almost impossible at first. Do the work fully, but loosen your grip on the result. You have a right to your effort, the Gita says, never to its fruit. This is not a call to stop caring. It is a way to pour yourself into what you do while staying free of the anxiety about how it lands. Much of our suffering lives in that gap between effort and outcome.',
    citation: 'Bhagavad Gita, Chapter 2',
    krishnaPrompt: 'How can I work hard but stay unattached to the result?',
  },
  'practice:seva-practice': {
    eyebrow: 'A practice: Seva',
    headline: 'In this tradition, helping others without being asked is treated as a form of worship.',
    body: 'Seva means selfless service, help given with no expectation of thanks or reward. Sweeping a temple, feeding strangers, caring for the sick. What makes it a spiritual practice, and not only kindness, is the letting go of ego in it. You are not doing it to be seen or repaid. The tradition says this quiet, unrewarded giving does as much for the giver as the receiver, because it slowly wears down the self that keeps score.',
    citation: 'Bhagavad Gita; the seva tradition',
    krishnaPrompt: 'How is seva, selfless service, a spiritual practice and not just charity?',
  },

  // ---- Texts ---------------------------------------------------------------
  'scripture:isha-upanishad': {
    eyebrow: 'A text: the Isha Upanishad',
    headline: 'You tend to enjoy things most once you stop needing to keep them.',
    body: 'The Isha Upanishad is one of the shortest sacred texts in the tradition, only eighteen verses. It opens with a line that sounds backwards at first. Let go of everything, it says, and then enjoy it. The idea is that when you stop clutching at things, needing them to stay, you can finally take them in. You could read the whole text in the time it takes your chai to cool.',
    citation: 'Isha Upanishad, verse 1',
    krishnaPrompt: 'What does the Isha Upanishad mean by renounce and enjoy?',
  },
};
