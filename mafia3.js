/*Games:
 - Mafia (assign mafia, record votes and points) 
 - 6mans (set up teams and record W/L) 
 - 1s ladder  ✓
 - random mutators  ✓
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
var mafleg = 0; //toggles legacy mafia code 

//  ARRAYS & MATRIXES
var playerArray = [6]; //holds player's names
var voteArray = [6]; //holds player's votes
var countArray = [6]; //holds how many people voted for who
var mafLocation = 0; //holds player array location of mafiaso
var scoreArray = [6]; //holds score
var sortedScore = [6][2]; //sorted score for endgame report
var bracket1s = [64][2]; //holds player and matchup value (random initial matchup, rest is first come, first serve)
var max1s = 1; //records how many people sign up (starts at one since the 1s creator auto signs up)
var halfmax = 0; //bracket set up variable 
var userfound = 0; //flag for notifying if user duplication is imminent 
var tempplayer = 0; //holds tempplayer info
var tempbracket = 0; //holds temp bracket info
var winloc = 0; //holds latest win value
var winMatch = 0; //holds people waiting in queue
var lossloc = 0; //holds latest loss value
var lossMatch = 0; //holds people waiting in queue
var finals = 0; //holds the number of people who have been kicked from the ladder
const pongresponses = ['**pong mothafucka**', 'pong', 'ping, ping, ping.  Who is it?', 'DON T TOUCH ME', 'how bout go ping yourself', '||HA, made you look!||', 'https://media.giphy.com/media/l2YWxte7sJB2XuE8M/giphy.gif', 'yeah, yeah, yeah', 'https://media.tenor.com/images/2feea74041feaa70ca7221ae28065f15/tenor.gif', 'https://media.giphy.com/media/xj7FbQfedsi3e/200.gif', 'https://media.giphy.com/media/tSniEbOGfuCnm/giphy.gif', 'https://media.giphy.com/media/hIaC7H5bIFkVa/giphy.gif', 'https://media.giphy.com/media/3o6ZtaZt380S8DlZjG/giphy.gif', 'http://66.media.tumblr.com/b8b71d6eb11c497405c7d90008522e47/tumblr_mh1rlaCmad1s446qto1_500.gif', 'https://media.tenor.com/images/ee97de4ccda02c9666391ff2ec98d5b1/tenor.gif', 'https://media.tenor.com/images/f5889ae897ec5142e8c8bd391de9d025/tenor.gif', 'https://media.giphy.com/media/d1E2qvruXFtGi6A0/giphy.gif'];
const acknowledges = ['alright, alright, alright', 'Sure thing, boss', 'I gotchu', 'yup, yup', 'finally!', 'is this my purpose?', 'ACKNOWLEDGED', 'I read you', 'Loud and clear'];
const intro1s = ['1s queue has started - you can use "!1sme" to get added and "!1sdone" to start the 1s ladder and end the queue'];
const disappointed = ['http://giphygifs.s3.amazonaws.com/media/KJ6evAwpTjexi/giphy.gif', 'thats tough kid', 'maybe next time', 'https://media.giphy.com/media/xT9KVluGDHZvOk0tdC/giphy.gif', 'https://media.giphy.com/media/XFgNKqN3BaHLi/giphy.gif'];

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
        const voteChannel = mafServer.channels.get('550438619983249441');

        //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-     PING
        if (message.content === 'ping') {
            memNum = Math.floor(Math.random() * pongresponses.length);
            message.channel.send(pongresponses[memNum]);
        }

		
		//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-     INFO
		if (message.content === 'games') {
			message.channel.send('** ~ Mafia**  [use "!mafia" to learn more] (under developement, use "!mafleg" to switch to legacy code)');
			message.channel.send('** - 1s Ladder**  [use "!1sladder" to learn more]');
			message.channel.send('** - Randomizer**  [gives random modifiers for private matches]');
		}
		if (message.content === '!mafia') {
			message.channel.send('*Mafia is a game where one random player attempts to throw a match*');
			message.channel.send('*The non-mafia, villagers, try to uncover the identity of the mafia*');
			message.channel.send('*The villagers vote for who they believe the mafia is after the game*');
			message.channel.send('Join Mafia voice channel (6 player max)');
			message.channel.send('Use "!newgame" to start a new game of Mafia');
			message.channel.send('DM me, the bot, your votes');
			message.channel.send('Use "!reveal" to reveal the mafia');
			message.channel.send('Use "!endgame" to report scores');
			message.channel.send('Use "!mafleg" to switch between legacy and latest code **only do so before starting up a game**');
		}
		if (message.content === '!1sladder') {
			message.channel.send('*The ladder is a double elimination bracket without a bracket reset*');
			message.channel.send('*Currently a 64 player max*'); 
			message.channel.send('*Initial matches are randomized, every match after is first come first serve*');
			message.channel.send('Use "!start1s" to begin player queuing');
			message.channel.send('Use "!1sme" to join the 1s ladder');
			message.channel.send('Use "!1sdone" to end player queue and begin the ladder');
			message.channel.send('Use "!1swon" to declare yourself the winner');
			message.channel.send('Use "!1shalt" to end the ladder prematurely');
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


		//-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-     1'S LADDER
        if (message.content === '!start1s') {  //Initializes the queue
			flag1s = 1;
            message.channel.send(intro1s[0]);
			bracket1s[0][0] = message.author;
		}
		if (message.content === '!1sme') {  //Adds player to ladder
			if(flags1s == 0){
				message.channel.send('You need to use the "!start1s" command to initialize the ladder');
			} else {
				for(var o1 = 0; o1 < max1s; o1++) { //checks if player is already in bracket
					if(message.author === bracket1s[o1][0]){
						userfound = 1;
						if(o1 == 0){
							message.channel.send('HA, ' + bracket1s[o1][0] + ', you made it so youre already in it!');
						} else{
							message.channel.send('Yo, ' + bracket1s[o1][0] + ', you already signed up!'); 
						}
					} 					
				}
				if(userfound == 0){  //adds player to bracket
					max1s++;
					bracket1s[max1s][0] = message.author;
					memNum = Math.floor(Math.random() * acknowledges.length);
					message.channel.send(acknowledges[memNum] + '  ' + bracket1s[max1s][0]); //sends acknowledgement to player 
				} else {
					userfound = 0;
				}
			}
		}
		if (message.content === '!1sdone') {  //Starts the ladder
			if(flags1s == 0){
				message.channel.send('You havent even used the "!start1s" command to initialize the ladder yet');
			} else {
				if(max1s < 4){
					message.channel.send('https://media.tenor.com/images/1828ae6e4dcb7e46eebdfaaddec0efa5/tenor.gif');
				}
				for(var o4 = 0; o4 < max1s; o4++){ //clears bracket info
					bracket1s[o4][1] = 0;
				}
				message.channel.send('**' + max1s + '** people have entered this 1s ladder!'); //Notes how many players are in the ladder
				if(max1s%2){
					bracket1s[0][1] = 'w 0'; //pushed to winner's bracket (bye round)
					winMatch = 1;
				}
				halfmax = Math.floor(max1s / 2);				
				for(var o3 = 1; o3 <= halfmax; o3++){
					do{
						memNum = Math.floor(Math.random() * max1s); 
					}while(bracket1s[memNum][1] === 0); //randomly chooses a player
					bracket1s[memNum][1] = 's ' + o3; //s for Start
					tempplayer = memNum;
					do{
						memNum = Math.floor(Math.random() * max1s);
					}while(bracket1s[memNum][1] === 0); 
					bracket1s[memNum][1] = 's ' + o3;
					bracket1s[tempplayer][0].send('Youre playing ' + bracket1s[memNum][0]);
					bracket1s[tempplayer][0].send('Use the "!1swon" command if you win.  I believe in you!');
					bracket1s[memNum][0].send('Youre playing ' + bracket1s[tempplayer][0]);
					bracket1s[memNum][0].send('Use the "!1swon" command if you win.  You can do it!');
				}
			}
		}
		if (message.content === '!1swon') {  //Reports and updates the bracket
			userfound = 0;
			if(finals === (max1s - 2)){
				message.channel.send('**' + message.author + '** won!');
				message.channel.send('Congradulations on completing the 1s ladder!');
				finals = 0;
				max1s = 0;
				winMatch = 0;
				lossMatch = 0;
				winloc = 0;
				lossloc = 0;				
			}
			for(var o5 = 0; o5 < max1s; o5++){ //finds winner in matrix
				if(message.author === bracket1s[o5][0]){
					userfound = 1;
					tempbracket = bracket1s[o5][1]; //bracket info
					var wintest = bracket1s[o5][1].split(' ');
					if(wintest[0] === 'w'){ //checks if in winners or losers bracket
						if(winMatch === 0){ //checks if someone in winners queue is waiting
							bracket1s[o5][1] = 'w ' + winloc; //updates bracket info
							winMatch++;  //adds player to winners queue
						} else {
							for(var o7 = 0; o7 < max1s;	o7++){ 
								if(bracket1s[o7][1] === ('w ' + winloc)){  //finds player in winners queue
									bracket1s[o7][0].send('Youre playing ' + bracket1s[o5][0]);
									bracket1s[o7][0].send('Use the "!1swon" command if you win.  I believe in you!');
									bracket1s[o5][0].send('Youre playing ' + bracket1s[o7][0]);
									bracket1s[o5][0].send('Use the "!1swon" command if you win.  You can do it!');
									bracket1s[o7][1] = 'w ' + winloc; //updates bracket info for newest winner
									winloc++; //updates winner location
									winMatch = 0; //updates winners player queue
								}
							}
						}
					} else {
						if(lossMatch === 0){ //checks if someone in losers queue is waiting
							bracket1s[o5][1] = 'l ' + lossloc; //updates bracket info
							lossMatch++; //adds player to losers queue
						} else {
							for(var o8 = 0; o8 < max1s;	o8++){
								if(bracket1s[o8][1] === ('w ' + lossloc)){ //finds player in losers queue
									bracket1s[o8][0].send('Youre playing ' + bracket1s[o5][0]);
									bracket1s[o8][0].send('Use the "!1swon" command if you win.  I believe in you!');
									bracket1s[o5][0].send('Youre playing ' + bracket1s[o8][0]);
									bracket1s[o5][0].send('Use the "!1swon" command if you win.  You can do it!');
									bracket1s[o8][1] = 'w ' + lossloc; //updates bracket info for newest winner
									lossloc++; //updates loser location
									lossMatch = 0; //updates winners player queue
								}
							}
						}
					}
				}
			}
			for(var o6 = 0; o6 < max1s; o6++){ //finds loser in matrix
				if(bracket1s[o6][1] === tempbracket){
					var losstest = bracket1s[o6][1].split(' ');
					if(losstest[0] === 'w'){
						if(lossMatch === 0){ //checks if someone in losers queue is waiting
							bracket1s[o5][1] = 'l ' + lossloc; //updates bracket info
							lossMatch++;  //adds player to losers queue
						} else {
							for(var o9 = 0; o9 < max1s;	o9++){ 
								if(bracket1s[o9][1] === ('l ' + lossloc)){  //finds player in winners queue
									bracket1s[o9][0].send('Youre playing ' + bracket1s[o6][0]);
									bracket1s[o9][0].send('Use the "!1swon" command if you win.  I *really* believe in you this time!');
									bracket1s[o6][0].send('Youre playing ' + bracket1s[o9][0]);
									bracket1s[o6][0].send('Use the "!1swon" command if you win.  Maybe you can do it now!');
									bracket1s[o9][1] = 'w ' + lossloc; //updates bracket info for newest loser
									lossloc++; //updates loser location
									lossMatch = 0; //updates losers player queue
								}
							}
						}
					}else{
						memNum = Math.floor(Math.random() * disappointed.length); 
						bracket1s[o6][0].send(disappointed[memNum]);
						bracket1s[o6][0] = 0;
						bracket1s[o6][1] = 0;
					}
				}
			}
			
			//Checks if player is in ladder
			if(userfound === 0){
				message.channel.send('What the heck are you doing, ' + message.author + '?  You shouldve joined when the ladder was open.'); 
			}
			
			//Checks if players are in the finals
			for(var o10 = 0; o10 < max1s; o10++){
				if(bracket1s[o10][0] === 0){
					finals++;
				}
			}
			if(finals === (max1s - 2)){
				var o11 = 0;
				while(bracket1s[o11][0] === 0){
					o11++;
				}
				var o12 = max1s;
				while(bracket1s[o12][0] === 0){
					o12--;
				}
				bracket1s[o11][0].send('Youre playing ' + bracket1s[o12][0]);
				bracket1s[o11][0].send('Use the "!1swon" command if you win.  You made it to the finals! No pressure!');
				bracket1s[o12][0].send('Youre playing ' + bracket1s[o11][0]);
				bracket1s[o12][0].send('Use the "!1swon" command if you win.  You made it to the finals! Youve got this!');
				//clears rest of bracket
				bracket1s[o11][0] = 0;
				bracket1s[o11][1] = 0;
				bracket1s[o12][0] = 0;
				bracket1s[o12][1] = 0;
			} else {
				finals = 0;
			}
		}
		if (message.content === '!1shalt') { // full stop and clear
			for(var o13 = 0; o13 < max1s; o13++){
				bracket1s[o13][0] = 0;
				bracket1s[o13][1] = 0;
			}
			memNum = Math.floor(Math.random() * acknowledgement.length); 
			message.channel.send(acknowledgement[memNum]);
			message.channel.send('1s ladder is shut down and cleared');
			finals = 0;
			max1s = 0;
			winMatch = 0;
			lossMatch = 0;
			winloc = 0;
			lossloc = 0;
		}


        //-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-     MAFIA
		if (message.content === '!newgame') {
            if(mafleg = 0){
				totalMafia = mafChannel.members.array().length;
				randomMafia = Math.floor(Math.random() * totalMafia);
				totVotes = 0;
				for (var i = 0; i < mafChannel.members.array().length; i++) {
					pNumber = i + 1; //offset
					message.channel.send(mafChannel.members.array()[0][i] + ' - ' + pNumber); //list player's numbers
					playerArray[i] = mafChannel.members.array()[0][i]; //populating player array
					voteArray[i] = 0; //clearing votes
					countArray[i] = 0; //clearing counts
					mafVotes = 0; //clearing mafia votes
					message.channel.send(' ' + i); //Debug
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
			} else {
				totalMafia = mafChannel.members.array().length
				randomMafia = Math.floor(Math.random() * totalMafia);
				for (var i = 0; i < mafChannel.members.array().length; i++) {
					if (i == randomMafia){
						mafChannel.members.array()[0,i].send('You are the mafiaso.');
						currentMafia = mafChannel.members.array()[0,i];
					} else {
						mafChannel.members.array()[0,i].send('You are a villager.');
					}
	
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
			if(mafleg === 0){
				if (currentMafia !== '') {
					if (countArray[mafLocation] < 3) {
						message.channel.send(currentMafia + ' was the mafiaso!');
						scoreArray[mafLocation] = scoreArray[mafLocation] + 2;
					} else {
						message.channel.send('The villagers caught ' + currentMafia + '!');
					}
					currentMafia = '';
				}
			} else {
				if (currentMafia != '') {
					voteChannel.send(currentMafia + ' was the mafiaso!');
					currentMafia = '';
				}
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

            message.channel.send(sortedScore[0][0] + ' won with ' + sortedScore[0][1] + ' points!');

            for (var x2 = 1; x2 < mafChannel.members.array().length; x2++) {
                message.channel.send(sortedScore[x2][0] + ' - ' + sortedScore[x2][1]);
            }
            //Erases Scores
            for (var x3 = 0; x3 < mafChannel.members.array().length; x3++) {
                sortedScore[x3][0] = '';
                sortedScore[x3][1] = 0;
            }
        }
		if (message.content === '!mafleg') {
			mafleg = (mafleg + 1)%2;
			if(mafleg === 0){
				message.channel.send('Mafia is now using the latest code (*likely unstable*)');
			} else {
				message.channel.send('Mafia is now using the legacy code');
			}
		}
        

});
//cd desktop\donbot
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('** token **');