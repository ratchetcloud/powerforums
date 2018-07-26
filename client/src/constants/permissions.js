/**
 * Reply related permissions.
 */
export const REPLY_CAN_CREATE = 'ReplyCanCreate';
export const REPLY_CAN_DELETE = 'ReplyCanDelete';
export const REPLY_CAN_FLAG = 'ReplyCanFlag';

/**
 * Topic related permissions.
 */
export const TOPIC_CAN_CREATE = 'TopicCanCreate';
export const TOPIC_CAN_DELETE = 'TopicCanDelete';

/**
 * Forum related permissions.
 */
export const FORUM_CAN_CREATE = 'ForumCanCreate';
export const FORUM_CAN_DELETE = 'ForumCanDelete';

/**
 * Roles related permissions.
 */
export const PERMISSION_LIST = [
    'CanGrantPermissions',
    FORUM_CAN_CREATE,
    TOPIC_CAN_CREATE,
    REPLY_CAN_CREATE,
    FORUM_CAN_DELETE,
    TOPIC_CAN_DELETE,
    REPLY_CAN_DELETE,
    'CanSetSticky',
    REPLY_CAN_FLAG
];