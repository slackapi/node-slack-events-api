// Initialize using verification token from environment variables
import { createSlackEventAdapter } from '@slack/events-api';

const { PORT, SLACK_VERIFICATION_TOKEN } = { PORT: 8080, SLACK_VERIFICATION_TOKEN: 'test' };

const slackEvents = createSlackEventAdapter(SLACK_VERIFICATION_TOKEN);

// Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
slackEvents.on('message', (event) => {
  console.log(`Received a message event: user ${event.user} in channel ${event.channel} says ${event.text}`);
});

// Handle errors (see `errorCodes` export)
slackEvents.on('error', console.error);

// Start a basic HTTP server
slackEvents.start(PORT).then(() => {
  console.log(`server listening on port ${PORT}`);
});
