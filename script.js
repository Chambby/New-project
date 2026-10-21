    // =========================================================
// PLAYSTATE - script.js
// Journal: click an article to expand it and read the full text
// =========================================================

const journalCards = document.querySelectorAll('.journal-card');

// Opens or closes ONE journal article.
// card = the article box, shouldOpen = true to open it or false to close it.
// It also updates the button text (Read / Close) and the + / − icon.
function setArticleOpen(card, shouldOpen) {
    const button = card.querySelector('.journal-toggle');
    const body = card.querySelector('.article-body');

    card.classList.toggle('open', shouldOpen);
    body.classList.toggle('open', shouldOpen);

    // Update the button text and icon
    button.querySelector('.toggle-label').textContent = shouldOpen ? 'Close article' : 'Read article';
    button.querySelector('.toggle-icon').textContent = shouldOpen ? '−' : '+';
}

// Runs once for every article card and makes it clickable.
// Clicking the card opens or closes it; the 'Close article' button always closes it.
journalCards.forEach(function (card) {
    card.addEventListener('click', function (event) {

        // The "Close article" button at the bottom of the text
        if (event.target.closest('.article-close')) {
            setArticleOpen(card, false);
            card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            return;
        }

        // Clicking inside the opened text does nothing (so you can select and copy it)
        if (event.target.closest('.article-body')) {
            return;
        }

        // Clicking anywhere else on the card (or its button) toggles it
        const isOpen = card.classList.contains('open');
        setArticleOpen(card, !isOpen);
    });
});

// The 'Read article' link in the featured story: opens article 1 and scrolls down to it.
document.querySelectorAll('[data-open-article]').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const card = document.getElementById(link.dataset.openArticle);

        setArticleOpen(card, true);
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});


// =========================================================
// Game library: genres > games > details
// =========================================================

