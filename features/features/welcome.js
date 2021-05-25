module.exports = (client) => {

    const channelId = '845574719205408768' //Welcome Channel
    const targetChannelId = '845572797199679539' // Rules and Info

    client.on('guildMemberAdd' , (member) => {

        const message = `Please welcome <@${member.id}> to the server! Please check out ${member.guild.channels.cache
        .get(targetChannelId)
        .toString()}`

        const channel = member.guild.channels.cache.get(channelId)

        channel.send(message)

    })

}