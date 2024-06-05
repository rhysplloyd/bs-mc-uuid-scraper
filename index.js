const users = require('./user.json');

const init = async () => {
    const names = await Promise.all(users.map(async (el, i) => {
        try {
            const response = await fetch(`https://playerdb.co/api/player/minecraft/${el.mcPlayerUUID}`);
            if (response.status !== 200) {
                console.error(`${response.status}: There was an error establishing connection to the API endpoint. Please try again later.`);
                return '';
            }
            const newUser = await response.json();
            return newUser.data.player.username;
        } catch (err) {
            if (!el.mcPlayerUUID) {
                console.error(`No player found with UUID on entry ${i + 1}`);
            }
        }
    }))
    names.sort(Intl.Collator().compare);
    names.forEach(name => console.log(name))
}

init()