const genreData = [
    {
        name: "Action",
        games: [
            { title: "Devil May Cry 5", color: "#EE4F88", studio: "Capcom", year: "2019", genre: "Action, Hack and Slash",
              plot: "Demons are invading Red Grave City, and a giant demonic tree is draining the life from the streets. Three hunters take on the threat: the young Nero, the mysterious V, and the legendary Dante. Their paths lead them to the demon king Urizen and to some painful truths about their own family." },
            { title: "Sekiro: Shadows Die Twice", color: "#EE884F", studio: "FromSoftware", year: "2019", genre: "Action-Adventure",
              plot: "In a war-torn version of Sengoku-era Japan, a shinobi called Wolf swears to protect a young lord whose blood grants a rare power. After the boy is kidnapped and Wolf loses an arm, he gets a prosthetic tool and sets out to rescue him and face the powers that want to control his gift." },
            { title: "Batman: Arkham Knight", color: "#AB74F1", studio: "Rocksteady Studios", year: "2015", genre: "Action-Adventure",
              plot: "The Scarecrow threatens Gotham City with a fear toxin, forcing the city to be evacuated. As Batman fights to stop him, a mysterious military commander called the Arkham Knight appears, with an army and a deep hatred of the Dark Knight." },
            { title: "Metal Gear Rising: Revengeance", color: "#4FA1EE", studio: "PlatinumGames", year: "2013", genre: "Action, Hack and Slash",
              plot: "Raiden, a cyborg soldier, is now working for a private security company. When a rival group of cyborgs kidnaps a prime minister, he is pulled into a conspiracy led by a politician with a dangerous plan. Raiden must decide what kind of fighter he wants to be." },
            { title: "Ghost of Tsushima", color: "#EE4FAE", studio: "Sucker Punch Productions", year: "2020", genre: "Action-Adventure",
              plot: "In 1274, the Mongol army invades the island of Tsushima. Samurai Jin Sakai is one of the few survivors, and he realises that honorable fighting will not be enough to save his home. He starts using stealth and fear to defend the island, and becomes a legend known as the Ghost." },
            { title: "God of War", color: "#E5493A", studio: "Santa Monica Studio", year: "2018", genre: "Action-Adventure, Hack and Slash",
              plot: "Kratos has left his old life of vengeance behind and lives in the realm of the Norse gods with his young son, Atreus. After the death of his wife, the two set out to spread her ashes from the highest peak, and face monsters and gods along the way." },
            { title: "Bayonetta", color: "#B44FEE", studio: "PlatinumGames", year: "2009", genre: "Action, Hack and Slash",
              plot: "Bayonetta, a powerful witch, wakes up after five hundred years with no memory of who she is. She travels to the city of Vigrid, where she fights angels with guns, magic, and stylish combos while she searches for the truth about her past." },
            { title: "Marvel's Spider-Man", color: "#3F6BEE", studio: "Insomniac Games", year: "2018", genre: "Action-Adventure, Open World",
              plot: "Peter Parker has been Spider-Man for eight years, and he is trying to balance his hero life with his personal one. When a masked villain called Mister Negative starts taking over the underworld of New York, Spider-Man must swing across the city to stop him." },
            { title: "Hades", color: "#EE7A4F", studio: "Supergiant Games", year: "2020", genre: "Action Roguelike",
              plot: "Zagreus, the prince of the Underworld, is tired of living under his father's rule and tries to escape to the surface. Each time he dies he returns to his home and starts again, a little stronger and a little wiser about his family." },
            { title: "Hi-Fi Rush", color: "#18D6BF", studio: "Tango Gameworks", year: "2023", genre: "Rhythm Action",
              plot: "Chai, a young man who dreams of being a rock star, accidentally gets a music player fused to his chest. Now everything around him moves to the beat, and he fights the robots of a shady company by attacking in rhythm with the music." }
        ]
    },
    {
        name: "Adventure",
        games: [
            { title: "Red Dead Redemption 2", color: "#BFB818", studio: "Rockstar Games", year: "2018", genre: "Action-Adventure, Open World",
              plot: "In 1899, the American frontier is changing and outlaws are running out of places to hide. Arthur Morgan and the Van der Linde gang are on the run after a failed robbery, and as the pressure grows, Arthur must decide what he really believes in." },
            { title: "The Legend of Zelda: Breath of the Wild", color: "#18BFAB", studio: "Nintendo EPD", year: "2017", genre: "Action-Adventure, Open World",
              plot: "Link wakes up after a hundred years of sleep with no memory of his past. The kingdom of Hyrule lies in ruins, held under the grip of the evil Calamity Ganon. Link explores the huge open world to recover his memories and free Princess Zelda." },
            { title: "Uncharted 4: A Thief's End", color: "#75BF18", studio: "Naughty Dog", year: "2016", genre: "Action-Adventure",
              plot: "Nathan Drake has left treasure hunting behind, until his long-lost brother Sam shows up and needs his help. Together they search for the hidden treasure of the pirate Henry Avery, travelling across the world while others race to get there first." },
            { title: "Tomb Raider", color: "#18BF82", studio: "Crystal Dynamics", year: "2013", genre: "Action-Adventure",
              plot: "A young Lara Croft joins an expedition, but her ship is wrecked on a mysterious island. Alone and hunted, she must learn to survive, save her friends, and uncover the secrets of the island and its ancient past." },
            { title: "Indiana Jones and the Great Circle", color: "#4DBF18", studio: "MachineGames", year: "2024", genre: "Action-Adventure",
              plot: "In 1937, a strange theft at Marshall College pulls Indiana Jones into a worldwide mystery. His search takes him from the Vatican to the Himalayas and beyond, as he follows clues linked to ancient sites and races a dangerous group who want the same power." },
            { title: "Horizon Zero Dawn", color: "#EE9A4F", studio: "Guerrilla Games", year: "2017", genre: "Action RPG, Open World",
              plot: "In a far future where nature has taken back the world, huge machines that look like animals roam the land. Aloy, a young hunter raised as an outcast, sets out to uncover the secret of her past and the mystery behind the machines." },
            { title: "The Last of Us", color: "#8FBF18", studio: "Naughty Dog", year: "2013", genre: "Action-Adventure",
              plot: "Twenty years after an infection destroys modern society, Joel is hired to smuggle a teenage girl named Ellie out of a quarantine zone. As they travel across the country together, they face dangerous infected and hostile survivors, and slowly form a deep bond." },
            { title: "Assassin's Creed Odyssey", color: "#E0B020", studio: "Ubisoft Quebec", year: "2018", genre: "Action RPG, Open World",
              plot: "In ancient Greece during the Peloponnesian War, you play as a mercenary who has been cast out of their family. You sail across the Aegean Sea, choose sides in the war, and uncover the secrets of a dangerous cult while you search for your lost family." },
            { title: "Life Is Strange", color: "#4FD6EE", studio: "Dontnod Entertainment", year: "2015", genre: "Episodic Adventure",
              plot: "Max Caulfield, a photography student, discovers that she can rewind time. When she uses her new power to save her childhood friend Chloe, she gets pulled into a mystery about a missing girl and a looming disaster in her town of Arcadia Bay." },
            { title: "Firewatch", color: "#EE5A18", studio: "Campo Santo", year: "2016", genre: "Narrative Adventure, Mystery",
              plot: "In the summer of 1989, Henry takes a job as a fire lookout in the Wyoming wilderness to escape his troubles. His only contact is his supervisor, Delilah, who talks to him by radio, and strange events soon make the forest feel more mysterious." }
        ]
    },
    {
        name: "RPG (Role-Playing Game)",
        games: [
            { title: "Baldur's Gate 3", color: "#E14FEE", studio: "Larian Studios", year: "2023", genre: "RPG, Turn-Based",
              plot: "You wake up infected with a mind flayer parasite that will slowly turn you into a monster. To find a cure, you team up with a group of unlikely companions, and every choice you make changes the story and how your allies see you." },
            { title: "The Witcher 3: Wild Hunt", color: "#2C1CE3", studio: "CD Projekt Red", year: "2015", genre: "Action RPG, Open World",
              plot: "Geralt of Rivia, a monster hunter, searches for Ciri, the girl who is like a daughter to him. She is hunted by the Wild Hunt, a ghostly army, and Geralt must cross a war-torn world full of dangerous creatures and hard choices to find her first." },
            { title: "Persona 5 Royal", color: "#BF1868", studio: "Atlus", year: "2019 (worldwide 2020)", genre: "RPG, Turn-Based",
              plot: "A high school student moves to Tokyo and discovers a hidden world that reflects people's hearts. With his new friends he becomes one of the Phantom Thieves, who sneak into these places to change the hearts of corrupt adults, while also balancing school and everyday life." },
            { title: "Dragon Age: Inquisition", color: "#4FEE55", studio: "BioWare", year: "2014", genre: "Action RPG",
              plot: "A huge tear in the sky, called the Breach, is letting demons into the world. You become the leader of the Inquisition, a new force that gathers allies, builds a base, and tries to close the Breach and stop the villain behind it." },
            { title: "Cyberpunk 2077", color: "#F2D600", studio: "CD Projekt Red", year: "2020", genre: "Action RPG, Open World",
              plot: "V is a mercenary in the huge, dangerous Night City. After a job goes wrong, V ends up with a prototype chip that holds the digital ghost of a rock star and rebel, Johnny Silverhand, and the two must work together to survive." },
            { title: "Final Fantasy VII Remake", color: "#18BFE5", studio: "Square Enix", year: "2020", genre: "Action RPG, JRPG",
              plot: "Cloud Strife, a former soldier turned mercenary, joins the rebel group Avalanche to fight the powerful Shinra company in the city of Midgar. What starts as a simple job grows into a much bigger fight to save the planet." },
            { title: "Mass Effect 2", color: "#4F7BEE", studio: "BioWare", year: "2010", genre: "Action RPG, Sci-Fi",
              plot: "Commander Shepard is brought back to life and must build a team of the galaxy's best fighters. Together they take on a dangerous suicide mission to stop the Collectors, who are kidnapping whole human colonies." },
            { title: "Disco Elysium", color: "#EE4F7B", studio: "ZA/UM", year: "2019", genre: "RPG, Detective",
              plot: "You wake up in a trashed hotel room with no memory, not even your own name. As a detective, you must solve a murder in the city of Revachol, talking to people and listening to the many voices in your own head." },
            { title: "Divinity: Original Sin 2", color: "#E1C21C", studio: "Larian Studios", year: "2017", genre: "RPG, Turn-Based",
              plot: "You have a forbidden magic called Source, and a powerful order is hunting people like you. After being sent to the prison island of Fort Joy, you escape with your companions and travel the world to uncover the truth behind your power." },
            { title: "The Elder Scrolls V: Skyrim", color: "#8FA1EE", studio: "Bethesda Game Studios", year: "2011", genre: "Action RPG, Open World",
              plot: "You are the Dragonborn, a rare hero who can absorb the power of dragons. As the dragons return to the frozen land of Skyrim, you travel across mountains and cities, join guilds, and take part in a civil war that is tearing the land apart." }
        ]
    },
    {
        name: "ARPG (Action Role-Playing Game)",
        games: [
            { title: "Diablo IV", color: "#EE624F", studio: "Blizzard Entertainment", year: "2023", genre: "Action RPG, Dungeon Crawler",
              plot: "Lilith, a powerful demon, has returned to the land of Sanctuary after many years. As a hero from one of several classes, you travel across dark, dangerous regions to fight her cult and stop her plans." },
            { title: "Path of Exile 2", color: "#E1EE4F", studio: "Grinding Gear Games", year: "2024 (early access)", genre: "Action RPG",
              plot: "The land of Wraeclast is slowly being eaten by a spreading corruption. Exiles from all kinds of backgrounds fight through ruined cities and ancient places to find the cause, uncovering the secrets of gods who once ruled this world." },
            { title: "Nioh 2", color: "#C974F1", studio: "Team Ninja", year: "2020", genre: "Action RPG, Soulslike",
              plot: "Japan is in the middle of the Sengoku civil wars, and yokai (spirits) roam the land. You play a half-human, half-yokai warrior who uses both worlds' powers while meeting famous historical figures and fighting to survive." },
            { title: "Kingdoms of Amalur: Re-Reckoning", color: "#BF18B8", studio: "Kaiko", year: "2020", genre: "Action RPG, Open World",
              plot: "You are a dead warrior who is brought back to life by an experiment, and no one knows what fate has planned for you. Since you have no destiny, you can change the future, and you set out to stop an endless war between the fae." },
            { title: "Grim Dawn", color: "#BF6818", studio: "Crate Entertainment", year: "2016", genre: "Action RPG, Dungeon Crawler",
              plot: "Humanity is nearly wiped out after a war with beings from another world, and survivors cling to life in the broken land of Cairn. You rise from a possessed body and fight to protect what is left of the human race." },
            { title: "Elden Ring", color: "#F1C24F", studio: "FromSoftware", year: "2022", genre: "Action RPG, Open World, Soulslike",
              plot: "The Elden Ring has been shattered, and its pieces are held by demigods who now rule the Lands Between. As a Tarnished, an exile called back to the land, you travel across a huge open world to find the shards and become the Elden Lord." },
            { title: "Dark Souls III", color: "#A83232", studio: "FromSoftware", year: "2016", genre: "Action RPG, Soulslike",
              plot: "The fire that keeps the world alive is fading. As the Ashen One, you rise from your grave to hunt down the powerful Lords of Cinder and return them to their thrones, in a dark, crumbling world full of deadly bosses." },
            { title: "Lies of P", color: "#18BF9E", studio: "Round8 Studio", year: "2023", genre: "Action RPG, Soulslike",
              plot: "In a dark, twisted version of the story of Pinocchio, a puppet wakes up in the ruined city of Krat, where other puppets have gone wild. As P, you search for Geppetto while fighting dangerous enemies, and your choices decide how honest you stay." },
            { title: "Torchlight II", color: "#EE8D18", studio: "Runic Games", year: "2012", genre: "Action RPG, Dungeon Crawler",
              plot: "The Alchemist, a hero from the first game, has been corrupted by the power of Ember and is spreading ruin across the world. You choose a class, bring a pet along, and chase him through towns, forests, and dungeons full of loot." },
            { title: "Last Epoch", color: "#5C4FEE", studio: "Eleventh Hour Games", year: "2024", genre: "Action RPG, Dungeon Crawler",
              plot: "You are a hero who can travel through time, and you explore different eras of the world of Eterra. You fight terrifying monsters, find powerful loot, and try to stop the Eternity, a being that controls time." }
        ]
    },
    {
        name: "FPS (First-Person Shooter)",
        games: [
            { title: "DOOM Eternal", color: "#BF4018", studio: "id Software", year: "2020", genre: "First-Person Shooter",
              plot: "Hell's army has taken over Earth, and the Doom Slayer, a legendary warrior, comes back to stop it. He travels across the planet and beyond, hunting down the demon leaders one by one in fast, brutal battles." },
            { title: "Counter-Strike 2", color: "#95EE4F", studio: "Valve", year: "2023", genre: "Tactical First-Person Shooter",
              plot: "There is no single story. Instead, two teams, Terrorists and Counter-Terrorists, face off round after round in a series of competitive matches. Planting or defusing a bomb, saving hostages, and good teamwork decide who wins." },
            { title: "Call of Duty: Modern Warfare III", color: "#4FEE7B", studio: "Sledgehammer Games", year: "2023", genre: "First-Person Shooter",
              plot: "Task Force 141 hunts Vladimir Makarov, a dangerous ultranationalist, who is planning attacks across Europe. As the situation spreads, the team has to move fast to stop him before it turns into an even bigger war." },
            { title: "Titanfall 2", color: "#BF9018", studio: "Respawn Entertainment", year: "2016", genre: "First-Person Shooter",
              plot: "Jack Cooper, a rifleman who dreams of becoming a pilot, is suddenly left in charge of BT-7274, a powerful Titan war machine. Together they must complete a dangerous mission, and an unusual friendship grows between pilot and machine." },
            { title: "Overwatch 2", color: "#F99E1A", studio: "Blizzard Entertainment", year: "2022", genre: "Hero Shooter",
              plot: "In a future where heroes from around the world have returned to fight threats once again, you pick a character with unique powers and join a team. Players battle in fast team matches, each with a role such as tank, damage, or support." },
            { title: "Halo Infinite", color: "#4FEE9A", studio: "343 Industries", year: "2021", genre: "First-Person Shooter",
              plot: "Master Chief returns after being lost in space and finds humanity close to defeat by the Banished, a brutal alien army. With the help of a pilot and a new AI, he explores the huge ring world of Zeta Halo and fights to save what is left of humanity." },
            { title: "Half-Life 2", color: "#EE9F18", studio: "Valve", year: "2004", genre: "First-Person Shooter",
              plot: "Gordon Freeman arrives in City 17, a city controlled by the alien empire known as the Combine. He joins the human resistance and uses his crowbar and a gravity gun to fight back and free humanity." },
            { title: "Apex Legends", color: "#EE3A3A", studio: "Respawn Entertainment", year: "2019", genre: "Battle Royale, Hero Shooter",
              plot: "Squads of three drop onto a dangerous planet and fight until only one squad is left. Each legend has special abilities, so teamwork and smart choices decide who becomes the champion." },
            { title: "Valorant", color: "#F0485A", studio: "Riot Games", year: "2020", genre: "Tactical Hero Shooter",
              plot: "Two teams of five face off in rounds, with one side planting a bomb and the other trying to stop them. Each agent has special abilities, so smart plans matter as much as good aim." },
            { title: "Borderlands 2", color: "#FFA81C", studio: "Gearbox Software", year: "2012", genre: "Looter Shooter",
              plot: "On the wild planet of Pandora, a group of Vault Hunters teams up to stop Handsome Jack, a cruel businessman who wants to control the planet. The game is full of crazy characters, a bright cartoon style, and a huge number of different guns." }
        ]
    },
    {
        name: "Strategy",
        games: [
            { title: "Sid Meier's Civilization VI", color: "#1C3CE3", studio: "Firaxis Games", year: "2016", genre: "Turn-Based Strategy",
              plot: "You lead a civilization from the Stone Age to the future. You found cities, research technology, make allies or enemies, and try to win through science, culture, religion, or military power. Each game tells a different story." },
            { title: "Age of Empires IV", color: "#BBEE4F", studio: "Relic Entertainment", year: "2021", genre: "Real-Time Strategy",
              plot: "Set in the medieval era, the game follows major historical events and powers such as the English, French, Mongols, and Rus. You gather resources, build armies, and conquer your enemies through campaigns based on real history." },
            { title: "StarCraft II", color: "#5C1CE3", studio: "Blizzard Entertainment", year: "2010", genre: "Real-Time Strategy",
              plot: "Three races, the human Terrans, the mysterious Protoss, and the swarming Zerg, fight for control of the galaxy. The story follows rebel leader Jim Raynor as he tries to save Sarah Kerrigan, now the powerful Queen of Blades." },
            { title: "XCOM 2", color: "#4FEEEE", studio: "Firaxis Games", year: "2016", genre: "Turn-Based Tactics",
              plot: "Twenty years ago, the world lost the war against an alien invasion, and now the aliens rule the planet. You lead a small resistance group, trying to take your world back, one risky mission at a time." },
            { title: "Total War: Warhammer III", color: "#BF1890", studio: "Creative Assembly", year: "2022", genre: "Turn-Based and Real-Time Strategy",
              plot: "The Warhammer fantasy world is in danger as the Chaos gods threaten to swallow everything. Leaders of many races enter the Realm of Chaos in a race to claim a powerful prize, and the result will decide the fate of the world." },
            { title: "Crusader Kings III", color: "#8F4FEE", studio: "Paradox Development Studio", year: "2020", genre: "Grand Strategy, Role-Playing",
              plot: "You rule a medieval dynasty and try to make it last for hundreds of years. You marry, plot, go to war, and raise heirs, and the stories that happen along the way are different every time." },
            { title: "Stellaris", color: "#4F8DEE", studio: "Paradox Development Studio", year: "2016", genre: "Grand Strategy, Space 4X",
              plot: "You lead a civilization into space, exploring unknown stars, meeting alien species, and building a galactic empire. You can make peace, trade, or conquer, and strange events can change the course of your game." },
            { title: "Into the Breach", color: "#18BF6B", studio: "Subset Games", year: "2018", genre: "Turn-Based Tactics",
              plot: "Giant alien insects called the Vek are destroying the world. You control a squad of powerful mechs sent back in time to fight them, protecting cities one small, puzzle-like battle at a time." },
            { title: "Frostpunk", color: "#7AB8FF", studio: "11 bit studios", year: "2018", genre: "City Builder, Survival Strategy",
              plot: "A giant storm has frozen the world, and you lead the last city of humanity. You must keep your people alive with heat and food, and make hard decisions about laws and who gets to survive." },
            { title: "Anno 1800", color: "#E1A04F", studio: "Ubisoft Blue Byte", year: "2019", genre: "City-Building Strategy",
              plot: "It is the 19th century, the time of the Industrial Revolution. You grow a small settlement into a huge city, set up trade and production chains, and sail to far lands, while keeping the people who live and work for you happy." }
        ]
    },
    {
        name: "Simulation",
        games: [
            { title: "The Sims 4", color: "#4FEEA1", studio: "Maxis", year: "2014", genre: "Life Simulation",
              plot: "There is no fixed plot. You create people called Sims, build their homes, and guide their lives, from careers and friendships to families and hobbies. The stories are the ones you make up yourself." },
            { title: "Microsoft Flight Simulator 2024", color: "#7497F1", studio: "Asobo Studio", year: "2024", genre: "Flight Simulation",
              plot: "You can fly aircraft across a detailed digital copy of the whole Earth. Besides free flying, you can take on career jobs such as rescue, firefighting, and cargo flights, with realistic weather and airports." },
            { title: "Euro Truck Simulator 2", color: "#8D74F1", studio: "SCS Software", year: "2012", genre: "Driving Simulation",
              plot: "You start as a small truck driver and slowly build your own transport company. You deliver cargo across the cities of Europe, upgrade your trucks, hire drivers, and enjoy the long, relaxing roads." },
            { title: "Planet Zoo", color: "#4FEEC7", studio: "Frontier Developments", year: "2019", genre: "Management Simulation",
              plot: "You design and run your own zoo. You build habitats, take care of detailed animals, and keep your visitors happy, while also supporting conservation work to protect real species." },
            { title: "PowerWash Simulator", color: "#1C6CE3", studio: "FuturLab", year: "2022", genre: "Casual Simulation",
              plot: "You run a pressure washing business, cleaning dirty places such as houses, vehicles, and playgrounds. It has a light story, but the real fun is the calm, satisfying feeling of turning a filthy place into a clean one." },
            { title: "Cities: Skylines", color: "#2CB1E3", studio: "Colossal Order", year: "2015", genre: "City-Building Simulation",
              plot: "You start with an empty piece of land and build a city. You plan roads, power, water, and neighbourhoods, and solve problems like traffic and growth to keep your citizens happy." },
            { title: "Stardew Valley", color: "#8FE04F", studio: "ConcernedApe", year: "2016", genre: "Farming Simulation, RPG",
              plot: "You leave a busy city job and inherit your grandfather's old farm in Stardew Valley. You grow crops, raise animals, fish, mine, and make friends with the villagers." },
            { title: "Kerbal Space Program", color: "#4FEE8D", studio: "Squad", year: "2015", genre: "Space Flight Simulation",
              plot: "You run the space program of the Kerbals, funny little green aliens. You design rockets, launch them, and try to reach orbit and land on other worlds, with lots of explosions along the way." },
            { title: "Farming Simulator 22", color: "#EEC31C", studio: "GIANTS Software", year: "2021", genre: "Farming Simulation",
              plot: "You run your own farm with real-looking tractors and machines from well-known brands. You plant, harvest, and sell crops, take care of animals, and slowly grow your business." },
            { title: "Animal Crossing: New Horizons", color: "#7FE0A1", studio: "Nintendo EPD", year: "2020", genre: "Social Simulation",
              plot: "You move to a deserted island with animal neighbours and turn it into your own village. You collect things, decorate, catch fish and bugs, and enjoy a relaxed life that follows the real-time clock." }
        ]
    },
    {
        name: "Survival",
        games: [
            { title: "Minecraft", color: "#18BF32", studio: "Mojang Studios", year: "2011", genre: "Survival, Sandbox",
              plot: "You appear in a world made of blocks. You gather resources, craft tools, build shelters, and survive the night against monsters. Some players go on to defeat the Ender Dragon, and others simply build whatever they imagine." },
            { title: "The Forest", color: "#18BF5A", studio: "Endnight Games", year: "2018", genre: "Survival Horror",
              plot: "After a plane crash, you are stranded on a forested peninsula and your young son is taken by a strange figure. You build a base, hunt for food, and explore dangerous caves while mutated creatures lurk around." },
            { title: "Subnautica", color: "#1882BF", studio: "Unknown Worlds Entertainment", year: "2018", genre: "Survival, Adventure",
              plot: "Your spaceship crashes on an ocean planet, and you must survive underwater. You build bases and submarines, explore colourful and dangerous reefs, and uncover the secret of what happened on the planet." },
            { title: "Rust", color: "#EEAE4F", studio: "Facepunch Studios", year: "2018", genre: "Multiplayer Survival",
              plot: "You start with nothing but a rock on a hostile island, and other real players are the biggest danger. You gather resources, build a base, form alliances, and try to survive hunger, cold, and raids." },
            { title: "Don't Starve Together", color: "#BB1CE3", studio: "Klei Entertainment", year: "2016", genre: "Survival, Co-op",
              plot: "In a strange and spooky world, you must find food and stay safe from creatures, the seasons, and your own sanity. Friends can join you online, and together you try to last as many days as possible." },
            { title: "Valheim", color: "#4F9AEE", studio: "Iron Gate Studio", year: "2021 (early access)", genre: "Survival, Co-op",
              plot: "A fallen Viking warrior is sent to a purgatory world and must defeat powerful beasts to earn a place in Valhalla. You build halls, sail the seas, and explore a world that is generated for you, alone or with friends." },
            { title: "Terraria", color: "#EE4FA1", studio: "Re-Logic", year: "2011", genre: "Survival, Sandbox",
              plot: "You dig, fight, build, and explore a 2D world. You gather resources, craft better gear, build a home, and take on bosses, from giant eyes to dragons." },
            { title: "ARK: Survival Evolved", color: "#BFD418", studio: "Studio Wildcard", year: "2017", genre: "Survival, Open World",
              plot: "You wake up on a mysterious island full of dinosaurs and must survive. You tame the creatures, ride them, build a base, and try to learn the secrets of the island." },
            { title: "Green Hell", color: "#2E8B57", studio: "Creepy Jar", year: "2019", genre: "Survival",
              plot: "A man is lost in the Amazon rainforest, where everything is a danger: hunger, disease, animals, and even your own mind. You craft tools, find food and water, and try to keep your sanity to survive the jungle." },
            { title: "Raft", color: "#2ED3E8", studio: "Redbeet Interactive", year: "2022 (early access 2018)", genre: "Survival, Adventure",
              plot: "You are stranded on a small raft in the middle of an endless ocean. You collect floating trash, fish, and upgrade your raft into a floating home, while a shark keeps trying to bite it." }
        ]
    },
    {
        name: "Horror",
        games: [
            { title: "Resident Evil 4", color: "#BF1840", studio: "Capcom", year: "2005 (remake 2023)", genre: "Survival Horror, Action",
              plot: "Leon Kennedy, a government agent, is sent to a remote European village to rescue the president's kidnapped daughter, Ashley. The villagers are not normal, and Leon soon faces a terrifying cult and strange creatures." },
            { title: "Silent Hill 2", color: "#18ABBF", studio: "Konami", year: "2001 (remake 2024)", genre: "Psychological Horror",
              plot: "James Sunderland receives a letter from his wife, who died three years ago, asking him to meet her in the town of Silent Hill. He enters the foggy town, where he meets strange people and monsters that reflect his own guilt and fears." },
            { title: "Dead Space", color: "#7479F1", studio: "Visceral Games", year: "2008 (remake 2023)", genre: "Survival Horror, Sci-Fi",
              plot: "Engineer Isaac Clarke flies to the mining ship USG Ishimura to fix a distress call, but the crew has vanished and horrifying creatures roam the halls. He must survive with only his tools as weapons and find a way off the ship." },
            { title: "Outlast", color: "#BF1818", studio: "Red Barrels", year: "2013", genre: "Survival Horror",
              plot: "Journalist Miles Upshur enters Mount Massive Asylum after a tip about illegal experiments. He cannot fight back, and only has a camcorder to see in the dark, so he has to hide and run from the dangerous patients." },
            { title: "Alien: Isolation", color: "#25BF18", studio: "Creative Assembly", year: "2014", genre: "Survival Horror, Stealth",
              plot: "Fifteen years after her mother vanished, Amanda Ripley travels to the space station Sevastopol, looking for answers. A single deadly Xenomorph hunts her through the station, and she must stay hidden and use her wits to survive." },
            { title: "Resident Evil 2", color: "#BF4F18", studio: "Capcom", year: "2019 (original 1998)", genre: "Survival Horror, Action",
              plot: "Rookie cop Leon Kennedy and college student Claire Redfield arrive in Raccoon City on the same night a zombie outbreak overwhelms it. They try to escape and find answers, while a relentless monster hunts them through the police station." },
            { title: "Amnesia: The Dark Descent", color: "#6F4FEE", studio: "Frictional Games", year: "2010", genre: "Psychological Horror",
              plot: "Daniel wakes up in a dark, empty castle with no memory of how he got there. He cannot fight back, so he must hide from the creatures in the shadows, keep his sanity, and uncover what he has done." },
            { title: "Phasmophobia", color: "#5FD6C2", studio: "Kinetic Games", year: "2020 (early access)", genre: "Co-op Horror",
              plot: "You and your friends are paranormal investigators who enter haunted places to find out what kind of ghost lives there. You use gadgets, collect evidence, and try to get out alive, because the ghost can hunt you." },
            { title: "The Evil Within", color: "#E01F6B", studio: "Tango Gameworks", year: "2014", genre: "Survival Horror",
              plot: "Detective Sebastian Castellanos arrives at a mental hospital to investigate a massacre, and then finds himself trapped in a twisted nightmare world. He must survive terrifying creatures while he searches for the truth." },
            { title: "Until Dawn", color: "#9FB0EE", studio: "Supermassive Games", year: "2015", genre: "Interactive Drama, Horror",
              plot: "Eight friends return to a mountain lodge a year after a tragedy, and something dangerous is stalking them in the snow. Every choice you make changes who survives until dawn." }
        ]
    },
    {
        name: "Racing",
        games: [
            { title: "Forza Horizon 5", color: "#EED44F", studio: "Playground Games", year: "2021", genre: "Open World Racing",
              plot: "You are invited to the Horizon Festival in a beautiful, open version of Mexico. You drive over deserts, jungles, cities, and volcanoes, take part in races and challenges, and slowly build your career as a driver." },
            { title: "Gran Turismo 7", color: "#8B1CE3", studio: "Polyphony Digital", year: "2022", genre: "Racing Simulation",
              plot: "This game celebrates car culture. You collect cars, tune them, and enter realistic races on famous tracks, while learning about the history of the cars through a calm, museum-like cafe menu." },
            { title: "Need for Speed Heat", color: "#EE4FD4", studio: "Ghost Games", year: "2019", genre: "Arcade Racing",
              plot: "In Palm City, you race legally during the day to earn money, and race in illegal street races at night. The more you drive at night, the more attention you get from a corrupt police task force that wants to stop you." },
            { title: "F1 25", color: "#EE4F62", studio: "Codemasters", year: "2025", genre: "Racing Simulation",
              plot: "This is the official Formula 1 racing game. You can drive as your favourite real driver or create your own and build a career with a team, across the whole season and its tracks around the world." },
            { title: "The Crew Motorfest", color: "#4FC7EE", studio: "Ivory Tower", year: "2023", genre: "Open World Racing",
              plot: "You travel to the Hawaiian island of Oahu to join a big car festival. The festival has different playlists, with cars of all types, from street racers to planes and boats, and you race through the island's roads, beaches and mountains." },
            { title: "Mario Kart 8 Deluxe", color: "#EE2D2D", studio: "Nintendo EPD", year: "2017", genre: "Kart Racing",
              plot: "Mario and his friends race through colourful tracks, including ones that twist upside down and let you drive on walls. You collect items like shells and bananas to slow down your rivals and take first place." },
            { title: "Burnout Paradise", color: "#EE7A18", studio: "Criterion Games", year: "2008", genre: "Arcade Racing, Open World",
              plot: "You drive freely around Paradise City, with no fixed tracks, racing and crashing wherever you want. The game rewards fast, dangerous driving with huge, slow-motion crashes and stunts." },
            { title: "Assetto Corsa", color: "#8F9CEE", studio: "Kunos Simulazioni", year: "2014", genre: "Racing Simulation",
              plot: "This is a very realistic racing game that focuses on how real cars feel to drive. You race famous cars on real circuits, tune them carefully, and can add new cars and tracks made by the community." },
            { title: "DiRT Rally 2.0", color: "#BF8F18", studio: "Codemasters", year: "2019", genre: "Rally Racing Simulation",
              plot: "You drive powerful rally cars on dirt, gravel, snow, and tarmac, with a co-driver reading the road ahead. One mistake can send you into a tree, so you must focus on every corner to finish the stage." },
            { title: "Trackmania", color: "#18E0A1", studio: "Nadeo", year: "2020", genre: "Arcade Racing, Time Attack",
              plot: "Fast, simple races where the goal is to get the best time on crazy tracks full of jumps and loops. You try the same track again and again, trimming milliseconds, and you can build your own tracks to share." }
        ]
    }
];

