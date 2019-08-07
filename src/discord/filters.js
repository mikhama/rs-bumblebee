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

const replaceIds = ({
  message, mentions, idPrefix, namePrefix,
}) => {
  let newMessage = message;

  mentions.forEach(({ id, name }) => {
    const mentionRegexp = new RegExp(`<${idPrefix}${id}>`, 'g');
    newMessage = newMessage.replace(mentionRegexp, `_${namePrefix}${name}_`);
  });

  return newMessage;
};

const filterMentions = mentions => [...mentions]
  .map(([id, subject]) => {
    const name = subject.username || subject.name;
    return { id, name };
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

  const replaces = [
    {
      idPrefix: '#',
      namePrefix: '#',
      mentionsArr: filterMentions(mentions.channels),
    },
    {
      idPrefix: '@!',
      namePrefix: '@',
      mentionsArr: filterMentions(mentions.users),
    },
    {
      idPrefix: '@&',
      namePrefix: '@',
      mentionsArr: filterMentions(mentions.roles),
    },
  ];

  let newContent = content;
  replaces.forEach(({ mentionsArr, idPrefix, namePrefix }) => {
    newContent = replaceIds({
      idPrefix,
      namePrefix,
      message: newContent,
      mentions: mentionsArr,
    });
  });

  newContent = replaceMarkdownSymbols(newContent);

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
    content: newContent,
  };
};
