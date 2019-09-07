/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

var mafiaso;
var memNum;
var mafcount = [6];
var tempmafcount = [6];
var newgameflag = 0;
var gamecount;

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
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }
  if (message.content === '!reveal') {
	   if (currentMafia != '') {
	   voteChannel.send(currentMafia + ' was the mafiaso!');
	   currentMafia = '';
	}
   }
  if (message.content === '!newgame') {
    // Create Mafia Channel
	if(newgameflag === 0){
		newgameflag++;
		for(var x = 0; x < mafChannel.members.array().length; x++){
			mafcount[x] = 0;
		}
	}
	gamecount = 0;
	for(var x1 = 0; x1 < mafChannel.members.array().length; x1++){
		gamecount = gamecount + mafcount[x1];
		tempmafcount[x1] = mafcount[x1];
	}
    totalMafia = mafChannel.members.array().length
	//To try to even out mafia assignments while keeping some randomness
	//NOTE: this adds more time as more and more games are played
	while(tempmafcount[randomMafia] > 0){
		randomMafia = Math.floor(Math.random() * totalMafia);
		tempmafcount--;
	}
	for (var i = 0; i < mafChannel.members.array().length; i++) {
		if (i == randomMafia){
    		mafChannel.members.array()[0,i].send('You are the mafiaso.');
    		currentMafia = mafChannel.members.array()[0,i];
    		//voteChannel.send(mafChannel.members.array()[0,i] + 'You are the mafiaso.')
    }	else {
    		mafChannel.members.array()[0,i].send('You are a villager.')
    		//voteChannel.send(mafChannel.members.array()[0,i] + 'You are a villager.')
    	}
	
	}
    /*
	for (var i = 0; i < message.guild.channels.array().length; i++) {
    message.guilds.channels.array()[i].delete();
	};
    message.guild.createChannel('Vote','text')
    .then(console.log)
    .catch(console.error);
    message.guild.createChannel('Mafia','voice')
    .then(console.log)
    .catch(console.error);*/
  //if (message.content === '!reset') {
    // Create Mafia Channel
  	//resetBot(message.channel);
  }
});

// Create an event listener for messages
 client.on('channelCreate', channel => {
 	if (channel.name == 'vote') {
  // If the message is "ping"
  channel.send('Test')
  voteChan = channel;
  }
  if (channel.name == 'Mafia') {
  // If the message is "ping"
  //channel.setUserLimit(6);
  mafiaChan = channel;
  mafiaChan.setUserLimit(6)
  }

});  
//cd desktop\donbot
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('INSERT KEY');
