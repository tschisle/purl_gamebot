/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

var mafiaso
var memNum

/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  var mafServer = client.guilds.get('549958516991983619');
  var mafChannel = mafServer.channels.get('550438621241409552');
  var voteChannel = mafServer.channels.get('550438619983249441');
  var playerArray = [5]
  var voteArray = [5]
  var countArray = [5]
  if (message.content === '!newgame') {
    // Create Mafia Channel
    totalMafia = mafChannel.members.array().length;
	randomMafia = Math.floor(Math.random() * totalMafia);
	for (var i = 0; i < mafChannel.members.array().length; i++) {
		pNumber = i + 1
		voteChannel.send('Player #' + pNumber + ' - ' + mafChannel.members.array()[0,i])
		playerArray[i] = mafChannel.members.array()[0,i]
		voteArray[i] = 0
		countArray[i] = 0
		if (i == randomMafia){
    		mafChannel.members.array()[0,i].send('You are the mafiaso.');
    		currentMafia = mafChannel.members.array()[0,i] 
    		//voteChannel.send(mafChannel.members.array()[0,i] + 'You are the mafiaso.')
    }	else {
    		mafChannel.members.array()[0,i].send('You are a villager.')
    		//voteChannel.send(mafChannel.members.array()[0,i] + 'You are a villager.')
    	}
    }
}
	if (message.content === '!vote1' || message.content === '!vote2' || message.content === '!vote3' || message.content === '!vote4' || message.content === '!vote5' || message.content === '!vote6' ) {
		voteChannel.send('test spot')
		if (message.content == '!vote1'){
			voteID = 1 - 1
		}
		if (message.content == '!vote2'){
			voteID = 2 - 1
		}
		if (message.content == '!vote3'){
			voteID = 3 - 1
		}
		if (message.content == '!vote4'){
			voteID = 4 - 1
		}
		if (message.content == '!vote5'){
			voteID = 5 - 1
		}
		if (message.content == '!vote6'){
			voteID = 6 - 1
		}
		for (var i = 0; i < mafChannel.members.array().length; i++){
			if (message.id = playerArray[i]) {
				if (voteArray[i] = 1){
					voteChannel.send(message.member.id + ' you have already voted.')
				}
				if (voteArray[i] = 0){
					countArray[voteID] = countArray[voteID] + 1
					totVotes = totVotes + 1
					if (totVotes = mafChannel.members.array().length) {

					}
				}
			}
		}
	}	
  if (message.content === '!reveal') {
	   if (currentMafia != '') {
	   voteChannel.send(currentMafia + ' was the mafiaso!');
	   currentMafia = '';
	}
   }
 });
//cd desktop\donbot
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('NTQ5OTU5MTU5ODM2MzExNTgx.D1cL_Q.3yzgxER9KRlk85BxgmFBAuIAHOY');

function resetBot(channel) {
    // send channel a message that you're resetting bot [optional]
    channel.send('Resetting...')
    .then(msg => client.destroy())
    .then(() => client.login('NTQ5OTU5MTU5ODM2MzExNTgx.D1cL_Q.3yzgxER9KRlk85BxgmFBAuIAHOY'));
    channel.send('I am back')
}