module.exports = {

    commands: ['deletechannel', 'delchannel'],
    maxArgs: 0,
    permissionError: 'You must have manage channels to use this command.',
    permissions: 'MANAGE_CHANNELS',
    callback: (message, arguments, text) => {

        message.channel.delete()

    },

}