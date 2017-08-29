<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Yaoli's Twilio Chat </title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
		<link rel="stylesheet" href="static/styles.css">
  </head>
  <body>
		<nav class="navbar navbar-dark bg-dark fixed-top">
			<a class="navbar-brand" href="/">Yaoli's Twilio App</a>
		</nav>
		<div id="content-main">
			<div id="main-chat-component" class="chat-component card">
				<ul class="chat-feed"></ul>
				<form class="chat-input-form" action="" method="post">
					<input type="text" class="chat-input-box" placeholder="Type a message!">
					<button class="btn btn-primary send-chat">Send</button>
				</form>
			</div>
		</div>
		<script id="chatItemContentTpl" type="text/x-yaolis-tpl">
				<p class="card message">
					{{message}}
					<span class="author-info">by {{author}}</span>
				</p>
		</script>
		<script>
			document.addEventListener('DOMContentLoaded', event => {
				const chat = new ChatComponent(
					document.getElementById('main-chat-component'),
					document.getElementById('chatItemContentTpl').innerHTML);
			});
		</script>
		<script src="static/chatcomponent.js"></script>
		<script src="https://media.twiliocdn.com/sdk/js/common/v0.1/twilio-common.min.js"></script>
		<script src="https://media.twiliocdn.com/sdk/js/chat/v1.0/twilio-chat.min.js"></script>	
	</body>
</html>