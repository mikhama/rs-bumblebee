const sut = require('../start');

describe('method', () => {
  it('send greeting message', () => {
    // given
    const firstName = 'test first name';
    const lastName = 'test last name';
    const expectedMessage = `Hello *${firstName} ${lastName}*! Glad to see you.\nType /help for available options.`;
    const client = {
      sendMessage: jest.fn(),
    };
    const data = {
      from: {
        first_name: firstName,
        last_name: lastName,
      },
      chat: { id: 123 },
    };
    // when
    sut({ client }).method(data);
    // then
    expect(client.sendMessage).toHaveBeenCalled();
    expect(client.sendMessage.mock.calls[0][0]).toEqual(data.chat.id);
    expect(client.sendMessage.mock.calls[0][1]).toEqual(expectedMessage);
  });

  it('send greeting message when user does not specified last name', () => {
    // given
    const firstName = 'test first name';
    const expectedMessage = `Hello *${firstName}*! Glad to see you.\nType /help for available options.`;
    const client = {
      sendMessage: jest.fn(),
    };
    const data = {
      from: {
        first_name: firstName,
      },
      chat: { id: 123 },
    };
    // when
    sut({ client }).method(data);
    // then
    expect(client.sendMessage).toHaveBeenCalled();
    expect(client.sendMessage.mock.calls[0][0]).toEqual(data.chat.id);
    expect(client.sendMessage.mock.calls[0][1]).toEqual(expectedMessage);
  });
});
