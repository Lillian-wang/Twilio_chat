// Define app configuration in a single location, but pull in values from
// system environment variables (so we don't check them in to source control!)
module.exports = {
    //flag to get Twilio Account Setting from this file or from environment
    // If set to 'Y' , the values are read from config.js and not from environment
    getTwiliAccountSettingsfromFile: 'Y',


    // Your primary Twilio Account SID
    accountSid: 'AC1c142d3fb99ca5731bcece46734465b9',

    // API Key/Secret Pair - generate a pair in the console
    apiKey: 'SKba0472eb8ec5f0554a49acfa87a1371c',
    apiSecret: 'J4Jxs07dh6wUKLD1m0krUmbsZKF9LXkL',

    // Your Chat service instance SID
    serviceSid: 'ISd60de6bff72b4b6fb1a59d66db9167ce',

    // Defines whether or not this application is deployed in a production
    // environment
    nodeEnv: 'development',

    // In production, this is the base host name for web app on the public
    // internet, like "jimmysbbq.herokuapp.com".  This should be the same host
    // you use in your Twilio Number config for voice or messaging URLs
    host: process.env.HOST || 'localhost',

    // The port your web application will run on
    port: process.env.PORT || 3000

};