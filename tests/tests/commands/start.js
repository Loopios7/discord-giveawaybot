let assert = require('./../../helpers/assert'),
    codes = require('./../../../utils/codes'),
    Store = require('./../../../utils/store'),
    SteamInfo = require('./../../../utils/steamInfo'),
    GuildMember = require('./../../helpers/mockGuildMember'),
    makeMessage = require('./../../helpers/message'),
    test = require('./../../helpers/testBase');


test('start command', function(testBase){

    it('should reject a start command with too few args', async function() {
        let message = makeMessage(testBase.client.user.id);
        message.content += 'start ab';

        let result = await testBase.client.raiseMessageEvent(message);
        assert.equal(codes.MESSAGE_REJECTED_INVALIDARGUMENTS, result);
    });


    it('should reject a start command with too few args', async function() {
        let message = makeMessage(testBase.client.user.id);
        message.content += 'start ab cd ef';

        let result = await testBase.client.raiseMessageEvent(message);
        assert.equal(codes.MESSAGE_REJECTED_INVALIDARGUMENTS, result);
    });

    it('should reject a start command with invalid duration time format', async function() {
        let message = makeMessage(testBase.client.user.id);
        message.content += 'start ab steamlink ';

        let result = await testBase.client.raiseMessageEvent(message);
        assert.equal(codes.MESSAGE_REJECTED_INVALIDTIMEFORMAT, result);
    });

    it('should accept a start command with a valid steamID', async function() {
        let message = makeMessage(testBase.client.user.id);
        message.content += 'start 1m steamid';

        // make caller an admin
        let member = new GuildMember();
        member.permission = true;
        testBase.client.channels.array()[0].guild.setNextMember(member);

        let steamInfo = SteamInfo.instance();
        steamInfo.setNextInfo({
            success : true
        });

        let result = await testBase.client.raiseMessageEvent(message);
        assert.equal(codes.MESSAGE_ACCEPTED, result);
    });

});