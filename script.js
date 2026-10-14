// =========================================================
// PLAYSTATE - script.js
// Journal: click an article to expand it and read the full text
// =========================================================

const journalCards = document.querySelectorAll('.journal-card');

// Open or close one article card
function setArticleOpen(card, shouldOpen) {
    const button = card.querySelector('.journal-toggle');
    const body = card.querySelector('.article-body');

    card.classList.toggle('open', shouldOpen);
    body.classList.toggle('open', shouldOpen);

    // Keep the button accessible and update its text
    button.setAttribute('aria-expanded', shouldOpen);
    button.querySelector('.toggle-label').textContent = shouldOpen ? 'Close article' : 'Read article';
    button.querySelector('.toggle-icon').textContent = shouldOpen ? '−' : '+';
}

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

// The "Read article" link in the featured story opens article 1 and scrolls to it
document.querySelectorAll('[data-open-article]').forEach(function (link) {
    link.addEventListener('click', function (event) {
        event.preventDefault();

        const card = document.getElementById(link.dataset.openArticle);
        if (!card) return;

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
            { title: "Devil May Cry 5", studio: "Capcom", year: "2019", genre: "Action, Hack and Slash",
              plot: "Demons are invading Red Grave City, and a giant demonic tree is draining the life from the streets. Three hunters take on the threat: the young Nero, the mysterious V, and the legendary Dante. Their paths lead them to the demon king Urizen and to some painful truths about their own family." },
            { title: "Sekiro: Shadows Die Twice", studio: "FromSoftware", year: "2019", genre: "Action-Adventure",
              plot: "In a war-torn version of Sengoku-era Japan, a shinobi called Wolf swears to protect a young lord whose blood grants a rare power. After the boy is kidnapped and Wolf loses an arm, he gets a prosthetic tool and sets out to rescue him and face the powers that want to control his gift." },
            { title: "Batman: Arkham Knight", studio: "Rocksteady Studios", year: "2015", genre: "Action-Adventure",
              plot: "The Scarecrow threatens Gotham City with a fear toxin, forcing the city to be evacuated. As Batman fights to stop him, a mysterious military commander called the Arkham Knight appears, with an army and a deep hatred of the Dark Knight." },
            { title: "Metal Gear Rising: Revengeance", studio: "PlatinumGames", year: "2013", genre: "Action, Hack and Slash",
              plot: "Raiden, a cyborg soldier, is now working for a private security company. When a rival group of cyborgs kidnaps a prime minister, he is pulled into a conspiracy led by a politician with a dangerous plan. Raiden must decide what kind of fighter he wants to be." },
            { title: "Ghost of Tsushima", studio: "Sucker Punch Productions", year: "2020", genre: "Action-Adventure",
              plot: "In 1274, the Mongol army invades the island of Tsushima. Samurai Jin Sakai is one of the few survivors, and he realises that honorable fighting will not be enough to save his home. He starts using stealth and fear to defend the island, and becomes a legend known as the Ghost." }
        ]
    },
    {
        name: "Adventure",
        games: [
            { title: "Red Dead Redemption 2", studio: "Rockstar Games", year: "2018", genre: "Action-Adventure, Open World",
              plot: "In 1899, the American frontier is changing and outlaws are running out of places to hide. Arthur Morgan and the Van der Linde gang are on the run after a failed robbery, and as the pressure grows, Arthur must decide what he really believes in." },
            { title: "The Legend of Zelda: Breath of the Wild", studio: "Nintendo EPD", year: "2017", genre: "Action-Adventure, Open World",
              plot: "Link wakes up after a hundred years of sleep with no memory of his past. The kingdom of Hyrule lies in ruins, held under the grip of the evil Calamity Ganon. Link explores the huge open world to recover his memories and free Princess Zelda." },
            { title: "Uncharted 4: A Thief's End", studio: "Naughty Dog", year: "2016", genre: "Action-Adventure",
              plot: "Nathan Drake has left treasure hunting behind, until his long-lost brother Sam shows up and needs his help. Together they search for the hidden treasure of the pirate Henry Avery, travelling across the world while others race to get there first." },
            { title: "Tomb Raider", studio: "Crystal Dynamics", year: "2013", genre: "Action-Adventure",
              plot: "A young Lara Croft joins an expedition, but her ship is wrecked on a mysterious island. Alone and hunted, she must learn to survive, save her friends, and uncover the secrets of the island and its ancient past." },
            { title: "Indiana Jones and the Great Circle", studio: "MachineGames", year: "2024", genre: "Action-Adventure",
              plot: "In 1937, a strange theft at Marshall College pulls Indiana Jones into a worldwide mystery. His search takes him from the Vatican to the Himalayas and beyond, as he follows clues linked to ancient sites and races a dangerous group who want the same power." }
        ]
    },
    {
        name: "RPG (Role-Playing Game)",
        games: [
            { title: "Baldur's Gate 3", studio: "Larian Studios", year: "2023", genre: "RPG, Turn-Based",
              plot: "You wake up infected with a mind flayer parasite that will slowly turn you into a monster. To find a cure, you team up with a group of unlikely companions, and every choice you make changes the story and how your allies see you." },
            { title: "The Witcher 3: Wild Hunt", studio: "CD Projekt Red", year: "2015", genre: "Action RPG, Open World",
              plot: "Geralt of Rivia, a monster hunter, searches for Ciri, the girl who is like a daughter to him. She is hunted by the Wild Hunt, a ghostly army, and Geralt must cross a war-torn world full of dangerous creatures and hard choices to find her first." },
            { title: "Persona 5 Royal", studio: "Atlus", year: "2019 (worldwide 2020)", genre: "RPG, Turn-Based",
              plot: "A high school student moves to Tokyo and discovers a hidden world that reflects people's hearts. With his new friends he becomes one of the Phantom Thieves, who sneak into these places to change the hearts of corrupt adults, while also balancing school and everyday life." },
            { title: "Dragon Age: Inquisition", studio: "BioWare", year: "2014", genre: "Action RPG",
              plot: "A huge tear in the sky, called the Breach, is letting demons into the world. You become the leader of the Inquisition, a new force that gathers allies, builds a base, and tries to close the Breach and stop the villain behind it." },
            { title: "Cyberpunk 2077", studio: "CD Projekt Red", year: "2020", genre: "Action RPG, Open World",
              plot: "V is a mercenary in the huge, dangerous Night City. After a job goes wrong, V ends up with a prototype chip that holds the digital ghost of a rock star and rebel, Johnny Silverhand, and the two must work together to survive." }
        ]
    },
    {
        name: "ARPG (Action Role-Playing Game)",
        games: [
            { title: "Diablo IV", studio: "Blizzard Entertainment", year: "2023", genre: "Action RPG, Dungeon Crawler",
              plot: "Lilith, a powerful demon, has returned to the land of Sanctuary after many years. As a hero from one of several classes, you travel across dark, dangerous regions to fight her cult and stop her plans." },
            { title: "Path of Exile 2", studio: "Grinding Gear Games", year: "2024 (early access)", genre: "Action RPG",
              plot: "The land of Wraeclast is slowly being eaten by a spreading corruption. Exiles from all kinds of backgrounds fight through ruined cities and ancient places to find the cause, uncovering the secrets of gods who once ruled this world." },
            { title: "Nioh 2", studio: "Team Ninja", year: "2020", genre: "Action RPG, Soulslike",
              plot: "Japan is in the middle of the Sengoku civil wars, and yokai (spirits) roam the land. You play a half-human, half-yokai warrior who uses both worlds' powers while meeting famous historical figures and fighting to survive." },
            { title: "Kingdoms of Amalur: Re-Reckoning", studio: "Kaiko", year: "2020", genre: "Action RPG, Open World",
              plot: "You are a dead warrior who is brought back to life by an experiment, and no one knows what fate has planned for you. Since you have no destiny, you can change the future, and you set out to stop an endless war between the fae." },
            { title: "Grim Dawn", studio: "Crate Entertainment", year: "2016", genre: "Action RPG, Dungeon Crawler",
              plot: "Humanity is nearly wiped out after a war with beings from another world, and survivors cling to life in the broken land of Cairn. You rise from a possessed body and fight to protect what is left of the human race." }
        ]
    },
    {
        name: "FPS (First-Person Shooter)",
        games: [
            { title: "DOOM Eternal", studio: "id Software", year: "2020", genre: "First-Person Shooter",
              plot: "Hell's army has taken over Earth, and the Doom Slayer, a legendary warrior, comes back to stop it. He travels across the planet and beyond, hunting down the demon leaders one by one in fast, brutal battles." },
            { title: "Counter-Strike 2", studio: "Valve", year: "2023", genre: "Tactical First-Person Shooter",
              plot: "There is no single story. Instead, two teams, Terrorists and Counter-Terrorists, face off round after round in a series of competitive matches. Planting or defusing a bomb, saving hostages, and good teamwork decide who wins." },
            { title: "Call of Duty: Modern Warfare III", studio: "Sledgehammer Games", year: "2023", genre: "First-Person Shooter",
              plot: "Task Force 141 hunts Vladimir Makarov, a dangerous ultranationalist, who is planning attacks across Europe. As the situation spreads, the team has to move fast to stop him before it turns into an even bigger war." },
            { title: "Titanfall 2", studio: "Respawn Entertainment", year: "2016", genre: "First-Person Shooter",
              plot: "Jack Cooper, a rifleman who dreams of becoming a pilot, is suddenly left in charge of BT-7274, a powerful Titan war machine. Together they must complete a dangerous mission, and an unusual friendship grows between pilot and machine." },
            { title: "Overwatch 2", studio: "Blizzard Entertainment", year: "2022", genre: "Hero Shooter",
              plot: "In a future where heroes from around the world have returned to fight threats once again, you pick a character with unique powers and join a team. Players battle in fast team matches, each with a role such as tank, damage, or support." }
        ]
    },
    {
        name: "Strategy",
        games: [
            { title: "Sid Meier's Civilization VI", studio: "Firaxis Games", year: "2016", genre: "Turn-Based Strategy",
              plot: "You lead a civilization from the Stone Age to the future. You found cities, research technology, make allies or enemies, and try to win through science, culture, religion, or military power. Each game tells a different story." },
            { title: "Age of Empires IV", studio: "Relic Entertainment", year: "2021", genre: "Real-Time Strategy",
              plot: "Set in the medieval era, the game follows major historical events and powers such as the English, French, Mongols, and Rus. You gather resources, build armies, and conquer your enemies through campaigns based on real history." },
            { title: "StarCraft II", studio: "Blizzard Entertainment", year: "2010", genre: "Real-Time Strategy",
              plot: "Three races, the human Terrans, the mysterious Protoss, and the swarming Zerg, fight for control of the galaxy. The story follows rebel leader Jim Raynor as he tries to save Sarah Kerrigan, now the powerful Queen of Blades." },
            { title: "XCOM 2", studio: "Firaxis Games", year: "2016", genre: "Turn-Based Tactics",
              plot: "Twenty years ago, the world lost the war against an alien invasion, and now the aliens rule the planet. You lead a small resistance group, trying to take your world back, one risky mission at a time." },
            { title: "Total War: Warhammer III", studio: "Creative Assembly", year: "2022", genre: "Turn-Based and Real-Time Strategy",
              plot: "The Warhammer fantasy world is in danger as the Chaos gods threaten to swallow everything. Leaders of many races enter the Realm of Chaos in a race to claim a powerful prize, and the result will decide the fate of the world." }
        ]
    },
    {
        name: "Simulation",
        games: [
            { title: "The Sims 4", studio: "Maxis", year: "2014", genre: "Life Simulation",
              plot: "There is no fixed plot. You create people called Sims, build their homes, and guide their lives, from careers and friendships to families and hobbies. The stories are the ones you make up yourself." },
            { title: "Microsoft Flight Simulator 2024", studio: "Asobo Studio", year: "2024", genre: "Flight Simulation",
              plot: "You can fly aircraft across a detailed digital copy of the whole Earth. Besides free flying, you can take on career jobs such as rescue, firefighting, and cargo flights, with realistic weather and airports." },
            { title: "Euro Truck Simulator 2", studio: "SCS Software", year: "2012", genre: "Driving Simulation",
              plot: "You start as a small truck driver and slowly build your own transport company. You deliver cargo across the cities of Europe, upgrade your trucks, hire drivers, and enjoy the long, relaxing roads." },
            { title: "Planet Zoo", studio: "Frontier Developments", year: "2019", genre: "Management Simulation",
              plot: "You design and run your own zoo. You build habitats, take care of detailed animals, and keep your visitors happy, while also supporting conservation work to protect real species." },
            { title: "PowerWash Simulator", studio: "FuturLab", year: "2022", genre: "Casual Simulation",
              plot: "You run a pressure washing business, cleaning dirty places such as houses, vehicles, and playgrounds. It has a light story, but the real fun is the calm, satisfying feeling of turning a filthy place into a clean one." }
        ]
    },
    {
        name: "Survival",
        games: [
            { title: "Minecraft", studio: "Mojang Studios", year: "2011", genre: "Survival, Sandbox",
              plot: "You appear in a world made of blocks. You gather resources, craft tools, build shelters, and survive the night against monsters. Some players go on to defeat the Ender Dragon, and others simply build whatever they imagine." },
            { title: "The Forest", studio: "Endnight Games", year: "2018", genre: "Survival Horror",
              plot: "After a plane crash, you are stranded on a forested peninsula and your young son is taken by a strange figure. You build a base, hunt for food, and explore dangerous caves while mutated creatures lurk around." },
            { title: "Subnautica", studio: "Unknown Worlds Entertainment", year: "2018", genre: "Survival, Adventure",
              plot: "Your spaceship crashes on an ocean planet, and you must survive underwater. You build bases and submarines, explore colourful and dangerous reefs, and uncover the secret of what happened on the planet." },
            { title: "Rust", studio: "Facepunch Studios", year: "2018", genre: "Multiplayer Survival",
              plot: "You start with nothing but a rock on a hostile island, and other real players are the biggest danger. You gather resources, build a base, form alliances, and try to survive hunger, cold, and raids." },
            { title: "Don't Starve Together", studio: "Klei Entertainment", year: "2016", genre: "Survival, Co-op",
              plot: "In a strange and spooky world, you must find food and stay safe from creatures, the seasons, and your own sanity. Friends can join you online, and together you try to last as many days as possible." }
        ]
    },
    {
        name: "Horror",
        games: [
            { title: "Resident Evil 4", studio: "Capcom", year: "2005 (remake 2023)", genre: "Survival Horror, Action",
              plot: "Leon Kennedy, a government agent, is sent to a remote European village to rescue the president's kidnapped daughter, Ashley. The villagers are not normal, and Leon soon faces a terrifying cult and strange creatures." },
            { title: "Silent Hill 2", studio: "Konami", year: "2001 (remake 2024)", genre: "Psychological Horror",
              plot: "James Sunderland receives a letter from his wife, who died three years ago, asking him to meet her in the town of Silent Hill. He enters the foggy town, where he meets strange people and monsters that reflect his own guilt and fears." },
            { title: "Dead Space", studio: "Visceral Games", year: "2008 (remake 2023)", genre: "Survival Horror, Sci-Fi",
              plot: "Engineer Isaac Clarke flies to the mining ship USG Ishimura to fix a distress call, but the crew has vanished and horrifying creatures roam the halls. He must survive with only his tools as weapons and find a way off the ship." },
            { title: "Outlast", studio: "Red Barrels", year: "2013", genre: "Survival Horror",
              plot: "Journalist Miles Upshur enters Mount Massive Asylum after a tip about illegal experiments. He cannot fight back, and only has a camcorder to see in the dark, so he has to hide and run from the dangerous patients." },
            { title: "Alien: Isolation", studio: "Creative Assembly", year: "2014", genre: "Survival Horror, Stealth",
              plot: "Fifteen years after her mother vanished, Amanda Ripley travels to the space station Sevastopol, looking for answers. A single deadly Xenomorph hunts her through the station, and she must stay hidden and use her wits to survive." }
        ]
    },
    {
        name: "Racing",
        games: [
            { title: "Forza Horizon 5", studio: "Playground Games", year: "2021", genre: "Open World Racing",
              plot: "You are invited to the Horizon Festival in a beautiful, open version of Mexico. You drive over deserts, jungles, cities, and volcanoes, take part in races and challenges, and slowly build your career as a driver." },
            { title: "Gran Turismo 7", studio: "Polyphony Digital", year: "2022", genre: "Racing Simulation",
              plot: "This game celebrates car culture. You collect cars, tune them, and enter realistic races on famous tracks, while learning about the history of the cars through a calm, museum-like cafe menu." },
            { title: "Need for Speed Heat", studio: "Ghost Games", year: "2019", genre: "Arcade Racing",
              plot: "In Palm City, you race legally during the day to earn money, and race in illegal street races at night. The more you drive at night, the more attention you get from a corrupt police task force that wants to stop you." },
            { title: "F1 25", studio: "Codemasters", year: "2025", genre: "Racing Simulation",
              plot: "This is the official Formula 1 racing game. You can drive as your favourite real driver or create your own and build a career with a team, across the whole season and its tracks around the world." },
            { title: "The Crew Motorfest", studio: "Ivory Tower", year: "2023", genre: "Open World Racing",
              plot: "You travel to the Hawaiian island of Oahu to join a big car festival. The festival has different playlists, with cars of all types, from street racers to planes and boats, and you race through the island's roads, beaches and mountains." }
        ]
    }
];

const genreButton = document.getElementById('genre-button');
const genreBox = document.getElementById('genre-box');

// Turn a name into a safe id, e.g. "Devil May Cry 5" -> "devil-may-cry-5"
function slug(text) {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

// Build the whole list from the data above
genreBox.innerHTML = genreData.map(function (genre, index) {
    const genreId = 'genre-' + slug(genre.name);

    const gamesHtml = genre.games.map(function (game) {
        const gameId = 'game-' + slug(game.title);

        return `
        <div class="game-entry">
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

// Open or close one genre / game row
function setRowOpen(button, shouldOpen) {
    const row = button.parentElement;                         // .genre-item or .game-entry
    const panel = document.getElementById(button.getAttribute('aria-controls'));

    row.classList.toggle('open', shouldOpen);
    panel.classList.toggle('open', shouldOpen);
    button.setAttribute('aria-expanded', shouldOpen);
    button.querySelector('.expand-icon').textContent = shouldOpen ? '−' : '+';
}

// Show / hide the whole genre box with the main button
function setGenreBoxOpen(shouldOpen) {
    genreBox.hidden = !shouldOpen;
    genreButton.setAttribute('aria-expanded', shouldOpen);
}

genreButton.addEventListener('click', function () {
    setGenreBoxOpen(genreBox.hidden);
});

// Clicks inside the box: genres and games
genreBox.addEventListener('click', function (event) {
    const genreToggle = event.target.closest('.genre-toggle');
    const gameToggle = event.target.closest('.game-toggle');

    if (genreToggle) {
        const willOpen = genreToggle.getAttribute('aria-expanded') !== 'true';

        // Only one genre open at a time
        genreBox.querySelectorAll('.genre-toggle').forEach(function (other) {
            if (other !== genreToggle) setRowOpen(other, false);
        });
        setRowOpen(genreToggle, willOpen);
    }

    if (gameToggle) {
        const willOpen = gameToggle.getAttribute('aria-expanded') !== 'true';
        setRowOpen(gameToggle, willOpen);
    }
});

// Close the box with the Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !genreBox.hidden) {
        setGenreBoxOpen(false);
        genreButton.focus();
    }
});
