/*Games:
 - Mafia (assign mafia, record votes and points)  ✓
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

var memNum; //used as a temp variable for random responses

//  FLAGS
var flag1s = 0; //toggles if 1s is started (0-off, 1-on)
var ranFlag = 0; //keeps randomizer from running over itself 
var mafleg = 0; //toggles legacy mafia code 
var newgameflag = 0; //used to initialize player mafia count
var mafiagameflag = 0; //used to indicate that a mafia game has started
var scoreflag = [6]; //lets player know they have to submit the score before voting

//  LOOP VARIABLES
var x; //first
var x1; //first nested
var x2; //second nested
var x3; //third nested
var x4; //fourth nested
var x5; //fifth nested

//  MAFIA VARIABLES
var totalMafia = 0; //legacy variable for holding voice channel count
var randomMafia = 0; //holds location of randomly assigned mafia
var totVotes = 0; //counts votes

var tempName = ''; //used for bubble sort
var tempScore = 0; //used for bubble sort
const PointsForSuccessfulMafia = 3;
const PointsForCorrectVote = 2;
const PointsForNonMafiaVotedByMajority = -1;
const PointsForLosingBy3NonMafia = -1;
const PointsForWinningBy3Mafia = -1;
const PointsForLosingBy2MoreNonMafia = -1; //stacks
const PointsForWinningBy2MoreMafia = -1; //stacks

//  ARRAYS (matrixes are impossible :/ )
var playerArray = [6]; //holds player's names
var voteArray = [6]; //holds player's votes
var gameScoreArrayReported = [6]; //holds player's reported game scores (bool reported)
var gameScoreArrayPlayerTeam = [6]; //holds player's reported game scores (int player's team)
var gameScoreArrayOpposingTeam = [6]; //holds player's reported game scores (int opposing team)
var countArray = [6]; //holds how many people voted for who
var mafLocation = 0; //holds player array location of mafiaso
var mafcount = [6];  //counts how often a player is mafia
var tempmafcount = [6]; //temp for biasing
var scoreArray = [6]; //holds score
var sortedScorePlayer = [6]; //sorted score for endgame report
var sortedScoreScore = [6]; //sorted score for endgame report
var bracket1sPlayer = [64]; //holds player (random initial matchup, rest is first come, first serve)
var bracket1sMatch = [64]; //holds matchup value (random initial matchup, rest is first come, first serve)
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
const pongresponses = ['**pong mothafucka**', 'pong', 'ping, ping, ping.  Who is it?', 'DON\'T TOUCH ME', 'how bout go ping yourself', '||Keep your cursor to yourself!||', 'do you see how much more productive I am than you already', '||HA, made you look!||', 'https://media.giphy.com/media/l2YWxte7sJB2XuE8M/giphy.gif', 'yeah, yeah, yeah', 'https://media.tenor.com/images/2feea74041feaa70ca7221ae28065f15/tenor.gif', 'https://media.giphy.com/media/xj7FbQfedsi3e/200.gif', 'https://media.giphy.com/media/tSniEbOGfuCnm/giphy.gif', 'https://media.giphy.com/media/hIaC7H5bIFkVa/giphy.gif', 'https://media.giphy.com/media/3o6ZtaZt380S8DlZjG/giphy.gif', 'http://66.media.tumblr.com/b8b71d6eb11c497405c7d90008522e47/tumblr_mh1rlaCmad1s446qto1_500.gif', 'https://media.tenor.com/images/ee97de4ccda02c9666391ff2ec98d5b1/tenor.gif', 'https://media.tenor.com/images/f5889ae897ec5142e8c8bd391de9d025/tenor.gif', 'https://i.imgur.com/Fb0lJ3P.gif'];
const acknowledges = ['alright, alright, alright', 'would you like fries with that?', 'Sure thing, boss', 'I gotchu', 'yup, yup', 'finally!', 'is this my purpose?', 'ACKNOWLEDGED', 'I read you', 'Loud and clear'];
const intro1s = ['1s queue has started - you can use **!1sme** to get added and **!1sdone** to start the 1s ladder and end the queue'];
const disappointed = ['http://giphygifs.s3.amazonaws.com/media/KJ6evAwpTjexi/giphy.gif', 'that\'s tough kid', 'maybe next time', 'https://media.giphy.com/media/xT9KVluGDHZvOk0tdC/giphy.gif', 'https://media.giphy.com/media/XFgNKqN3BaHLi/giphy.gif'];

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
		message.channel.send('** - Mafia**  [use **!mafia** to learn more] \n ~ *1s Ladder*  [use **!1sladder** to learn more] \n** - Randomizer**  [use **!random** to get random modifiers for private matches]');
	}
	if (message.content === '!mafia') {
		message.channel.send('*Mafia is a game where one random player attempts to throw a match* \n*The non-mafia, villagers, try to uncover the identity of the mafia* \n*Everyone reports the game score then the villagers vote for who they believe the mafia was* \nJoin Mafia voice channel (6 player max) \nUse **!newgame** to start a new game of Mafia \nDM me, the bot, your votes \nUse **!endgame** to report scores after you\'ve played all the games you\'d like\n\nUse **!mafleg** to switch between legacy and latest code **only do so before starting up a game** \n You\'ll also need to use **!reveal** to reveal the mafia if you\'re using the legacy code');
	}
	if (message.content === '!1sladder') {
		message.channel.send('*The ladder is a double elimination bracket without a bracket reset* \n*Currently a 64 player max* \n*Initial matches are randomized, every match after is first come first serve* \nUse **!start1s** to begin player queuing \nUse **!1sme** to join the 1s ladder \nUse **!1sdone** to end player queue and begin the ladder \nUse **!1swon** to declare yourself the winner \nUse **!1shalt** to end the ladder prematurely');
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
		bracket1sPlayer[0] = message.author;
	}
	if (message.content === '!1sme') {  //Adds player to ladder
		if(flags1s == 0){
			message.channel.send('You need to use the **!start1s** command to initialize the ladder');
		} else {
			for(x = 0; x < max1s; x++) { //checks if player is already in bracket
				if((message.author.id + '') === bracket1s[x][0]){
					userfound = 1;
					if(x == 0){
						message.channel.send('HA, ' + bracket1sPlayer[x].displayName + ', you made it so you\'re already in it!');
					} else{
						message.channel.send('Yo, ' + bracket1sPlayer[x].displayName + ', you already signed up!'); 
					}
				} 					
			}
			if(userfound == 0){  //adds player to bracket
				max1s++;
				bracket1sPlayer[max1s] = message.author;
				memNum = Math.floor(Math.random() * acknowledges.length);
				message.channel.send(acknowledges[memNum] + ' \n' + bracket1sPlayer[max1s]); //sends acknowledgement to player 
			} else {
				userfound = 0;
			}
		}
	}
	if (message.content === '!1sdone') {  //Starts the ladder
		if(flags1s == 0){
			message.channel.send('You haven\'t even used the **!start1s** command to initialize the ladder yet');
		} else {
			if(max1s < 4){
				message.channel.send('https://media.tenor.com/images/1828ae6e4dcb7e46eebdfaaddec0efa5/tenor.gif');
			}
			for(x = 0; x < max1s; x++){ //clears bracket info
				bracket1sMatch[x] = 0;
			}
			message.channel.send('**' + max1s + '** people have entered this 1s ladder!'); //Notes how many players are in the ladder
			if(max1s%2){
				bracket1sMatch[0] = 'w 0'; //pushed to winner's bracket (bye round)
				winMatch = 1;
			}
			halfmax = Math.floor(max1s / 2);				
			for(x = 1; x <= halfmax; x++){
				do{
					memNum = Math.floor(Math.random() * max1s); 
				}while(bracket1sMatch[memNum] === 0); //randomly chooses a player
				bracket1sMatch[memNum] = 's ' + x; //s for Start
				tempplayer = memNum;
				do{
					memNum = Math.floor(Math.random() * max1s);
				}while(bracket1sMatch[memNum] === 0); 
				bracket1sMatch[memNum] = 's ' + x;
				bracket1sPlayer[tempplayer].send('You\'re playing ' + bracket1sPlayer[memNum].displayName);
				bracket1sPlayer[tempplayer].send('Use the **!1swon** command if you win.  I believe in you!');
				bracket1sPlayer[memNum].send('You\'re playing ' + bracket1sPlayer[tempplayer].displayName);
				bracket1sPlayer[memNum].send('Use the **!1swon** command if you win.  You can do it!');
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
		for(x = 0; x < max1s; x++){ //finds winner in matrix
			if(message.author === bracket1sPlayer[x]){
				userfound = 1;
				tempbracket = bracket1sMatch[x]; //bracket info
				var wintest = bracket1sMatch[x].split(' ');
				if(wintest[0] === 'w'){ //checks if in winners or losers bracket
					if(winMatch === 0){ //checks if someone in winners queue is waiting
						bracket1sMatch[x] = 'w ' + winloc; //updates bracket info
						winMatch++;  //adds player to winners queue
					} else {
						for(x1 = 0; x1 < max1s;	x1++){ 
							if(bracket1sMatch[x1] === ('w ' + winloc)){  //finds player in winners queue
								bracket1sPlayer[x1].send('You\'re playing ' + bracket1sPlayer[x].displayName);
								bracket1sPlayer[x1].send('Use the **!1swon** command if you win.  I believe in you!');
								bracket1sPlayer[x].send('You\'re playing ' + bracket1sPlayer[x1].displayName);
								bracket1sPlayer[x].send('Use the **!1swon** command if you win.  You can do it!');
								bracket1sMatch[x1] = 'w ' + winloc; //updates bracket info for newest winner
								winloc++; //updates winner location
								winMatch = 0; //updates winners player queue
							}
						}
					}
				} else {
					if(lossMatch === 0){ //checks if someone in losers queue is waiting
						bracket1sMatch[x] = 'l ' + lossloc; //updates bracket info
						lossMatch++; //adds player to losers queue
					} else {
						for(x2 = 0; x2 < max1s;	x2++){
							if(bracket1sMatch[x2] === ('w ' + lossloc)){ //finds player in losers queue
								bracket1sPlayer[x2].send('You\'re playing ' + bracket1sPlayer[x].displayName);
								bracket1sPlayer[x2].send('Use the **!1swon** command if you win.  I believe in you!');
								bracket1sPlayer[x].send('You\'re playing ' + bracket1sPlayer[x2].displayName);
								bracket1sPlayer[x].send('Use the **!1swon** command if you win.  You can do it!');
								bracket1sMatch[x2] = 'w ' + lossloc; //updates bracket info for newest winner
								lossloc++; //updates loser location
								lossMatch = 0; //updates winners player queue
							}
						}
					}
				}
			}
		}
		for(x = 0; x < max1s; x++){ //finds loser in matrix
			if(bracket1sMatch[x] === tempbracket){
				var losstest = bracket1sMatch[x].split(' ');
				if(losstest[0] === 'w'){
					if(lossMatch === 0){ //checks if someone in losers queue is waiting
						bracket1sMatch[x] = 'l ' + lossloc; //updates bracket info
						lossMatch++;  //adds player to losers queue
					} else {
						for(x1 = 0; x1 < max1s;	x1++){ 
							if(bracket1sMatch[x1] === ('l ' + lossloc)){  //finds player in winners queue
								bracket1sPlayer[x1].send('You\'re playing ' + bracket1sPlayer[x].displayName);
								bracket1sPlayer[x1].send('Use the **!1swon** command if you win.  I *really* believe in you this time!');
								bracket1sPlayer[x].send('You\'re playing ' + bracket1sPlayer[x1].displayName);
								bracket1sPlayer[x].send('Use the **!1swon** command if you win.  Maybe you can do it now!');
								bracket1sMatch[x1] = 'w ' + lossloc; //updates bracket info for newest loser
								lossloc++; //updates loser location
								lossMatch = 0; //updates losers player queue
							}
						}
					}
				}else{
					memNum = Math.floor(Math.random() * disappointed.length); 
					bracket1sPlayer[x].send(disappointed[memNum]);
					bracket1sPlayer[x] = 0;
					bracket1sMatch[x] = 0;
				}
			}
		}
		
		//Checks if player is in ladder
		if(userfound === 0){
			message.channel.send('What the heck are you doing, ' + message.author + '?  You should\'ve joined when the ladder was open.'); 
		}
		
		//Checks if players are in the finals
		for(x = 0; x < max1s; x++){
			if(bracket1sPlayer[x] === 0){
				finals++;
			}
		}
		if(finals === (max1s - 2)){
			var o11 = 0;
			while(bracket1sPlayer[o11] === 0){
				o11++;
			}
			var o12 = max1s;
			while(bracket1sPlayer[o12] === 0){
				o12--;
			}
			bracket1sPlayer[o11].send('You\'re playing ' + bracket1sPlayer[o12].displayName);
			bracket1sPlayer[o11].send('Use the **!1swon** command if you win.  You made it to the finals! No pressure!');
			bracket1sPlayer[o12].send('You\'re playing ' + bracket1sPlayer[o11].displayName);
			bracket1sPlayer[o12].send('Use the **!1swon** command if you win.  You made it to the finals! You\'ve got this!');
			//clears rest of bracket
			bracket1sPlayer[o11] = 0;
			bracket1sMatch[o11] = 0;
			bracket1sPlayer[o12] = 0;
			bracket1sMatch[o12] = 0;
		} else {
			finals = 0;
		}
	}
	if (message.content === '!1shalt') { // full stop and clear
		for(x = 0; x < max1s; x++){
			bracket1sPlayer[x] = 0;
			bracket1sMatch[x] = 0;
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
		if(mafleg === 0){	
			if(newgameflag === 0){
				newgameflag++;
				for(x = 0; x < mafChannel.members.array().length; x++){
					mafcount[x] = 0;
				}
			}
			mafiagameflag++;
			for(x = 0; x < mafChannel.members.array().length; x++){
				tempmafcount[x] = mafcount[x];
			}
			//To try to even out mafia assignments while keeping some randomness
			//NOTE: this adds more time as more and more games are played
			randomMafia = Math.floor((Math.random() * 1000) % mafChannel.members.array().length);	
			while(tempmafcount[randomMafia] > 0){
				tempmafcount[randomMafia] = tempmafcount[randomMafia] - 1;
				randomMafia = Math.floor((Math.random() * 1000) % mafChannel.members.array().length);
			}
		
			//voteChannel.sendMessage(mafChannel.members.array()[0].displayName); //Debug
			//mafChannel.members.array()[0].send('bet you\'re seeing this'); //Debug
			
			totVotes = 0;
			for (x = 0; x < mafChannel.members.array().length; x++) {
				message.channel.send(mafChannel.members.array()[x].displayName + ' - ' + (x + 1)); //list player's numbers
				playerArray[x]= mafChannel.members.array()[x].id; //populating player array
				voteArray[x]= 0; //clearing votes
				countArray[x]= 0; //clearing counts
				//message.channel.send(' ' + x); //Debug
				if (x === randomMafia) { //mafia
					mafChannel.members.array()[x].send('You are the mafiaso.\nUse **!score #-#** to report the games score **before you vote**. \n(*Your team\'s score - the opposing team\'s score*)\nWhen everyone is voting, just send me **!vote1** to be displayed as having voted');
					currentMafia = mafChannel.members.array()[x];
					mafLocation = x;
					mafcount[x]++;
				} else { //villagers
					mafChannel.members.array()[x].send('You are a villager. \nUse **!score #-#** to report the games score **before you vote**. \n(*Your team\'s score - the opposing team\'s score*)\n');
					for (x1 = 0; x1 < mafChannel.members.array().length; x1++) {
						mafChannel.members.array()[x].send(mafChannel.members.array()[x1].displayName + ' - ' + (x1 + 1));
					}
					mafChannel.members.array()[x].send('EXAMPLE: **!vote1** is a vote for ' + mafChannel.members.array()[0].displayName);
				}
			}
			
		} else {
			if(newgameflag === 0){
				newgameflag++;
				for(var x = 0; x < mafChannel.members.array().length; x++){
					mafcount[x] = 0;
					scoreflag[x] = 0;
				}
			}
			for(var x1 = 0; x1 < mafChannel.members.array().length; x1++){
				tempmafcount[x1] = mafcount[x1];
			}
			totalMafia = mafChannel.members.array().length
			//To try to even out mafia assignments while keeping some randomness
			//NOTE: this adds more time as more and more games are played
			randomMafia = Math.floor((Math.random() * 1000) % totalMafia);	
			while(tempmafcount[randomMafia] > 0){
				tempmafcount[randomMafia]= tempmafcount[randomMafia] - 1;
				randomMafia = Math.floor((Math.random() * 1000) % totalMafia);
			}
			for (x = 0; x < mafChannel.members.array().length; x++) {
				if (x === randomMafia){
					mafChannel.members.array()[x].send('You are the mafiaso.');
					currentMafia = mafChannel.members.array()[0,x];
					mafcount[x]++;
				} else {
					mafChannel.members.array()[x].send('You are a villager.');
				}

			}
		}
		
	}
	//Updates villagers' scores and records votes
	if (message.channel.type === 'dm') {
		//voteChannel.sendMessage(message.author.username + ' says: ' + message.content);
		//voteChannel.sendMessage(message.author + '');
		if((message.author.id + '') !== '549959159836311581'){
			if((mafiagameflag > 0)){
				if ((message.content === '!vote1' || message.content === '!vote2' || message.content === '!vote3' || message.content === '!vote4' || message.content === '!vote5' || message.content === '!vote6') && (totVotes < mafChannel.members.array().length)) {
					if (message.content === '!vote1') {
						voteID = 1 - 1;
					}
					if (message.content === '!vote2') {
						voteID = 2 - 1;
					}
					if (message.content === '!vote3') {
						voteID = 3 - 1;
					}
					if (message.content === '!vote4') {
						voteID = 4 - 1;
					}
					if (message.content === '!vote5') {
						voteID = 5 - 1;
					}
					if (message.content === '!vote6') {
						voteID = 6 - 1;
					}
					message.react('👍'); 
					//voteChannel.sendMessage('MADE IT');
					//voteChannel.sendMessage(message.author.id + '');
					//voteChannel.sendMessage(mafChannel.members.array()[0].id + '');
					
					for (x = 0; x < mafChannel.members.array().length; x++) {
						if ((message.author.id + '') === (mafChannel.members.array()[x].id + '')) { //checks to make sure voter is in voice channel and aligns them with their position in the array
							//voteChannel.sendMessage(message.author + ' has voted!'); //debugging
							if(scoreflag[x] === 1){
								if (voteArray[x] === 1) {
									message.author.send('You have already voted.');
								}
								if (voteArray[x] === 0) {
									voteChannel.sendMessage(message.author + ' has voted!');
									totVotes++;
									if(x != mafLocation){
										voteArray[x]++;
										countArray[voteID] = countArray[voteID] + 1;
									} 
									if ((voteID === mafLocation) && (x !== mafLocation)) {
										scoreArray[x] = scoreArray[x] + PointsForCorrectVote;
									}
									if (totVotes === mafChannel.members.array().length) {
										voteChannel.sendMessage('Everyone has voted!');
										if (currentMafia !== '') {
											for(x3 = 0; x3 < mafChannel.members.array().length; x3++) {
												if((countArray[x3] > 2) && (x3 !== mafLocation)){
													scoreArray[x3] = scoreArray[x3] + PointsForNonMafiaVotedByMajority;
													voteChannel.sendMessage('The villagers mistook ' + mafChannel.members.array()[x3] + ' as the mafia!');
													memNum = Math.floor(Math.random() * disappointed.length);
													voteChannel.sendMessage(disappointed[memNum]);
												}
												gameScoreArrayReported[x3] = 0; 
											}
											if (countArray[mafLocation] < 3) {
												voteChannel.sendMessage(currentMafia + ' was the mafiaso!');
												scoreArray[mafLocation] = scoreArray[mafLocation] + PointsForSuccessfulMafia;
											} else {
												voteChannel.sendMessage('The villagers caught ' + currentMafia + '!');
											}
											currentMafia = '';
											mafiagameflag = 0;
										}
									}
								}
							} else {
								message.author.send('You need to report the game\'s score first. \nYou can do it by using the **!score #-#** command, where the first # is for your team\'s score and the second is for the opposing team.');
							}
						}
					}
				} else if(message.content.split(' ')[0] === '!score'){
					//voteChannel.sendMessage(message.content.split(' ')[1]);
					for (x = 0; x < mafChannel.members.array().length; x++) {
						if ((message.author.id + '') === (mafChannel.members.array()[x].id + '')) { //checks to make sure voter is in voice channel and aligns them with their position in the array
							scoreflag[x] = 1;
							message.react('👍'); //👍message.react('✔️');
							if (gameScoreArrayReported[x] === 1) {
								message.author.send('You have already reported the scores as ' + gameScoreArrayPlayerTeam[x] + ' - ' + gameScoreArrayOpposingTeam[x]);
							}
							if (gameScoreArrayReported[x] === 0) {
								gameScoreArrayReported[x]++;
								gameScoreArrayPlayerTeam[x] = message.content.split(' ')[0].split('-')[0];
								gameScoreArrayOpposingTeam[x] = message.content.split(' ')[0].split('-')[1];
								if(x !== mafLocation){
									if(gameScoreArrayOpposingTeam[x] > (gameScoreArrayPlayerTeam[x] + 2)){
										scoreArray[x] = scoreArray[x] + PointsForLosingBy3NonMafia;
										gameScoreArrayOpposingTeam[x] = gameScoreArrayOpposingTeam[x] - 3; 
										while(gameScoreArrayOpposingTeam[x] > (gameScoreArrayPlayerTeam[x] + 1)){
											scoreArray[x] = scoreArray[x] + PointsForLosingBy2MoreNonMafia;
											gameScoreArrayOpposingTeam[x] = gameScoreArrayOpposingTeam[x] - 2; 
										}
									}
								} else {
									if(gameScoreArrayPlayerTeam[x] > (gameScoreArrayOpposingTeam[x] + 2)){
										scoreArray[x] = scoreArray[x] + PointsForWinningBy3Mafia;
										gameScoreArrayPlayerTeam[x] = gameScoreArrayPlayerTeam[x] - 3; 
										while(gameScoreArrayPlayerTeam[x] > (gameScoreArrayOpposingTeam[x] + 1)){
											scoreArray[x] = scoreArray[x] + PointsForWinningBy2MoreMafia;
											gameScoreArrayPlayerTeam[x] = gameScoreArrayPlayerTeam[x] - 2;
										}
									}
								}
							}
						}
					}
				} else {
					//needs a reply to tell the person how to vote but needs to filter out anything the bot says
				}
			} else {
				if ((message.content === '!vote1' || message.content === '!vote2' || message.content === '!vote3' || message.content === '!vote4' || message.content === '!vote5' || message.content === '!vote6')){
					memNum = Math.floor(Math.random() * disappointed.length);
					message.author.send(disappointed[memNum] + '\nwhy are you voting? a game hasn\'t started.  Use "!newgame" to get it started');
				
				}
			}
		}
	}
	//Updates mafia's score and congradulates winner of round
	if (message.content === '!reveal') {
		if(mafleg === 0){
			//Commented out since this is done automatically now
			/*
			if (currentMafia !== '') {
				if (countArray[mafLocation] < 3) {
					message.channel.send(currentMafia + ' was the mafiaso!');
					scoreArray[mafLocation] = scoreArray[mafLocation] + 2;
				} else {
					message.channel.send('The villagers caught ' + currentMafia + '!');
				}
				currentMafia = '';
			}*/
		} else {
			if (currentMafia != '') {
				voteChannel.send(currentMafia + ' was the mafiaso!');
				currentMafia = '';
			}
		}
	}
	
	if (message.content === '!endgame') {
		tempName = '';
		tempScore = 0;
		newgameflag = 0;
		if(mafChannel.members.array().length > 1){
			for (x = 0; x < mafChannel.members.array().length; x++) {
				sortedScorePlayer[x] = mafChannel.members.array()[x].displayName;
				sortedScoreScore[x] = scoreArray[x];
			}
			//BUBBLE SORT FOR DAYS
			// 0 location - Winner
			for (x = 0; x < mafChannel.members.array().length; x++) {
				for (x1 = 1; x1 < mafChannel.members.array().length; x1++) {
					if (sortedScoreScore[x1 - 1] < sortedScoreScore[x1]) {
						tempName = sortedScorePlayer[x1 - 1];
						tempScore = sortedScoreScore[x1 - 1];
						sortedScorePlayer[x1 - 1] = sortedScorePlayer[x1];
						sortedScoreScore[x1 - 1] = sortedScoreScore[x1];
						sortedScorePlayer[x1] = tempName;
						sortedScoreScore[x1] = tempScore;
					}
				}
			}
			message.channel.send(sortedScorePlayer[0] + ' won with ' + sortedScoreScore[0] + ' points!');
			for (x = 1; x < mafChannel.members.array().length; x++) {
				message.channel.send(sortedScorePlayer[x] + ' - ' + sortedScoreScore[x]);
			}
			
		} else {
			voteChannel.send('playing with yourself again?');
			memNum = Math.floor(Math.random() * disappointed.length);
			voteChannel.send(disappointed[memNum]);
		}

		//Erases Scores
		for (x = 0; x < mafChannel.members.array().length; x++) {
			sortedScorePlayer[x] = '';
			sortedScoreScore[x] = 0;
		}
	}
	if (message.content === '!mafleg') {
		mafleg = (mafleg + 1)%2;
		if(mafleg === 0){
			message.channel.send('Mafia is now using the latest code');
		} else {
			message.channel.send('Mafia is now using the legacy code');
		}
	}
});
//cd desktop\donbot
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('** token **');