const genreButton = document.getElementById('genre-button');
const genreBox = document.getElementById('genre-box');

// Turns a name into a safe id for HTML, e.g. "Devil May Cry 5" -> "devil-may-cry-5".
function slug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Builds the whole genre box (genres > games > details) from genreData.
// For every genre it creates a tile, and inside it a tile for each of its games.
genreBox.innerHTML = genreData.map(function (genre, index) {
    const genreId = 'genre-' + slug(genre.name);

    const gamesHtml = genre.games.map(function (game) {
        const gameId = 'game-' + slug(game.title);

        return `
        <div class="game-entry" style="--game-color: ${game.color}">
            <button type="button" class="game-toggle" aria-expanded="false" aria-controls="${gameId}">
                <span>${game.title}</span>
                <span class="expand-icon" aria-hidden="true">+</span>
            </button>
            <div class="expand" id="${gameId}">
                <div class="expand-inner">
                    <div class="game-details">
                        <dl class="game-facts">
                            <dt>STUDIO</dt><dd>${game.studio}</dd>
                            <dt>RELEASED</dt><dd>${game.year}</dd>
                            <dt>GENRE</dt><dd>${game.genre}</dd>
                        </dl>
                        <h4 class="game-plot-title">The plot</h4>
                        <p class="game-plot">${game.plot}</p>
                    </div>
                </div>
            </div>
        </div>`;
    }).join('');

    return `
    <div class="genre-item">
        <button type="button" class="genre-toggle" aria-expanded="false" aria-controls="${genreId}">
            <span class="genre-number">${String(index + 1).padStart(2, '0')}</span>
            <span class="genre-name">${genre.name}</span>
            <span class="expand-icon" aria-hidden="true">+</span>
        </button>
        <div class="expand" id="${genreId}">
            <div class="expand-inner">
                <div class="game-list">${gamesHtml}</div>
            </div>
        </div>
    </div>`;
}).join('');

