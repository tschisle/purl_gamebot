// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

var mafiaso;
var memNum;
var mafcount = [6];
var tempmafcount = [6];
var rngmafcount = [6];
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
  
  if (message.content === '!rng2') { 
    // tests new rng
	//message.channel.send('Starting RNG2');
	
	for(var x3 = 0; x3 < 6; x3++){
		tempmafcount[x3] = 0;
	}
	//message.channel.send('Starting RNG2');
	
	var randRNG2;
    
	for(var x2 = 0; x2 < 18; x2++){
		randRNG2 = Math.floor((Math.random() * 1000) % 6);
		if(randRNG2 == 0){
			tempmafcount[0]++;
		} else if(randRNG2 == 1){
			tempmafcount[1]++;
		} else if(randRNG2 == 2){
			tempmafcount[2]++;
		} else if(randRNG2 == 3){
			tempmafcount[3]++;
		} else if(randRNG2 == 4){
			tempmafcount[4]++;
		} else if(randRNG2 == 5){
			tempmafcount[5]++;
		} else {
			message.channel.send('RNG value not within 0-5');
		}
	}
	message.channel.send('' + tempmafcount[0] + '\n' + tempmafcount[1] + '\n' + tempmafcount[2] + '\n' + tempmafcount[3] +'\n' + tempmafcount[4] +'\n' + tempmafcount[5]);
	//message.channel.send('1 - ' + tempmafcount[0] + '\n2 - ' + tempmafcount[1] + '\n3 - ' + tempmafcount[2] + '\n4 - ' + tempmafcount[3] +'\n5 - ' + tempmafcount[4] +'\n6 - ' + tempmafcount[5]);
  }
  
    if (message.content === '!rng') {
    // tests old rng
	//message.channel.send('Starting RNG2');
	
	for(var x4 = 0; x4 < 6; x4++){
		tempmafcount[x4] = 0;
	}
	//message.channel.send('Starting RNG2');
	
	var randRNG2;
    
	for(var x5 = 0; x5 < 18; x5++){
		for(var x6 = 0; x6 < 6; x6++){
			rngmafcount[x6] = tempmafcount[x6];
		}
		randRNG2 = Math.floor((Math.random() * 1000) % 6);
		while(rngmafcount[randRNG2] > 0){
			rngmafcount[randRNG2]= rngmafcount[randRNG2] - 1;
			randRNG2 = Math.floor((Math.random() * 1000) % 6);
		}
		/*
		if((x5%5)==0){
			message.channel.send('#' + x5);
		}
		*/
		if(randRNG2 == 0){
			tempmafcount[0]++;
		} else if(randRNG2 == 1){
			tempmafcount[1]++;
		} else if(randRNG2 == 2){
			tempmafcount[2]++;
		} else if(randRNG2 == 3){
			tempmafcount[3]++;
		} else if(randRNG2 == 4){
			tempmafcount[4]++;
		} else if(randRNG2 == 5){
			tempmafcount[5]++;
		} else {
			message.channel.send('RNG value not within 0-5');
		}
	}
	message.channel.send('' + tempmafcount[0] + '\n' + tempmafcount[1] + '\n' + tempmafcount[2] + '\n' + tempmafcount[3] +'\n' + tempmafcount[4] +'\n' + tempmafcount[5]);
	//message.channel.send('1 - ' + tempmafcount[0] + '\n2 - ' + tempmafcount[1] + '\n3 - ' + tempmafcount[2] + '\n4 - ' + tempmafcount[3] +'\n5 - ' + tempmafcount[4] +'\n6 - ' + tempmafcount[5]);
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
	randomMafia = Math.floor((Math.random() * 1000) % totalMafia);	
	while(tempmafcount[randomMafia] > 0){
		tempmafcount[randomMafia]= tempmafcount[randomMafia] - 1;
		randomMafia = Math.floor((Math.random() * 1000) % totalMafia);
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
