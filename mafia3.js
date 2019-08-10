/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

/*Games:
 - Mafia (assign mafia, record votes and points) ✓
 - 6mans (set up teams and record W/L) 
 - 1s ladder
 - random mutators
 - 
*/

/*NOTES:


*/

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

var mafiaso; //not sure 
var memNum; //not sure

//  FLAGS
var flag1s = 0; //toggles if 1s is started (0-off, 1-on)
var ranFlag = 0; //keeps randomizer from running over itself 

//  ARRAYS & MATRIXES
var playerArray = [6]; //holds player's names
var voteArray = [6]; //holds player's votes
var countArray = [6]; //holds how many people voted for who
var mafLocation = 0; //holds player array location of mafiaso
var scoreArray = [6]; //holds score
var sortedScore = [6][2]; //sorted score for endgame report
const pongresponses = ['**pong mothafucka**', 'pong', 'ping, ping, ping.  Who is it?', 'DON T TOUCH ME', 'how bout go ping yourself', '||HA, made you look!||', 'https://media.giphy.com/media/l2YWxte7sJB2XuE8M/giphy.gif', 'yeah, yeah, yeah', 'https://media.tenor.com/images/2feea74041feaa70ca7221ae28065f15/tenor.gif', 'https://media.giphy.com/media/xj7FbQfedsi3e/200.gif', 'https://media.giphy.com/media/tSniEbOGfuCnm/giphy.gif', 'https://media.giphy.com/media/hIaC7H5bIFkVa/giphy.gif', 'https://media.giphy.com/media/3o6ZtaZt380S8DlZjG/giphy.gif', 'http://66.media.tumblr.com/b8b71d6eb11c497405c7d90008522e47/tumblr_mh1rlaCmad1s446qto1_500.gif', 'https://media.tenor.com/images/ee97de4ccda02c9666391ff2ec98d5b1/tenor.gif', 'https://media.tenor.com/images/f5889ae897ec5142e8c8bd391de9d025/tenor.gif', 'https://media.giphy.com/media/d1E2qvruXFtGi6A0/giphy.gif'];
const acknowledges = ['alright, alright, alright', 'Sure thing, boss', 'I gotchu', 'yup, yup', 'finally!', 'is this my purpose?', 'ACKNOWLEDGED', 'I read you', 'Loud and clear'];
const intro1s = ['1s queue has started - you can use "!1sme" to get added and "!1sdone" to start the 1s ladder and end the queue'];