// Opens or closes ONE genre tile or ONE game tile.
// button = the + / − button that was clicked, shouldOpen = true or false.
function setRowOpen(button, shouldOpen) {
    const row = button.parentElement;                         // .genre-item or .game-entry
    const panel = document.getElementById(button.getAttribute('aria-controls'));

    row.classList.toggle('open', shouldOpen);
    panel.classList.toggle('open', shouldOpen);
    button.querySelector('.expand-icon').textContent = shouldOpen ? '−' : '+';
}

// Shows an element (removing 'hidden') and cancels any hide that was on its way.
function showAnimated(el) {
    clearTimeout(el.hideTimer);
    el.classList.remove('closing');
    el.hidden = false;
}

// Hides an element smoothly: adds the class "closing" (CSS plays a fade-out),
// then really hides it when the fade-out is finished. ms must match the CSS time.
function hideAnimated(el, ms) {
    if (el.classList.contains('closing')) return;           // already on its way out
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.classList.add('closing');
    el.hideTimer = setTimeout(function () {
        el.hidden = true;
        el.classList.remove('closing');
    }, reduceMotion ? 0 : ms);
}

// Shows or hides the whole genre box (the one under 'Select your genre').
// It also turns the ▾ arrow (the class "open" on the button) and fades the box in or out.
function setGenreBoxOpen(shouldOpen) {
    genreButton.classList.toggle('open', shouldOpen);
    if (shouldOpen) {
        showAnimated(genreBox);
    } else if (!genreBox.hidden) {
        hideAnimated(genreBox, 300);
    }
}

