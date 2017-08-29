class ChatComponent {
	constructor (rootEl, chatItemContentTplStr) {
		this.rootEl = rootEl;
		this.chatItemContentTplStr = chatItemContentTplStr;
		this.inputBox = rootEl.getElementsByClassName('chat-input-box')[0];
		this.channel = null;
		this.chatFeed = rootEl.getElementsByClassName('chat-feed')[0];
		this.attachHandlers();
		this.initiateChat();
	}
	
	attachHandlers() {
		const submissionForm = this.rootEl.getElementsByClassName('chat-input-form')[0];
		submissionForm.addEventListener('submit', this.onInputFormSubmit.bind(this));
	}
	
	onInputFormSubmit(e) {
		e.preventDefault();
		const messageText = this.inputBox.value;
		this.channel.sendMessage(messageText);
		
		this.inputBox.value = '';
	}
	
	getChatTokenAndDataPromise(userName, channelName) {
		return new Promise((resolve, reject) => {					
			const url = '/token?identity=' + userName + '&endpointId=' + channelName;
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url);
			xhr.onload = () => {
				const responseData = JSON.parse(xhr.responseText);
				resolve(responseData);
			};
			xhr.send();
		});
	}
	
	initiateChat() {
		const channelName = 'defaultTestChannel';
		// Random number between 0 and 10
		const randomNumber = Math.floor(Math.random()*100) % 10;
		const userName = 'Yaoli\'s guest ' + randomNumber;
		this.getChatTokenAndDataPromise(userName, channelName)
			.then(data => {
				const chatClient = new Twilio.Chat.Client(data.token);
				chatClient.initialize().then(client => {
					client.getChannelByUniqueName(channelName).then(selectedChannel => {
						// Add in chat history.
						selectedChannel.join().then(this.setupChat.bind(this));
					}, err => {
						client.createChannel({
							uniqueName: channelName,
							friendlyName: channelName,
							isPrivate: false
						}).then(this.setupChat.bind(this));
					}
				);
			});
		});
	}
	
	setupChat(selectedChannel) {
		this.channel = selectedChannel;
		
		// Add in chat history.
		selectedChannel.join().then(channel => {
			channel.getMessages(5).then(recentMessages => {
				recentMessages.items.forEach(this.insertMessageIntoDOM.bind(this));
			});
			console.log('populateChannelHistory');
		});
						
		// Listen for new chat messages.
		selectedChannel.on('messageAdded', this.insertMessageIntoDOM.bind(this));
	}
	
	insertMessageIntoDOM(message) {
		const newMessageEl = document.createElement('li');
		newMessageEl.innerHTML = this.chatItemContentTplStr
			.replace('{{message}}', message.body)
			.replace('{{author}}', message.author);
		this.chatFeed.appendChild(newMessageEl);
	}	
}