const replaceMarkdownSymbols = (message) => {
  const discordBoldRegexp = new RegExp('\\*{2}', 'g');
  const discordItalicRegexp = new RegExp('\\*', 'g');
  const tempReplacerRegexp = new RegExp('_{3}', 'g');

  const telegramBoldChar = '*';
  const telegramItalicChar = '_';
  const tempReplacer = '___';

  const newMessage = message
    .replace(discordBoldRegexp, tempReplacer)
    .replace(discordItalicRegexp, telegramItalicChar)
    .replace(tempReplacerRegexp, telegramBoldChar);

  return newMessage;
};

const replaceUserIds = (message, mentions) => {
  let newMessage = message;

  mentions.forEach(({ id, username }) => {
    const userMentionRegexp = new RegExp(`<@!${id}>`, 'g');
    newMessage = newMessage.replace(userMentionRegexp, `_@${username}_`);
  });

  return newMessage;
};

const replaceChannelIds = (message, mentions) => {
  let newMessage = message;

  mentions.forEach(({ id, name }) => {
    const channelMentionRegexp = new RegExp(`<#${id}>`, 'g');
    newMessage = newMessage.replace(channelMentionRegexp, `_#${name}_`);
  });

  return newMessage;
};

const filterChannelMentions = mentions => [...mentions]
  .map(([id, channel]) => {
    const { name } = channel;

    return {
      id,
      name,
    };
  });

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


  let contentWithReplacedChars = replaceMarkdownSymbols(content);

  const channelMentions = filterChannelMentions(mentions.channels);
  contentWithReplacedChars = replaceChannelIds(contentWithReplacedChars, channelMentions);

  const usersMentions = filterUsersMentions(mentions.users);
  contentWithReplacedChars = replaceUserIds(contentWithReplacedChars, usersMentions);

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
    content: contentWithReplacedChars,
  };
};