// The 'Select your genre' button: opens the box if it is closed, closes it if it is open.
genreButton.addEventListener('click', function () {
    setGenreBoxOpen(genreBox.hidden || genreBox.classList.contains('closing'));
});

// Handles every click inside the genre box.
// Clicking a genre opens it (only one genre can be open at a time).
// Clicking a game opens or closes its details.
genreBox.addEventListener('click', function (event) {
    const genreToggle = event.target.closest('.genre-toggle');
    const gameToggle = event.target.closest('.game-toggle');

    if (genreToggle) {
        const willOpen = !genreToggle.parentElement.classList.contains('open');

        // Only one genre open at a time
        genreBox.querySelectorAll('.genre-toggle').forEach(function (other) {
            if (other !== genreToggle) setRowOpen(other, false);
        });
        setRowOpen(genreToggle, willOpen);
    }

    if (gameToggle) {
        const willOpen = !gameToggle.parentElement.classList.contains('open');
        setRowOpen(gameToggle, willOpen);
    }
});

// Pressing Escape closes the genre box (but not while the random-game pop-up is open).
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !genreBox.hidden && gameModal.hidden) {
        setGenreBoxOpen(false);
    }
});


// =========================================================
// Dice: spins, then randomly opens a game from the library
// =========================================================

const diceButton = document.getElementById('dice-button');
const diceEl = document.getElementById('dice');