const randomfullarray = [
    ['Game Speed', 2, 'Slow-Mo', 'Time Warp'],
    ['Ball Max Speed', 3, 'Slow', 'Fast', 'Super Fast'],
    ['Ball Type', 5, 'Cube', 'Puck', 'Basketball', 'Beach Ball', 'Anniversary'],
    ['Ball Physics', 5, 'Light', 'Heavy', 'Super Light', 'Curveball','Beach Ball Curve'],
    ['Ball Size', 4, 'Small', 'Medium', 'Large', 'Gigantic'],
    ['Ball Bounciness', 3, 'Low', 'High', 'Super High'],
    ['Boost Amount', 4, 'No Boost', 'Unlimited', 'Recharge (Slow)', 'Recharge (Fast)'],
    ['Rumble', 6, 'Default', 'Slow', 'Civilized', 'Destruction Derby', 'Spring Loaded', 'Spikes Only'],
    ['Boost Strength', 3, '1.5X', '2X', '10X'],
    ['Gravity', 3, 'Low', 'High', 'Super High'],
    ['Demolish', 4, 'Disabled', 'Friendly Fire', 'On Contact', 'On Contact (FF)'],
    ['Respawn Time', 3, '2 Seconds', '1 Second', 'Disable Goal Reset']
];

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
        const mafServer = client.guilds.get('549958516991983619');
        const mafChannel = mafServer.channels.get('550438621241409552');
         voteChannel = mafServer.channels.get('550438619983249441');

        // If the message is "ping"
        if (message.content === 'ping') {
            // Send "pong" to the same channel
            memNum = Math.floor(Math.random() * pongresponses.length);
            message.channel.send(pongresponses[memNum]);
        }



        //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-     RANDOM
        if (message.content === '!random') {
            //Randomly chooses category and modifier 
            if(ranFlag == 1){
                message.channel.send('*Wait for* ***it***');
            } else {
                ranFlag = 1;
                //100% chance of happening
                var rand = [12];
                rand[0] = Math.floor(Math.random() * 12);
                message.channel.send(randomfullarray[rand[0]][0] + ' - ' + randomfullarray[rand[0]][(Math.floor(Math.random() * randomfullarray[rand[0]][1])) + 2]);
                //83.33% chance
                if ((Math.floor(Math.random() * 6)) > 1) {
                    do {
                        rand[1] = Math.floor(Math.random() * 12);
                    } while (rand[0] == rand[1]);
                    message.channel.send(randomfullarray[rand[1]][0] + ' - ' + randomfullarray[rand[1]][(Math.floor(Math.random() * randomfullarray[rand[1]][1])) + 2]);
                }
                //66.67%
                if ((Math.floor(Math.random() * 6)) > 2) {
                    do {
                        rand[2] = Math.floor(Math.random() * 12);
                    } while ((rand[0] == rand[2]) || (rand[1] == rand[2]));
                    message.channel.send(randomfullarray[rand[2]][0] + ' - ' + randomfullarray[rand[2]][(Math.floor(Math.random() * randomfullarray[rand[2]][1])) + 2]);
                }
                //50%
                if ((Math.floor(Math.random() * 6)) > 3) {
                    do {
                        rand[3] = Math.floor(Math.random() * 12);
                    } while ((rand[0] == rand[3]) || (rand[1] == rand[3]) || (rand[2] == rand[3]));
                    message.channel.send(randomfullarray[rand[3]][0] + ' - ' + randomfullarray[rand[3]][(Math.floor(Math.random() * randomfullarray[rand[3]][1])) + 2]);
                }
                //33.33%
                if ((Math.floor(Math.random() * 6)) > 4) {
                    do {
                        rand[4] = Math.floor(Math.random() * 12);
                    } while ((rand[0] == rand[4]) || (rand[1] == rand[4]) || (rand[2] == rand[4]) || (rand[3] == rand[4]));
                    message.channel.send(randomfullarray[rand[4]][0] + ' - ' + randomfullarray[rand[4]][(Math.floor(Math.random() * randomfullarray[rand[4]][1])) + 2]);
                }
                //16.67%
                if ((Math.floor(Math.random() * 6)) > 5) {
                    do {
                        rand[5] = Math.floor(Math.random() * 12);
                    } while ((rand[0] == rand[5]) || (rand[1] == rand[5]) || (rand[2] == rand[5]) || (rand[3] == rand[5]) || (rand[4] == rand[5]));
                    message.channel.send(randomfullarray[rand[5]][0] + ' - ' + randomfullarray[rand[5]][(Math.floor(Math.random() * randomfullarray[rand[5]][1])) + 2]);
                }
                message.channel.send('Done');
                ranFlag = 0;
            }
        }



		//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-     1s Ladder
        if (message.content === '!start1s') {  //Initializes the queue
			flag1s = 1;
            message.channel.send(intro1s[0]);
		}
		if (message.content === '!1sme') {  //Adds player to ladder
			if(flags1s == 0){
				message.channel.send('You need to use the "!start1s" command to initialize the ladder');
			} else {
				
				
			}
		}
		if (message.content === '!1sdone') {  //Starts the ladder
			if(flags1s == 0){
				message.channel.send('You havent even used the "!start1s" command to initialize the ladder yet');
			} else {
				
				
			}
		}



        //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-     MAFIA
        /*
        if (message.content === '!newgame') {
            // Create Mafia Channel
            totalMafia = mafChannel.members.array().length;
            randomMafia = Math.floor(Math.random() * totalMafia);
            totVotes = 0;
            for (var i = 0; i < mafChannel.members.array().length; i++) {
                pNumber = i + 1; //offset
                mafChannel.sendMessage(mafChannel.members.array()[0][i] + ' - ' + pNumber); //list player's numbers
                playerArray[i] = mafChannel.members.array()[0][i]; //populating player array
                voteArray[i] = 0; //clearing votes
                countArray[i] = 0; //clearing counts
                mafVotes = 0; //clearing mafia votes
                mafChannel.sendMessage(' ' + i); //Debug
                if (i == randomMafia) { //mafia
                    mafChannel.members.array()[0][i].send('You are the mafiaso.');
                    mafChannel.members.array()[0][i].send('When everyone is voting, just send me "!vote1" to be displayed as having voted');
                    currentMafia = mafChannel.members.array()[0][i];
                    mafLocation = i;
                } else { //villagers
                    mafChannel.members.array()[0][i].send('You are a villager.');
                    for (var b = 0; b < mafChannel.members.array().length; b++) {
                        mafChannel.members.array()[0][i].send(mafChannel.members.array()[0][b] + ' - ' + pNumber);
                    }
                    mafChannel.members.array()[0][i].send('EXAMPLE: "!vote1" is a vote for ' + mafChannel.members.array()[0][0]);
                }
            }
        }

        //Updates villagers' scores and records votes
        if (message.channel.type === 'dm') {
            voteChannel.sendMessage(message.author.username + ' says: ' + message.content);

            if ((message.content === '!vote1' || message.content === '!vote2' || message.content === '!vote3' || message.content === '!vote4' || message.content === '!vote5' || message.content === '!vote6') && (totVotes < 6)) {
                if (message.content == '!vote1') {
                    voteID = 1 - 1;
                }
                if (message.content == '!vote2') {
                    voteID = 2 - 1;
                }
                if (message.content == '!vote3') {
                    voteID = 3 - 1;
                }
                if (message.content == '!vote4') {
                    voteID = 4 - 1;
                }
                if (message.content == '!vote5') {
                    voteID = 5 - 1;
                }
                if (message.content == '!vote6') {
                    voteID = 6 - 1;
                }
                for (var x = 0; x < mafChannel.members.array().length; x++) {
                    if (message.id == playerArray[x]) {
                        voteChannel.sendMessage(message.author.username + ' has voted!');
                        if (voteArray[x] === 1) {
                            message.author.username.send('You have already voted.');
                        }
                        if (voteArray[x] === 0) {
                            countArray[voteID] = countArray[voteID] + 1;
                            totVotes = totVotes + 1;
                            if ((voteID == mafLocation) && (x != mafLocation)) {
                                scoreArray[x]++;
                            }
                            if (totVotes == mafChannel.members.array().length) {
                                voteChannel.sendMessage('Everyone has voted!');
                            }
                        }
                    }
                }
            }
        }
        //Updates mafia's score and congradulates winner of round
        if (message.content === '!reveal') {
            if (currentMafia !== '') {
                if (countArray[mafLocation] < 3) {
                    voteChannel.sendMessage(currentMafia + ' was the mafiaso!');
                    scoreArray[mafLocation] = scoreArray[mafLocation] + 2;
                } else {
                    voteChannel.sendMessage('The villagers caught ' + currentMafia + '!');
                }
                currentMafia = '';
            }
        }
        if (message.content === '!endgame') {
            var tempName = '';
            var tempScore = 0;
            for (var x = 0; x < mafChannel.members.array().length; x++) {
                sortedScore[x][0] = playerArray[x];
                sortedScore[x][1] = scoreArray[x];
            }
            //BUBBLE SORT FOR DAYS
            // 0 location - Winner
            for (var x1 = 0; x1 < mafChannel.members.array().length; x1++) {
                for (var y = 1; y < mafChannel.members.array().length; y++) {
                    if (sortedScore[y - 1][1] < sortedScore[y][1]) {
                        tempName = sortedScore[y - 1][0];
                        tempScore = sortedScore[y - 1][1];
                        sortedScore[y - 1][0] = sortedScore[y][0];
                        sortedScore[y - 1][1] = sortedScore[y][1];
                        sortedScore[y][0] = tempName;
                        sortedScore[y][1] = tempScore;
                    }
                }
            }

            voteChannel.sendMessage(sortedScore[0][0] + ' won with ' + sortedScore[0][1] + ' points!');

            for (var x2 = 1; x2 < mafChannel.members.array().length; x2++) {
                voteChannel.sendMessage(sortedScore[x2][0] + ' - ' + sortedScore[x2][1]);
            }
            //Erases Scores
            for (var x3 = 0; x3 < mafChannel.members.array().length; x3++) {
                sortedScore[x3][0] = '';
                sortedScore[x3][1] = 0;
            }
        }
        */

});
//cd desktop\donbot
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NTQ5OTU5MTU5ODM2MzExNTgx.D1cL_Q.3yzgxER9KRlk85BxgmFBAuIAHOY');
)
}V