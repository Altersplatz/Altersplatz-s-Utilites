module.exports = (client) => {

    const channelIds = [

        '814870620608266287'

    ]
  
    const addReactions = (message) => {

        message.react('👍')
  
        setTimeout(() => {

        message.react('👎')
        
      } , 750)
    }
  
    client.on('message' , async (message) => {

        if (channelIds.includes(message.channel.id)) {

            addReactions(message)

        } else if (message.content.toLowerCase() === '!poll') {

            await message.delete()
  
            const fetched = await message.channel.messages.fetch({ limit: 1 })

            if (fetched && fetched.first()) {

                addReactions(fetched.first())

            }

        }

    })
    
}