// Where the dots go on each face of the dice: [row, column].
const pipMap = {
    1: [[2, 2]],
    2: [[1, 1], [3, 3]],
    3: [[1, 1], [2, 2], [3, 3]],
    4: [[1, 1], [1, 3], [3, 1], [3, 3]],
    5: [[1, 1], [1, 3], [2, 2], [3, 1], [3, 3]],
    6: [[1, 1], [2, 1], [3, 1], [1, 3], [2, 3], [3, 3]]
};

// Builds the six faces of the 3D dice, each with its dots.
diceEl.innerHTML = [1, 2, 3, 4, 5, 6].map(function (n) {
    const pips = pipMap[n].map(function (p) {
        return '<i style="grid-area: ' + p[0] + ' / ' + p[1] + '"></i>';
    }).join('');
    return '<span class="face face-' + n + '">' + pips + '</span>';
}).join('');

let lastPick = '';
let isRolling = false;

// The pop-up that shows the chosen game
const gameModal = document.getElementById('game-modal');
const modalClose = document.getElementById('modal-close');

// Fills the random-game pop-up with a game's details (name, studio, year, genre, plot) and shows it.
function showGameModal(genre, game) {
    document.getElementById('modal-genre').textContent = genre.name;
    document.getElementById('modal-title').textContent = game.title;
    document.getElementById('modal-studio').textContent = game.studio;
    document.getElementById('modal-year').textContent = game.year;
    document.getElementById('modal-type').textContent = game.genre;
    document.getElementById('modal-plot').textContent = game.plot;

    showAnimated(gameModal);
}

// Hides the random-game pop-up (with a fade-out).
function closeGameModal() {
    hideAnimated(gameModal, 250);
}

// Chooses a random game from the library (never the same one twice in a row) and shows it.
function pickRandomGame() {
    let genre, game;
    do {
        genre = genreData[Math.floor(Math.random() * genreData.length)];
        game = genre.games[Math.floor(Math.random() * genre.games.length)];
    } while (game.title === lastPick);
    lastPick = game.title;

    showGameModal(genre, game);
}

// Spins the dice for about 1 second, then picks and shows a random game.
// 'isRolling' stops you from rolling again while it is already spinning.
function rollDice() {
    if (isRolling) return;
    isRolling = true;
    diceButton.classList.add('rolling');

    setTimeout(function () {
        diceButton.classList.remove('rolling');
        isRolling = false;
        pickRandomGame();
    }, 1100);
}

// Clicking the dice rolls it.
diceButton.addEventListener('click', rollDice);

// Three ways to close the random-game pop-up: the X button, clicking outside the card, or Escape.
modalClose.addEventListener('click', closeGameModal);

gameModal.addEventListener('click', function (event) {
    if (event.target === gameModal) closeGameModal();
});

// Pressing Escape closes the random-game pop-up.
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !gameModal.hidden) closeGameModal();
});


// =========================================================
// Mini-games: Survive for 60 Seconds, Memory Match
// (they open in a pop-up when you press a "Play game" button)
// =========================================================

const arcadeModal = document.getElementById('arcade-modal');
const arcadeStage = document.getElementById('arcade-stage');
const arcadeHud = document.getElementById('arcade-hud');
let session = 0;          // every new game gets a new number, so an old game's loop stops itself

// ----- Keyboard + pointer (mouse / finger) -----
const keys = {};
let pointer = { x: null, y: null };

