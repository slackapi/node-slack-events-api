// Type definitions for @slack/events-api 1.0
// Project: https://github.com/@slack/events-api
// Definitions by: Tate Thurston <https://github.com/tatethurston>
// Definitions: <https://github.com/@slack/events-api>

import * as express from 'express';

export function createSlackEventAdapter(verificationToken: string, options?: SlackEventsApi.Options): SlackEventsApi.Adapter;

export namespace SlackEventsApi {
  interface Options {
    includeBody?: boolean;
    includeHeaders?: boolean;
    waitForResponse?: boolean;
  }

  interface Adapter {
    expressMiddleware: (opts?: ExpressMiddlewareOptions) => ExpressMiddleware;
    start: (port: string | number) => Promise<undefined>;
    stop: () => Promise<string>;
    on: OnEvent & OnError;
  }

  type ExpressMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => void;

  interface ExpressMiddlewareOptions {
    propagateErrors?: boolean;
  }

  interface Event {
    type: EventType;
    event_ts: string;
    // TODO: More constrained shape for the events
    // There is conflicting information between
    // https://api.slack.com/events-api#event_type_structure and individual
    // events.
    user?: string;
    ts?: string;
    item?: any;
    [key: string]: any;
  }

  interface EventError {
    code: ErrorCode;
    message: string;
    body: object;
  }

  type OnEvent = (event: EventType, Handler: EventHandler) => void;
  type OnError = (event: "error", Handler: ErrorHandler) => void;

  type EventHandler = (
    event: Event,
    body?: SlackEvent,
    // TODO: More constrained types for headers and respond
    headers?: any,
    respond?: any
  ) => void;

  type ErrorHandler = (error: EventError) => void;

  interface SlackEvent {
    token: string;
    team_id: string;
    api_app_id: string;
    event: Event;
    type: "event_callback" | "url_verification";
    authed_users: string[];
    event_id: string;
    event_time: number;
  }

  type ErrorCode =
    "SLACKEVENTMIDDLEWARE_NO_BODY_PARSER" |
    "SLACKEVENTMIDDLEWARE_TOKEN_VERIFICATION_FAILURE";

  type EventType =
    "app_uninstalled"         |
    "channel_archive"         |
    "channel_created"         |
    "channel_deleted"         |
    "channel_history_changed" |
    "channel_rename"          |
    "channel_unarchive"       |
    "dnd_updated"             |
    "dnd_updated_user"        |
    "email_domain_changed"    |
    "emoji_changed"           |
    "file_change"             |
    "file_comment_added"      |
    "file_comment_deleted"    |
    "file_comment_edited"     |
    "file_created"            |
    "file_deleted"            |
    "file_public"             |
    "file_shared"             |
    "file_unshared"           |
    "grid_migration_finished" |
    "grid_migration_started"  |
    "group_archive"           |
    "group_close"             |
    "group_history_changed"   |
    "group_open"              |
    "group_rename"            |
    "group_unarchive"         |
    "im_close"                |
    "im_created"              |
    "im_history_changed"      |
    "im_open"                 |
    "link_shared"             |
    "member_joined_channel"   |
    "member_left_channel"     |
    "message"                 |
    "message.channels"        |
    "message.groups"          |
    "message.im"              |
    "message.mpim"            |
    "pin_added"               |
    "pin_removed"             |
    "reaction_added"          |
    "reaction_removed"        |
    "resources_added"         |
    "resources_removed"       |
    "scope_denied"            |
    "scope_granted"           |
    "star_added"              |
    "star_removed"            |
    "subteam_created"         |
    "subteam_members_changed" |
    "subteam_self_added"      |
    "subteam_self_removed"    |
    "subteam_updated"         |
    "team_domain_change"      |
    "team_join"               |
    "team_rename"             |
    "tokens_revoked"          |
    "url_verification"        |
    "user_change";
}
