const replaceUserIds = (message, mentions) => {
  let newMessage = message;

  mentions.forEach(({ id, username }) => {
    const userMentionRegexp = new RegExp(`<@!${id}>`, 'g');
    newMessage = newMessage.replace(userMentionRegexp, `_${username}_`);
  });

  return newMessage;
};

const filterUsersMentions = mentions => [...mentions]
  .map(([id, user]) => {
    const { username, discriminator } = user;

    return {
      id,
      username,
      discriminator,
    };
  });

module.exports.filterDiscordMessage = (message) => {
  const {
    id,
    channel,
    content,
    author,
    member,
    mentions,
    createdTimestamp,
    editedTimestamp,
  } = message;

  const {
    username,
    discriminator,
    avatar,
  } = author;

  const { nickname } = member;

  const channelName = channel.name;
  const lastMessageId = channel.lastMessageID;
  const userId = author.id;

  const usersMentions = filterUsersMentions(mentions.users);
  const contentWithUsernames = replaceUserIds(content, usersMentions);

  return {
    id,
    channelName,
    lastMessageId,
    userId,
    username,
    nickname,
    discriminator,
    avatar,
    createdTimestamp,
    editedTimestamp,
    content: contentWithUsernames,
  };
};