// Listens to the keyboard while a mini-game is open: remembers which keys are held down,
// stops the page scrolling with the arrow keys, and closes the pop-up on Escape.
document.addEventListener('keydown', function (e) {
    if (arcadeModal.hidden) return;
    const key = e.key.toLowerCase();
    keys[key] = true;
    // stop the page scrolling while playing
    if (['arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(key)) e.preventDefault();
    if (key === 'escape') closeArcade();
});
// When a key is let go, remember that it is no longer held down.
document.addEventListener('keyup', function (e) { keys[e.key.toLowerCase()] = false; });

// Reads a saved best score from the browser (0 if there isn't one yet).
// name = which game, e.g. 'survive'.
function getBest(name) { return Number(localStorage.getItem('playstate-' + name)) || 0; }
// Saves a best score in the browser so it is still there next time you visit.
function setBest(name, value) { localStorage.setItem('playstate-' + name, value); }

// ----- Open / close the pop-up -----
const games = {
    survive:  { title: 'Survive for 60 Seconds', help: 'Dodge the falling blocks. Arrow keys / WASD, or drag with your mouse or finger.', run: playSurvive },
    memory:   { title: 'Memory Match',           help: 'Flip two cards at a time and find all 8 pairs in as few moves as you can.',       run: playMemory }
};

// Opens the mini-game pop-up and starts the game you picked ('survive' or 'memory').
// Every call makes a new 'session' number, so the previous game's loop and timer stop by themselves.
function openArcade(name) {
    const game = games[name];
    session++;
    pointer = { x: null, y: null };
    document.getElementById('arcade-title').textContent = game.title;
    document.getElementById('arcade-help').textContent = game.help;
    arcadeModal.hidden = false;
    game.run();
}

// Closes the mini-game pop-up and stops whatever game was running.
function closeArcade() {
    session++;                    // stops any running game loop / timer
    arcadeModal.hidden = true;
    arcadeStage.innerHTML = '';
}

// Every 'Play game' button in the arcade opens its game when clicked.
document.querySelectorAll('[data-play]').forEach(function (button) {
    button.addEventListener('click', function () { openArcade(button.dataset.play); });
});
// The X button closes the mini-game pop-up, and so does clicking the dark area outside the card.
document.getElementById('arcade-close').addEventListener('click', closeArcade);
arcadeModal.addEventListener('click', function (e) { if (e.target === arcadeModal) closeArcade(); });

// Builds the game screen for the canvas game (Survive for 60 Seconds):
// a canvas to draw on, plus a start / game over screen on top of it.
// onStart = the function to run when the player presses the start button.
// Returns the canvas, its drawing tool (ctx) and showOverlay() for the end screen.
function buildArena(title, text, buttonLabel, onStart) {
    arcadeStage.className = 'game-frame';
    arcadeStage.innerHTML =
        '<canvas width="640" height="400"></canvas>' +
        '<div class="overlay"><h4></h4><p></p><button type="button" class="button button-primary"></button></div>';

    const canvas = arcadeStage.querySelector('canvas');
    const overlay = arcadeStage.querySelector('.overlay');
    const button = overlay.querySelector('button');

    // Shows the start / game over screen with a title, a message and a button label.
    function showOverlay(t, p, b) {
        overlay.querySelector('h4').textContent = t;
        overlay.querySelector('p').textContent = p;
        button.textContent = b;
        overlay.hidden = false;
    }
    showOverlay(title, text, buttonLabel);

    // Works out where the mouse or finger is on the canvas (in canvas coordinates).
    function move(e) {
        const r = canvas.getBoundingClientRect();
        pointer.x = (e.clientX - r.left) * (canvas.width / r.width);
        pointer.y = (e.clientY - r.top) * (canvas.height / r.height);
    }
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerdown', move);

    button.addEventListener('click', function () {
        overlay.hidden = true;
        pointer = { x: null, y: null };
        onStart();
    });

    return { canvas: canvas, ctx: canvas.getContext('2d'), showOverlay: showOverlay };
}

// Moves something (obj) with the arrow keys or W A S D.
// speed = pixels per second, dt = time since the last frame (so it feels the same on every computer).
function readKeys(obj, speed, dt) {
    if (keys['arrowleft'] || keys['a']) obj.x -= speed * dt;
    if (keys['arrowright'] || keys['d']) obj.x += speed * dt;
    if (keys['arrowup'] || keys['w']) obj.y -= speed * dt;
    if (keys['arrowdown'] || keys['s']) obj.y += speed * dt;
}

// Makes something (obj) glide towards the mouse or finger. A bigger 'strength' = faster.
function followPointer(obj, strength, dt) {
    if (pointer.x === null) return;
    obj.x += (pointer.x - obj.x) * Math.min(1, strength * dt);
    obj.y += (pointer.y - obj.y) * Math.min(1, strength * dt);
}


// =========================================================
// Game 1: Survive for 60 Seconds
// =========================================================
// Sets up the game: HUD, start screen and player. All the game's functions live inside it.
function playSurvive() {
    arcadeHud.innerHTML = '<span>Time: <b id="hud-time">60.0</b></span><span>Best: <b id="hud-best"></b>s</span>';
    const timeEl = document.getElementById('hud-time');
    const bestEl = document.getElementById('hud-best');
    bestEl.textContent = getBest('survive').toFixed(1);

    const arena = buildArena('Ready?', 'Stay alive for the full minute. The blocks get faster over time.', 'Start game', start);
    const canvas = arena.canvas, ctx = arena.ctx;
    const player = { x: 320, y: 350, size: 22 };
    let blocks, elapsed, spawnTimer, lastTime;
    const mySession = session;

    // Resets everything (blocks, time, player position) and starts the game loop.
    function start() {
        blocks = []; elapsed = 0; spawnTimer = 0;
        player.x = canvas.width / 2; player.y = canvas.height - 50;
        lastTime = performance.now();
        requestAnimationFrame(loop);
    }

    // Called when the game ends: saves the best time if it's a record and shows the game over screen.
    function end(won) {
        if (elapsed > getBest('survive')) { setBest('survive', elapsed); bestEl.textContent = elapsed.toFixed(1); }
        arena.showOverlay(won ? 'You survived! 🎉' : 'Game over',
            won ? 'A full 60 seconds. Impressive!' : 'You lasted ' + elapsed.toFixed(1) + ' seconds. Try again!',
            'Play again');
    }

    // The game loop, runs about 60 times per second. Each time it moves the player,
    // creates and moves the blocks, checks for hits, updates the timer and redraws the screen.
    function loop(now) {
        if (mySession !== session) return;                 // pop-up was closed
        const dt = Math.min((now - lastTime) / 1000, 0.05); // seconds since the last frame
        lastTime = now;
        elapsed += dt;

        readKeys(player, 330, dt);
        followPointer(player, 12, dt);
        player.x = Math.max(11, Math.min(canvas.width - 11, player.x));
        player.y = Math.max(11, Math.min(canvas.height - 11, player.y));

        // New blocks: faster and more often as time passes
        spawnTimer -= dt;
        if (spawnTimer <= 0) {
            const size = 20 + Math.random() * 30;
            blocks.push({ x: Math.random() * (canvas.width - size), y: -size, size: size,
                          speed: 140 + elapsed * 4 + Math.random() * 80 });
            spawnTimer = Math.max(0.18, 0.7 - elapsed * 0.008);
        }

        blocks.forEach(function (b) { b.y += b.speed * dt; });
        blocks = blocks.filter(function (b) { return b.y < canvas.height + 50; });

        // Did a block hit the player? (slightly forgiving hitbox)
        const half = player.size / 2 - 3;
        const hit = blocks.some(function (b) {
            return player.x + half > b.x && player.x - half < b.x + b.size &&
                   player.y + half > b.y && player.y - half < b.y + b.size;
        });

        timeEl.textContent = Math.max(0, 60 - elapsed).toFixed(1);
        draw();
        if (hit) { end(false); return; }
        if (elapsed >= 60) { end(true); return; }
        requestAnimationFrame(loop);
    }

    // Draws one frame: background, falling blocks, then the player.
    function draw() {
        ctx.fillStyle = '#0b1020';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#FF3CAC';
        blocks.forEach(function (b) { ctx.fillRect(b.x, b.y, b.size, b.size); });
        ctx.fillStyle = '#A855F7';
        ctx.fillRect(player.x - 11, player.y - 11, 22, 22);
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.strokeRect(player.x - 11, player.y - 11, 22, 22);
    }
}


// =========================================================
// Game 2: Memory Match
// =========================================================
// Sets up the game: HUD, timer and cards. All the game's functions live inside it.
function playMemory() {
    arcadeHud.innerHTML = '<span>Moves: <b id="hud-moves">0</b></span><span>Time: <b id="hud-time">0</b>s</span><span>Best: <b id="hud-best"></b></span>';
    const movesEl = document.getElementById('hud-moves');
    const timeEl = document.getElementById('hud-time');
    const bestEl = document.getElementById('hud-best');

    const symbols = ['🎮', '👾', '🕹️', '🏆', '⚔️', '🚀', '🧩', '🐉'];
    let first = null, locked = false, moves = 0, matched = 0, seconds = 0, timer = null;

    // Shows the best (lowest) number of moves in the HUD.
    function showBest() { const b = getBest('memory'); bestEl.textContent = b ? b + ' moves' : '-'; }

    // Starts a fresh game: resets the counters, shuffles 8 pairs of symbols and builds the 16 cards.
    function newGame() {
        clearInterval(timer);
        first = null; locked = false; moves = 0; matched = 0; seconds = 0; timer = null;
        movesEl.textContent = 0; timeEl.textContent = 0;
        showBest();

        // Two of each symbol, shuffled
        const deck = symbols.concat(symbols).sort(function () { return Math.random() - 0.5; });
        arcadeStage.className = '';
        arcadeStage.innerHTML =
            '<div class="memory-grid">' + deck.map(function (s) {
                return '<button type="button" class="mem-card" data-symbol="' + s + '" aria-label="Hidden card">' +
                       '<span class="mem-inner"><span class="mem-face mem-back">P.</span>' +
                       '<span class="mem-face mem-front">' + s + '</span></span></button>';
            }).join('') + '</div>' +
            '<p class="memory-message" id="memory-message"></p>' +
            '<button type="button" class="button button-primary" id="memory-restart">New game</button>';

        document.getElementById('memory-restart').addEventListener('click', newGame);
        arcadeStage.querySelector('.memory-grid').addEventListener('click', flip);
    }

    // Runs when a card is clicked: flips it and starts the timer.
    // If it's the second card of a pair, it checks for a match:
    // a match stays face up, no match flips back after 0.8 seconds.
    function flip(e) {
        const card = e.target.closest('.mem-card');
        if (!card || locked || card.classList.contains('flipped') || card.classList.contains('matched')) return;

        if (!timer) {
            timer = setInterval(function () {
                seconds++; timeEl.textContent = seconds;
            }, 1000);
        }
        card.classList.add('flipped');
        if (!first) { first = card; return; }       // first card of the pair

        moves++; movesEl.textContent = moves;
        if (first.dataset.symbol === card.dataset.symbol) {      // it's a match!
            first.classList.add('matched'); card.classList.add('matched');
            first = null; matched++;
            if (matched === symbols.length) win();
        } else {                                                  // no match: flip them back
            locked = true;
            const a = first, b = card;
            first = null;
            setTimeout(function () { a.classList.remove('flipped'); b.classList.remove('flipped'); locked = false; }, 800);
        }
    }

    // Called when all 8 pairs are found: stops the timer, saves the best score and shows the win message.
    function win() {
        clearInterval(timer);
        let text = 'You matched them all in ' + moves + ' moves and ' + seconds + ' seconds! 🎉';
        const best = getBest('memory');
        if (!best || moves < best) { setBest('memory', moves); text += ' New best!'; }
        document.getElementById('memory-message').textContent = text;
        showBest();
    }

    newGame();
}



// =========================================================
// Login / Sign up pop-up
// DEMO ONLY: accounts are saved in this browser (localStorage), not on a server.
// =========================================================

const authModal = document.getElementById('auth-modal');
const authOpenButton = document.getElementById('auth-open');
const authForm = document.getElementById('auth-form');
const authMessage = document.getElementById('auth-message');
const authSubmit = document.getElementById('auth-submit');
const authGuest = document.getElementById('auth-guest');
const authLoggedIn = document.getElementById('auth-loggedin');
let authMode = 'login';          // 'login' or 'signup': which tab is selected

// Turns a password into a scrambled number, so the real password is never saved.
// (Only a demo! A real website does this on a server with a much stronger method.)
function scramble(text) {
    let hash = 5381;
    for (let i = 0; i < text.length; i++) {
        hash = (hash * 33 + text.charCodeAt(i)) % 4294967296;   // keep it a normal-size number
    }
    return String(hash);
}

// All saved accounts: { "email": { username: "...", password: "scrambled" } }
function getUsers() {
    return JSON.parse(localStorage.getItem('playstate-users')) || {};
}

// The email of whoever is logged in right now (or null)
function getCurrentEmail() {
    return localStorage.getItem('playstate-current');
}

// Changes the nav button: "Log in" when nobody is logged in, "Hi, name" when someone is.
function updateAuthButton() {
    const user = getUsers()[getCurrentEmail()];
    authOpenButton.textContent = user ? 'Hi, ' + user.username : 'Log in';
}

// Switches between the "Log in" and "Sign up" tabs.
function setAuthMode(mode) {
    authMode = mode;
    document.querySelectorAll('.auth-tab').forEach(function (tab) {
        tab.classList.toggle('active', tab.dataset.tab === mode);
    });
    document.querySelectorAll('.auth-signup-only').forEach(function (field) {
        field.hidden = mode !== 'signup';        // the username box is only for signing up
    });
    authSubmit.textContent = mode === 'signup' ? 'Create account' : 'Log in';
    authMessage.textContent = '';
}

// Shows the right half of the pop-up: the forms (nobody logged in) or the "Hi, name!" screen.
function showAuthScreen() {
    const user = getUsers()[getCurrentEmail()];
    authGuest.hidden = !!user;
    authLoggedIn.hidden = !user;
    if (user) {
        document.getElementById('auth-name').textContent = user.username;   // textContent is safe from tricky input
    } else {
        authForm.reset();
        setAuthMode('login');
    }
}

function openAuth() {
    showAuthScreen();
    showAnimated(authModal);
}

function closeAuth() {
    hideAnimated(authModal, 250);
}

// Runs when the form is sent (the button, or pressing Enter): checks the boxes, then logs in or signs up.
authForm.addEventListener('submit', function (event) {
    event.preventDefault();                       // don't reload the page

    const username = document.getElementById('auth-username').value.trim();
    const email = document.getElementById('auth-email').value.trim().toLowerCase();
    const password = document.getElementById('auth-password').value;
    const users = getUsers();

    // Checks that apply to both
    if (!email.includes('@') || !email.includes('.')) {
        authMessage.textContent = 'Please enter a valid email.';
        return;
    }
    if (password.length < 6) {
        authMessage.textContent = 'Your password needs at least 6 characters.';
        return;
    }

    if (authMode === 'signup') {
        if (username.length < 2) {
            authMessage.textContent = 'Please choose a username (at least 2 characters).';
            return;
        }
        if (users[email]) {
            authMessage.textContent = 'There is already an account with this email. Try logging in.';
            return;
        }
        users[email] = { username: username, password: scramble(password) };
        localStorage.setItem('playstate-users', JSON.stringify(users));
    } else {
        // Log in: same message for "no account" and "wrong password" on purpose
        if (!users[email] || users[email].password !== scramble(password)) {
            authMessage.textContent = 'Wrong email or password.';
            return;
        }
    }

    localStorage.setItem('playstate-current', email);   // remember who is logged in
    updateAuthButton();
    showAuthScreen();
});

// The two tabs
document.querySelectorAll('.auth-tab').forEach(function (tab) {
    tab.addEventListener('click', function () { setAuthMode(tab.dataset.tab); });
});

// Log out
document.getElementById('auth-logout').addEventListener('click', function () {
    localStorage.removeItem('playstate-current');
    updateAuthButton();
    showAuthScreen();
});

// Opening and closing the pop-up: nav button, X button, click outside the card, or Escape
authOpenButton.addEventListener('click', openAuth);
document.getElementById('auth-close').addEventListener('click', closeAuth);
authModal.addEventListener('click', function (event) {
    if (event.target === authModal) closeAuth();
});
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !authModal.hidden) closeAuth();
});

updateAuthButton();              // when the page loads, show "Hi, name" if someone is already logged in
